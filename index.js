const endpoint = "http://localhost:3000/api/v1/entries"

document.addEventListener('DOMContentLoaded', () => {
    getEntries()

    const createEntryForm = document.querySelector('#create-entry-form')
    createEntryForm.addEventListener('submit', (e) => createFormHandler(e))
})

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
  // body: JSON.stringify({
  //   name: name,
  //   crew: crew,
  //   location: location,
  //   competition_id: competition_id
  // })
  body: JSON.stringify(bodyData)
})
.then(response => response.json())
.then(entries => {
 
  // console.log(entries);
  // const entryData = entries.data.attributes
  const entryMarkup =`
  <div data-id=${entries.id}>
  <h3>${entries.name}</h3>
  <h3>${entries.crew}</h3>
  <h3>${entries.location}</h3>
  <button data-id=${entries.id}>edit</button>
  </div>
  `;
  document.querySelector('#entry-container').innerHTML +=
  entryMarkup;

})

}

function getEntries() {
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
      json.data.forEach(entries => {
        const entryData = `
        <div data-id=${entries.id}>
          <h2>${entries.attributes.competition.comp_type}
          <h3>${entries.attributes.name}</h3>
          <h3>${entries.attributes.crew}</h3>
          <h3>${entries.attributes.location}</h3>
          <button data-id=${entries.id}>edit</button>
        </div>
        <br>`;
        
        document.querySelector('#entry-container').innerHTML += entryData
        })
    })
}