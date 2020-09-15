export default class SortableTable {
  element;
  subElements = {};
  header = [];
  data = [];

  sortByClick = event => {
    const column = event.target.closest('[data-sortable="true"]');
    const switchOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc'
      };

      return orders[order];
    };

    if (column) {
      const { id, order } = column.dataset;
      const sortedData = this.sortData(id, switchOrder(order));
      const arrow = column.querySelector('.sortable-table__sort-arrow');

      column.dataset.order = switchOrder(order);

      if (!arrow) {
        column.append(this.subElements.arrow);
      }

      this.subElements.body.innerHTML = this.getTableRows(sortedData);
    }
  };

  constructor(
    header, 
    {data = [], 
    sorted = {
      id: header.find(item => item.sortable).id,
      order: 'asc'
    }} = {}) {
    this.header = header;
    this.data = data;
    this.sorted = sorted;
    this.render();
  }

  getTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.header.map(({id, title, sortable}) => {
        const order = this.sorted.id === id ? this.sorted.order : 'asc';
        return `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${order}">
                  <span>${title}</span>
                  ${this.getHeaderSortingArrow(id)}
              </div>`;
      }).join('')}
      </div>`;
  }

  getHeaderSortingArrow (id) {
    const isOrderExist = this.sorted.id === id ? this.sorted.order : '';

    return isOrderExist
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : '';
  }

  getTableBody(data) {
    return `
            <div data-element="body" class="sortable-table__body">
              ${this.getTableRows(data)}
            </div>`;
  }

  getTableRows(data) {
    return data.map((dataItem) => {
      return `<div class="sortable-table__row">
      ${this.header.map(({id, template}) => {
        if (template) {
          return template(dataItem[id]);
        } else {
          return `<div class="sortable-table__cell">${dataItem[id]}</div>`;
        }
      }).join('')}
      </div>`
    }).join('');
  }

  getHeaderSortingArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;
  }

  getFullTable(data) {
    return `<div class="sortable-table">
              ${this.getTableHeader()}
              ${this.getTableBody(data)}
            </div>`;
  }

  render() {
    const {id, order} = this.sorted;
    const element = document.createElement('div');
    const sortedData = this.sortData(id, order);

    element.innerHTML = this.getFullTable(sortedData);

    this.element = element.firstChild;

    this.subElements = this.getSubElements(this.element);

    this.initEventListeners();

  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.sortByClick);
  }

  sortData(field, order) {
    const dataToSort = [...this.data];
    const column = this.header.find(item => item.id === field);
    const {sortType = 'number', customSorting} = column;
    const direction = order === 'asc' ? 1 : -1;

    return dataToSort.sort((a, b) => {
      switch (sortType) {
      case 'string':
        return direction * a[field].localeCompare(b[field], 'ru');
      case 'number':
        return direction * (a[field] - b[field]);
      case 'custom':
        return direction * customSorting(a, b);
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}