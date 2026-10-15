(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      });
    });
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }

  var form = document.getElementById("kontakt-form");
  if (!form) return;

  function setInvalid(row, invalid) {
    if (!row) return;
    row.classList.toggle("is-invalid", !!invalid);
    var input = row.querySelector("input, textarea, select");
    if (input) input.setAttribute("aria-invalid", invalid ? "true" : "false");
  }

  function validate() {
    var ok = true;
    var name = form.elements.namedItem("name");
    var email = form.elements.namedItem("email");
    var message = form.elements.namedItem("message");
    var consent = form.elements.namedItem("consent");
    var hp = form.elements.namedItem("website");

    setInvalid(name.closest(".form-row"), !name.value.trim() || name.value.trim().length < 2);
    if (!name.value.trim() || name.value.trim().length < 2) ok = false;

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    setInvalid(email.closest(".form-row"), !emailOk);
    if (!emailOk) ok = false;

    setInvalid(message.closest(".form-row"), !message.value.trim() || message.value.trim().length < 10);
    if (!message.value.trim() || message.value.trim().length < 10) ok = false;

    var consentRow = consent.closest(".form-row");
    setInvalid(consentRow, !consent.checked);
    if (!consent.checked) ok = false;

    if (hp && hp.value) ok = false;
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var success = document.getElementById("form-success");
    if (!validate()) {
      if (success) success.classList.remove("is-visible");
      var firstBad = form.querySelector(".form-row.is-invalid input, .form-row.is-invalid textarea, .form-row.is-invalid select");
      if (firstBad) firstBad.focus();
      return;
    }
    if (success) {
      success.classList.add("is-visible");
      success.focus();
    }
    form.reset();
    form.querySelectorAll(".form-row.is-invalid").forEach(function (r) { r.classList.remove("is-invalid"); });
  });

  form.addEventListener("blur", function (e) {
    if (!e.target.matches("input, textarea, select")) return;
    validate();
  }, true);
})();
