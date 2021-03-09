import EventEmitter from './services/EventEmitter';

const EVENT_EMITTER = new EventEmitter();

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.initUser()
    this.model.getEvents(() => this.view.init(this.model.items))
    EVENT_EMITTER.on("add", this.addNote.bind(this));
    EVENT_EMITTER.on("delete", this.deleteNote.bind(this));
    EVENT_EMITTER.on("filter", this.handleFilter.bind(this));
    EVENT_EMITTER.on("show-all", this.showAllNotes.bind(this));
    this.handleCreateCancel();


  }
  handleFilter(formState) {
    this.model.filterItems(formState);
    this.model.filteredItems.length ?
      this.view.init(this.model.filteredItems) :
      this.view.nothingsFound();

    this.model.filteredItems = this.model.items;
  }

  showAllNotes() {
    EVENT_EMITTER.on("show-all", this.view.init(this.model.items));
  }


  handleCreateCancel() {
    this.view.closeCreateModal();
  }

  addNote(event) {
    this.model.addItem(event)
    this.showAllNotes();
  }

  deleteNote(id) {
    this.model.deleteItem(id);
    this.view.deleteNote(id);
  }
}
