<template>
    <b-col md="6" class="m-3">
        <b-card header="Add Product">
            <b-card-body>
                <b-form autocomplete="off">
                    <b-form-group
                        label="Name"
                    >
                        <b-form-input v-validate="{required:true,min:3}" v-model="form.name" id="name" name="name" trim></b-form-input>
                        <div v-if="subbmited" class="error-message">
                            {{  errors.first('name')}}
                        </div>
                        
                    </b-form-group>
                    <b-form-group
                        label="Price (Rs)"
                    >
                        <b-form-input v-validate="{required:true,numeric:true}" v-model="form.price" id="price" name="price" trim></b-form-input>
                        <div v-if="subbmited" class="error-message">
                            {{  errors.first('price')}}
                        </div>
                    </b-form-group>
                    <b-form-group
                        label="Brand"
                    >
                        <b-form-input v-validate="{required:true}" v-model="form.brand" id="brand" name="brand" trim></b-form-input>
                        <div v-if="subbmited" class="error-message">
                            {{  errors.first('brand')}}
                        </div>
                    </b-form-group>
                    <b-form-group label="Inventroy ?">
                        <div v-if="subbmited" class="error-message">
                            {{  errors.first('inventoryStatus')}}
                        </div>
                        <b-form-radio v-validate="{required:true}" v-model="form.inventoryStatus" name="inventoryStatus" value="true">In Stock</b-form-radio>
                        <b-form-radio v-model="form.inventoryStatus" name="inventoryStatus" value="false">Out of Stock</b-form-radio>
                    </b-form-group>
                </b-form>
            </b-card-body>
            <b-button block variant="primary" @click="addProduct">
                Add Product
                <b-spinner small variant="light" v-if="showAddProductSpinnerStatus"></b-spinner>
            </b-button>
        </b-card>
    </b-col>
</template>

<script>
//import {mapActions} from 'vue'

//local call mixin limited to this
//import cjMixins from '@/mixins/cjMixins'
export default{
    //mixins:[cjMixins],
    data(){
        return{
            form:{
                name:'',
                price:'',
                brand:'',
                inventoryStatus:''
            },
            subbmited:false,
            showAddProductSpinnerStatus:''
        }
    },
    methods:{
        //...mapActions(['addProductWithMapAction']),
        async addProduct(){
            try{
                this.subbmited=true
                let result = await this.$validator.validate()
                if(result){
                    let newProduct = {
                        "name":this.form.name,
                        "price":this.form.price,
                        "brand":this.form.brand,
                        "inventoryStatus":this.form.inventoryStatus === 'true'
                    }
                    /* this.$emit('addProduct',{
                        name:this.form.name,
                        price:this.form.price,
                        brand:this.form.brand,
                        inventoryStatus:this.form.inventoryStatus === 'true'
                    }) */
                    //this.addProductWithMapAction('newProduct',newProduct);
                    this.showAddProductSpinnerStatus = true;
                    await this.$store.dispatch('addProduct',newProduct)
                    this.showToast('Product Added Successfully!','SUCCESS','success')
                    /* this.$bvToast.toast(`Product Added Successfully!`, {
                        title: 'SUCCESS',
                        variant:'success',
                        solid:true,
                        autoHideDelay: 5000,
                        toaster:'b-toaster-top-right',
                    }) */
                    this.form = {
                        name:'',
                        price:'',
                        brand:'',
                        inventoryStatus:''
                    }
                    this.showAddProductSpinnerStatus = false
                    this.subbmited = false
                }
            }catch(error){
                this.showAddProductSpinnerStatus = false;
                this.showToast(error.message,'ERROR','danger')
                /* this.$bvToast.toast(error.message, {
                    title: 'ERROR',
                    variant:'danger',
                    solid:true,
                    autoHideDelay: 5000,
                    toaster:'b-toaster-top-right',
                }) */
            }
        }
    }
}
</script>

<style scoped>
</style>