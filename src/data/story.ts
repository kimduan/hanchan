/**
 * Toàn bộ nội dung của trang nằm ở đây.
 * Muốn đổi lời chúc, thêm/bớt ảnh: chỉ cần sửa file này, không cần đụng tới code giao diện.
 *
 * Ảnh: copy file vào thư mục `public/photos/`, rồi ghi đường dẫn là `/photos/ten-file.jpg`.
 * Chưa có ảnh cũng không sao — chỗ đó sẽ hiện một khung sao lung linh thay thế.
 */

export const BABY = {
  fullName: 'Nguyễn Ngọc Gia Hân',
  /** Tách sẵn để màn hình hẹp ngắt dòng đúng chỗ: "Nguyễn Ngọc" / "Gia Hân" */
  familyName: 'Nguyễn Ngọc',
  givenName: 'Gia Hân',
  shortName: 'Gia Hân',
  nickname: 'Gia Hân',
  birthDate: '16/07/2024',
  age: 2,
} as const

export type Photo = {
  src: string
  caption?: string
}

export type Chapter = {
  id: string
  /** Số thứ tự hiển thị ở góc, ví dụ "Chương 01" */
  index: string
  title: string
  subtitle?: string
  /** Đoạn kể chính, giọng của bố mẹ nói với con */
  body: string[]
  photos: Photo[]
  /** Kiểu bố cục ảnh của chương */
  layout: 'single' | 'duo' | 'grid'
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'chao-doi',
    index: '01',
    title: 'Chào đời',
    subtitle: '16 tháng 7, 2024',
    body: [
      'Đêm ấy, một ngôi sao rời bầu trời và rơi vào vòng tay bố mẹ.',
      'Con bé xíu, ấm áp, và cả thế giới của bố mẹ bỗng đổi khác kể từ giây phút đó.',
    ],
    photos: [
      { src: '/photos/chao-doi-1.jpg', caption: 'Ngày đầu tiên của con' },
      { src: '/photos/chao-doi-2.jpg', caption: 'Bàn tay nhỏ xíu' },
    ],
    layout: 'duo',
  },
  {
    id: 'nu-cuoi',
    index: '02',
    title: 'Những nụ cười đầu tiên',
    subtitle: 'Khi cả nhà biết thế nào là hạnh phúc',
    body: [
      'Rồi một ngày con cười. Không vì điều gì cả, chỉ là con cười.',
      'Và bố mẹ nhận ra: hoá ra hạnh phúc đơn giản đến thế.',
    ],
    photos: [
      { src: '/photos/nu-cuoi-1.jpg', caption: 'Nụ cười đầu tiên' },
      { src: '/photos/nu-cuoi-2.jpg', caption: 'Cả nhà cùng cười' },
    ],
    layout: 'duo',
  },
  {
    id: 'buoc-chan',
    index: '03',
    title: 'Những bước chân đầu tiên',
    subtitle: 'Chập chững đi vào thế giới',
    body: [
      'Con ngã, con đứng dậy, con đi. Rồi con chạy.',
      'Bố mẹ chỉ biết đứng phía sau, dang tay chờ, và thầm mong con luôn dũng cảm như thế.',
    ],
    // Chưa có ảnh — thêm file vào public/photos/ rồi khai báo một dòng ở đây
    photos: [],
    layout: 'single',
  },
  {
    id: 'chuyen-di',
    index: '04',
    title: 'Những chuyến đi',
    subtitle: 'Thế giới rộng lớn ngoài kia',
    body: [
      'Biển, núi, những con đường lạ — con mở to mắt nhìn tất cả.',
      'Bố mẹ muốn cùng con đi thật nhiều nơi, để con biết thế giới này đẹp đến nhường nào.',
    ],
    photos: [{ src: '/photos/chuyen-di-1.jpg', caption: 'Ra sân bóng chơi' }],
    layout: 'single',
  },
  {
    id: 'yeu-thuong',
    index: '05',
    title: 'Những người yêu thương',
    subtitle: 'Gia đình mình',
    body: [
      'Ông bà, bố mẹ, và tất cả những người luôn dõi theo con.',
      'Con lớn lên trong rất nhiều yêu thương — và đó là điều bố mẹ tự hào nhất.',
    ],
    // Chưa có ảnh — thêm file vào public/photos/ rồi khai báo các dòng ở đây
    photos: [],
    layout: 'grid',
  },
  {
    id: 'sinh-nhat',
    index: '06',
    title: 'Sinh nhật hôm nay',
    subtitle: 'Gia Hân tròn 2 tuổi rồi!',
    body: [
      'Hai năm trôi qua nhanh như một cái chớp mắt.',
      'Hôm nay con hai tuổi — cô bé nhỏ đã biết cười, biết chạy, biết ôm bố mẹ thật chặt.',
    ],
    // Chưa có ảnh — thêm file vào public/photos/ rồi khai báo một dòng ở đây
    photos: [],
    layout: 'single',
  },
]

export const FINALE = {
  title: 'Chúc mừng sinh nhật Gia Hân!',
  message: 'Cảm ơn vì đã đến với gia đình.',
  signature: 'Bố & Mẹ',
} as const
