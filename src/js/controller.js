import ServiceAPI from './services/index';
import {success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const service = new ServiceAPI();
export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.on("add", this.addNote.bind(this));
    this.view.on("delete", this.deleteNote.bind(this));
    this.view.on("filter", this.handleFilter.bind(this));
    this.view.on("create-cancel", this.handleCreateCancel.bind(this));
    this.model.getEvents(() => this.view.init(this.model.items))

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
      service.addEvent({
        "data": JSON.stringify(this.model.addItem(note))
      }).then(result => {
        success({
          text: "Added new event.",
          closerHover: false,
          delay: 1000
         
        });
        return result.data
      });
    } catch (e) {
      console.error("Error while parsing.");
      error({
        text: "Erorr! The event hasn't been added!",
        closerHover: false,
        delay: 1000
       
      });
    }
    this.showAllNotes();
  }

  deleteNote(id) {
    this.model.deleteItem(id);
    this.view.deleteNote(id);
  }
}
