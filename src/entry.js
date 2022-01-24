class Entry {
constructor(entry, entryAttributes) {
this.id = entry.id;
this.name = entryAttributes.name;
this.crew = entryAttributes.crew;
this.location = entryAttributes.location;
this.competition = entryAttributes.competition;
Entry.all.push(this)
}
 
renderEntry() {
   const entryList = () => document.getElementById('entry-container')
   const div = document.createElement('div')
   const h3 = document.createElement('h3')
   const h4 = document.createElement('h4')
   const h2 = document.createElement('h2')
   const deleteButton = document.createElement('button')
   const editButton = document.createElement('button')

   h2.innerText = this.competition.comp_type;
   h3.innerText = "Name(s): " + this.name;
   h3.style.color = 'black';
   h4.innerText = "Crew(s): " + this.crew
   + " Location: " + this.location;
   h4.style.color = 'black';
   deleteButton.innerText = 'delete entry'
   deleteButton.addEventListener('click', e  => {
    e.preventDefault()
    this.deleteEntry()
   })

      
  div.appendChild(h2)
  div.appendChild(h3);
  div.appendChild(h4)
  div.appendChild(deleteButton)

   entryList().appendChild(div)

}

async deleteEntry() {
    // alert('u sure')
  await fetch(endpoint + '/' + this.id, {
    method: "DELETE"
  });

 Entry.all = Entry.all.filter(e => e.id !== this.id)
  
  resetList()
//   getEntries()
  let newEntry = () => {Entry.all.forEach(e => e.renderEntry())}

  return newEntry()
  
}


static findById(id) {
  return this.all.find(entry => entry.id === id)
}


static sortByComp() {
  let compEntry = this.all.filter(e => e.competition.id === 1)
  let newEntry = () => {compEntry.forEach(e => e.renderEntry())}
  return newEntry()
}

static allComps() {
  let newEntry =  () => {Entry.all.forEach(e => e.renderEntry())}
  return newEntry()
}

static oneAdult() {
  let compEntry = this.all.filter(e => e.competition.id === 2)
  let newEntry = () => {compEntry.forEach(e => e.renderEntry())}
  return newEntry()
}

static oneKids() {
  let compEntry = this.all.filter(e => e.competition.id === 3)
  let newEntry = () => {compEntry.forEach(e => e.renderEntry())}
  return newEntry()
  }
}

Entry.all = [];