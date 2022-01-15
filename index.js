const endpoint = "http://localhost:3000/api/v1/entries"

document.addEventListener('DOMContentLoaded', () => {
    getEntries()
})

function getEntries() {
    fetch(endpoint)
    .then(response => response.json())
    .then(json => {
      json.data.forEach(entries => {
        const entryData = `
        <div data-id=${entries.id}>
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