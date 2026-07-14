# Chúc mừng sinh nhật Gia Hân — 2 tuổi 🌟

Trang web kể lại hành trình 2 năm đầu đời của **Nguyễn Ngọc Gia Hân** (sinh 16/07/2024),
theo phong cách cuộn-kể-chuyện trên nền trời đêm đầy sao.

## Chạy thử trên máy

```bash
npm install     # chỉ cần chạy lần đầu
npm run dev     # mở http://localhost:5173
```

## 1. Thêm ảnh của bé

Copy ảnh vào thư mục `public/photos/`, đặt tên đúng như bảng dưới đây là ảnh tự hiện lên
(chỗ nào chưa có ảnh sẽ hiện khung sao ⭐ thay thế, không bị vỡ trang):

| Chương | Tên file cần đặt |
| --- | --- |
| 01 · Chào đời | `chao-doi-1.jpg`, `chao-doi-2.jpg` |
| 02 · Những nụ cười đầu tiên | `nu-cuoi-1.jpg`, `nu-cuoi-2.jpg`, `nu-cuoi-3.jpg` |
| 03 · Những bước chân đầu tiên | `buoc-chan-1.jpg` |
| 04 · Những chuyến đi | `chuyen-di-1.jpg`, `chuyen-di-2.jpg`, `chuyen-di-3.jpg` |
| 05 · Những người yêu thương | `yeu-thuong-1.jpg` … `yeu-thuong-4.jpg` |
| 06 · Sinh nhật hôm nay | `sinh-nhat-1.jpg` |
| Ảnh hiện khi gửi link qua Zalo/Messenger | `og-image.jpg` |

Muốn thêm/bớt ảnh hoặc đổi tên file thì sửa trong [src/data/story.ts](src/data/story.ts).

**Nên nén ảnh trước khi dùng.** Ảnh chụp từ điện thoại thường 3–5 MB, để nguyên sẽ làm trang tải rất
chậm khi người thân mở bằng 4G. Kéo thả ảnh vào <https://squoosh.app>, xuất ra chiều rộng ~1200px,
mỗi ảnh dưới 300 KB là đẹp.

## 2. Sửa lời chúc

Toàn bộ chữ nghĩa nằm trong [src/data/story.ts](src/data/story.ts) — tên bé, ngày sinh, lời kể từng
chương, và lời chúc cuối. Sửa file đó là xong, không cần đụng tới phần giao diện.

## 3. Thêm nhạc nền (không bắt buộc)

Đặt file nhạc vào `public/music/nhac-nen.mp3`. Nút bật/tắt nhạc nằm ở góc trên bên phải, mặc định
đang tắt (trình duyệt trên điện thoại luôn chặn nhạc tự phát). Không có file nhạc thì nút tự ẩn.

## 4. Sổ lưu bút — bật tính năng nhận lời chúc

Ở cuối trang có phần cho mọi người **gửi lời chúc hôm nay** (hiện ngay lên trang thành những mẩu
giấy nhắn) hoặc **viết thư gửi Gia Hân năm 18 tuổi**.

Thư tuổi 18 **không hiển thị gì trên trang cả** — không phong bì, không đếm ngược, không cả tên
người gửi. Thư chảy thẳng vào Google Sheets của bạn và nằm im ở đó. Đến sinh nhật 18 tuổi của con,
bạn mở sheet ra đọc cùng con. Đó cũng là lý do người viết thư có thể thoải mái viết những điều
riêng tư.

Lời chúc được lưu vào **một file Google Sheets của chính bạn** — 16 năm sau vẫn còn, và bạn có thể
in ra thành sổ tặng con. Làm một lần, khoảng 10 phút:

1. Vào <https://sheets.google.com>, tạo một bảng tính mới, đặt tên gì cũng được
   (ví dụ "Lời chúc sinh nhật Gia Hân").
2. Trong bảng tính đó, chọn menu **Tiện ích mở rộng → Apps Script**.
3. Xoá hết code mẫu trong đó, rồi **copy toàn bộ nội dung file
   [google-apps-script/Code.gs](google-apps-script/Code.gs) dán vào**. Bấm nút lưu (hình đĩa mềm).
