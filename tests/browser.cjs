const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.webm': 'video/webm' };
const server = http.createServer(async (req, res) => {
  try {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname === '/' ? '/index.html' : new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    const data = await fs.readFile(file);
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404).end(); }
});

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
  const errors = [];
  try {
    await fs.mkdir(path.join(root, 'test-results'), { recursive: true });
    for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 568 }]) {
      const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
      // A slow/unavailable font CDN must not prevent local styles and ordering.
      await context.route(/https:\/\//, route => route.abort());
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      const videos = [];
      page.on('request', req => { if (req.url().endsWith('.webm')) videos.push(req.url()); });
      await page.goto(url);
      assert.equal(await page.locator('#product-grid > div').count(), 5);
      assert.equal(await page.locator('#cart-drawer').evaluate(el => el.inert), true);
      assert.equal(await page.locator('#main-header').evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(58, 90, 64)');
      assert.equal(videos.length, 0, 'video should not download on page load');
      assert.equal(await page.locator('a[href="https://maps.app.goo.gl/WT7h43BGyJvyZQHWA"]').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, 'no horizontal page overflow');
      for (const img of await page.locator('img:visible').all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(el => el.decode());
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: path.join(root, `test-results/home-${viewport.width}.png`), fullPage: true });
      await page.screenshot({ path: path.join(root, `test-results/hero-${viewport.width}.png`) });

      await page.locator('[data-filter="bottle"]').click();
      assert.equal(await page.locator('#product-grid > div').count(), 2);
      await page.locator('[data-filter="all"]').click();
      await page.getByRole('button', { name: 'Thêm Trà Sữa Lê Mê vào giỏ', exact: true }).click();
      await page.getByRole('button', { name: '50% đường', exact: true }).click();
      await page.getByRole('button', { name: 'Không đá', exact: true }).click();
      await page.locator('#product-detail-modal').getByRole('button', { name: 'Thêm vào giỏ', exact: true }).click();
      await page.getByRole('button', { name: 'Thêm Cốt Trà Sữa Đóng Chai vào giỏ', exact: true }).click();
      await page.locator('#cart-toggle-btn').click();
      assert.match(await page.locator('#cart-items-list').innerText(), /50% đường • Không đá/);
      assert.match(await page.locator('#cart-subtotal').innerText(), /80\.000/);
      await page.locator('#cart-items-list').getByRole('button', { name: 'Thêm', exact: true }).first().click();
      assert.match(await page.locator('#cart-subtotal').innerText(), /115\.000/);
      await page.keyboard.press('Escape');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'cart-toggle-btn');
      await page.reload();
      await page.locator('#cart-toggle-btn').click();
      assert.match(await page.locator('#cart-subtotal').innerText(), /115\.000/);
      await page.getByRole('button', { name: 'Soạn đơn giao hàng', exact: true }).click();
      await page.locator('#order-name').fill('Khách kiểm thử');
      await page.locator('#order-phone').fill('abc');
      await page.locator('#order-address').fill('Địa chỉ kiểm thử, không gửi đơn');
      await page.getByRole('button', { name: 'Soạn nội dung đơn', exact: true }).click();
      assert.equal(await page.locator('#order-phone').evaluate(el => el.validity.valid), false);
      assert.equal(await page.locator('#order-success-modal').isVisible(), false);
      await page.locator('#order-phone').fill('+84 362 126 184');
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Denied'); } } }));
      await page.getByRole('button', { name: 'Soạn nội dung đơn', exact: true }).click();
      await page.waitForFunction(() => document.getElementById('copy-order-status').textContent.includes('Chưa sao chép'));
      const message = await page.locator('#generated-order-text').inputValue();
      assert.match(message, /50% đường, Không đá/);
      assert.match(message, /115\.000/);
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('leme_cart_v2')).length), 2);
      assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
      const panel = await page.locator('#order-success-modal > div').boundingBox();
      assert.ok(panel.x >= 0 && panel.y >= 0 && panel.x + panel.width <= viewport.width && panel.y + panel.height <= viewport.height, 'dialog fits viewport');
      await page.screenshot({ path: path.join(root, `test-results/order-${viewport.width}.png`) });

      // Keyboard focus cycles inside the dialog, including on short screens.
      await page.getByRole('button', { name: 'Xóa bản soạn này', exact: true }).focus();
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'generated-order-text');
      await page.keyboard.press('Shift+Tab');
      assert.match(await page.evaluate(() => document.activeElement.textContent), /Xóa bản soạn/);
      await page.reload();
      await page.locator('#cart-toggle-btn').click();
      await page.locator('#resume-order-btn').click();
      assert.equal(await page.locator('#generated-order-text').inputValue(), message);
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined }));
      await page.getByRole('button', { name: 'Sao chép lại', exact: true }).click();
      assert.match(await page.locator('#copy-order-status').innerText(), /Chưa sao chép/);
      await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.copiedOrder = text; } } }));
      await page.getByRole('button', { name: 'Sao chép lại', exact: true }).click();
      await page.waitForFunction(() => document.getElementById('copy-order-status').textContent.startsWith('Đã sao chép'));
      assert.equal(await page.evaluate(() => window.copiedOrder), message);
      await page.getByRole('button', { name: 'Xóa bản soạn này', exact: true }).click();
      assert.equal(await page.evaluate(() => sessionStorage.getItem('leme_order_draft_v1')), null);
      assert.equal(await page.evaluate(() => document.body.style.overflow), '');
      assert.equal(await page.evaluate(() => document.querySelector('header').inert), false);
      await page.locator('#cart-toggle-btn').click();
      assert.equal(await page.locator('#cart-items-list > div').count(), 2);
      await page.keyboard.press('Escape');
      if (viewport.width < 1024) {
        await page.locator('#mobile-menu-btn').click();
        assert.equal(await page.locator('#mobile-menu-btn').getAttribute('aria-expanded'), 'true');
        await page.locator('#mobile-menu a[href="#menu"]').click();
        assert.equal(await page.locator('#mobile-menu-btn').getAttribute('aria-expanded'), 'false');
      }
      await context.close();
      console.log(`PASS: ordering, clipboard, persistence, focus and layout ${viewport.width}px`);
    }

    const context = await browser.newContext();
    await context.route(/https:\/\//, route => route.abort());
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(url);
    for (const corrupt of ['null', '{}', '{broken', '[null]', '[{"id":999,"quantity":2}]']) {
      await page.evaluate(value => localStorage.setItem('leme_cart_v2', value), corrupt);
      await page.reload();
      await page.locator('[data-filter="bottle"]').click();
      assert.equal(await page.locator('#product-grid > div').count(), 2);
    }
    await page.evaluate(() => localStorage.setItem('leme_cart_v2', JSON.stringify([{ id: 1, quantity: 2, name: '<img onerror=alert(1)>', price: 1, sugar: '<script>' }])));
    await page.reload();
    await page.locator('#cart-toggle-btn').click();
    assert.match(await page.locator('#cart-subtotal').innerText(), /70\.000/);
    assert.doesNotMatch(await page.locator('#cart-items-list').innerHTML(), /onerror|<script>/);
    await page.keyboard.press('Escape');
    await page.evaluate(() => {
      Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
    });
    await page.getByRole('button', { name: 'Thêm Cốt Trà Sữa Đóng Chai vào giỏ', exact: true }).click();
    await page.locator('#cart-toggle-btn').click();
    assert.match(await page.locator('#cart-subtotal').innerText(), /115\.000/);
    await page.getByRole('button', { name: 'Soạn đơn giao hàng', exact: true }).click();
    await page.locator('#order-name').fill('Test');
    await page.locator('#order-phone').fill('0362126184');
    await page.locator('#order-address').fill('Test address');
    await page.getByRole('button', { name: 'Soạn nội dung đơn', exact: true }).click();
    assert.equal(await page.locator('#order-success-modal').isVisible(), true);
    assert.match(await page.locator('#toast-container').innerText(), /Không lưu được bản soạn/);
    await context.close();
    assert.deepEqual(errors, [], 'no uncaught JavaScript errors');
    console.log('PASS: malformed/tampered cart, blocked storage, no uncaught errors');
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => server.close());
