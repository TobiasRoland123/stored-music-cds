'use-strict';
import { generateRandomNumber } from './utils/generateRandomNumber.mjs';
const inputAuthor = document.querySelector('#author');
const inputTitle = document.querySelector('#title');
const inputYear = document.querySelector('#year');
const template = document.querySelector('#new-cd');
const tableBody = document.querySelector('#tbody');

const form = document.querySelector('#new-cd-frm');

if (!localStorage.getItem('cds')) {
  localStorage.setItem('cds', JSON.stringify([]));
}

renderCds(JSON.parse(localStorage.getItem('cds')));

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const newCD = {
    id: generateRandomNumber(),
    author: inputAuthor.value,
    title: inputTitle.value,
    year: parseInt(inputYear.value),
  };

  const cds = JSON.parse(localStorage.getItem('cds'));
  cds.push(newCD);
  localStorage.setItem('cds', JSON.stringify(cds));

  this.reset();

  renderCds([newCD]);
});

function renderCds(cds) {
  console.log('render cds, cds:', cds);

  cds.forEach((cd) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('#new-author').textContent = cd.author;
    clone.querySelector('#new-title').textContent = cd.title;
    clone.querySelector('#new-year').textContent = cd.year;
    clone.querySelector('#delete').addEventListener('click', function () {
      this.parentElement.remove();
      console.log('cd.id:', cd.id);
      const cds = JSON.parse(localStorage.getItem('cds'));
      const updatedCds = cds.filter((item) => item.id !== cd.id);
      localStorage.setItem('cds', JSON.stringify(updatedCds));
    });

    tableBody.appendChild(clone);
    document.querySelector('table').classList.add('show-table');
  });
}
