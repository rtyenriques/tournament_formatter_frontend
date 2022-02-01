const endpoint = "http://localhost:3000/api/v1/entries"
const entryList = () => document.getElementById('entry-container')

const compButtons = document.querySelector('#comp-buttons')



compButtons.addEventListener('click', e => {

  const target = e.target

  resetList()

  if (target == compButtons.children[1]) {
    Entry.sortByComp(1)
  } else if (target == compButtons.children[2]) {
    Entry.sortByComp(2)
  } else if (target == compButtons.children[3]) {
    Entry.sortByComp(3)
  } else if (target == compButtons.children[0]) {
    Entry.all.forEach(e => e.renderEntry())
  }

})

document.addEventListener('DOMContentLoaded', () => {
  getEntries();
  const createEntryForm = document.querySelector('#create-entry-form');
  createEntryForm.addEventListener('submit', (e) => createFormHandler(e));

})





const resetList = () => {
  entryList().innerHTML = ''
}

async function getEntries() {
  await fetch(endpoint)
    .then(response => response.json())
    .then(entries => {
      entries.data.forEach(entry => {
        let newEntry = new Entry(entry, entry.attributes);
        newEntry.renderEntry()
      })
    })
    .catch(err => console.log(err))
}

function createFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value;
  const crewInput = document.querySelector('#input-crew').value;
  const locationInput = document.querySelector('#input-location').value;
  const compInput = document.querySelector('#competitions').value;
  const compId = parseInt(compInput);
  postFetch(nameInput, crewInput, locationInput, compId)
}

async function postFetch(name, crew, location, competition_id) {
  const bodyData = { name, crew, location, competition_id }
  await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyData)
  })
    .then(response => response.json())
    .then(entry => {
      const entryData = entry.data;
      let newEntry = new Entry(entryData, entryData.attributes);
      newEntry.renderEntry();
      const nameInput = document.querySelector('#input-name').value = '';
      const crewInput = document.querySelector('#input-crew').value = '';
      const locationInput = document.querySelector('#input-location').value = '';
      const compInput = document.querySelector('#competitions').value = ''
    })
}







