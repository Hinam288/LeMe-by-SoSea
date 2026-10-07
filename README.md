# Lê Mê — Trà Sữa Đậm Vị — Ngọc Hồi

Website tĩnh giới thiệu quán, xem menu và soạn nội dung đặt món để khách tự gửi qua Zalo/Messenger. Website chưa có máy chủ nhận đơn, thanh toán hay trạng thái xác nhận từ quán.

## Chức năng hiện có

- Menu 5 sản phẩm, lọc theo nhóm, chọn đường/đá và điều chỉnh số lượng.
- Giỏ hàng lưu bằng localStorage; dữ liệu khôi phục được kiểm tra và lấy giá từ menu hiện tại.
- Không tự xóa giỏ khi soạn đơn hoặc mở ứng dụng nhắn tin.
- Sao chép đơn có báo kết quả; nếu trình duyệt chặn, khách có thể sao chép thủ công từ ô nội dung.
- Bản soạn gần nhất lưu trong sessionStorage của tab để mở lại sau khi tải trang. Nút mở lại nằm trong giỏ hàng, kể cả khi giỏ trống. Khách có thể xóa bản soạn; đóng tab kết thúc phiên lưu thông thường.
- Kiểm tra họ tên, địa chỉ và định dạng số điện thoại; chưa xác minh chủ sở hữu số điện thoại.
- Popup hỗ trợ Escape, giữ focus bàn phím và khóa cuộn nền; menu điện thoại có trạng thái mở/đóng.
- Video chỉ tải/phát khi khách bấm xem; ảnh menu và không gian dùng lazy loading.

## Thông tin cửa hàng

- Hotline/Zalo: 036 212 6184 · 0869 256 962.
- Email: vuhaiyen067@gmail.com.
- [Google Maps do chủ website cung cấp](https://maps.app.goo.gl/WT7h43BGyJvyZQHWA).
- [ShopeeFood](https://shopeefood.shopee.vn/u/frCAhCm).
- [Facebook](https://www.facebook.com/profile.php?id=61590901593823).
- Giờ đang hiển thị: 9:00–22:00 mỗi ngày, cần quán xác nhận.
- Chính sách đang hiển thị: miễn phí giao trong 2km; xa hơn quán báo phí khi xác nhận.
- Tên món và giá trong `js/main.js` vẫn là dữ liệu tham khảo, cần quán xác nhận trước khi bán chính thức. Trang đã hiển thị rõ giá tham khảo.
- Chưa có địa chỉ dạng văn bản đầy đủ; dùng link Maps được cung cấp, không tự suy đoán địa chỉ.

## Giao diện và tài nguyên

Màu chính: xanh rêu `#3a5a40`, kem `#e9edc9`, vàng `#d4b872`, nền `#fbfbf9`.
Ảnh/video ở `assets/`. Giữ nguyên tài nguyên gốc. CSS Tailwind biên dịch vào `css/tailwind.css`; trang không cần tải Tailwind/AOS từ CDN. Font Google có font hệ thống dự phòng.

## Xem và cập nhật

Mở `index.html` để xem nhanh, hoặc phục vụ thư mục qua HTTP localhost khi kiểm thử. Khi triển khai, dùng HTTPS để hỗ trợ clipboard; luôn có ô nội dung để sao chép thủ công.

Sau khi thay đổi các class trong HTML/JavaScript, tạo lại CSS bằng Node.js và pnpm:

```sh
pnpm install --frozen-lockfile
pnpm run build:css
pnpm run check
```

Triển khai `index.html`, `css/tailwind.css`, `css/custom.css`, `js/` và `assets/`. Không cần đưa node_modules lên hosting.

## Kiểm tra trước khi phát hành

Kiểm thử tự động dùng Playwright với dữ liệu giả, không gửi tin nhắn hay đơn thật:

```sh
pnpm exec playwright install chromium
pnpm test
```

Nếu dùng Microsoft Edge đã cài, đặt biến môi trường `BROWSER_CHANNEL=msedge` trước khi chạy test. Ảnh kiểm thử được ghi vào `test-results/` (không đưa lên Git).

Kiểm tra chọn món, đường/đá, số lượng, tải lại giỏ, soạn đơn và mở lại bản soạn; thử clipboard thành công, bị chặn và không có API; kiểm tra bàn phím, màn hình hẹp và liên kết Maps. Chỉ gửi đơn thật khi đã xác nhận món, giá và thông tin cửa hàng.
