<template>
    <div>
        <b-button @click="modalShow = !modalShow"><i class="fas fa-edit"></i></b-button>
        <b-modal 
            v-model="modalShow"
            title="Update Product"
            @show="showModal"
            @hidden="resetModal"
            @ok="handleSubmit"
        >
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
        </b-modal>
    </div>
</template>
<script>

export default{
    name:'UpdateProduct',
    props:['product'],
    data(){
        return{
            form:{
                name:'',
                price:'',
                brand:'',
                inventoryStatus:''
            },
            subbmited:false,
            modalShow:false
        }
    },
    methods:{
        showModal(){
            console.log('show')
            this.form = {
                name : this.$props.product.name,
                price: this.$props.product.price,
                brand: this.$props.product.brand,
                inventoryStatus: new Boolean(this.$props.product.inventoryStatus).toString(),
            }
            console.log(this.$props.product)
        },
        resetModal(){
            console.log('reset')
            this.form = {}

        },
        async handleSubmit(modalEvent){
            try{
                modalEvent.preventDefault()
                this.subbmited=true
                let result = await this.$validator.validate()
                let updatedProduct = {
                    name : this.form.name,
                    price: this.form.price,
                    brand: this.form.brand,
                    inventoryStatus: this.form.inventoryStatus === 'true',
                    id:this.$props.product.id
                }
                if(result){
                    await this.$store.dispatch('updateProduct',updatedProduct)
                    this.showToast('Product Updated Successfully!','SUCCESS','success')
                    this.modalShow = false
                    this.subbmited = false
                }
                
            }catch(error){
                this.showToast(error.message,'ERROR','danger')
            }
            
        }
    }
}
</script>
<style>

</style>
