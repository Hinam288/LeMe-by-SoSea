# Lê Mê — Trà Sữa Đậm Vị — Ngọc Hồi

Website tĩnh giới thiệu quán, xem menu chính thức (**Làn Gió Hương Trà**) và soạn nội dung đặt món để khách gửi qua Zalo hoặc Messenger. Website chưa tích hợp thanh toán trực tuyến tự động; quán sẽ xác nhận đơn qua tin nhắn.

## Chức năng hiện có

- **Menu 16 món** theo bảng menu tại quán (4 nhóm: *Hương trà nguyên bản*, *Vị trà cao cấp & Sữa tươi*, *Trà vị hoa quả*, *Cốt trà đóng chai*), lọc theo danh mục, chọn **Size M / L**, **Đá / Nóng**, mức đường/đá (`0%–100%`), **7 loại topping thủ công** và số lượng.
- **Giỏ hàng** lưu bằng `localStorage`; dữ liệu khôi phục luôn được kiểm tra và tính lại đơn giá trực tiếp từ bảng giá & topping trong `js/main.js`.
- **Đặt đơn nhanh qua Messenger & Zalo:** Nút **Gửi qua Messenger** tự động truyền sẵn toàn bộ nội dung đơn qua link `m.me/61590901593823?text=...` để điền trực tiếp vào khung chat (khách chỉ cần bấm Gửi). Với **Zalo**, do giới hạn của `zalo.me` cá nhân không hỗ trợ tham số `?text=`, web tự sao chép sẵn đơn ngay khi bấm và mở thẳng khung chat Zalo để khách Dán & Gửi. Bản soạn gần nhất lưu trong `sessionStorage` của tab để mở lại sau khi tải trang.
- **Lê Mê Story, Randomizer ("Hôm nay uống gì?"), Chế độ "Quán lên đèn" (Night Mode) & Trạng thái mở cửa theo giờ Việt Nam.**
- **Hiệu năng & Trợ năng:** Video chỉ tải khi khách bấm xem; ảnh không gian quán đã nén WebP (~70 KB); các hộp thoại hỗ trợ phím Escape, giữ focus bàn phím và khóa cuộn nền.

## Thông tin cửa hàng (đã đối chiếu Google Maps & Fanpage)

- **Địa chỉ:** Số 2, ngách 298/31 đường Ngọc Hồi, Yên Ngưu, Đại Thanh, Hà Nội.
- **Google Maps:** [Lê Mê - Trà Sữa Đậm Vị - Ngọc Hồi](https://maps.app.goo.gl/PAmnJUQ9Nv922P2A6) (`5.0 ★`).
- **Hotline / Zalo:** `0869 256 962` · `036 212 6184`.
- **Email:** `vuhaiyen067@gmail.com`.
- **ShopeeFood:** [shopeefood.shopee.vn/u/frCAhCm](https://shopeefood.shopee.vn/u/frCAhCm).
- **Facebook:** [Lê Mê - Trà Sữa Đậm Vị - Ngọc Hồi](https://www.facebook.com/profile.php?id=61590901593823).
- **Giờ mở cửa:** `9:00 – 22:00` hàng ngày (Thứ 2 – Chủ Nhật).
- **Giao hàng:** Freeship trong bán kính 2km; xa hơn quán báo phí khi xác nhận đơn.

## Giao diện và tài nguyên

- Màu chính: xanh rêu `#3a5a40`, kem `#e9edc9`, vàng `#d4b872`, nền `#fbfbf9`.
- Ảnh/video ở `assets/`: đã loại bỏ bản video trùng lặp (`Lê Mê - Make Tea2.webm`) và nén ảnh không gian quán sang `store-interior.webp` (~70 KB).
- CSS Tailwind biên dịch sẵn vào `css/tailwind.css`.

## Cập nhật & Kiểm thử

Sau khi thay đổi class trong HTML/JavaScript:

```sh
npm run build:css
npm run check
BROWSER_CHANNEL=msedge npm test
```

Triển khai `index.html`, `css/tailwind.css`, `css/custom.css`, `js/` và `assets/` lên GitHub Pages (`https://hinam288.github.io/LeMe-by-SoSea/`).
