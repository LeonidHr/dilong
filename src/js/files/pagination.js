import { getData } from './functions.js';

function pagination({urlJson, posts, isDocs, postsContainerClass}) {
    
    async function main() {
        const postsData = await getData(urlJson);
        let currPage = 0;
        let rows = posts;
        const pages = Math.ceil(postsData.length / posts);

        function displayList(arrData, rowPerPage, page) {
            const postsContainer = document.querySelector(postsContainerClass);
            postsContainer.innerHTML = '';

            const start = rowPerPage * page,
                  end = start + rowPerPage;
            
            const paginatedData = arrData.slice(start, end);

            paginatedData.forEach(el => {
                let postEl;

                if (isDocs) {
                    postEl = `
                        <div class="documents__document document-documents">
                            <div class="document-documents__icon _icon-pdf"></div>
                            <div class="document-documents__content">
                                <div class="document-documents__title">${el.name}</div>
                                <a class="document-documents__btn" href="${el.path}" download>Скачать</a>
                            </div>
                        </div>
                    `;
                } else {
                    postEl = `
                        <article class="base__article article-base">
                            <a class="article-base__img" href="#">
                                <img src="${el.imgPath}" alt="${el.name}">
                            </a>
                            <div class="article-base__content">
                                <div class="article-base__label">${el.label}</div>
                                <a class="article-base__title" href="#">${el.name}</a>
                                <div class="article-base__text">
                                    <p>
                                        ${el.text}
                                    </p>
                                </div>
                                <a class="article-base__link" href="#">Читать полностью →</a>
                            </div>
                        </article>
                    `;
                }

                postsContainer.insertAdjacentHTML("beforeend", postEl);
            });
        }

        function displayPagination(arrData, pagesLength) {
            if (arrData.length > 10) {
                const paginationContainer = document.querySelector('.pagination-documents__nums');

                if (!paginationContainer.innerHTML) {
                    if (pagesLength <= 5) {
                        for (let i = 0; i < pagesLength; i++) {
                            const paginationBtn = `
                                <button class="pagination-documents__btn" data-pag-num type="button">${i + 1}</button>
                            `;
                            paginationContainer.insertAdjacentHTML("beforeend", paginationBtn);
                        }   
                    } else {
                        if (window.innerWidth >= 767.98) {
                            for (let i = 0; i < 5; i++) {
                                paginationContainer.insertAdjacentHTML("beforeend", `
                                    <button class="pagination-documents__btn" data-pag-num type="button">${i + 1}</button>
                                `);
                            }
                        } else {
                            for (let i = 0; i < 3; i++) {
                                paginationContainer.insertAdjacentHTML("beforeend", `
                                    <button class="pagination-documents__btn" data-pag-num type="button">${i + 1}</button>
                                `);
                            }
                        }
                        
                        paginationContainer.insertAdjacentHTML("beforeend", `
                            <button class="pagination-documents__btn" data-pag-dots type="button">...</button>
                        `);
                        paginationContainer.insertAdjacentHTML("beforeend", `
                            <button class="pagination-documents__btn" data-pag-num type="button">${pagesLength}</button>
                        `);
                    }
                }
            } else {
                document.querySelector('.pagination-documents').style.display = 'none';
            }
            addActive(null);
        }

        function addActive(e) {
            const btns = document.querySelectorAll('.pagination-documents__btn');
            
            if (e && e.target.closest('[data-pag-num]')) {
                removeActiveFromAll(btns);
                e.target.classList.add('_active');
            } else {
                removeActiveFromAll(btns);
                btns.forEach(btn => {
                    if (currPage + 1 == btn.innerHTML) {
                        btn.classList.add('_active');
                    }
                });
            }
        }

        function removeActiveFromAll(btns) {
            btns.forEach(btn => {
                btn.classList.remove('_active');
            });
        }

        function addMaxWidthForPagination() {
            const btnsLength = document.querySelector('.pagination-documents__nums').children.length;
            const maxWidthBtns = (btnsLength * 42) + (btnsLength * 8) + 72;
            document.querySelector('.pagination-documents').style.maxWidth = `${maxWidthBtns}px`;
        }

        document.querySelector('.pagination-documents').addEventListener("click", e => {

            if (e.target.closest('.pagination-documents__btn')) {
                addActive(e);
            }

            if (e.target.closest('[data-pag-next]') && currPage !== pages) {
                ++currPage;
                displayList(postsData, rows, currPage);
                addActive(null);
            }
            if (e.target.closest('[data-pag-prev]') && currPage !== 0) {
                --currPage;
                displayList(postsData, rows, currPage);
                addActive(null);
            }
            if (e.target.closest('[data-pag-num]')) {
               currPage = e.target.innerText; 
               --currPage;
               displayList(postsData, rows, currPage);
            }
            if (e.target.closest('[data-pag-dots]')) {
                currPage = e.target.previousElementSibling.innerText; 
                displayList(postsData, rows, currPage);
                addActive(null);
            }
        });

        displayList(postsData, rows, currPage);
        displayPagination(postsData, pages);
        addMaxWidthForPagination();
    }
    main();
}

export default pagination;