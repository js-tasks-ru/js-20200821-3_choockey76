export default class SortableTable {
  element;
  subElements = {};
  header = [];
  data = [];

  constructor(header, {data = []} = {}) {
    this.header = header;
    this.data = data;
    this.render();
  }

  getTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.header.map(({id, title, sortable}) => {
        return `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
                  <span>${title}</span>
                  ${this.getHeaderSortingArrow()}
              </div>`;
      }).join('')}
      </div>`;
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
    const element = document.createElement('div');

    element.innerHTML = this.getFullTable(this.data);

    this.element = element.firstChild;

    this.subElements = this.getSubElements(this.element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getTableRows(sortedData);
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

