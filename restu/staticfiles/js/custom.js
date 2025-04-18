let selectedCategory = 'all';

function filterItems(category) {
  selectedCategory = category;
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const boxes = document.querySelectorAll('.box');

  boxes.forEach(box => {
    const itemCategory = box.getAttribute('data-category');
    const name = box.querySelector('h2').textContent.toLowerCase();
    const desc = box.querySelector('p').textContent.toLowerCase();

    const matchesCategory = selectedCategory === 'all' || itemCategory === selectedCategory;
    const matchesSearch = name.includes(query) || desc.includes(query);

    box.style.transition = 'opacity 0.4s ease';
    box.style.opacity = '0';

    setTimeout(() => {
      if (matchesCategory && matchesSearch) {
        box.style.display = 'block';
        setTimeout(() => {
          box.style.opacity = '1';
        }, 10);
      } else {
        box.style.display = 'none';
      }
    }, 400);
  });
}

// 🟢 Wait until full page is loaded (DOM + resources)
window.onload = function () {
  const query = document.getElementById('searchInput').value;
  if (query.trim() !== '') {
    applyFilters();  // auto-run search when query exists
  }
};


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





