const { createApp } = Vue

createApp({
    data(){
        return {
            url : "http://localhost:8585/api/clients",
            urlLoan: "http://localhost:8585/api/loans",
            clientes: [],
            json : [],
            lastName: "",
            firstName: "",
            email: "",
            client : {},
            loan: {},
            pymesLoan: [],
            nameLoan: "",
            maxAmountLoan: "",
            percentageInterestSelect: "",
            pymes1: 0,
            pymes2: 0,
            pymes3: 0,
            pymes4: 0,
            pymes5: 0,
        }
        
    },
    created(){
        this.loadData(),
        this.UrlLoan()
    },
    mounted(){

    },
    methods:{
        loadData(){
            axios.get(this.url)
            .then((respuesta) =>{
                this.json = respuesta.data
                this.clientes = respuesta.data

            } )
            .catch( exception => console.log(exception) ) 
        },
        UrlLoan(){
            axios.get(this.urlLoan)
            .then((respuesta) =>{
                this.loan = respuesta.data
            } )
            .catch( exception => console.log(exception) ) 
        },
        logOut(){
            return axios.post('/api/logout')
            .then(response=> window.location.href = "http://localhost:8585/web/index.html")
        },
        addLoan(){
            if(this.pymes1 !== 0){
                console.log(this.pymes1 )
                this.pymesLoan.push(this.pymes1)
            }
            if(this.pymes2 !== 0){
                console.log(this.pymes2 )
                this.pymesLoan.push(this.pymes2)
            }
            if(this.pymes3 != 0){
                console.log(this.pymes3 )
                this.pymesLoan.push(this.pymes3)
            }
            if(this.pymes4 != 0){
                console.log(this.pymes4 )
                this.pymesLoan.push(this.pymes4)
            }
            if(this.pymes5 != 0){
                console.log(this.pymes5 )
                this.pymesLoan.push(this.pymes5)
            }
            console.log(this.pymesLoan)
            axios.post('/api/loans/create',{
                "name": this.nameLoan,
                "maxAmount": this.maxAmountLoan,
                "payments": this.pymesLoan,
                "percentageInterest": this.percentageInterestSelect
            })
            .then(response => {
                Swal.fire({
                    icon: 'success',     
                    text: 'The transaction was a success',
                })
                    this.pymesLoan = null;  
            })
            .catch((exception)=> {Swal.fire({
                icon: 'error',  
                text: 'Sorry, ' +exception.response.data,
              })
              console.log(exception)
            }
            
            )
        },
        addClient(){ 
                this.client = {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    email: this.email,
                }
            this.postClient(this.client)
        
        },
        postClient(clientAdd){
            axios.post("http://localhost:8585/api/clients", clientAdd)
            .then(respuesta => this.loadData())
            .catch(exception => console.log(exception))
        },

        clientDelete(client){
            console.log(client)

 /*            if(client.accountsDTO.length != 0){

                 console.log(client.accountsDTO)

                client.accountsDTO.forEach(account =>{

                    if(account.transactionDTO.length != 0){

                        account.transactionDTO.forEach(transaction =>{

                            let transactionDelete =  "http://localhost:8585/rest/accounts/transactions/" + transaction.id

                            axios.delete(transactionDelete)
                            .then(res => this.loadData())
                            .catch(exception => console.log(exception))

                        });

                    }

                    let accountDelete =  "http://localhost:8585/rest/accounts/" + account.id
                    axios.delete(accountDelete)
                    .then(res => this.loadData())
                    .catch(exception => console.log(exception))
                });
            }

            if(client.clientLoans.length != 0){
                client.clientLoans.forEach(ele =>{
                    let loansDelete = "http://localhost:8585/rest/clients/clientLoans/" + ele.id

                    axios.delete(loansDelete)
                    .then(res => this.loadData())
                    .catch(exception => console.log(exception))
                })
            } */

            let clientDelete ="http://localhost:8585/rest/clients/" + client.id 
            axios.delete(clientDelete)
            .then(res => this.loadData())
            .catch(exception => console.log(exception))

        }
    },
    computed:{
    }
}).mount('#app')    