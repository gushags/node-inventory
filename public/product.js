// product.js
console.log('Loaded the product script.');

const collName = document.querySelector('#coll-name');
console.log(collName);
const collection = collName.dataset.collection;
const body = document.querySelector('body');
if (collection == 'Ezra Collection') {
  body.style.backgroundImage = "url('/img/ezra.jpg')";
} else if (collection == 'Fitzgerald Collection') {
  body.style.backgroundImage = "url('/img/fitzgerald.jpg')";
} else if (collection == 'Hemingway Collection') {
  body.style.backgroundImage = "url('/img/hemingway.jpg')";
} else if (collection == 'Woolf Collection') {
  body.style.backgroundImage = "url('/img/woolf.jpg')";
}
