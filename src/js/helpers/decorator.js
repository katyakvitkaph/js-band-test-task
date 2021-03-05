import {success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';


export default function customDecorator (target, key, descriptor)  {
  descriptor.value = async function (...args) {
    try {
        success();
      return await descriptor.value.apply(this, args);
    } catch (error) {
        error({
            text: "Erorr! The event hasn't been added!",
            closerHover: false,
             delay: 1000
      
          });
    }
  };
  return descriptor;
};
