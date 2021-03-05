import {
  success,
  error
} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';


export default function customDecorator(target, key, descriptor) {

  const original = descriptor.value;
  if (typeof original === 'function') {
    success({
      text: "Success!",
      closerHover: false,
      delay: 1000

    });

    descriptor.value = async function (...args) {
      try {
        return await original.apply(this, args);
      } catch (e) {
        error({
          text: "Erorr!",
          closerHover: false,
          delay: 1000

        });
      }
    }
  }
};
