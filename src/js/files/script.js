import { isMobile } from './functions.js';
import { addClass } from './functions.js';
import { removeClass } from './functions.js';

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", documentEvents);

  function documentEvents(e) {
    const targetEl = e.target;

    if (isMobile.any()) {
      //* Оживление support-btn на touchscreen
      if (targetEl.closest('.support-btn')) {
        addClass('.support-btn', '_hover');
      }
      if (!targetEl.closest('.support-btn')) {
        removeClass('.support-btn', '_hover');
      }

      if (targetEl.closest('.bottom-header-main__btn')) {
        addClass('.bottom-header-main__btn', '_hover');
      }

      if (!targetEl.closest('.bottom-header-main__btn')) {
        removeClass('.bottom-header-main__btn', '_hover');
      }
    }
  }

  //* Изменение хедера при прокрутке
  const headerElement = document.querySelector('.header');

  const callback = function(entries, observer) {
    if (entries[0].isIntersecting) {
      headerElement.classList.remove('_scroll');
    } else {
      headerElement.classList.add('_scroll');
    }
  };

  const headerObserver = new IntersectionObserver(callback);
  headerObserver.observe(headerElement);

});

