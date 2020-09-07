export default class ColumnChart {
  subElements = {}; // HTMLElement;
    chartHeight = 50;
  
    constructor({data=[], label='', value = 0, link = ''} = {}) {
      this.data = data;
      this.label = label;
      this.value = value;
      this.link = link;
      this.render();
      this.initEventListeners();
    }
  
    initEventListeners() {}

    createLink() {
      if (this.link) {
        return `<a class="column-chart__link" href="${this.link}">View all</a>`
      }

      return ''
    }

    checkData() {
      if (this.data.length === 0) {
        return `column-chart_loading`
      }

      return ''
    }

    getTemplate() {
      return `<div class="column-chart ${this.checkData()}" style="--chart-height: 50">
                <div class="column-chart__title">
                  Total ${this.label}
                  ${this.createLink()}
                </div>
                <div class="column-chart__container">
                  <div data-element="header" class="column-chart__header">
                    ${this.value}
                  </div>
                  <div data-element="body" class="column-chart__chart">
                    ${this.getColumn(this.data)}
                  </div>
                </div>
              </div>`
    }

    getColumn(data) {
        const max = Math.max(...data);
        
        return data.map((item) => {
          const scale = Math.floor(item*this.chartHeight/max);
          const percent = Math.round(item/max*100)
          return `<div style="--value:${scale}" data-tooltip="${percent}%"></div>`
        }).join('');
    }

    getSubElements(element) {
        const childNodes = element.querySelectorAll('[data-element]');
        return [...childNodes].reduce((accum, subElement) => {
          accum[subElement.dataset.element] = subElement;
          return accum
        },{})
    }
  
    render() {
      const element = document.createElement('div');
      
      element.innerHTML = this.getTemplate();

      this.element = element.firstChild;
      this.subElements = this.getSubElements(this.element);
    }

    update(data) {
      this.subElements.body.innerHTML = this.getColumn(data);
    }
  
    remove () {
      this.element.remove();
    }
  
    destroy() {
      this.remove();
      this.element = null;
      this.subElements = {}
    }
}
