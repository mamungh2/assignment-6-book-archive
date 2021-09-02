const showBooks = () => {

    // get input from search field
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // check if search field is empty or not
    if (searchText === '') {
        showFoundMessage('Please write something');
        document.getElementById('search-result').textContent = '';
        return;
    }
    else {
        toggleSpinner('block');
        toggleSearchResult('none');
        showFoundMessage('');
        document.getElementById('search-result').textContent = '';
    }
    // clear search field
    searchField.value = '';
    // fetching data from the server
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayBooks(data.docs));
}

const displayBooks = books => {
    // call function to display total searched items quantity
    showFoundMessage(`Total Found: ${books.length}`)
    // check if searched item in exist or not
    if (books.length === 0 || null) {
        showFoundMessage('No result found');
        toggleSpinner('none');
        document.getElementById('search-result').textContent = '';
        return;
    }
    // append searched item
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books?.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="Sorry no image">
                <div class="card-body">
                    <h5 class="card-title">${book?.title}</h5>
                    <h6>Author: ${book?.author_name?.[0] ?? 'unknown'}</h6>
                    <h6>First Published: ${book?.first_publish_year ?? 'unknown'}</h6>
                </div>
            </div>`;
        searchResult.appendChild(div);
        toggleSpinner('none');
        toggleSearchResult('flex');

    })
}

// function for showing results quantity
const showFoundMessage = message => {
    const foundMessage = document.getElementById('found-message');
    foundMessage.innerText = message;
}

// function for toggle spinner
const toggleSpinner = displayStatus => {
    document.getElementById('spinner').style.display = displayStatus;

}

// function for toggle search result
const toggleSearchResult = displayStatus => {
    document.getElementById('search-result').style.display = displayStatus;
}