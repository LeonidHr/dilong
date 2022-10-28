import pagination from "./pagination.js";

function search({
    inputClass,
    inputBtnClass,
    filterBtnClass,
    filterContainerClass, 
    resultContainerClass, 
    urlJson, 
    isDocs}) {
    
    const input = document.querySelector(inputClass),
          inputBtn = document.querySelector(inputBtnClass),
          resultContainer = document.querySelector(resultContainerClass),
          filterBtn = document.querySelector(filterBtnClass),
          filterContainer = document.querySelector(filterContainerClass);

    if (input || inputBtn) {
        inputBtn.addEventListener("click", searchElems);
        input.addEventListener("input", e => {
            if (input.value == '') {
                if (document.title === 'Документы и сертификаты') {
                    pagination({
                        urlJson: './json/documents.json',
                        posts: 10, 
                        isDocs: true, 
                        postsContainerClass: '.documents__body'
                    });
                } else if (document.title === 'База знаний') {
                    pagination({
                        urlJson: './json/base.json',
                        posts: 5, 
                        isDocs: false, 
                        postsContainerClass: '.base__content'
                    });
                }
                
            }
        });
    } else if (filterBtn || filterContainer) {
        filterContainer.addEventListener("click", searchElems);
    }
    

    const getData = async(url) => {
        const response = await fetch(url);
        return await response.json();
    }

    async function searchElems(e) {
        const postsData = await getData(urlJson);
        resultContainer.innerHTML = '';

        postsData.forEach(item => {
            let searchItem;

            if (isDocs) {
                searchItem = `
                    <div class="documents__document document-documents">
                        <div class="document-documents__icon _icon-pdf"></div>
                        <div class="document-documents__content">
                        <div class="document-documents__title">${item.name}</div>
                        <a class="document-documents__btn" href="${item.path}" download>Скачать</a>
                        </div>
                    </div>
                `;
            } else {
                searchItem = `
                    <article class="base__article article-base">
                        <a class="article-base__img" href="#">
                            <img src="${item.imgPath}" alt="${item.name}">
                        </a>
                        <div class="article-base__content">
                            <div class="article-base__label">${item.label}</div>
                            <a class="article-base__title" href="#">${item.name}</a>
                            <div class="article-base__text">
                                <p>
                                    ${item.text}
                                </p>
                            </div>
                            <a class="article-base__link" href="#">Читать полностью →</a>
                        </div>
                    </article>
                `;
            }

            if (input || inputBtn) {
                if (item.name.toLowerCase() == input.value.toLowerCase()) {
                    resultContainer.insertAdjacentHTML("beforeend", searchItem);
                }
            } else if (filterBtn || filterContainer) {
                if (item.filter == e.target.dataset.filter) {
                    resultContainer.insertAdjacentHTML("beforeend", searchItem);
                } else if (e.target.dataset.filter === 'all') {
                    if (document.title === 'Документы и сертификаты') {
                        pagination({
                            urlJson: './json/documents.json',
                            posts: 10, 
                            isDocs: true, 
                            postsContainerClass: '.documents__body'
                        });
                    } else if (document.title === 'База знаний') {
                        pagination({
                            urlJson: './json/base.json',
                            posts: 5, 
                            isDocs: false, 
                            postsContainerClass: '.base__content'
                        });
                    }
                }
            }
            
        });
    }
}

export default search;