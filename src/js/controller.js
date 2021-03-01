import ServiceAPI from './services/index';

const service = new ServiceAPI();
export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    this.view.on("add", this.addNote.bind(this));
    this.view.on("delete", this.deleteNote.bind(this));
    this.view.on("filter", this.handleFilter.bind(this));
    this.view.on("create-cancel", this.handleCreateCancel.bind(this));
    this.model.getEvents(() => this.view.init(this.model.items) )
    
  }
  handleFilter(formState) {
    this.model.filterItems(formState);
    this.model.filteredItems.length ?
      this.view.init(this.model.filteredItems) :
      this.view.nothingsFound();

    this.model.filteredItems = this.model.items;
  }

  showAllNotes() {
    this.view.init(this.model.items);
  }


  handleCreateCancel() {
    this.view.closeCreateModal();
  }

  addNote(note) {

    try {
      // localStorage.setItem("items", JSON.stringify(this.model.items));
      service.addEvent(   {"data" : JSON.stringify(this.model.addItem(note))}).then(result => {

     return result.data
      });
    } catch (e) {
      console.error("Error while parsing.");
    }
    this.showAllNotes();
  }

  deleteNote(id) {
    console.log('id0 , id' , id);
    this.model.deleteItem(id);
    try {
      // localStorage.setItem("items", JSON.stringify(this.model.items));
      service.deleteEvent(id ).then(result => {
      });
    } catch (e) {
      console.error("Error while parsing.");
    }
    this.view.deleteNote(id);
  }
}
