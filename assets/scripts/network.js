const network = {

    url : 'http://localhost:3000/doc/',

    getAll : async function(){
        let res= await axios.get(this.url);
        return res.data;
    },
    getById : async function(id){
        let res = await axios.get(this.url+id)
        return res.data;
    },
    add : async function(body){
        let res = await axios.post(this.url, body)
        return res.data;
    },
    update : async function(id, body){
        let res = await axios.patch(this.url+id, body)
        return res.data;
    },
    delete : async function(id) {
        let res = await axios.delete(this.url+id)
        return res.data;
    }
}