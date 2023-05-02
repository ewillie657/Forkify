import axios from 'axios';
import {key, proxy} from '../config';

export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try{
            const res = await axios(`https://jsonplaceholder.typicode.com/posts?userId=${this.id}`);
            // console.log(res);
            this.result = res.data;
            // console.log(this.result);
            this.result.forEach(ans =>{
                this.title = ans.title;
                this.body = ans.body;
                // console.log(this.title, this.body);
            });
        } catch(error){
            alert(error);
        }
    }

    calcTime(){
        const numIng = 50;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }




}