import EventEmitter from './services/event-emitter';

export default class View extends EventEmitter {
  constructor() {
    super();
    this.formState = {
      nameOfMemberValue: '',
    };
    this.container = document.querySelector('.container');
    this.form = document.querySelector('.form');
    this.main = document.querySelector('.main-content');
    this.modal = document.querySelector('.modal-window');

    this.selectNameMember = this.form.querySelector('.select--name');
    this.createModalForm = this.modal.querySelector('.modal-form');

    this.addNoteBtn = document.querySelector('button[data-action="add-note"]');

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
  }

  onInput(e) {
    this.formState.inputValue = e.target.value;
    this.emit('filter', this.formState);
  }

  onSelectNameMemberChange(e) {
    this.formState.nameOfMemberValue = e.target.value;
    this.emit('filter', this.formState);
  }

  handleAdd(e) {
    e.preventDefault();
    const title = this.modal.querySelector('.modal-form__input');
    const dayOfWeek = this.modal.querySelector('.modal-form__select-day');
    const time = this.modal.querySelector('.modal-form__select-time');
    const name = this.modal.querySelector('#multiple-checkboxes');

    let selected = Array.from(name.options).filter(function (name) {
      return name.selected;
    }).map(function (option) {
      return option.value;
    });

    if (!title.value) {
      alert('Please, fill the field!');
    } else {
      const note = {
        title: title.value.length > 15 ?
          title.value.slice(0, 16) + '...' :
          title.value,
        dayOfWeek: dayOfWeek.value,
        time: time.value,
        name: selected,
      };

      this.emit('add', note);
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

    const time = this.createDOMElement('span', null, note.time, 'item__time');
    const name = this.createDOMElement('span', null, note.name, 'item__name');

    const dayOfWeek = this.createDOMElement(
      'span',
      null,
      note.dayOfWeek,
      'item__dayOfWeek',
    );

    const buttonDelete = this.createDOMElement(
      'button',
      ['action', 'delete'],
      '',
      'button-delete'
    );

    buttonsContainer.append(time, name, dayOfWeek, buttonDelete);
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
    this.emit('delete', parent.dataset.id);
  }

  deleteNote(id) {
    const item = this.table.querySelector(`[data-id="${id}"]`);
    item.closest('section').remove();
  }

  openEditModal(note) {
    this.container.classList.add('modal--edit-show');
    const title = this.editModal.querySelector('.modal-form__input');
    title.value = note.title;
  }

  openCreateModal() {
    this.container.classList.add('modal--show');
  }

  closeCreateModal() {
    this.container.classList.remove('modal--show');
  }

  closeEditModal() {
    this.container.classList.remove('modal--edit-show');
  }

  updateNote(id, {
    title
  }) {
    const elTitle = this.noteList.querySelector(
      `.item[data-id="${id}"] .item__title`,
    );

    elTitle.textContent = title;
  }

  init(notes) {
    let cell = null;
    console.log('notes', notes);

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
  }

  nothingsFound() {
    let cellsData = this.table.getElementsByTagName('td');
    for (let i = 0; i < cellsData.length; i++) {
      cellsData[i].innerHTML = '';
    }
  }
}
