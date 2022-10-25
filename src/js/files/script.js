import { isMobile } from './functions.js';
import { addClass } from './functions.js';
import { removeClass } from './functions.js';
import { changeBtns } from './functions.js';

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
    if (targetEl.closest('.type-documents__item-btn')) {
      changeBtns(targetEl, '.type-documents__btn-span', '.type-documents__item', '.type-documents__list');
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


  //* Добавление иконки в навигации на странице доставки и оплаты

  function showIconOnNav() {
    const sidebarItems = document.querySelectorAll('.sidebar-nav__item');
    sidebarItems.forEach(item => {
      if (item.lastElementChild.innerHTML === document.title ) {
        item.classList.add('_active');
      }
    });
  }
  showIconOnNav();

  //* Добавление при фокусе форме поиска outline
  
  function addFocusForSearchForm() {
    const input = document.querySelector('.search-header__input');

    input.addEventListener("focus", () => {
      input.parentElement.classList.add('_focus');
    });
    input.addEventListener("blur", () => {
      input.parentElement.classList.remove('_focus');
    });
  }

  addFocusForSearchForm();
});

