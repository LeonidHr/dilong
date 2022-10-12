import { addClass } from './functions.js';
import { removeClass } from './functions.js';
import formInit from './forms.js';

function modalForm() {
  document.querySelector('.header').addEventListener("click", headerActions);

  function headerActions(e) {
    const targetEl = e.target;

    if (targetEl.closest('#modal-exit') || !targetEl.closest('#modal-form')) {
      hiddenModal();
    }

    if (targetEl.closest('[data-come]')) {
      openModalCome(document.querySelector('#modal'));
    }

    if (targetEl.closest('[data-register]')) {
      openModalRegister(document.querySelector('#modal'));
    }

    if (targetEl.closest('[data-remind]')) {
      openModalRemind(document.querySelector('#modal'));
    }

    if (targetEl.closest('[data-switching]')) {
      document.querySelector('#modal-form').classList.remove('open');
      document.querySelector('#modal-form').classList.add('open');
    }

  }

  function openModalCome(modal) {
    showModal();

    modal.innerHTML = `
      <div id="modal-form" class="form-registration modal__form-registration">
        <h3 class="form-registration__title modal__title">Войти</h3>
        <div class="form-registration__text modal__text">
          <span>Нет аккаунта?</span>
          <button data-switching data-register type="text"> Зарегистрироваться</button>
        </div>
        <form data-come-in class="form-registration__form form-registration__form_gap12 registration__form-form" action="#" name="form">
          <div class="form-registration__item">
            <input class="form-registration__input _email" data-error="Некорректно введен E-mail" data-req autocomplete="off" type="text" name="email" placeholder="E-mail *">
          </div>
          <div class="form-registration__item">
            <input class="form-registration__input _password" data-error="Неверный пароль" data-req autocomplete="off" type="password" name="password" placeholder="Пароль *">
          </div>
          <div class="form-registration__text modal__text modal__text_in-form">
            <button data-switching data-remind type="button">Напомнить пароль</button>
          </div>
          <button data-switching class="form-registration__btn form-registration__btn_strech btn-form" type="submit"><span>Войти</span></button>
        </form>
        <button id="modal-exit" class="_icon-exit modal-exit" type="button"></button> 
      </div>
    `;  

    formInit();
  }

  function openModalRegister(modal) {
    showModal();

    modal.innerHTML = `
      <div id="modal-form" class="form-registration modal__form-registration">
        <h3 class="form-registration__title modal__title">Создать аккаунт</h3>
        <div class="form-registration__text modal__text">
          <span>Есть аккаунт?</span>
          <button data-switching data-come type="text"> Войти</button>
        </div>
        <form data-reg class="form-registration__form form-registration__form_gap12 registration__form-form" action="#" name="form">
          <div class="form-registration__item">
            <input class="form-registration__input _obligatory" data-error="Нужно заполнить это поле" data-req autocomplete="off" type="text" name="your-name" placeholder="Ваше имя *">
          </div>
          <div class="form-registration__item">
            <input class="form-registration__input _obligatory" data-error="Нужно заполнить это поле" data-req autocomplete="off" type="text" name="company" placeholder="ИНН организации *">
          </div>
          <div class="form-registration__item">
            <input class="form-registration__input _email" data-error="Некорректно введен E-mail" data-req autocomplete="off" type="text" name="email" placeholder="E-mail *">
          </div>
          <div class="form-registration__item">
            <input class="form-registration__input _phone" data-error="Некорректный номер" data-req autocomplete="off" type="text" name="phone" placeholder="Номер телефона *">
          </div>
          <div class="form-registration__item">
            <input class="form-registration__input _password-reg" data-error="Придумайте пароль посложней" data-req autocomplete="off" type="password" name="password" placeholder="Пароль *">
            <div class="form-registration__text modal__text">
              <span>Минимум 6 символов</span>
            </div>
            </div>
          <div class="form-registration__item">
            <input class="form-registration__input _repeat-password" data-error="Пароль не совпадает" data-req autocomplete="off" type="password" name="repeat-password" placeholder="Повторите пароль *">
          </div>
          <div class="form-registration__item form-registration__item_checkbox">
            <input class="form-registration__checkbox" checked id="checkbox" type="checkbox" name="checkbox">
            <label class="form-registration__label" for="checkbox"><span>Подписаться на рассылку акций</span></label>
            </div>
          <button data-switching class="form-registration__btn form-registration__btn_strech btn-form" type="submit"><span>Зарегистрироваться</span></button>
        </form>
        <button id="modal-exit" class="_icon-exit modal-exit" type="button"></button> 
        <p class="form-registration__text">
          <span>Регистрируясь, я соглашаюсь с условиями</span>
          <a class="form-registration__text-link" href="#"> Политики конфиденциальности</a>
        </p>  
      </div>
    `;

    formInit();
  }

  function openModalRemind(modal) {
    showModal();

    modal.innerHTML = `
      <div id="modal-form" class="form-registration modal__form-registration">
        <h3 class="form-registration__title modal__title">Напомнить пароль</h3>
        <div class="form-registration__text modal__text">
          <span>Есть аккаунт?</span>
          <button data-switching data-come type="text"> Войти</button>
        </div>
        <form data-remind-form class="form-registration__form form-registration__form_gap12 registration__form-form" action="#" name="form">
          <div class="form-registration__item">
            <input class="form-registration__input _email" data-req data-error="Некорректно введен E-mail" autocomplete="off" type="text" name="email" placeholder="E-mail *">
          </div>
          <button data-switching class="form-registration__btn form-registration__btn_strech btn-form" type="submit"><span>Отправить пароль</span></button>
        </form>
        <button id="modal-exit" class="_icon-exit modal-exit" type="button"></button> 
      </div>
    `;

    formInit();
  }

}

export function openModalResult({modal, pathImg, title, text, btn}) {
  showModal();

  document.querySelector(modal).innerHTML = `
    <div id="modal-form" class="form-registration modal__form-registration">
      <button id="modal-exit" class="_icon-exit modal-exit" type="button"></button> 
      <div class="success-img">
        <img src="${pathImg}" alt="Icon done"/>
      </div>
      <h3 class="form-registration__title modal__title success-title">${title}</h3>
      <div class="form-registration__text modal__text">
        <button class="success-text" type="button">${text ? text : ''}</button> 
      </div>
      ${btn ? btn : ''}
    </div>
  `;
  
  document.querySelector('#modal-form').classList.add('open');
  formInit();
}

function showModal() {
  addClass('.modal', 'modal-open');
  document.documentElement.classList.add('lock');
}
function hiddenModal() {
  removeClass('.modal', 'modal-open');
  document.documentElement.classList.remove('lock');
}

export default modalForm;