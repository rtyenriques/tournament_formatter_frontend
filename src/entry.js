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
//    return `
//       <div data-id=${this.id}>
//       <h2>${this.competition.comp_type}
//       <h3>${this.name}</h3>
//       <h3>${this.crew}</h3>
//       <h3>${this.location}</h3>
//       <button data-id=${this.id}>delete</button>
//       </div>
//       <br>`;
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
   deleteButton.addEventListener('click', e => this.deleteEntry())

      
  div.appendChild(h2)
  div.appendChild(h3);
  div.appendChild(h4)
  div.appendChild(deleteButton)

   entryList().appendChild(div)

}

deleteEntry(entry) {
    alert('u sure')
    fetch(endpoint + '/' + this.id, {
    method: "DELETE"
  });
  const entryList = () => document.getElementById('entry-container')
  Entry.all.filter(e => 
  e.id !== this.id)
//   debugger
  const resetList = () => {
  entryList().innerHTML = ''
}
resetList()
getEntries()
//   Entry.renderEntries()
}


static findById(id) {
  return this.all.find(entry => entry.id === id)

}


static sortByComp(comp_type) {

}

static renderEntries() {
    this.all.forEach(entry => entry.renderEntry())
}


}

Entry.all = [];