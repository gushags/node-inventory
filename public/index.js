// index.js

function submitCategorySearch() {
  const collection = document.querySelector(
    'input[name="collection"]:checked'
  ).value;
  const wood = document.querySelector('input[name="wood"]:checked').value;
  const ftype = document.querySelector('input[name="ftype"]:checked').value;
  const room = document.querySelector('input[name="room"]:checked').value;
  const string = collection + '&' + wood + '&' + ftype + '&' + room;
  localStorage.clear();

  const radio = {
    collection: collection,
    wood: wood,
    ftype: ftype,
    room: room,
  };
  localStorage.setItem('radioButtons', JSON.stringify(radio));
  window.location.replace(`../${string}`);
}

function checkRadioButtonByValue(name, valueToSelect) {
  const radioButtons = document.getElementsByName(name);
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].value === valueToSelect) {
      radioButtons[i].checked = true;
      break; // Exit the loop once the correct radio button is found and checked
    }
  }
}

function updateRadioButtons() {
  if (localStorage) {
    const storedRadio = JSON.parse(localStorage.getItem('radioButtons'));
    const collectionRad = storedRadio.collection;
    const woodRad = storedRadio.wood;
    const ftypeRad = storedRadio.ftype;
    const roomRad = storedRadio.room;
    checkRadioButtonByValue('collection', collectionRad);
    checkRadioButtonByValue('wood', woodRad);
    checkRadioButtonByValue('ftype', ftypeRad);
    checkRadioButtonByValue('room', roomRad);
  }
}

updateRadioButtons();

// Make table clickable
const tableRows = document.querySelectorAll('.table-clickable');
for (const tableRow of tableRows) {
  tableRow.addEventListener('click', function () {
    window.open(this.dataset.href, '_self');
  });
}
