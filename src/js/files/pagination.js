function pagination() {
    const getData = async(url) => {
        const response = await fetch(url);
        return await response.json();
    }

    async function main() {
        const postsData = await getData('./json/documents.json');
        let currPage = 0;
        let rows = 10;
        const pages = Math.ceil(postsData.docs.length / 10);

        function displayList(arrData, rowPerPage, page) {
            const postsContainer = document.querySelector('.documents__body');
            postsContainer.innerHTML = '';

            //console.log(page);

            const start = rowPerPage * page,
                  end = start + rowPerPage;
            const paginatedData = arrData.slice(start, end);

            paginatedData.forEach(el => {
                const postEl = `
                    <div class="documents__document document-documents">
                        <div class="document-documents__icon _icon-pdf"></div>
                        <div class="document-documents__content">
                        <div class="document-documents__title">${el.name}</div>
                        <a class="document-documents__btn" href="${el.path}" download>Скачать</a>
                        </div>
                    </div>
                `;

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
                        for (let i = 0; i < 5; i++) {
                            paginationContainer.insertAdjacentHTML("beforeend", `
                                <button class="pagination-documents__btn" data-pag-num type="button">${i + 1}</button>
                            `);
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

        /*
        function displayPagClickOnDots(page, e) {
            const paginationContainer = document.querySelector('.pagination-documents__nums');
            const dots = Array.from(paginationContainer.children);
            
            for (let i = 0; i < 5; i++) {
                dots[i].remove();
            }

            //console.log(page);
            for (let i = page; i > page - 5; i--) {
                paginationContainer.insertAdjacentHTML("afterbegin", `
                    <button class="pagination-documents__btn" data-pag-num type="button">${i + 1}</button>
                `);
            }
        }
        */

        document.querySelector('.pagination-documents').addEventListener("click", e => {

            if (e.target.closest('.pagination-documents__btn')) {
                addActive(e);
            }

            if (e.target.closest('[data-pag-next]') && currPage !== pages) {
                ++currPage;
                displayList(postsData.docs, rows, currPage);
                addActive(null);
            }
            if (e.target.closest('[data-pag-prev]') && currPage !== 0) {
                --currPage;
                displayList(postsData.docs, rows, currPage);
                addActive(null);
            }
            if (e.target.closest('[data-pag-num]')) {
               currPage = e.target.innerText; 
               --currPage;
               displayList(postsData.docs, rows, currPage);
            }
            if (e.target.closest('[data-pag-dots]')) {
                currPage = e.target.previousElementSibling.innerText; 
                displayList(postsData.docs, rows, currPage);
                addActive(null);
                //displayPagClickOnDots(+currPage, e);
            }
        });

        displayList(postsData.docs, rows, currPage);
        displayPagination(postsData.docs, pages);
        addMaxWidthForPagination();
    }
    main();
}

export default pagination;