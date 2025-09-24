// categories.js

// collections
const collectionDialog = document.querySelector('#collection-modal');
const collectionOpenDialog = document.querySelector('#collection-open');
const collectionCloseButton = document.querySelector('#collection-close');

// "Show the dialog" button opens the dialog modally
collectionOpenDialog.addEventListener('click', () => {
  collectionDialog.showModal();
});

// "Close" button closes the dialog
collectionCloseButton.addEventListener('click', () => {
  collectionDialog.close();
});

// wood
const woodDialog = document.querySelector('#wood-modal');
const woodOpenDialog = document.querySelector('#wood-open');
const woodCloseButton = document.querySelector('#wood-close');

// "Show the dialog" button opens the dialog modally
woodOpenDialog.addEventListener('click', () => {
  woodDialog.showModal();
});

// "Close" button closes the dialog
woodCloseButton.addEventListener('click', () => {
  woodDialog.close();
});

// furniture type
const ftypeDialog = document.querySelector('#ftype-modal');
const ftypeOpenDialog = document.querySelector('#ftype-open');
const ftypeCloseButton = document.querySelector('#ftype-close');

// "Show the dialog" button opens the dialog modally
ftypeOpenDialog.addEventListener('click', () => {
  ftypeDialog.showModal();
});

// "Close" button closes the dialog
ftypeCloseButton.addEventListener('click', () => {
  ftypeDialog.close();
});

// room type
const roomDialog = document.querySelector('#room-modal');
const roomOpenDialog = document.querySelector('#room-open');
const roomCloseButton = document.querySelector('#room-close');

// "Show the dialog" button opens the dialog modally
roomOpenDialog.addEventListener('click', () => {
  roomDialog.showModal();
});

// "Close" button closes the dialog
roomCloseButton.addEventListener('click', () => {
  roomDialog.close();
});
