document.addEventListener("DOMContentLoaded", () => {
  // ✅ Only run this script on the /menu page
  if (!window.location.pathname.startsWith("/menu")) return;

  const navSearchInput = document.querySelector(".nav_search input");
  const searchBtn = document.getElementById("searchBtn");
  const menuList = document.querySelector(".menu_box");

  // 🔍 Navbar search button
  if (searchBtn && navSearchInput) {
    searchBtn.addEventListener("click", function () {
      const query = navSearchInput.value.trim();
      if (query) {
        window.location.href = `/menu?q=${encodeURIComponent(query)}`;
      }
    });
  }

  // 🔄 Category filter function
  window.filterItems = function (category) {
    const queryInput = document.getElementById("searchInput");
    const query = queryInput ? queryInput.value.trim() : "";

    // Set active class
    const filterButtons = document.querySelectorAll(".filter_buttons button");
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
      if (btn.dataset.category === category) {
        btn.classList.add("active");
      }
    });

    // Fade out old items
    const currentItems = menuList.querySelectorAll(".box");
    currentItems.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = "all .2s ease";
    });

    // Fetch filtered items
    fetch(`/menu?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(response => response.text())
      .then(data => {
        menuList.innerHTML = data;
        setupScrollAnimation();
      })
      .catch((error) => console.error("Filter error:", error));
  };

  // 🌀 Scroll-based animation setup
  function setupScrollAnimation() {
    const boxes = document.querySelectorAll(".menu_box .box");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.style.transition = "all 0.8s ease";
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    boxes.forEach(box => {
      box.style.opacity = "0";
      box.style.transform = "translateY(20px)";
      observer.observe(box);
    });
  }

  // 🧠 Initial animation on page load
  setupScrollAnimation();
});
// new
// new 2

const btns = document.querySelectorAll(".btn");
const slideRow = document.getElementById("slide-row");
const main = document.querySelector("main");

let currentIndex = 0;

function updateSlide() {
  const mainWidth = main.offsetWidth;
  const translateValue = currentIndex * -mainWidth;
  slideRow.style.transform = `translateX(${translateValue}px)`;

  btns.forEach((btn, index) => {
    btn.classList.toggle("active", index === currentIndex);
  });
}


btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    currentIndex = index;
    updateSlide();
  });
});

window.addEventListener("resize", () => {
  updateSlide();
});
console.clear();
var log = console.log.bind(console);

// set box color
for (var items = document.querySelectorAll(".box"), i = 0; i < items.length; i++)
  if (items[i].hasAttribute("color")) {
    var color = items[i].getAttribute("color");
    items[i].style.backgroundColor = "#" + color
  }

// animation
var nodes = document.querySelectorAll(".box");
var total = nodes.length;
var time = 0.9;
var omega = 12;
var zeta = 0.9;
var boxes = [];

for (var i = 0; i < total; i++) {
  var node = nodes[i];
  var width = node.offsetWidth;
  var height = node.offsetHeight;
  var color = "transparent";

  TweenLite.set(node, { x: "+=0" });

  var transform = node._gsTransform;
  var x = node.offsetLeft;
  var y = node.offsetTop;

  boxes[i] = { height, width, node, transform, x, y };
}

window.addEventListener("resize", () => {
  layout();
});

function layout() {
  for (var i = 0; i < total; i++) {
    var box = boxes[i];

    var lastX = box.x;
    var lastY = box.y;

    var lastW = box.width;
    var lastH = box.height;

    var width = (box.width = box.node.offsetWidth);
    var height = (box.height = box.node.offsetHeight);

    box.x = box.node.offsetLeft;
    box.y = box.node.offsetTop;

    if (lastX !== box.x || lastY !== box.y) {
      var x = box.transform.x + lastX - box.x;
      var y = box.transform.y + lastY - box.y;

      // Tween to 0 to remove the transforms
      TweenLite.set(box.node, { x, y });
      TweenLite.to(box.node, time, { x: 0, y: 0, ease });
    }

    if (lastW !== box.width || lastH !== box.height) {
      TweenLite.to(box.content, time, {
        autoRound: false,
        width,
        height,
        ease
      });
    }
  }
}





