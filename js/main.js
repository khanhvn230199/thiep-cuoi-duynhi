(function () {
  "use strict";

  const CFG = WEDDING_CONFIG;
  const ALL_EVENTS = Object.values(CFG.eventsBySide).flatMap((side) => side.items);
  // Lễ chính (Thành Hôn / Vu Quy) luôn diễn ra sau cùng (sau Bữa Cơm Thân Mật tối
  // hôm trước), nên dùng ngày giờ MUỘN NHẤT để hiển thị "ngày cưới" ở trang bìa
  // và đếm ngược — còn tô lịch vẫn tính trên tất cả các lễ ở dưới.
  const mainEvent = ALL_EVENTS.reduce((latest, ev) =>
    new Date(ev.dateTime) > new Date(latest.dateTime) ? ev : latest
  );
  const weddingDate = new Date(mainEvent.dateTime);

  const fmtFull = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const fmtTime = new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit" });

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ---------- Dữ liệu phẳng để bind vào [data-bind] ----------
  const BIND_DATA = {
    monogram: CFG.monogram,
    groomName: CFG.groom.name,
    brideName: CFG.bride.name,
    groomFullName: CFG.groom.fullName,
    brideFullName: CFG.bride.fullName,
    groomBio: CFG.groom.bio,
    brideBio: CFG.bride.bio,
    weddingDateFull: capitalize(fmtFull.format(weddingDate)),
    weddingDateLunar: mainEvent.lunarText ? `(${mainEvent.lunarText})` : "",
    invitationText: CFG.invitationText,
    groomFamilyTitle: CFG.groomFamily.title,
    groomFather: CFG.groomFamily.father,
    groomMother: CFG.groomFamily.mother,
    groomChildLine: `Chú rể: ${CFG.groom.fullName}`,
    brideFamilyTitle: CFG.brideFamily.title,
    brideFather: CFG.brideFamily.father,
    brideMother: CFG.brideFamily.mother,
    brideChildLine: `Cô dâu: ${CFG.bride.fullName}`,
    thankYouMessage: CFG.thankYouMessage,
  };

  function bindText() {
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const key = el.getAttribute("data-bind");
      if (key in BIND_DATA) el.textContent = BIND_DATA[key];
    });
  }

  function bindImages() {
    const IMG_DATA = { groomPhoto: CFG.groom.photo, bridePhoto: CFG.bride.photo };
    document.querySelectorAll("[data-bind-src]").forEach((el) => {
      const key = el.getAttribute("data-bind-src");
      if (key in IMG_DATA) el.src = IMG_DATA[key];
    });
  }

  // Gộp các lễ chung một địa điểm vào chung 1 thẻ, để không lặp lại địa chỉ
  // và nút "Chỉ Đường" nhiều lần (ví dụ Bữa Cơm Thân Mật và Lễ Thành Hôn cùng
  // tổ chức tại tư gia nhà trai).
  function groupEventsByVenue(items) {
    const groups = [];
    items.forEach((ev) => {
      const key = `${ev.venueName}|${ev.address}`;
      let group = groups.find((g) => g.key === key);
      if (!group) {
        group = { key, venueName: ev.venueName, address: ev.address, mapUrl: ev.mapUrl, items: [] };
        groups.push(group);
      }
      group.items.push(ev);
    });
    return groups;
  }

  function renderEventList(sideKey) {
    const side = CFG.eventsBySide[sideKey];
    const list = document.getElementById("eventList");
    list.innerHTML = groupEventsByVenue(side.items)
      .map((group) => {
        const slots = group.items
          .map(
            (ev, i, arr) => `
            <div class="event__slot">
              <p class="event__slot-label">${ev.label}</p>
              <p class="event__slot-time">${fmtTime.format(new Date(ev.dateTime))}</p>
              <p class="event__slot-date">${capitalize(fmtFull.format(new Date(ev.dateTime)))}</p>
              ${ev.lunarText ? `<p class="event__slot-lunar">${ev.lunarText}</p>` : ""}
            </div>${i < arr.length - 1 ? '<div class="event__slot-sep">↓</div>' : ""}`
          )
          .join("");
        return `
        <div class="event__card">
          <p class="event__formal-invite">Trân trọng kính mời: <span class="event__invite-blank"></span></p>
          <p class="event__formal-sub">Tới dự buổi tiệc chung vui cùng gia đình chúng tôi</p>
          <div class="event__slots">${slots}</div>
          <p class="event__venue-name">${group.venueName}</p>
          <p class="event__venue-address">${group.address}</p>
          <a class="btn btn--primary" href="${group.mapUrl}" target="_blank" rel="noopener">Chỉ Đường</a>
        </div>`;
      })
      .join("");
  }

  // Tab Nhà Trai/Nhà Gái dùng chung cho cả khối "Thông Tin Buổi Lễ" và
  // "Hộp Mừng Cưới" bên dưới, bấm 1 lần đổi cả 2.
  function selectSide(sideKey) {
    renderEventList(sideKey);
    renderGift(sideKey);
    document
      .querySelectorAll("#eventTabs .tab-btn")
      .forEach((btn) => btn.classList.toggle("is-active", btn.dataset.side === sideKey));
  }

  function setupEvents() {
    const tabs = document.getElementById("eventTabs");
    tabs.innerHTML = Object.entries(CFG.eventsBySide)
      .map(([key, side]) => `<button type="button" class="tab-btn" data-side="${key}">${side.tabLabel}</button>`)
      .join("");
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-side]");
      if (!btn) return;
      selectSide(btn.getAttribute("data-side"));
    });
    selectSide(Object.keys(CFG.eventsBySide)[0]);
  }

  // ---------- Mở thiệp ----------
  function setupCover() {
    const cover = document.getElementById("cover");
    const main = document.getElementById("main");
    const btn = document.getElementById("openInvitationBtn");
    btn.addEventListener("click", () => {
      cover.classList.add("is-closing");
      main.hidden = false;
      document.body.style.overflow = "auto";
      const music = document.getElementById("bgMusic");
      if (CFG.musicSrc) {
        music.play().catch(() => {});
      }
      setTimeout(() => (cover.hidden = true), 850);
    });
    document.body.style.overflow = "hidden";
  }

  // ---------- Đếm ngược ----------
  function setupCountdown() {
    const els = {
      days: document.getElementById("cd-days"),
      hours: document.getElementById("cd-hours"),
      mins: document.getElementById("cd-mins"),
      secs: document.getElementById("cd-secs"),
    };
    function pad(n) { return String(n).padStart(2, "0"); }
    function tick() {
      const diff = weddingDate.getTime() - Date.now();
      if (diff <= 0) {
        els.days.textContent = els.hours.textContent = els.mins.textContent = els.secs.textContent = "00";
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      els.days.textContent = pad(days);
      els.hours.textContent = pad(hours);
      els.mins.textContent = pad(mins);
      els.secs.textContent = pad(secs);
    }
    tick();
    setInterval(tick, 1000);
  }

  // ---------- Album ảnh + Lightbox ----------
  // activeImages/currentIndex dùng chung cho cả album ảnh cưới và 2 ảnh ở
  // phần "Chuyện Tình Của Chúng Tôi" — bấm ảnh nào thì lightbox mở đúng bộ đó.
  let activeImages = [];
  let currentIndex = 0;

  function setupGallery() {
    const grid = document.getElementById("galleryGrid");
    grid.innerHTML = CFG.gallery
      .map((src, i) => `<img src="${src}" alt="Ảnh cưới ${i + 1}" data-index="${i}" loading="lazy" />`)
      .join("");
    grid.addEventListener("click", (e) => {
      const target = e.target.closest("img[data-index]");
      if (!target) return;
      openLightbox(CFG.gallery, Number(target.getAttribute("data-index")));
    });
  }

  function setupStoryPhotos() {
    const storyImages = [CFG.groom.photo, CFG.bride.photo];
    document.querySelectorAll(".story-card img").forEach((img, i) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => openLightbox(storyImages, i));
    });
  }

  function openLightbox(images, index) {
    activeImages = images;
    currentIndex = index;
    renderLightbox();
    document.getElementById("lightbox").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    document.getElementById("lightbox").hidden = true;
    document.body.style.overflow = "auto";
  }
  function renderLightbox() {
    document.getElementById("lightboxImage").src = activeImages[currentIndex];
    document.getElementById("lightboxCounter").textContent = `${currentIndex + 1} / ${activeImages.length}`;
  }
  function setupLightboxControls() {
    document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
    document.getElementById("lightboxPrev").addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
      renderLightbox();
    });
    document.getElementById("lightboxNext").addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % activeImages.length;
      renderLightbox();
    });
    document.addEventListener("keydown", (e) => {
      const lb = document.getElementById("lightbox");
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
      if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
    });
  }

  // ---------- Lịch tháng cưới ----------
  function setupCalendar() {
    const card = document.getElementById("calendarCard");
    const year = weddingDate.getFullYear();
    const month = weddingDate.getMonth();
    const eventDays = new Set(
      ALL_EVENTS.filter((ev) => {
        const d = new Date(ev.dateTime);
        return d.getFullYear() === year && d.getMonth() === month;
      }).map((ev) => new Date(ev.dateTime).getDate())
    );
    const monthLabel = capitalize(
      new Intl.DateTimeFormat("vi-VN", { month: "long", year: "numeric" }).format(weddingDate)
    );

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // Thứ 2 = 0 ... Chủ nhật = 6
    const startOffset = (firstDay.getDay() + 6) % 7;

    let cells = "";
    for (let i = 0; i < startOffset; i++) cells += `<div class="day"></div>`;
    for (let d = 1; d <= daysInMonth; d++) {
      const highlight = eventDays.has(d) ? "day--highlight" : "";
      cells += `<div class="day ${highlight}">${d}</div>`;
    }

    card.innerHTML = `
      <p class="calendar__month">${monthLabel}</p>
      <div class="calendar__grid">
        <div class="dow">T2</div><div class="dow">T3</div><div class="dow">T4</div>
        <div class="dow">T5</div><div class="dow">T6</div><div class="dow">T7</div><div class="dow">CN</div>
        ${cells}
      </div>`;
  }

  // ---------- Lịch trình ----------
  function setupTimeline() {
    const list = document.getElementById("timelineList");
    list.innerHTML = CFG.schedule
      .map(
        (item) => `
      <li>
        <span class="timeline__icon">${item.icon}</span>
        <div>
          <p class="timeline__time">${item.time}</p>
          <p class="timeline__title">${item.title}</p>
          <p class="timeline__desc">${item.desc}</p>
        </div>
      </li>`
      )
      .join("");
  }

  // ---------- Sổ lưu bút (lưu trong trình duyệt của khách) ----------
  const STORAGE_KEY = "wedding_guestbook_messages";

  function loadMessages() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  }
  function saveMessage(msg) {
    const all = loadMessages();
    all.unshift(msg);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  }
  function renderMessages() {
    const list = document.getElementById("guestbookList");
    const all = loadMessages();
    list.innerHTML = all
      .map(
        (m) => `<div class="msg"><b>${escapeHtml(m.name)}</b>${m.message ? " — " + escapeHtml(m.message) : ""}</div>`
      )
      .join("");
  }
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function sendToGoogleSheet(payload) {
    if (!CFG.guestbookEndpoint) return;
    // mode "no-cors" vì Apps Script không trả CORS header: gửi được nhưng
    // không đọc được response, nên cứ gửi "lạc quan" và bỏ qua lỗi mạng.
    fetch(CFG.guestbookEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  function setupGuestbook() {
    renderMessages();
    const form = document.getElementById("guestbookForm");
    const guestsInput = document.getElementById("gbGuests");

    // Không tham dự thì ẩn luôn ô "Số lượng người đi cùng" vì không cần nữa.
    function updateGuestsVisibility() {
      guestsInput.hidden = form.querySelector('input[name="gbAttend"]:checked').value === "no";
    }
    form.querySelectorAll('input[name="gbAttend"]').forEach((r) => r.addEventListener("change", updateGuestsVisibility));
    updateGuestsVisibility();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("gbName").value.trim();
      const phone = document.getElementById("gbPhone").value.trim();
      const attend = form.querySelector('input[name="gbAttend"]:checked').value;
      const guests = attend === "no" ? "0" : guestsInput.value;
      const message = document.getElementById("gbMessage").value.trim();
      if (!name) return;

      const payload = { name, phone, attend, guests, message, time: Date.now() };
      saveMessage(payload);
      sendToGoogleSheet(payload);

      form.reset();
      updateGuestsVisibility();
      document.getElementById("guestbookThanks").hidden = false;
      renderMessages();
    });
  }

  // ---------- Mừng cưới / VietQR ----------
  function vietQrUrl(bin, accountNo, accountName) {
    return `https://img.vietqr.io/image/${bin}-${accountNo}-compact2.png?accountName=${encodeURIComponent(
      accountName
    )}`;
  }

  function renderGift(sideKey) {
    const g = CFG.gifts[sideKey];
    const grid = document.getElementById("giftGrid");
    grid.innerHTML = `
      <div class="gift-card">
        <img src="${vietQrUrl(g.bin, g.accountNo, g.accountName)}" alt="QR chuyển khoản ${g.label}" />
        <h5>${g.label}</h5>
        <p>${g.bankName}</p>
        <p>${g.accountNo}</p>
        <p>${g.accountName}</p>
        <button type="button" data-copy="${g.accountNo}">Sao chép STK</button>
      </div>`;
  }

  function setupGifts() {
    document.getElementById("giftGrid").addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-copy]");
      if (!btn) return;
      navigator.clipboard
        ?.writeText(btn.getAttribute("data-copy"))
        .then(() => {
          const old = btn.textContent;
          btn.textContent = "Đã sao chép!";
          setTimeout(() => (btn.textContent = old), 1500);
        })
        .catch(() => {});
    });
  }

  // ---------- Nhạc nền ----------
  function setupMusic() {
    if (!CFG.musicSrc) return;
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicToggle");
    audio.src = CFG.musicSrc;
    btn.hidden = false;
    btn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().catch(() => {});
        btn.classList.add("is-playing");
      } else {
        audio.pause();
        btn.classList.remove("is-playing");
      }
    });
  }

  function init() {
    bindText();
    bindImages();
    setupEvents();
    setupCover();
    setupCountdown();
    setupStoryPhotos();
    setupGallery();
    setupLightboxControls();
    setupCalendar();
    setupTimeline();
    setupGuestbook();
    setupGifts();
    setupMusic();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
