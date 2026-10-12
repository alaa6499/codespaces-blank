(() => {
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      const nextExpanded = !isExpanded;

      menuToggle.setAttribute("aria-expanded", String(nextExpanded));
      menuToggle.setAttribute("aria-label", nextExpanded ? "إغلاق القائمة" : "فتح القائمة");
      mainNav.classList.toggle("is-open", nextExpanded);
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "فتح القائمة");
        mainNav.classList.remove("is-open");
      });
    });
  }

  const currentYear = document.querySelector("#current-year");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const bookingForm = document.querySelector("#booking-form");
  const formMessage = document.querySelector("#form-message");

  if (bookingForm && formMessage) {
    bookingForm.addEventListener("input", () => {
      formMessage.textContent = "";
    });

    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!bookingForm.reportValidity()) return;

      const formData = new FormData(bookingForm);
      const message = [
        "مرحباً أ. آلاء، أرغب في حجز استشارة.",
        `الاسم: ${formData.get("name")}`,
        `رقم الجوال: ${formData.get("phone")}`,
        `نوع الاستشارة: ${formData.get("service")}`,
        formData.get("time") ? `وقت التواصل المفضل: ${formData.get("time")}` : "",
      ].filter(Boolean).join("\n");

      formMessage.textContent = "جارٍ فتح واتساب لإرسال طلبك...";
      window.location.href = `https://wa.me/201155619246?text=${encodeURIComponent(message)}`;
    });
  }
})();
