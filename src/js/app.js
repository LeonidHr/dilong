import * as functions  from "./files/functions.js";
import modalForm from './files/modal-form.js'
import formInit from "./files/forms.js";
import pagination from "./files/pagination.js";
import search from "./files/search.js";
// import * as scroll from "./files/scroll.js";

functions.isWebp();
functions.ibg();



// Динамичесский адаптив
import "./files/dynamic_adapt.js";

//меню бургер
functions.menuInit();

//поиск на странице документов
search({
    inputClass: '.search-documents__input',
    inputBtnClass: '.search-documents__btn',
    resultContainerClass: '.documents__body',
    urlJson: './json/documents.json',
    isDocs: true
});

// фильтр на странице документов
search({
    filterBtnClass: '.type-documents__item-btn',
    filterContainerClass: '.type-documents__list',
    resultContainerClass: '.documents__body',
    urlJson: './json/documents.json',
    isDocs: true
});

//работа с пагинацией
pagination();

// модалка
modalForm();

//работа с формой
formInit();

//споллеры
functions.spollers();

//Паралакс
// import "./files/parallax-mouse.js";
// import "./files/rellax.js";

//gallery
// import "./files/gallery.js";

//datepicker
// import "./files/datepicker/js";

//swiper
import "./files/sliders.js";

//tabs
functions.tabs();

//Плавная прокрутка к нужному блоку
// scroll.pageNavigation();

//Подключение своего кода

import "./files/search-header.js";
import "./files/script.js";
