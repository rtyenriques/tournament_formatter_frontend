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
   return `
      <div data-id=${this.id}>
      <h2>${this.competition.comp_type}
      <h3>${this.name}</h3>
      <h3>${this.crew}</h3>
      <h3>${this.location}</h3>
      <button data-id=${this.id}>edit</button>
      </div>
      <br>`;
}
static findById(id) {
  return this.all.find(entry => entry.id === id)
}
}

Entry.all = [];