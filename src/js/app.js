import * as functions  from "./files/functions.js";
import modalForm from './files/modal-form.js'
import formInit from "./files/forms.js";
// import * as scroll from "./files/scroll.js";

functions.isWebp();
functions.ibg();



// Динамичесский адаптив
import "./files/dynamic_adapt.js";

//меню бургер
functions.menuInit();

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
// functions.tabs();

//Плавная прокрутка к нужному блоку
// scroll.pageNavigation();

//Подключение своего кода

import "./files/search.js";
import "./files/script.js";
