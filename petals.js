/* Light sakura drift. No libraries. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var root = document.createElement("div");
  root.className = "petals";
  root.setAttribute("aria-hidden", "true");
  document.body.prepend(root);

  var count = 16;
  for (var i = 0; i < count; i++) {
    var fall = document.createElement("span");
    fall.className = "petal-fall";
    var leaf = document.createElement("span");
    leaf.className = "petal";

    var size = 9 + Math.random() * 16;
    var fallTime = 16 + Math.random() * 16;
    var swayTime = 3.2 + Math.random() * 2.8;
    var drift = (Math.random() * 90 - 30).toFixed(0) + "px";
    var sway = (18 + Math.random() * 54).toFixed(0) + "px";
    var spin = (160 + Math.random() * 280).toFixed(0) + "deg";

    fall.style.left = (Math.random() * 100).toFixed(1) + "%";
    fall.style.animationDuration = fallTime.toFixed(1) + "s";
    fall.style.animationDelay = (-Math.random() * fallTime).toFixed(1) + "s";
    fall.style.setProperty("--drift", drift);
    fall.style.setProperty("--spin", spin);

    leaf.style.width = size.toFixed(1) + "px";
    leaf.style.height = (size * 0.68).toFixed(1) + "px";
    leaf.style.opacity = (0.42 + Math.random() * 0.48).toFixed(2);
    leaf.style.filter = "hue-rotate(" + ((Math.random() * 28) - 10).toFixed(0) + "deg)";
    leaf.style.animationDuration = swayTime.toFixed(1) + "s";
    leaf.style.animationDelay = (-Math.random() * swayTime).toFixed(1) + "s";
    leaf.style.setProperty("--sway", sway);

    fall.appendChild(leaf);
    root.appendChild(fall);
  }
})();
