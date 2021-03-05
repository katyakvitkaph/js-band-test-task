import EventEmitter from './services/event-emitter';
import collectionTypes from './constants/collectionTypes';
import UserFactory from './classes/UserFactory';
import shortid from 'shortid';
const EVENT_EMITTER = new EventEmitter();

export default class View {
  constructor() {
    this.formState = {
      nameOfMemberValue: '',
      isAdmin: false,
    };

    this.id = shortid();
    this.container = document.querySelector('.container');
    this.authModal = document.querySelector('.modal-window-auth');
    this.selectedUser = this.authModal.querySelector(
      '.modal-form__select-name',
    );
    this.confirmUser = document.querySelector('button[data-action="confirm"]');
    this.form = document.querySelector('.form');
    this.main = document.querySelector('.main-content');
    this.modal = document.querySelector('.modal-window');
    this.selectNameMember = this.form.querySelector('.select--name');
    this.createModalForm = this.modal.querySelector('.modal-form');
    this.addNoteBtn = document.querySelector('button[data-action="add-note"]');
    this.signoutBtn = document.querySelector('button[data-action="signout"]');
    this.header = document.querySelector('.header-container');
    this.cancelCreateBtn = document.querySelector(
      'button[data-action="create-cancel"]',
    );
    $(document).ready(function () {
      $('#multiple-checkboxes').multiselect({
        includeSelectAllOption: true,
      });
    });
    this.table = document.querySelector('table');

    this.container.addEventListener('click', this.toggleDropdown);
    this.signoutBtn.addEventListener('click', this.signOut.bind(this));
    this.selectNameMember.addEventListener(
      'change',
      this.onSelectNameMemberChange.bind(this),
    );
    this.addNoteBtn.addEventListener('click', this.openCreateModal.bind(this));
    this.createModalForm.addEventListener('submit', this.handleAdd.bind(this));
    this.cancelCreateBtn.addEventListener(
      'click',
      this.closeCreateModal.bind(this),
    );
    this.confirmUser.addEventListener('click', this.handleAuth.bind(this));
  }

  onSelectNameMemberChange(e) {
    this.formState.nameOfMemberValue = e.target.value;
    EVENT_EMITTER.emit('filter', this.formState);
  }

  handleAdd(e) {
    e.preventDefault();
    const title = this.modal.querySelector('.modal-form__input');
    const dayOfWeek = this.modal.querySelector('.modal-form__select-day');
    const time = this.modal.querySelector('.modal-form__select-time');
    const name = this.modal.querySelector('#multiple-checkboxes');

    let selected = Array.from(name.options)
      .filter(function (name) {
        return name.selected;
      })
      .map(function (option) {
        return option.value;
      });

    if (!title.value) {
      alert({
        text: 'Please, fill the field!',
      });
    } else {
      const event = {
        title: title.value.length > 15 ?
          title.value.slice(0, 16) + '...' : title.value,
        dayOfWeek: dayOfWeek.value,
        time: time.value,
        name: selected,
      };

      EVENT_EMITTER.emit('add', event);
      this.createModalForm.reset();
      this.closeCreateModal();
    }
  }
  createDOMElement(tag, dataAttribute, text, ...classes) {
    const element = document.createElement(tag);
    dataAttribute
      ?
      (element.dataset[dataAttribute[0]] = dataAttribute[1]) :
      null;
    text ? (element.textContent = text) : null;
    classes.forEach(className => element.classList.add(className));
    return element;
  }

  createGreetings(name) {
    const title = this.createDOMElement('h2', null, name, 'name-user');

    return title;
  }
  createNote(note) {
    const section = this.createDOMElement(
      'section',
      null,
      null,
      'event-list__section',
    );
    const item = this.createDOMElement('div', ['id', note.id], null, 'item');

    const itemTitle = this.createDOMElement(
      'h2',
      null,
      note.title,
      'item__title',
    );

    const buttonsContainer = this.createDOMElement(
      'div',
      null,
      null,
      'buttons-container',
    );

    const buttonDelete = this.createDOMElement(
      'button',
      ['action', 'delete'],
      '',
      'button-delete',
    );

    buttonsContainer.append(buttonDelete);
    item.append(itemTitle, buttonsContainer);
    section.append(item);
    this.appendEventListners(section);
    return section;
  }

  appendEventListners(item) {
    const deleteBtn = item.querySelector('button[data-action="delete"]');
    deleteBtn.addEventListener('click', this.handleDelete.bind(this));
  }

  handleDelete(e) {
    const parent = e.target.closest('.item');
    e.stopPropagation();
    EVENT_EMITTER.emit('delete', parent.dataset.id);
  }

  deleteNote(id) {
    const item = this.table.querySelector(`[data-id="${id}"]`);
    item.closest('section').remove();
  }

  openCreateModal() {
    this.container.classList.add('modal--show');
  }

  closeCreateModal() {
    this.container.classList.remove('modal--show');
  }
  closeAuthModal() {
    this.container.classList.remove('modal--auth--show');
  }

  handleAuth(e) {
    e.preventDefault();

    const selectedUser = this.authModal.querySelector(
      '.modal-form__select-name',
    );
    let selectedUserName = selectedUser.value.toLowerCase();
    const items = this.table.querySelectorAll('button[data-action="delete"]');

    switch (selectedUserName) {
      case collectionTypes.ALEX:
        this.formState.isAdmin = UserFactory.create(selectedUserName, {
          name: `${selectedUser.value}`,
          role: true,
        });
        items.forEach(item => {
          item.style.display = 'block';
        });
        break;
      case collectionTypes.HELGA:
      case collectionTypes.PABLO:
      case collectionTypes.KATE:
        UserFactory.create(selectedUserName, `${selectedUser.value}`);
        this.addNoteBtn.style.display = 'none';
        items.forEach(item => {
          item.style.display = 'none';
        });
        break;
      default:
        return;
    }

    this.header.append(this.createGreetings(`Hello, ${selectedUser.value}`));
    this.closeAuthModal();
  }

  signOut() {
    localStorage.removeItem('userRole');
    location.reload();
  }

  init(notes) {
    let cell = null;
    let cellsData = this.table.getElementsByTagName('td');
    for (let i = 0; i < cellsData.length; i++) {
      cellsData[i].innerHTML = '';
    }
    notes.forEach(note => {
      cell = this.table.rows[note.row + 1].cells[note.col + 1];
      const item = cell.getElementsByTagName('section');
      if (item.length === 0) {
        cell.append(this.createNote(note));
      }
    });
    const items = this.table.querySelectorAll('button[data-action="delete"]');
    !this.formState.isAdmin &&
      items.forEach(item => {
        item.style.display = 'none';
      });
  }

  nothingsFound() {
    let cellsData = this.table.getElementsByTagName('td');
    for (let i = 0; i < cellsData.length; i++) {
      cellsData[i].innerHTML = '';
    }
  }
}
