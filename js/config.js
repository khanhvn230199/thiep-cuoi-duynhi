/**
 * TOÀN BỘ NỘI DUNG THIỆP CƯỚI — CHỈ CẦN SỬA TRONG FILE NÀY.
 * Sửa xong, mở lại index.html là thấy thay đổi ngay, không cần đụng tới
 * các file html/css/js khác.
 */
const WEDDING_CONFIG = {
  // Chữ lồng / monogram hiển thị ở trang bìa, ví dụ "G & L"
  monogram: "G & L",

  groom: {
    name: "Gia Bảo",                 // tên gọi ngắn, hiển thị ở các tiêu đề
    fullName: "Nguyễn Gia Bảo",       // họ tên đầy đủ
    photo: "assets/images/groom.svg",
    bio: "Người sẽ nắm tay em đi qua mọi mùa mưa nắng.",
  },

  bride: {
    name: "Thùy Linh",
    fullName: "Trần Thùy Linh",
    photo: "assets/images/bride.svg",
    bio: "Người con gái khiến anh tin vào chuyện cổ tích có thật.",
  },

  // Ảnh bìa trang mở đầu
  coverPhoto: "assets/images/cover-bg.svg",

  // Ngày giờ tổ chức tiệc cưới — viết theo chuẩn ISO: "YYYY-MM-DDTHH:mm:00+07:00"
  // Thứ trong tuần sẽ được website TỰ ĐỘNG tính ra từ ngày này.
  weddingDateTime: "2027-02-14T11:00:00+07:00",

  // Dòng chữ ngày âm lịch (ghi tay vì JS không tự quy đổi âm lịch)
  lunarDateText: "Nhằm ngày mùng 9 tháng Giêng năm Đinh Mùi",

  venue: {
    name: "Trung Tâm Tiệc Cưới Hoa Hồng",
    address: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    // Lấy link này bằng cách: vào Google Maps > tìm địa điểm > Chia sẻ > Sao chép liên kết
    mapUrl: "https://maps.google.com/?q=Nguy%E1%BB%85n+Hu%E1%BB%87+Qu%E1%BA%ADn+1+TP+HCM",
  },

  groomFamily: {
    title: "Nhà Trai",
    father: "Ông Nguyễn Văn A",
    mother: "Bà Lê Thị B",
    address: "Hà Nội",
  },

  brideFamily: {
    title: "Nhà Gái",
    father: "Ông Trần Văn C",
    mother: "Bà Phạm Thị D",
    address: "TP. Hồ Chí Minh",
  },

  invitationText:
    "Trân trọng kính mời đến dự tiệc cưới của chúng tôi. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình hai họ.",

  // Lịch trình của buổi tiệc
  schedule: [
    { time: "10:30", icon: "🚗", title: "Đón khách", desc: "Đón tiếp quan khách, chụp ảnh lưu niệm cùng cô dâu chú rể." },
    { time: "11:00", icon: "💍", title: "Lễ thành hôn", desc: "Nghi lễ chính thức ra mắt hai họ." },
    { time: "11:30", icon: "🥂", title: "Khai tiệc", desc: "Nâng ly chúc mừng hạnh phúc đôi uyên ương." },
    { time: "12:30", icon: "💌", title: "Giao lưu", desc: "Cô dâu chú rể đến từng bàn gửi lời cảm ơn quan khách." },
  ],

  // Ảnh trong album, thêm/bớt tuỳ ý
  gallery: [
    "assets/images/gallery-1.svg",
    "assets/images/gallery-2.svg",
    "assets/images/gallery-3.svg",
    "assets/images/gallery-4.svg",
    "assets/images/gallery-5.svg",
    "assets/images/gallery-6.svg",
    "assets/images/gallery-7.svg",
    "assets/images/gallery-8.svg",
  ],

  // Thông tin chuyển khoản mừng cưới — mã BIN ngân hàng tra tại https://api.vietqr.io/v2/banks
  gifts: {
    groom: {
      label: "Chú Rể",
      bankName: "Vietcombank",
      bin: "970436",
      accountNo: "0123456789",
      accountName: "NGUYEN GIA BAO",
    },
    bride: {
      label: "Cô Dâu",
      bankName: "MB Bank",
      bin: "970422",
      accountNo: "9876543210",
      accountName: "TRAN THUY LINH",
    },
  },

  // Nhạc nền — để trống chuỗi "" nếu chưa có nhạc, nút nhạc sẽ tự ẩn
  musicSrc: "",

  // Link Google Apps Script Web App để lời chúc/RSVP tự động ghi vào Google Sheet
  // của bạn. Làm theo hướng dẫn trong file google-apps-script.gs rồi dán link vào đây.
  // Để trống "" thì lời chúc chỉ hiện tạm trên máy khách, KHÔNG gửi về cho bạn.
  guestbookEndpoint: "",

  thankYouMessage:
    "Cảm ơn bạn đã dành thời gian đọc thiệp cưới của chúng tôi. Sự hiện diện của bạn chính là món quà ý nghĩa nhất!",
};
