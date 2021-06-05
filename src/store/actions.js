import axios from 'axios'
export default{
    setProducts:async ({commit},payload)=>{
        try{
            let result = await axios.get('http://localhost:3000/products')
            commit('SET_PRODUCTS',result.data)
        }catch(error){
            throw new Error(error)
        }        
    },
    addProduct:async ({commit},payload)=>{
        try{
            let result = await axios.post('http://localhost:3000/products',payload)
            //console.log('result   ',result);
            commit('ADD_PRODUCT',result.data)
        }catch(error){
            throw new Error(error)
        }  
    },
    deleteProduct:async ({commit},payload)=>{
        try{
            let result = await axios.delete(`http://localhost:3000/products/${payload}`)
            commit('DELETE_PRODUCT',payload)
        }catch(error){
            throw new Error(error)
        }  
    },
    updateProduct:async ({commit},payload)=>{
        try{
            let result = await axios.put(`http://localhost:3000/products/${payload.id}`,payload)
            console.log(result)
            commit('UPDATE_PRODUCT',result.data)
        }catch(error){
            throw new Error(error)
        }  
    }
}