const { createApp } = Vue

createApp({
    data(){
        return {
            url : "http://localhost:8585/api/clients/current",
            client: {},
            json : [],
            accounts:[],
            accountsActive: [],
            AccountMax: false,
            buttonAccount: false,
            type: "EMPTY",
            typeNull: false,
            accountNumberD: ""
        }
        
    },
    created(){
        this.loadData()
    },
    mounted(){

    },
    methods:{
        loadData(){
/*             axios.get()
            .then(response => console.log(response.data)) */
            axios.get(this.url)
            .then((respuesta) =>{
                this.json = respuesta
                this.client = respuesta.data
                this.accounts = this.client.accountsDTO
                this.AccountMax = this.accounts.length == 12
                this.loans = this.client.loans
            } )
            .catch( exception => console.log(exception)) 
        },
        logOut(){
            axios.post('/api/logout')
            .then(response=> window.location.href = "http://localhost:8585/web/index.html")
        },
        addAccount(){
            axios.post('/api/clients/current/accounts',`type=${this.type}`)
            .then(response => {Swal.fire({
                icon: 'success',
                text: 'the account was created successfully',
              })
              window.location.href = "http://localhost:8585/web/products.html"
            })
            .catch((exception)=>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Sorry, ' +exception.response.data,
                    })
                console.log(exception)
            })
        },
        deleteAccount(){
            axios.patch('/api/clients/current/accounts/delete',`number=${this.accountNumberD}`)
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    text: 'the account was created successfully',
                  })
                  window.location.href = "http://localhost:8585/web/products.html"
            })
            .catch(exception => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Sorry, ' +exception.response.data,
                })
                console.log(exception)
            });
        },
        
    },
    computed:{
        filterAccountActive(){
            this.accountsActive = this.accounts.filter(account => account.active === true)
        }
    }
}).mount('#app')  
