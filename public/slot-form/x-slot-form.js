import './x-slot-form.css';
import template from './x-slot-form.html';

import eventsService from '../services/events.service.js';

class XSlotForm extends HTMLElement {

  createdCallback() {
    this.innerHTML = template;

    this.slotColumn = this.querySelector('#slot-column');
    this.slotName = this.querySelector('#slot-name');

    this.querySelector('#add-slot')
      .addEventListener('click', this.onClickAddSlot.bind(this), false);
    this.querySelector('#add-slot')
      .addEventListener('submit', this.onClickAddSlot.bind(this), false);
    this.querySelector('#reset-event')
      .addEventListener('click', this.onClickResetSlot.bind(this), false);
  }

  onClickAddSlot(e) {
    e.preventDefault();
    let event;
    // l'utilisation de require.ensure ne fonctionne pas tel quel
    // necessiterai plus de temps pour trouver comment le faire fonctionner
    // require.ensure([], () => { // eslint-disable-line no-undef
    //   const eventsService = require('../services/events.service.js'); // eslint-disable-line no-undef
    //   event = eventsService.handleAddSlotEvent(this.slotColumn.value, this.slotName.value);
    // });
    event = eventsService.handleAddSlotEvent(this.slotColumn.value, this.slotName.value);
    if (event && event.detail && event.detail.name && event.detail.slot) {
      this.dispatchEvent(event);
      this.reset();
    }
  }

  onClickResetSlot(e) {
    e.preventDefault();
    const event = new CustomEvent('reset-event', {
      detail: {
        slot: this.slotColumn.value
      }
    });
    if (event.detail.slot) {
      this.dispatchEvent(event);
      this.reset();
    }
  }

  reset() {
    this.slotColumn.value = 1;
    this.slotName.value = '';
  }
}

document.registerElement('x-slot-form', XSlotForm);

