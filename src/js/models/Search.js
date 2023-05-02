import axios from 'axios';
import {key, proxy} from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(query){
        // 832a9c967fmshbd83369efadea46p1825bdjsna3ad906c9489  mine
    
        try{
        // const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
        const res = await axios(`https://jsonplaceholder.typicode.com/users`);

        this.result = res.data;
        // this.result.forEach(ans=>console.log(ans.address.street));
        console.log(this.result);
    
        } catch(error){
            alert(error);
        }
}

}
