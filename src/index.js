const endpoint = "http://localhost:3000/api/v1/entries"
const entryList = () => document.getElementById('entry-container')
// const entryContainer = document.querySelector('#entry-container')


document.addEventListener('DOMContentLoaded', () => {

  getEntries()
  const createEntryForm = document.querySelector('#create-entry-form')
  createEntryForm.addEventListener('submit', (e) => createFormHandler(e));
  
  const fourVfour = document.querySelector('#four')

  fourVfour.addEventListener('click', e => {
    e.preventDefault()
    resetList()
    Entry.sortByComp()
  })
  
  const allComps = document.querySelector('#all')
  allComps.addEventListener('click', e => {
  e.preventDefault()
  resetList()
  Entry.allComps()
  })

  const oneOnone = document.querySelector('#one')
  oneOnone.addEventListener('click', e => {
    e.preventDefault()
    resetList()
    Entry.oneAdult()
  })


})


  // const fourVfour = document.querySelector('#four')
  // debugger
  // fourVfour.addEventListener('click', console.log('hi'))
  



  const resetList = () => {
  entryList().innerHTML = ''
}



function getEntries() {
   fetch(endpoint)
    .then (response => response.json())
    .then (json => {
      json.data.forEach(entry => {
        let newEntry = new Entry(entry, entry.attributes)
        // document.querySelector('#entry-container').innerHTML += newEntry.renderEntry();
        newEntry.renderEntry()
      })
    })
    // .catch(err => console.log(err))
}


// function render(entries) {
//   const entryMarkup = `
//         <div data-id=${entries.id}>
//           <h2>${entries.attributes.competition.comp_type}
//           <h3>${entries.attributes.name}</h3>
//           <h3>${entries.attributes.crew}</h3>
//           <h3>${entries.attributes.location}</h3>
//           <button data-id=${entries.id}>edit</button>
//         </div>
//         <br>`;
//   document.querySelector('#entry-container').innerHTML +=
//   entryMarkup;
// }


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

async function postFetch(name, crew, location, competition_id) {
// console.log(name, crew, location, comp_id)
const bodyData = {name, crew, location, competition_id}
await fetch(endpoint, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(bodyData)
})
.then(response => response.json())
.then(entry => {
  console.log(entry);
  const entryData = entry.data
  let newEntry = new Entry(entryData, entryData.attributes)
  // document.querySelector('#entry-container').innerHTML +=
  newEntry.renderEntry();
  // debugger
  const nameInput = document.querySelector('#input-name').value = ''
  const crewInput =document.querySelector('#input-crew').value = ''
  const locationInput = document.querySelector('#input-location').value = ''
  const compInput = document.querySelector('#competitions').value = ''
})
}




