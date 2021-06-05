export default{
    methods:{
        showToast(message,title,variant){
            this.$bvToast.toast(message, {
                title,
                variant,
                solid:true,
                autoHideDelay: 5000,
                toaster:'b-toaster-top-right',
            })
        }
    },
}