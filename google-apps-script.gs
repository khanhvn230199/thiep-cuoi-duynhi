/**
 * HƯỚNG DẪN DÙNG FILE NÀY (làm 1 lần, mất khoảng 5 phút):
 *
 * 1. Vào https://sheets.google.com → Tạo trang tính (Google Sheet) mới.
 *    Ở hàng 1, gõ các tiêu đề cột theo đúng thứ tự:
 *    Thời gian | Họ tên | SĐT | Tham dự | Số khách | Lời chúc
 *
 * 2. Trên thanh menu của Sheet: Tiện ích mở rộng (Extensions) → Apps Script.
 *
 * 3. Xoá hết đoạn code mẫu (myFunction...) đang có sẵn, dán TOÀN BỘ nội dung
 *    file này vào thay thế.
 *
 * 4. Bấm nút "Triển khai" / "Deploy" (góc trên bên phải) → "Triển khai mới" / "New deployment".
 *    - Loại (Select type): chọn biểu tượng bánh răng → "Ứng dụng web" / "Web app"
 *    - Thực thi với tư cách (Execute as): Tôi (Me)
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)
 *    Bấm "Triển khai" / "Deploy", rồi bấm "Ủy quyền quyền truy cập" (Authorize access)
 *    và chọn tài khoản Google của bạn (Google sẽ cảnh báo "ứng dụng chưa xác minh",
 *    cứ bấm "Advanced" → "Go to ... (unsafe)" vì đây là script do chính bạn viết).
 *
 * 5. Sau khi triển khai xong, Google cho bạn một đường link dạng:
 *    https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXX/exec
 *    Copy link đó.
 *
 * 6. Mở file js/config.js trong project, dán link vào biến `guestbookEndpoint`.
 *
 * Xong! Từ giờ mỗi khi khách gửi lời chúc trên thiệp, một dòng mới sẽ tự động
 * xuất hiện trong Google Sheet của bạn.
 *
 * Lưu ý: nếu sau này bạn SỬA lại code này trong Apps Script, phải bấm
 * "Triển khai" → "Quản lý triển khai" → sửa deployment hiện có và bấm Deploy lại,
 * nếu không link cũ sẽ không chạy bản code mới.
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.attend === "yes" ? "Tham dự" : "Không tham dự",
    data.guests || "",
    data.message || "",
  ]);

  return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Dùng để kiểm tra nhanh: mở link .../exec trên trình duyệt sẽ thấy dòng chữ này.
function doGet() {
  return ContentService.createTextOutput("Guestbook endpoint đang hoạt động bình thường.");
}
