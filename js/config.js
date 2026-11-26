/**
 * TOÀN BỘ NỘI DUNG THIỆP CƯỚI — CHỈ CẦN SỬA TRONG FILE NÀY.
 * Sửa xong, mở lại index.html là thấy thay đổi ngay, không cần đụng tới
 * các file html/css/js khác.
 */
const WEDDING_CONFIG = {
  // Chữ lồng / monogram hiển thị ở trang bìa, ví dụ "D & N"
  monogram: "D & N",

  groom: {
    name: "Hải Duy",                 // tên gọi ngắn, hiển thị ở các tiêu đề
    fullName: "Trần Hải Duy",         // họ tên đầy đủ
    photo: "assets/images/3.jpg",
    bio: "Người sẽ nắm tay em đi qua mọi mùa mưa nắng.",
  },

  bride: {
    name: "Ngọc Nhi",
    fullName: "Nguyễn Ngọc Nhi",
    photo: "assets/images/2.jpg",
    bio: "Người con gái khiến anh tin vào chuyện cổ tích có thật.",
  },

  // Ảnh bìa trang mở đầu
  coverPhoto: "assets/images/1.jpg",

  // Đám cưới có lễ riêng theo từng bên (nhà trai / nhà gái), nên khai báo thành
  // 2 nhóm — khách xem thiệp bấm tab "Nhà Trai" / "Nhà Gái" để xem đúng lịch
  // trình bên đó. Ngày giờ sớm nhất trong TẤT CẢ các lễ dùng để tính đếm ngược
  // và tô đậm trên lịch (các ngày có sự kiện đều được tô đậm).
  // Mỗi lễ có "lunarText" riêng (ghi tay vì JS không tự quy đổi âm lịch) vì
  // Bữa Cơm Thân Mật và Lễ Thành Hôn/Vu Quy không cùng một ngày âm.
  eventsBySide: {
    groom: {
      tabLabel: "Nhà Trai",
      items: [
        {
          label: "Bữa Cơm Thân Mật",
          dateTime: "2026-12-05T17:00:00+07:00",
          lunarText: "Tức ngày 27 tháng 10 năm Bính Ngọ",
          venueName: "Tư Gia Nhà Trai",
          address: "Thôn Đại Tảo, xã Việt Đoàn, huyện Tiên Du, Bắc Ninh",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent("Thôn Đại Tảo, xã Việt Đoàn, huyện Tiên Du, Bắc Ninh"),
        },
        {
          label: "Lễ Thành Hôn",
          dateTime: "2026-12-06T14:00:00+07:00",
          lunarText: "Tức ngày 28 tháng 10 năm Bính Ngọ",
          venueName: "Tư Gia Nhà Trai",
          address: "Thôn Đại Tảo, xã Việt Đoàn, huyện Tiên Du, Bắc Ninh",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent("Thôn Đại Tảo, xã Việt Đoàn, huyện Tiên Du, Bắc Ninh"),
        },
      ],
    },
    bride: {
      tabLabel: "Nhà Gái",
      items: [
        {
          label: "Bữa Cơm Thân Mật",
          dateTime: "2026-12-05T17:00:00+07:00",
          lunarText: "Tức ngày 27 tháng 10 năm Bính Ngọ",
          venueName: "Tư Gia Nhà Gái",
          address: "Thôn Ngô Xá, xã Phật Tích, huyện Tiên Du, Bắc Ninh",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent("Thôn Ngô Xá, xã Phật Tích, huyện Tiên Du, Bắc Ninh"),
        },
        {
          label: "Lễ Vu Quy",
          dateTime: "2026-12-06T13:00:00+07:00",
          lunarText: "Tức ngày 28 tháng 10 năm Bính Ngọ",
          venueName: "Tư Gia Nhà Gái",
          address: "Thôn Ngô Xá, xã Phật Tích, huyện Tiên Du, Bắc Ninh",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent("Thôn Ngô Xá, xã Phật Tích, huyện Tiên Du, Bắc Ninh"),
        },
      ],
    },
  },

  groomFamily: {
    title: "Nhà Trai",
    father: "Ông Trần Văn Dinh",
    mother: "Bà Ngô Thị Hương",
  },

  brideFamily: {
    title: "Nhà Gái",
    father: "Ông Nguyễn Tiến Trí",
    mother: "Bà Đỗ Thị Lý",
  },

  invitationText:
    "Trân trọng kính mời quý khách tới dự bữa cơm thân mật, chung vui cùng gia đình chúng tôi. Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi!",

  // Lịch trình chung cả 2 ngày — khớp với các lễ khai báo trong eventsBySide ở trên
  schedule: [
    { time: "05/12, 17:00", icon: "🍽️", title: "Bữa Cơm Thân Mật", desc: "Tổ chức riêng tại tư gia mỗi bên vào tối hôm trước." },
    { time: "06/12, 13:00", icon: "🌸", title: "Lễ Vu Quy", desc: "Diễn ra tại tư gia nhà gái - Thôn Ngô Xá, xã Phật Tích, huyện Tiên Du, Bắc Ninh." },
    { time: "06/12, 14:00", icon: "💍", title: "Lễ Thành Hôn", desc: "Diễn ra tại tư gia nhà trai - Thôn Đại Tảo, xã Việt Đoàn, huyện Tiên Du, Bắc Ninh." },
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
  // SỬA accountNo bằng số tài khoản THẬT của bạn trước khi gửi thiệp cho khách!
  gifts: {
    groom: {
      label: "Chú Rể",
      bankName: "Vietcombank",
      bin: "970436",
      accountNo: "0123456789",
      accountName: "TRAN HAI DUY",
    },
    bride: {
      label: "Cô Dâu",
      bankName: "MB Bank",
      bin: "970422",
      accountNo: "9876543210",
      accountName: "NGUYEN NGOC NHI",
    },
  },

  // Nhạc nền — để trống chuỗi "" nếu chưa có nhạc, nút nhạc sẽ tự ẩn
  musicSrc: "assets/music/background.mp3",

  // Link Google Apps Script Web App để lời chúc/RSVP tự động ghi vào Google Sheet
  // của bạn. Làm theo hướng dẫn trong file google-apps-script.gs rồi dán link vào đây.
  // Để trống "" thì lời chúc chỉ hiện tạm trên máy khách, KHÔNG gửi về cho bạn.
  guestbookEndpoint: "",

  thankYouMessage:
    "Cảm ơn bạn đã dành thời gian đọc thiệp cưới của chúng tôi. Sự hiện diện của bạn chính là món quà ý nghĩa nhất!",
};
