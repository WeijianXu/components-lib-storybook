import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
interface HTMLELementPlus extends Window {
  attachEvent?: any;
  detachEvent?: any;
}
/* istanbul ignore next */
export const on = (function () {
  if (!isServer && !!document.addEventListener) {
    return function (element: HTMLELementPlus, event: any, handler: any, useCapture = false) {
      if (element && event && handler) {
        element.addEventListener(event, handler, useCapture);
      }
    };
  }
  return function (element: HTMLELementPlus, event: any, handler: any) {
    if (element && event && handler) {
      element.attachEvent('on' + event, handler);
    }
  };
})();

/* istanbul ignore next */
export const off = (function () {
  if (!isServer && !!document.removeEventListener) {
    return function (element: HTMLELementPlus, event: any, handler: any, useCapture = false) {
      if (element && event) {
        element.removeEventListener(event, handler, useCapture);
      }
    };
  } else {
    return function (element: HTMLELementPlus, event: any, handler: any) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
