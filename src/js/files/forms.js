import { openModalResult } from "./modal-form.js";
import { hiddenModal } from "./modal-form.js";

function formInit() {
	const forms = document.querySelectorAll('form');
	const popup = document.querySelector('#modal');

	document.addEventListener("keydown", e => {
		if (e.code === 'Escape') {
			hiddenModal();
		}
	});

	forms.forEach(form => {
		bindPostData(form);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
		method: "POST",
		headers: {
			'Content-type': 'application/json',
		}, 
		body: data,
		});

		return await res.json();
  };

	function bindPostData(form) {
		form.addEventListener("submit", e => {
			e.preventDefault();
			
			let error = formValidate(form);

			if (error === 0) {
				form.parentElement.classList.add('_sending');

				const formData = new FormData(form);
				const json = JSON.stringify(Object.fromEntries(formData.entries()));

				if (form.hasAttribute('data-reg')) {
					postData('server-reg.php', json)
					.then(data => {
						form.parentElement.classList.remove('_sending');
						openModalResult({
                            modal: '#modal', 
                            pathImg: 'img/icons/done.svg',
                            title: 'Мы отправили ссылку для подтверждения регистрации на указанный e-mail',
                            text: 'Пожалуйста, перейдите по ссылке для окончания регистрации',
                        });
					}).catch(() => {
						form.parentElement.classList.remove('_sending');
						openModalResult({
                            modal: '#modal', 
                            pathImg: 'img/icons/done.svg',
                            title: 'Произошла ошибка',
                        });
					}).finally(() => {
						form.reset();
					});
				}
 
				if (form.hasAttribute('data-remind-form')) {
					postData('server-remind.php', json)
					.then(data =>{ 
						form.parentElement.classList.remove('_sending');
						openModalResult({
                            modal: '#modal', 
                            pathImg: 'img/icons/message-arrow.svg',
                            title: 'Мы отправили ссылку для восстановления пароля на указанный e-mail',
                            btn: `<button data-switching class="form-registration__btn btn-form" type="submit"><span>Войти</span></button>`,
                        });
					}).catch(() => {
						form.parentElement.classList.remove('_sending');
						openModalResult({
                            modal: '#modal', 
                            pathImg: 'img/icons/message-arrow.svg',
                            title: 'Произошла ошибка',
                            btn: `<button data-switching data-come class="form-registration__btn btn-form" type="submit"><span>Войти</span></button>`,
                        });
					}).finally(() => {
						form.reset();
					});
				}

				if (form.hasAttribute('data-consult')) {
					postData('server-consultation.php', json)
					.then(data => {
						form.parentElement.classList.remove('_sending');
						openModalResult({
                            modal: '#modal', 
                            pathImg: 'img/icons/done.svg',
                            title: 'Отлично! мы получили ваш запрос и скоро свяжемся с вами',
                        });
					}).catch(() => {
						form.parentElement.classList.remove('_sending');
						openModalResult({
                            modal: '#modal', 
                            pathImg: 'img/icons/done.svg',
                            title: 'Произошла ошибка',
                        });
					}).finally(() => {
						form.reset();
					});
				}

				if (form.hasAttribute('data-come-in')) {
					postData('server-come.php', json)
					.then(data => {
						form.parentElement.classList.remove('_sending');
					}).catch(() => {
						form.parentElement.classList.remove('_sending');
						openModalResult({
                            modal: '#modal', 
                            pathImg: 'img/icons/done.svg',
                            title: 'Произошла ошибка',
                        });
					}).finally(() => {
						form.reset();
					});
				}
				
			}	
		});
	}


	//валидация
	function formValidate(form) {
		let error = 0;
		let formReq = form.querySelectorAll('[data-req]');

		formReq.forEach(input => {
			formRemoveError(input);
			removeErrorInscription(input)

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					addErrorInscription(input);
					error++;
				}
			}
		
			if (input.classList.contains('_password')) {
				if (!passwordTest(input)) {
					formAddError(input);
					addErrorInscription(input);
					error++;
				}
			}

			if (input.classList.contains('_obligatory')) {
				if (input.value.trim() == '') {
					formAddError(input);
					addErrorInscription(input);
					error++;
				}
			}

			if (input.classList.contains('_phone')) {
				if (isNumber(input)) {
					formAddError(input);
					addErrorInscription(input);
					error++;
				}
			}

			if (input.classList.contains('_repeat-password')) {
				if (input.value != form.querySelector('._password-reg').value) {
					formAddError(input);
					addErrorInscription(input);
					error++;
				}
			}

			if (input.classList.contains('_password-reg')) {
				if (input.value.length < 6) {
					formAddError(input);
					addErrorInscription(input);
					error++;
				}
			}

			
		});

		return error;
	}

	// проверяем на правильность емейл
	function emailTest (input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	// проверяем на правильность етелефон
	function isNumber(n) {
		return !(!isNaN(parseFloat(n.value)) && isFinite(n.value));
	}

	function passwordTest(input) {
		if (input.value == 123) {
			return true
		}
	}
 
	// добавляем ошибку на страницу
	function addErrorInscription(input) {
		if (input.nextElementSibling === null || !input.nextElementSibling.classList.contains('error')) {
			input.insertAdjacentHTML("afterend", `
				<div class="error">${input.getAttribute('data-error')}</div>
			`);
		}
	}

	// удаляем ошибку со страницы
	function removeErrorInscription(input) {
		if (input.nextElementSibling != null && input.nextElementSibling.classList.contains('error')) {
			input.nextElementSibling.remove();
		}
	}

	//Показ ошибки
	function formAddError(input) {
		input.parentElement.classList.add('_error');
	}

	//Удаление ошибки
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');	
	}
}

export default formInit;