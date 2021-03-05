import shortid from 'shortid';
import { alert, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import users from '../users.json';
import ServiceAPI from './services/service-api';
import customDecorator from './helpers/decorator';

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

  @customDecorator
  async getEvents(callback) {
    this.items;
    await service.getAllEvents().then(result => {
      result &&
        result
          .map(obj => JSON.parse(obj.data))
          .forEach(el => this.items.push(el));
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

  @customDecorator
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
    let checkTime;
    if (this.items !== null) {
      checkTime = this.items.some(
        el => el.dayOfWeek === item.dayOfWeek && el.time === item.time,
      );
      if (!checkTime) {
        this.items.push(item);
        service
          .addEvent({
            data: JSON.stringify(item),
          })
          .then(result => {
            success({
              text: 'Added new event.',
              closerHover: false,
              delay: 1000,
            });
            return result.data;
          });
      } else {
        alert('Failed to create an event! Time slot is already booked');
      }
    }
  }

  @customDecorator
  initUser() {
    service.getAllUsers().then(result => {
      if (result.data === null) {
        for (let i = 0; i <= users.length; i += 1) {
          service
            .initUsers({
              data: `${users[i].data}`,
            })
            .then(res => {
              return res;
            });
        }
      }
    });
  }
  @customDecorator
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
      service.deleteEvent(idObj).then(() => {
        success({
          text: 'Deleted.',
          closerHover: false,
          delay: 1000,
        });
        return;
      });
      return;
    });
    this.items = this.items.filter(item => item.id !== id);
  }
}
