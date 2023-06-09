import { elements } from './base';


export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () =>{
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitRecipeTitle = (username, limit = 17) =>{

    const newUsername = [];

    if(username.length > limit){

        username.split(' ').reduce((acc, cur)=>{

            if(acc + cur.length <= limit){
                newUsername.push(cur);
            }

            return acc + cur.length;

        }, 0);

        // return the result
        return `${newUsername.join(' ')} ...`;

    }

    return username;

}

const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link" href="#${recipe.id}">
        <figure class="results__fig">
            <img src="https://img.huffingtonpost.com/asset/578e3fbc2400002600b31e1c.jpeg?ops=crop_150_107_2091_1912,scalefit_630_noupscale" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.username)}</h4>
            <p class="results__author">${recipe.email}</p>
        </div>
    </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev or 'next'
const createButton = (page, type) =>`

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page -1 : page + 1}>
        <span>Page ${type === 'prev' ? page -1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) =>{
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if(page === 1 && pages > 1){
        //Button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages){
        //Both buttons
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `
    } else if(page === pages){
        //Button to go to prev page
        button = createButton(page, 'prev')
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (names, page = 1, resPerPage = 3) => {
    // render results of current page
    const start = (page - 1)  * resPerPage;
    const end = page * resPerPage;

    names.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, names.length, resPerPage);
};
