// 通用事件绑定方法(封装成类，兼容 IE)
class EventBind {
  constructor(element) {
    this.element = element;
  }

  static preventDefault(e) {
    e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  }

  static stopPropgation(e) {
    e.stopPropgation ? e.stopPropgation() : (e.cancelBubble = true);
  }

  addEventListener(type, handler) {
    const { element } = this;

    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, () => handler.call(element));
    } else {
      element["on" + type] = handler;
    }
  }

  removeEventListener(type, handler) {
    const { element } = this;

    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, () => handler.call(element));
    } else {
      element["on" + type] = null;
    }
  }

  on(type, selector, handler) {
    const { element } = this;

    if (element.addEventListener) {
      element.addEventListener(type, (e) => {
        const event = e || window.event;
        const target = event.target || event.srcElement;

        selector
          ? target.matches(selector) && handler.call(target, event)
          : handler.call(target, event);
      });
    }

    if (element.detachEvent) {
      element.detachEvent(type, (e) => {
        const event = e || window.event;
        const target = event.target || event.srcElement;

        selector
          ? target.matches(selector) && handler.call(target, event)
          : handler.call(target, event);
      });
    }
  }
}
