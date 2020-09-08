export default class NotificationMessage {
  array = []
  constructor(message = '', {duration = 0, type=''} = {}) {

    if (NotificationMessage.visibleElem) {
      NotificationMessage.visibleElem.remove();
    }

    this.message = message;
    this.duration = duration;
    this.type = type;
    this.render()
  }

  getTemplate() {
    return `<div class="notification ${this.type}" style="--value:${this.duration/1000}s">
              <div class="timer"></div>
              <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                  ${this.message}
                </div>
              </div>
            </div>`
  }

  render() {
      const element = document.createElement('div');
      
      element.innerHTML = this.getTemplate();

      this.element = element.firstChild;
      NotificationMessage.visibleElem = this.element;
  }

  show(node = document.body) {
      node.appendChild(this.element);
      setTimeout(() => {
       this.remove()
      }, this.duration);
  }

  remove() {
   this.element.remove()
  }

  destroy() {
    this.element = null;
  }
}
