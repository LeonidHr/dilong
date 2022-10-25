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
                pagination();
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

        postsData.docs.forEach(item => {
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
            }

            if (input || inputBtn) {
                if (item.name == input.value) {
                    resultContainer.insertAdjacentHTML("beforeend", searchItem);
                }
            } else if (filterBtn || filterContainer) {
                if (item.filter == e.target.dataset.filter) {
                    resultContainer.insertAdjacentHTML("beforeend", searchItem);
                } else if (e.target.dataset.filter === 'all') {
                    pagination();
                }
            }
            
        });
    }
}

export default search;