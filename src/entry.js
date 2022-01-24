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
debugger
    h2.innerText = this.competition.comp_type;
    div.appendChild(h2)
       entryList().appendChild(div)

}
static findById(id) {
  return this.all.find(entry => entry.id === id)

}
}

Entry.all = [];