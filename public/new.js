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

// Form validation -- ensure checkboxes and quantity are entered

document
  .querySelector('#new-product')
  .addEventListener('submit', function (event) {
    const woodCheckboxes = document.querySelectorAll('input[name="woodIds[]"]');
    const roomsCheckboxes = document.querySelectorAll('input[name="roomIds[]');
    const qtyInputs = document.querySelectorAll('input[name="quantityCnt[]"]');

    const woodValidate = document.getElementById('wood-validation');
    const roomsValidate = document.getElementById('rooms-validation');
    const qtyValidate = document.getElementById('qty-validation');

    woodValidate.textContent = '';
    qtyValidate.textContent = '';
    roomsValidate.textContent = '';

    let isWoodChecked = false;
    let isRoomsChecked = false;
    let isQty = true;

    for (let i = 0; i < woodCheckboxes.length; i++) {
      if (woodCheckboxes[i].checked) {
        isWoodChecked = true;
        break;
      }
    }
    for (let i = 0; i < roomsCheckboxes.length; i++) {
      if (roomsCheckboxes[i].checked) {
        isRoomsChecked = true;
        break;
      }
    }
    for (let i = 0; i < qtyInputs.length; i++) {
      if (qtyInputs[i].value === '' && !qtyInputs[i].disabled) {
        isQty = false;
        break;
      }
    }

    if (!isWoodChecked) {
      event.preventDefault(); // Prevent form submission
      woodValidate.textContent = 'Please select at least one wood option.';
    } else if (!isQty) {
      event.preventDefault();
      qtyValidate.textContent =
        'Please select quantities for each wood option.';
    } else if (!isRoomsChecked) {
      event.preventDefault();
      roomsValidate.textContent = 'Please select at least one room option.';
    } else {
      woodValidate.textContent = '';
      qtyValidate.textContent = '';
      roomsValidate.textContent = '';
    }
  });
