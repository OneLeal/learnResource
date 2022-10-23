// 通用事件绑定方法(Chrome 标准、兼容事件代理)
function bindEvent(type, element, selector, handler) {
  if (handler == null) {
    handler = selector;
    selector = null;
  }

  element.addEventListener(type, (e) => {
    const event = e || window.event;
    const target = event.target || event.srcElement;

    selector
      ? target.matches(selector) && handler.call(target, event)
      : handler.call(target, event);
  });
}
