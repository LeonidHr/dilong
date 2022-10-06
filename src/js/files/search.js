document.querySelector('header').addEventListener("click", e => {
  const targetElement = e.target;

  if (targetElement.classList.contains('search-header__delete')) {
    document.querySelector('.search-header').classList.remove('_show');
    document.querySelector('.search-header__form').reset();
  }
});

function showSearchResult() {
  const input = document.querySelector('.search-header__input'),
        searchHeader = document.querySelector('.search-header');

  input.addEventListener("input", () => {
    searchHeader.classList.add('_show');
    
    if (input.value == '') {
      searchHeader.classList.remove('_show');
    }
  });
}
showSearchResult();