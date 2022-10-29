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

if (document.title === 'Документы и сертификаты') {
    pagination({
        urlJson: './json/documents.json',
        posts: 10, 
        isDocs: true, 
        postsContainerClass: '.documents__body'
    });
    
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
}

if (document.title === 'База знаний') {
    pagination({
        urlJson: './json/base.json',
        posts: 5, 
        isDocs: false, 
        postsContainerClass: '.base__content'
    });

    //поиск на странице базы
    search({
        inputClass: '.search-documents__input',
        inputBtnClass: '.search-documents__btn',
        resultContainerClass: '.base__content',
        urlJson: './json/base.json',
        isDocs: false
    });

    // фильтр на странице базы
    search({
        filterBtnClass: '.type-documents__item-btn',
        filterContainerClass: '.type-documents__list',
        resultContainerClass: '.base__content',
        urlJson: './json/base.json',
        isDocs: false
    });
}

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
