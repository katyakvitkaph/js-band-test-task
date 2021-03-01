import shortid from 'shortid';
import ServiceAPI from './services/index';

const service = new ServiceAPI();
export default class Model {
  constructor(items = []) {
    this.items = items;
    this.selectedItemId = null;
    this.filteredItems = [];
  }

  filterItems(formState) {
    const isEmptyState = Object.values(formState).every(el => el === '');
    if (isEmptyState) {
      this.filteredItems = this.items;
    }
    if (
      formState.nameOfMemberValue !== '' &&
      formState.nameOfMemberValue !== 'All members'
    ) {
      this.filteredItems = this.filteredItems.filter(item =>
        item.name.filter(el => el === formState.nameOfMemberValue).join(''),
      );
    }
  }

  async getEvents(callback) {
    await service.getAllEvents().then(result => {
      let getObject;
      result &&
        (getObject = result
          .map(obj => JSON.parse(obj.data))
          .forEach(el => this.items.push(el)));
      return this.items;
    });
    callback();
  }

  findItem(id) {
    return this.items.find(item => item.id === id);
  }

  setSelectedItemId(id) {
    this.selectedItemId = id;
  }

  getSelectedItemId() {
    return this.selectedItemId;
  }

  addItem({ title, name, dayOfWeek, time }) {
    const timeOfDay = [
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const item = {
      id: shortid(),
      title,
      name,
      time,
      dayOfWeek,
      row: timeOfDay.indexOf(time),
      col: daysOfWeek.indexOf(dayOfWeek),
    };

    if (this.items !== null) {
      const checkTime = this.items.some(
        el => el.dayOfWeek === item.dayOfWeek && el.time === item.time,
      );
      !checkTime
        ? this.items.push(item)
        : alert('Failed to create an event! Time slot is already booked');
    }

    return item;
  }

  deleteItem(id) {
    let idObj;
    service.getAllEvents().then(result => {
      let getArrayOfStrings = result
        .map(el => el.data)
        .find(el => el.includes(id));
      let getObj = result
        .filter(el => el.data === getArrayOfStrings)
        .find(el => el.id);
      idObj = getObj.id;
      service.deleteEvent(idObj).then(result => {
        return;
      });
      return;
    });
    this.items = this.items.filter(item => item.id !== id);
  }
}
