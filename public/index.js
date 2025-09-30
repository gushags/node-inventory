// index.js

// Filter products by category
function submitCategorySearch() {
  const collection = document.querySelector(
    'input[name="collection"]:checked'
  ).value;
  const wood = document.querySelector('input[name="wood"]:checked').value;
  const ftype = document.querySelector('input[name="ftype"]:checked').value;
  const room = document.querySelector('input[name="room"]:checked').value;
  const string = collection + '&' + wood + '&' + ftype + '&' + room;

  const radio = {
    collection: collection,
    wood: wood,
    ftype: ftype,
    room: room,
  };
  sessionStorage.setItem('radioButtons', JSON.stringify(radio));
  window.location.replace(`../${string}`);
}

document.addEventListener('DOMContentLoaded', () => {
  // ---- Radio button handling ----
  function checkRadioButtonByValue(name, valueToSelect) {
    const radioButtons = document.getElementsByName(name);
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i].value === valueToSelect) {
        radioButtons[i].checked = true;
        break;
      }
    }
  }

  function updateRadioButtons() {
    const path = window.location.pathname;

    // Reset filters to "ALL" if on base URL
    if (path === '/') {
      sessionStorage.removeItem('radioButtons');
      checkRadioButtonByValue('collection', 'ALL');
      checkRadioButtonByValue('wood', 'ALL');
      checkRadioButtonByValue('ftype', 'ALL');
      checkRadioButtonByValue('room', 'ALL');
      return;
    }

    const storedRadio = JSON.parse(sessionStorage.getItem('radioButtons'));
    if (storedRadio) {
      checkRadioButtonByValue('collection', storedRadio.collection);
      checkRadioButtonByValue('wood', storedRadio.wood);
      checkRadioButtonByValue('ftype', storedRadio.ftype);
      checkRadioButtonByValue('room', storedRadio.room);
    }
  }

  updateRadioButtons();

  // ---- Category sidebar handling ----
  const categoryHeads = document.querySelectorAll('h5');
  const storedCategories =
    JSON.parse(sessionStorage.getItem('openCategories')) || [];

  categoryHeads.forEach((categoryHead) => {
    const categoryName = categoryHead.textContent.trim();

    // Restore previously opened categories
    if (storedCategories.includes(categoryName)) {
      categoryHead.classList.add('active');
      const children = categoryHead.parentElement.children;
      for (let i = 1; i < children.length; i++) {
        children[i].classList.remove('hidden');
      }
    }

    // Add click listener
    categoryHead.addEventListener('click', () => {
      const isActive = categoryHead.classList.toggle('active');
      const children = categoryHead.parentElement.children;
      for (let i = 1; i < children.length; i++) {
        children[i].classList.toggle('hidden');
      }

      // Update sessionStorage
      let updatedCategories =
        JSON.parse(sessionStorage.getItem('openCategories')) || [];
      if (isActive) {
        if (!updatedCategories.includes(categoryName))
          updatedCategories.push(categoryName);
      } else {
        updatedCategories = updatedCategories.filter((c) => c !== categoryName);
      }
      sessionStorage.setItem(
        'openCategories',
        JSON.stringify(updatedCategories)
      );
    });
  });

  // ---- Make table rows clickable ----
  const tableRows = document.querySelectorAll('.table-clickable');
  tableRows.forEach((row, index) => {
    row.addEventListener('click', () => {
      window.open(row.dataset.href, '_self');
    });

    if (index % 2 === 1) {
      row.classList.add('table-color');
    }
  });
});
