<template>
    <b-col class="m-3">
        <b-card header="List Product">                
            <b-card-group deck>
                <b-card
                    style="min-width:30%;max-width:30%"
                    class="m-3"
                    :border-variant="product.inventoryStatus? 'success' : 'danger'"
                    align="center"
                    v-for="product in productList" :key="product.id"
                >
                    <b-badge :variant="product.inventoryStatus? 'success' : 'danger'">{{product.inventoryStatus? 'IN STOCK' : 'OUT OF STOCK'}}</b-badge>
                    <b-card-text><strong>Name: </strong>{{product.name}}</b-card-text>
                    <b-card-text><strong>Price: </strong>{{product.price}}</b-card-text>
                    <b-card-text><strong>Brand: </strong>{{product.brand}}</b-card-text>
                    <hr/>
                    <b-row>
                        <b-col><b-button variant="danger" @click="deleteProduct(product.id)"><i class="fas fa-trash"></i></b-button></b-col>
                        <b-col><UpdateProduct :product="product" /></b-col>
                    </b-row>
                </b-card>
            </b-card-group>
            <h2 v-if="productList.length < 1 && !showPageLoaderStatus">No Product Found...</h2>
            <b-spinner small variant="secondary" v-if="showPageLoaderStatus" class="page-loader"></b-spinner>
        </b-card>
    </b-col>
</template>

<script>
import UpdateProduct from './UpdateProduct.vue'
import {mapState,mapGetters} from 'vuex'
export default{
    data(){
        return{
            showPageLoaderStatus:false
        }
    },
    components:{
        UpdateProduct
    },
    methods:{
        deleteProduct(productId){
            this.$store.dispatch('deleteProduct',productId) 
        }
    },
    computed:{
        /* //calling store state with custom defined name
        ...mapState({
            testList : 'productList'
        }),
        //calling store state with same name 
        ...mapState(['productList']), */

        /* //calling store state with custom defined name
        ...mapGetters({
            testList:'productList'
        }),
        //calling store state with same name
        ...mapGetters(['productList']), */

        productList(){
            console.log('****',this.$store.getters.productList)
            return this.$store.getters.productList
            // console.log('*****', this.$store.state.productList)
            // return this.$store.state.productList
            
        }
    },
    async mounted(){
        try{
            this.showPageLoaderStatus = true
            await this.$store.dispatch('setProducts')
            this.showPageLoaderStatus = false
        }catch(error){
            this.showPageLoaderStatus = false
            console.log(error)
        }
    }
}
</script>

<style>

</style>