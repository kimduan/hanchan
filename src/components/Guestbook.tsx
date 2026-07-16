import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GUESTBOOK_URL } from '../config'
import { BABY } from '../data/story'

type Entry = {
  date: string
  type: 'chuc' | 'thu18'
  name: string
  message: string
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const NOTE_TILTS = [-2, 1.5, -1, 2, -1.5, 1]
const NOTE_COLORS = [
  'from-violet-200 to-violet-300',
  'from-rose-300 to-rose-400',
  'from-amber-100 to-amber-200',
  'from-sky-200 to-sky-300',
]

/** Mẩu giấy nhắn dán trên nền trời — một lời chúc gửi hôm nay */
function WishNote({ entry, i }: { entry: Entry; i: number }) {
  return (
    <motion.li
      className={`bg-gradient-to-br ${NOTE_COLORS[i % NOTE_COLORS.length]} rounded-sm p-4 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)]`}
      style={{ rotate: `${NOTE_TILTS[i % NOTE_TILTS.length]}deg` }}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: Math.min(i, 5) * 0.08 }}
    >
      <p className="text-sm leading-relaxed break-words whitespace-pre-wrap text-night-900/85">
        {entry.message}
      </p>
      <p className="mt-3 text-right font-script text-lg text-night-900/70">— {entry.name}</p>
    </motion.li>
  )
}

export default function Guestbook() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState<'chuc' | 'thu18'>('chuc')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const load = useCallback(async () => {
    if (!GUESTBOOK_URL) {
      setLoading(false)
      return
    }
    try {
      const res = await fetch(GUESTBOOK_URL)
      const data = await res.json()
      if (data.ok) setEntries(data.items as Entry[])
    } catch {
      // Không tải được thì để danh sách trống, form vẫn dùng được
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim() || !GUESTBOOK_URL) return

    setStatus('sending')
    try {
      await fetch(GUESTBOOK_URL, {
        method: 'POST',
        // Apps Script không xử lý được preflight CORS, nên gửi dạng text/plain
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), type }),
      })
      setStatus('sent')
      setName('')
      setMessage('')
      void load()
    } catch {
      setStatus('error')
    }
  }

  // Thư gửi tuổi 18 được giữ kín trong Google Sheets, không hiển thị ra trang
  const wishes = entries.filter((e) => e.type === 'chuc')

  return (
    <section id="loi-chuc" className="relative px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9 }}
        >
          <span className="mb-4 inline-flex items-center gap-2.5 text-xs tracking-[0.3em] text-violet-300/60 uppercase">
            <span className="h-px w-8 bg-violet-300/30" />
            Sổ lưu bút
            <span className="h-px w-8 bg-violet-300/30" />
          </span>
          <h2
            className="font-script text-4xl text-transparent sm:text-6xl"
            style={{
              backgroundImage: 'linear-gradient(120deg, #ffffff 0%, #fef3c7 50%, #fde68a 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            Gửi lời tới Gia Hân
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed font-light text-violet-50/80">
            Chúc mừng sinh nhật bé hôm nay, hoặc viết một lá thư niêm phong để
            {' '}{BABY.shortName} đọc vào ngày tròn 18 tuổi.
          </p>
        </motion.div>

        {/* Form gửi */}
        <motion.form
          onSubmit={submit}
          className="mx-auto mb-16 max-w-xl rounded-2xl border border-violet-300/15 bg-night-800/50 p-5 backdrop-blur-md sm:p-7"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Chọn kiểu lời nhắn */}
          <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-night-900/60 p-1">
            {(
              [
                { key: 'chuc', label: 'Lời chúc hôm nay' },
                { key: 'thu18', label: 'Thư gửi tuổi 18' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setType(opt.key)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  type === opt.key
                    ? 'bg-violet-500/80 text-white shadow-md'
                    : 'text-violet-200/60 hover:text-violet-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="mb-5 text-center text-xs leading-relaxed text-violet-300/50">
            {type === 'chuc'
              ? 'Lời chúc sẽ hiện ngay bên dưới cho cả nhà cùng đọc.'
              : '🔒 Thư được niêm phong. Chỉ hiện tên bạn, không ai đọc được nội dung — kể cả khi xem mã nguồn trang. Gia Hân sẽ đọc vào sinh nhật 18 tuổi.'}
          </p>

          <label className="mb-1.5 block text-xs tracking-wider text-violet-200/60 uppercase">
            Tên của bạn
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            required
            placeholder="Ví dụ: Bà ngoại, Cô Lan, Chú Nam..."
            className="mb-4 w-full rounded-lg border border-violet-300/20 bg-night-900/60 px-4 py-3 text-violet-50 placeholder:text-violet-300/30 focus:border-violet-400/60 focus:outline-none"
          />

          <label className="mb-1.5 block text-xs tracking-wider text-violet-200/60 uppercase">
            {type === 'chuc' ? 'Lời chúc' : 'Lá thư gửi Gia Hân năm 18 tuổi'}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={2000}
            required
            rows={type === 'chuc' ? 3 : 6}
            placeholder={
              type === 'chuc'
                ? 'Chúc con hay ăn chóng lớn...'
                : 'Gia Hân của năm 2042, khi con đọc những dòng này...'
            }
            className="w-full resize-none rounded-lg border border-violet-300/20 bg-night-900/60 px-4 py-3 leading-relaxed text-violet-50 placeholder:text-violet-300/30 focus:border-violet-400/60 focus:outline-none"
          />

          <button
            type="submit"
            disabled={status === 'sending' || !GUESTBOOK_URL}
            className="mt-5 w-full rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === 'sending' ? 'Đang gửi...' : type === 'chuc' ? 'Gửi lời chúc' : 'Niêm phong lá thư'}
          </button>

          {!GUESTBOOK_URL && (
            <p className="mt-4 text-center text-xs leading-relaxed text-amber-300/70">
              Chưa kết nối kho lưu trữ. Xem README, mục “Sổ lưu bút” để bật tính năng này.
            </p>
          )}
          {status === 'sent' && (
            <p className="mt-4 text-center text-sm text-emerald-300/90">
              Đã gửi. Cảm ơn bạn rất nhiều! 💜
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-center text-sm text-rose-300/90">
              Gửi không thành công, bạn thử lại giúp nhé.
            </p>
          )}
        </motion.form>

        {/* Những lời chúc hôm nay */}
        {!loading && wishes.length > 0 && (
          <div className="mb-20">
            <h3 className="mb-8 text-center text-xs tracking-[0.3em] text-violet-300/50 uppercase">
              {wishes.length} lời chúc gửi tới Gia Hân
            </h3>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wishes.map((entry, i) => (
                <WishNote key={`${entry.date}-${i}`} entry={entry} i={i} />
              ))}
            </ul>
          </div>
        )}

      </div>
    </section>
  )
}
