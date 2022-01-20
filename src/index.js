const endpoint = "http://localhost:3000/api/v1/entries"

document.addEventListener('DOMContentLoaded', () => {
  getEntries()
  const createEntryForm = document.querySelector('#create-entry-form')
  createEntryForm.addEventListener('submit', (e) => createFormHandler(e))
})

function getEntries() {
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
      json.data.forEach(entry => {
        let newEntry = new Entry(entry.id, entry.attributes)
        document.querySelector('#entry-container').innerHTML += newEntry.renderEntry();
      })
    })
    // .catch(err => console.log(err))
}

function createFormHandler(e) {
  e.preventDefault()
  const nameInput = document.querySelector('#input-name').value
  const crewInput =document.querySelector('#input-crew').value
  const locationInput = document.querySelector('#input-location').value
  const compInput = document.querySelector('#competitions').value
  const compId = parseInt(compInput)
  // const compId = parseInt(document.querySelector('#input-location').value)
  postFetch(nameInput, crewInput,locationInput, compId)
}

function postFetch(name, crew, location, competition_id) {
// console.log(name, crew, location, comp_id)
const bodyData = {name, crew, location, competition_id}
fetch(endpoint, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(bodyData)
})
.then(response => response.json())
.then(entry => {
  console.log(entry);
  const entryData = entry.data
  let newEntry = new Entry(entryData, entryData.attributes)
  document.querySelector('#entry-container').innerHTML +=
  newEntry.renderEntry();
})
}

