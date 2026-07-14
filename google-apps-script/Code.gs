/**
 * KHO LƯU LỜI CHÚC — dán toàn bộ file này vào Google Apps Script.
 * Hướng dẫn cài đặt từng bước nằm trong README.md, mục "Sổ lưu bút".
 *
 * Nhiệm vụ của script:
 *   - Nhận lời chúc từ trang web và ghi thành một dòng trong Google Sheets.
 *   - Trả về danh sách lời chúc để trang web hiển thị.
 *
 * QUAN TRỌNG: thư gửi tuổi 18 được niêm phong — script KHÔNG BAO GIỜ trả nội dung
 * thư đó về cho trang web (chỉ trả tên người gửi), nên không ai đọc trộm được
 * bằng cách xem mã nguồn trang. Nội dung thư chỉ nằm trong Sheets của bạn.
 */

const SHEET_NAME = 'LoiChuc'
const MAX_NAME = 60
const MAX_MESSAGE = 2000

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(['Thời gian', 'Loại', 'Tên người gửi', 'Lời nhắn', 'Đã duyệt'])
    sheet.setFrozenRows(1)
  }
  return sheet
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}

/** Trang web gọi hàm này để LẤY danh sách lời chúc hiển thị lên trang */
function doGet() {
  try {
    const sheet = getSheet()
    const rows = sheet.getDataRange().getValues().slice(1) // bỏ dòng tiêu đề

    const items = rows
      .filter(function (r) {
        // Bỏ qua dòng trống và dòng bạn đã đánh dấu "x" ở cột "Đã duyệt" để ẩn đi
        const hidden = String(r[4] || '').trim().toLowerCase()
        return r[2] && hidden !== 'an' && hidden !== 'ẩn'
      })
      .map(function (r) {
        const isLetter = String(r[1]).trim() === 'thu18'
        return {
          date: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
          type: isLetter ? 'thu18' : 'chuc',
          name: String(r[2]).slice(0, MAX_NAME),
          // Thư tuổi 18: giữ kín nội dung, chỉ trả về chuỗi rỗng
          message: isLetter ? '' : String(r[3]).slice(0, MAX_MESSAGE),
        }
      })
      .reverse() // mới nhất lên đầu

    return json({ ok: true, items: items })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

/** Trang web gọi hàm này để GỬI một lời chúc mới */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    const name = String(data.name || '').trim().slice(0, MAX_NAME)
    const message = String(data.message || '').trim().slice(0, MAX_MESSAGE)
    const type = data.type === 'thu18' ? 'thu18' : 'chuc'

    if (!name || !message) {
      return json({ ok: false, error: 'Thiếu tên hoặc lời nhắn' })
    }

    getSheet().appendRow([new Date(), type, name, message, ''])
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}
