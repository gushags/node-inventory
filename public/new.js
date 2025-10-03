// new.js

const woodQty = document.querySelectorAll('.wood-input');
const qty = document.querySelectorAll('.qty-input');
console.log(woodQty);
for (const w of woodQty) {
  console.log(w.dataset.woodId);
  w.addEventListener('click', () => {
    for (const q of qty) {
      if (w.dataset.woodId === q.dataset.woodId) {
        q.toggleAttribute('disabled');
      }
    }
  });
}
