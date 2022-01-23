// When domloaded
// Cause of trigger - click or submit
// trigger effect

// Globals
const endpoint = "http://localhost:3000/api/v1/entries"
let entries = [];
let editing = false

// NodeGetters
const entryList = () => document.getElementById('entry-container')
const entryForm = () => document.getElementById('create-entry-form')
const nameInput = () => document.querySelector('#input-name')
const crewInput = () => document.querySelector('#input-crew') 
const locationInput = () => document.querySelector('#input-location')
const compInput = () => document.querySelector('#competitions')
const compId = () => parseInt(compInput)
const entryFormSubmit = () => document.getElementById('submit-entry')
const formHeader = () => document.getElementById('form-header')


//Event Listeners
const attachFormEvent = () => {
  entryForm().addEventListener('submit', createEntry) 
}



//Event Handlers
const createEntry = async (e) => {
  e.preventDefault()

// const name = e.target.name.value
// const crew = e.target.crew.value
// const location = e.target.location.value
// const comp_id = e.target.competitions.value
// const competition_id = parseInt(comp_id)

  const strongParams = {
    
    entry: {
      name: nameInput().value,
      crew: crewInput().value,
      location: locationInput().value,
      competition_id: compInput().value
    }
    }

  const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  },
  body: JSON.stringify(strongParams)
  })

const entry = await response.json();

entries.data.push(entry);
renderEntry(entry.data)
document.querySelector('#input-name').value = ''
document.querySelector('#input-crew').value = ''
document.querySelector('#input-location').value = ''


}

const deleteEntry = async entry => {
  alert('are you sure, if not refresh page')
  await fetch(endpoint + '/' + entry.id, {
    method: "DELETE"
  });
  
  entries = entries.data.filter(e => 
  e.id !== entry.id)
  entries = {data: entries}
  renderEntries()
}

const editEntry = entry => {
  entryForm().removeEventListener('submit', createEntry)

  nameInput().value = entry.attributes.name;
  crewInput().value = entry.attributes.crew
  locationInput().value = entry.attributes.location
  compInput().value = entry.attributes.competition.id
  entryFormSubmit().value = 'update entry'
  formHeader().innerText = 'Update an Entry'

  entryForm().addEventListener('submit', e => {
    e.preventDefault()
     
   updateEntry(entry)
  })
}


const updateEntry = async entry => {
  const strongParams = {
    
    entry: {
      name: nameInput().value,
      crew: crewInput().value,
      location: locationInput().value,
      competition_id: parseInt(compInput().value)
    }
    }
   debugger
// `/${entry.id}`
  const response = await fetch(endpoint + '/' + entry.id, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
      body: JSON.stringify(strongParams)
   })

  
  const newEntry = JSON.stringify(strongParams)
  debugger

  entries = entries.data.map(entry => {
    if(entry.id == newEntry.id) {
      return newEntry
    }
    return entry
  })
// const index = entries.data.indexOf(entry)
// entries[index] = newEntry
  debugger
    entries = {data: entries}
    debugger
renderEntries()
  
}

// Renderers

const renderEntries = () => {
  resetList();
  entries.data.forEach(entry => renderEntry(entry))
}

const renderEntry = (entry) => {

   const div = document.createElement('div')
   const h3 = document.createElement('h3')
   const h4 = document.createElement('h4')
   const h2 = document.createElement('h2')
   const deleteButton = document.createElement('button')
   const editButton = document.createElement('button')

  h2.innerText = entry.attributes.competition.comp_type;
  
  h3.innerText = "Name(s): " + entry.attributes.name;
   h3.style.color = 'black';

  
   h4.innerText = "Crew(s): " + entry.attributes.crew
   + " Location: " + entry.attributes.location;
   h4.style.color = 'black';

   deleteButton.innerText = 'delete entry'
   deleteButton.addEventListener('click', e => deleteEntry(entry))

   editButton.innerText = 'edit entry'
   editButton.addEventListener('click', e => editEntry(entry))
   
  div.appendChild(h2)
  div.appendChild(h3);
  div.appendChild(h4)
  div.appendChild(deleteButton)
  div.appendChild(editButton)


   entryList().appendChild(div)
}

// EverythingElse
const loadEntries = async () => {
  const response = await fetch(endpoint);
  entries = await response.json();
 
  renderEntries()
}

const resetList = () => {
  entryList().innerHTML = ''
}

document.addEventListener('DOMContentLoaded', () => {
  loadEntries()
  attachFormEvent()
})

