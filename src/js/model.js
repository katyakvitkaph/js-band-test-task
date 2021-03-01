import shortid from 'shortid';
import ServiceAPI from './services/index';


const service = new ServiceAPI();
export default class Model {
  constructor(items = []) {
    this.items = items;
    this.selectedItemId = null;
    this.filteredItems = [];
    console.log('   this.items1', this.items);
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

      this.filteredItems = this.filteredItems.filter(
        item =>
        item.name.filter(el => el === formState.nameOfMemberValue).join('')
      );

    }
  }

  async getEvents(func1) {
    console.log(' this.items getEvents1' ,  this.items); 
    await service.getAllEvents().then(result => {
      
      console.log('result' , result);
      let getObject = result.map(obj =>JSON.parse( obj.data))

      // let obj = JSON.parse(string);
      // console.log('obj' , obj)
      // for(let i = 0; i <= getObject.length) {
      //   let uniqObj = this..some(el => el.id === this.items.id);
      //   console.log('uniqObj', uniqObj);
      // }
       
        // !uniqObj && this.items.push(string[i]);
        getObject.forEach(el=> this.items.push(el))
        return this.items
      
    });
    console.log('this.items!!2', this.items);
    func1()
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

  addItem({
    title,
    name,
    dayOfWeek,
    time
  }) {
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
        ?
        this.items.push(item) :
        alert('Failed to create an event! Time slot is already booked');
    }

    return item;
  }

  deleteItem(id) {
    console.log('this.items DELTE', this.items);
    this.items = this.items.filter(item => item.id !== id);
  }
}
