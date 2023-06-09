import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/** Global state of the app
 * - Search object
 * Current recipe object
 * Shopping list object
 * liked recipes
 */
const state ={}

/**
 * Search Controller
 */
const controlSearch = async () =>{

    //1. Get query from the view
    const query = searchView.getInput(); 
    // console.log(query);

    if(query){
        //2. New search object and add to state
        state.search = new Search(query);

        //3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try{

            //4. Search for recipes
            await state.search.getResults();

            //5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result)
            // state.search.result.forEach(data => console.log(data.name));
            // console.log(state.search.result[1].name)


        } catch(err){
            alert('Something wrong with the search');
            clearLoader();
        }

        
    }

};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e =>{
    const btn = e.target.closest('.btn-inline');
    // console.log(btn);
    if(btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        // console.log(goToPage);
    }
});



/**
 * Recipe Controller
 */
// const r = new Recipe(1);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () => {

    // Get ID from url
    const id = window.location.hash.replace('#','');
    // console.log(id);
    if(id){
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try{
            
        // Get recipe data
        await state.recipe.getRecipe();

        //Calculate servings and time
        state.recipe.calcTime();
        state.recipe.calcServings();

        //Render recipe
        console.log(state.recipe);

        } catch(err){
            alert('Error processing recipe');
        }
    }
}

// window.addEventListener('hashchange', controlRecipe);
// windows.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

