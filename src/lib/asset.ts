/**
 * Ghép đường dẫn gốc của trang vào trước đường dẫn file.
 *
 * Trang chạy tại https://kimduan.github.io/hanchan/ nên ảnh phải nằm ở
 * /hanchan/photos/... chứ không phải /photos/... Hàm này lo việc đó, và vẫn
 * chạy đúng khi làm ở máy (gốc là "/") hay khi đổi sang tên miền riêng.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
