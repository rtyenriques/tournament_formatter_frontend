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