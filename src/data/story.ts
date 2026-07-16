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
    title: 'Khoảnh khắc con chào đời',
    subtitle: '16 tháng 7, 2024',
    body: [
      'Đêm ấy, thế giới của bố mẹ bỗng thu bé lại vừa bằng tiếng khóc đầu đời và hơi thở ấm áp của con.',
      'Từ khoảnh khắc con nắm lấy tay bố, mọi định nghĩa về hạnh phúc của gia đình mình đều bắt đầu từ con.',
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
      'Khoảnh khắc con mỉm cười rạng rỡ, bố mẹ hiểu được rằng: Hóa ra hạnh phúc chỉ đơn giản thế thôi',
    ],
    photos: [
      { src: '/photos/nu-cuoi-1.jpg', caption: 'Lần đầu tiên con cười' },
      { src: '/photos/nu-cuoi-2.jpg', caption: 'Khi con tròn 1 tháng' },
    ],
    layout: 'duo',
  },
  {
    id: 'thich-choi',
    index: '03',
    title: 'Thích khám phá cả thế giới',
    subtitle: 'Cái gì con cũng muốn biết',
    body: [
      'Lần đầu con biết bò, biết đi, biết chạy và những lần con vấp ngã.',
      'Cái gì đối với con cũng lạ và đầy sự tò mò — và bố mẹ chỉ biết đứng nhìn con khám phá thế giới.',
    ],
    photos: [
      { src: '/photos/thich-choi-1.jpg', caption: 'Cái này là cái gì nhỉ?' },
      { src: '/photos/thich-choi-2.jpg', caption: 'Nghiên cứu rất kỹ' },
      { src: '/photos/thich-choi-3.jpg', caption: 'Chơi cả ngày không chán' },
      { src: '/photos/thich-choi-4.jpg', caption: 'Tò mò mọi thứ' },
      { src: '/photos/thich-choi-5.jpg', caption: 'Say sưa khám phá' },
      { src: '/photos/thich-choi-6.jpg', caption: 'Vui đủ trò' },
      { src: '/photos/thich-choi-7.jpg', caption: 'Nghịch một chút cũng đáng yêu' },
      { src: '/photos/thich-choi-8.jpg', caption: 'Lúc nào cũng bận rộn' },
    ],
    layout: 'grid',
  },
  {
    id: 'chuyen-di',
    index: '04',
    title: 'Những chuyến đi xa, những trải nghiệm đầy lý thú',
    subtitle: 'Thế giới rộng lớn ngoài kia',
    body: [
      'Với con, mọi nơi trên thế giới này đều thật đẹp và kỳ diệu.',
      'Với bố mẹ, những nơi có con đồng hành cùng đều thật ý nghĩa.',
    ],
    photos: [
      { src: '/photos/chuyen-di-1.jpg', caption: 'Lên đường, hành trình bắt đầu' },
      { src: '/photos/chuyen-di-3.jpg', caption: 'Ở sân bay chờ chuyến bay' },
      { src: '/photos/chuyen-di-2.jpg', caption: 'Mùa hoa anh đào đầu tiên' },
      { src: '/photos/chuyen-di-6.jpg', caption: 'Lần đầu gặp bạn cừu' },
      { src: '/photos/chuyen-di-7.jpg', caption: 'Chú nai hiền ở công viên' },
      { src: '/photos/chuyen-di-5.jpg', caption: 'Về quê thăm vườn cùng bố' },
    ],
    layout: 'grid',
  },
  {
    id: 'di-hoc',
    index: '05',
    title: 'Ngày đầu tiên đến trường',
    subtitle: 'Cô bé lớn của bố mẹ',
    body: [
      'Thật vui khi ngày đầu đến trường với con không khiến bố mẹ quá lo lắng.',
      'Con đầy vui vẻ và háo hức với trường mới, cô mới, bạn bè mới và những bài học mới!',
    ],
    photos: [
      { src: '/photos/di-hoc-1.jpg', caption: 'Theo cô vào lớp' },
      { src: '/photos/di-hoc-2.jpg', caption: 'Ngày đầu đến trường' },
      { src: '/photos/di-hoc-3.jpg', caption: 'Làm quen bạn mới' },
      { src: '/photos/di-hoc-4.jpg', caption: 'Cô bé lớn rồi' },
    ],
    layout: 'grid',
  },
  {
    id: 'yeu-thuong',
    index: '06',
    title: 'Được mọi người yêu thương',
    subtitle: 'Gia đình mình',
    body: [
      'Thật may mắn khi con được sinh ra trong ngôi nhà tràn ngập sự yêu thương.',
      'Trong mắt mọi người, con luôn là đứa cháu bé bỏng và đáng yêu.',
    ],
    photos: [
      { src: '/photos/yeu-thuong-1.jpg', caption: 'Trong vòng tay gia đình' },
      { src: '/photos/yeu-thuong-2.jpg', caption: 'Người thương con nhất' },
      { src: '/photos/yeu-thuong-3.jpg', caption: 'Luôn có người bên cạnh' },
      { src: '/photos/yeu-thuong-4.jpg', caption: 'Cả nhà mình' },
    ],
    layout: 'grid',
  },
  {
    id: 'sinh-nhat',
    index: '07',
    title: 'Sinh nhật hôm nay',
    subtitle: 'Gia Hân tròn 2 tuổi rồi!',
    body: [
      'Hai năm trôi qua nhanh như một cái chớp mắt. Nhìn con gái yêu của bố mẹ ngày một khôn lớn, bố mẹ cảm thấy thật bồi hồi và xao xuyến.',
      'Mong rằng, tuổi mới con ngày càng ăn ngoan chóng lớn, luôn là niềm tự hào của bố mẹ.',
    ],
    photos: [
      { src: '/photos/sinh-nhat-3.jpg', caption: 'Gia Hân 2 tuổi' },
      { src: '/photos/sinh-nhat-2.jpg', caption: 'Xinh xắn đáng yêu' },
      { src: '/photos/sinh-nhat-4.jpg', caption: 'Nụ cười rạng rỡ' },
      { src: '/photos/sinh-nhat-1.jpg', caption: 'Sinh nhật đầu tiên của con' },
    ],
    layout: 'grid',
  },
]

export const FINALE = {
  title: 'Chúc mừng sinh nhật con, Gia Hân!',
  message: 'Cảm ơn vì đã đến với gia đình.',
  signature: 'Bố & Mẹ',
} as const
