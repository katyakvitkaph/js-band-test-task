export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.getItemsFromLS();
    this.view.init(this.model.items);
    this.view.on("add", this.addNote.bind(this));
    this.view.on("delete", this.deleteNote.bind(this));
    this.view.on("filter", this.handleFilter.bind(this));
    this.view.on("create-cancel", this.handleCreateCancel.bind(this));
    this.view.on("edit-start", this.handleEditStart.bind(this));
    this.view.on("edit-cancel", this.handleEditCancel.bind(this));
    this.view.on("edit-success", this.handleEditSuccess.bind(this));

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


  handleEditSuccess(note) {
    const id = this.model.getSelectedItemId();
    this.model.updateItem(id, note);
    try {
      localStorage.setItem("items", JSON.stringify(this.model.items));
    } catch (e) {
      console.error("Error while parsing.");
    }
    this.view.updateNote(id, note);
  }

  handleEditStart(id) {
    console.log('id', id);
    const note = this.model.findItem(id);
    this.model.setSelectedItemId(id);

    this.view.openEditModal(note);
  }

  handleEditCancel() {
    this.view.closeEditModal();
  }

  handleCreateCancel() {
    this.view.closeCreateModal();
  }

  addNote(note) {
    this.model.addItem(note);
    try {
      localStorage.setItem("items", JSON.stringify(this.model.items));
    } catch (e) {
      console.error("Error while parsing.");
    }
    this.showAllNotes();
  }

  deleteNote(id) {
    this.model.deleteItem(id);
    try {
      localStorage.setItem("items", JSON.stringify(this.model.items));
    } catch (e) {
      console.error("Error while parsing.");
    }
    this.view.deleteNote(id);
  }
}
