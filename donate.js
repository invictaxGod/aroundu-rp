(function () {
  var form = document.getElementById("donate-form");
  if (!form) return;

  var presets = form.querySelectorAll("[data-amount]");
  var custom = document.getElementById("custom-amount");
  var summary = document.getElementById("choice-summary");
  var notice = document.getElementById("pay-notice");
  var selected = 500;

  var methodLabels = {
    card: "Банковская карта",
    sbp: "СБП",
    crypto: "Криптовалюта"
  };

  function formatRub(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
  }

  function currentMethod() {
    var checked = form.querySelector('input[name="method"]:checked');
    return checked ? checked.value : "";
  }

  function render() {
    var method = currentMethod();
    var amountText = selected > 0 ? formatRub(selected) : "сумма не выбрана";
    var methodText = methodLabels[method] || "способ не выбран";
    summary.textContent = "Выбрано: " + amountText + " · " + methodText;
  }

  function clearNotice() {
    notice.hidden = true;
    notice.textContent = "";
  }

  Array.prototype.forEach.call(presets, function (btn) {
    btn.addEventListener("click", function () {
      selected = Number(btn.getAttribute("data-amount"));
      custom.value = "";
      Array.prototype.forEach.call(presets, function (other) {
        other.classList.toggle("is-selected", other === btn);
      });
      clearNotice();
      render();
    });
  });

  custom.addEventListener("input", function () {
    var raw = String(custom.value).replace(/\s/g, "").replace(",", ".");
    var n = Number(raw);
    if (raw === "" || !isFinite(n) || n <= 0) {
      selected = 0;
    } else {
      selected = Math.min(1000000, Math.round(n));
    }
    Array.prototype.forEach.call(presets, function (btn) {
      btn.classList.remove("is-selected");
    });
    clearNotice();
    render();
  });

  Array.prototype.forEach.call(form.querySelectorAll('input[name="method"]'), function (input) {
    input.addEventListener("change", function () {
      clearNotice();
      render();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var method = currentMethod();
    var methodText = methodLabels[method] || "способ не выбран";
    var amountText = selected > 0 ? formatRub(selected) : "сумма не выбрана";
    notice.hidden = false;
    notice.textContent =
      "Оплата не подключена. Ничего не списано. Выбор («" +
      amountText +
      "», " +
      methodText +
      ") никуда не отправлен, платёж не создавался.";
  });

  render();
})();
