const body = document.body;
const menuButton = document.querySelector(".menu-toggle");
const cookie = document.querySelector(".cookie");
const acceptCookie = document.querySelector("[data-cookie-accept]");
const declineCookie = document.querySelector("[data-cookie-decline]");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    const open = body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
}

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const open = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((el) => el.classList.remove("active"));
    button.classList.add("active");
    document.querySelectorAll("[data-case]").forEach((card) => {
      card.hidden = value !== "all" && card.dataset.case !== value;
    });
  });
});

if (cookie && localStorage.getItem("webaccel-cookie") !== "set") {
  cookie.classList.remove("hide");
}

[acceptCookie, declineCookie].forEach((button) => {
  if (!button) return;
  button.addEventListener("click", () => {
    localStorage.setItem("webaccel-cookie", "set");
    cookie.classList.add("hide");
  });
});

document.querySelectorAll("form[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.querySelector("[data-form-message]");
    if (message) {
      message.textContent = "送信内容を受け付けました。自動返信メールの後、1営業日以内に担当者よりご連絡します。";
      message.tabIndex = -1;
      message.focus();
    }
    form.reset();
  });
});