4. Bấm nút **Triển khai (Deploy) → Tuỳ chọn triển khai mới (New deployment)**.
   - Chọn loại: **Ứng dụng web (Web app)**
   - Thực thi với tư cách (Execute as): **Tôi (Me)**
   - Ai có quyền truy cập (Who has access): **Bất kỳ ai (Anyone)** ← bắt buộc, để người thân gửi được
   - Bấm **Triển khai**, rồi bấm **Cấp quyền (Authorize)** và đăng nhập Google của bạn.
     Google sẽ cảnh báo "chưa được xác minh" — bấm **Nâng cao → Đi tới … (không an toàn)**.
     Cảnh báo này là bình thường vì đây là script do chính bạn viết, không phải của bên thứ ba.
5. Copy đường link hiện ra (dạng `https://script.google.com/macros/s/AKfycb.../exec`)
   và dán vào biến `GUESTBOOK_URL` trong [src/config.ts](src/config.ts).

Xong. Chưa dán link thì phần sổ lưu bút vẫn hiện nhưng báo "chưa kết nối" và không gửi được.

**Kiểm duyệt lời chúc:** mọi lời chúc nằm trong sheet tên `LoiChuc`. Muốn ẩn một dòng bậy bạ khỏi
trang web, gõ chữ `an` vào cột **Đã duyệt** của dòng đó (không cần xoá dòng).

**Về những lá thư tuổi 18:** script cố tình **không bao giờ gửi nội dung thư về trang web**, và trang
cũng không hiển thị chúng. Người tò mò có xem mã nguồn trang cũng không đọc trộm được lá thư nào.
Chúng chỉ nằm trong Google Sheets của bạn — lọc cột **Loại** lấy giá trị `thu18` là ra hết.

## 5. Đưa lên mạng để gửi link cho người thân

**Trang đã chạy công khai tại: <https://kimduan.github.io/hanchan/>** — gửi link này cho cả nhà.

Trang được deploy tự động bằng GitHub Pages. Mỗi lần bạn thêm ảnh hoặc sửa lời chúc, chỉ cần:

```bash
git add -A
git commit -m "Thêm ảnh của bé"
git push
```

Khoảng 1–2 phút sau trang tự cập nhật, không phải làm gì thêm. Xem tiến trình build ở tab
**Actions** trên GitHub.

> **Lưu ý:** trang ở chế độ công khai — ai có link cũng xem được ảnh của bé, không cần mật khẩu.
>
> Đường dẫn gốc của trang là `/hanchan/` (khai báo ở `base` trong [vite.config.ts](vite.config.ts)),
> nên mọi ảnh phải gọi qua hàm `asset()` trong [src/lib/asset.ts](src/lib/asset.ts) thì mới tải đúng.
> Nếu sau này mua tên miền riêng, đổi `base` thành `'/'`.

## Cấu trúc

```
src/
  data/story.ts              ← nội dung: tên, ngày sinh, lời kể, danh sách ảnh
  components/
    StarField.tsx            ← nền trời sao, trôi theo tiến độ cuộn
    Hero.tsx                 ← màn mở đầu + sao băng
    ChapterSection.tsx       ← khung chung cho 6 chương
    PolaroidPhoto.tsx        ← khung ảnh polaroid nghiêng
    Finale.tsx               ← bánh 2 nến, bấm để thổi → pháo hoa
    Guestbook.tsx            ← sổ lưu bút + thư gửi tuổi 18
    Countdown.tsx            ← đếm ngược tới 16/07/2042
    MusicToggle.tsx          ← nút bật/tắt nhạc
    ScrollProgress.tsx       ← dải sáng tiến độ ở mép trên
  config.ts                  ← link Google Apps Script của sổ lưu bút
google-apps-script/Code.gs   ← code dán vào Google Apps Script
public/photos/               ← ẢNH CỦA BÉ ĐỂ Ở ĐÂY
public/music/                ← nhạc nền để ở đây
```

Công nghệ: Vite · React · TypeScript · Tailwind CSS · Framer Motion · canvas-confetti.
Không có backend, không có cơ sở dữ liệu — chỉ là file tĩnh.
