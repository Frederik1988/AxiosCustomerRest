import axios, {
    AxiosResponse, 
    AxiosError} from "../../node_modules/axios/index";

    interface ICustomer{
        id:number;
        firstName:string;
        lastName:string;
        year:number;
    }

    let showAllCustomerElement : HTMLDivElement = <HTMLDivElement>document.getElementById("allCustomers");
    let getAllCustomersButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllCustomerBtn");
    getAllCustomersButton.addEventListener("click", showAllCustomers);

    let showOneCustomerElement : HTMLDivElement = <HTMLDivElement>document.getElementById("singleCustomer");
    let getOneCustomerButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getOneCustomerBtn");
    getOneCustomerButton.addEventListener("click", showOneCustomer);

    let addNewCustomerButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("addCustomer");
    addNewCustomerButton.addEventListener("click", addNewCustomer);

    let deleteCustomerButton : HTMLButtonElement =<HTMLButtonElement>document.getElementById("deleteCustomer");
    deleteCustomerButton.addEventListener("click", deleteCustomer);

    const uri : string = "https://restcustomerservice20181024123050.azurewebsites.net/api/customer/";

    function showAllCustomers():void{
        axios.get<ICustomer[]>(uri)
        .then(function (response:AxiosResponse<ICustomer[]>):void{

            let result : string = "<br>";
            response.data.forEach((customer : ICustomer) =>{
                if (customer == null)
                    {
                        result
                         += "<li>Null element</li>"
                    }
                else
                    {
                        result += "<li>" + "<br>" + "<b>Id: </b>" + customer.id.toString() + "<br>" + "<b>Fornavn: </b>" + customer.firstName + "<br>" + "<b>EfterNavn: </b>" + customer.lastName + "<br>" + "<b>Oprettet i: </b>" + customer.year.toString() + "</li>"; 
                    }    
            })

            result += "</b>";
            showAllCustomerElement.innerHTML = result;
        })
        .catch(function (error : AxiosError): void{

            showAllCustomerElement.innerHTML = error.message;            
    })
    }

    function showOneCustomer():void{

        let showOneCustomerInputElement : HTMLInputElement = <HTMLInputElement>document.getElementById("customerId");
        let newUri = uri + showOneCustomerInputElement.value;

        axios.get<ICustomer>(newUri)
        .then (function(response :AxiosResponse<ICustomer>):void{            
             
            let result : string = "<li>";
            let customer : ICustomer = response.data;  
            if (customer == null)
                    {
                        result
                         += "Null element"
                    }
                else
                    {
                        result += "<br>" + "<b>Id: </b>" + customer.id.toString() + "<br>" + "<b>Fornavn: </b>" + customer.firstName + "<br>" + "<b>EfterNavn: </b>" + customer.lastName + "<br>" + "<b>Oprettet i: </b>" + customer.year.toString(); 
                    }  
            result += "</li>";
            showOneCustomerElement.innerHTML = result;         
        })
        .catch(function (error : AxiosError): void{

            showOneCustomerElement.innerHTML = error.message;            
    })
        
    }

    function addNewCustomer():void{
        
        let addFirstNameElement : HTMLInputElement = <HTMLInputElement>document.getElementById("firstName");
        let addLastNameElement : HTMLInputElement = <HTMLInputElement>document.getElementById("lastName");
        let addYearElement : HTMLInputElement = <HTMLInputElement>document.getElementById("year");

        let newFirstName : string = addFirstNameElement.value;
        let newLastName : string = addLastNameElement.value;
        let newYear : number = +addYearElement.value;

        axios.post<ICustomer>(uri, {firstName : newFirstName, lastName : newLastName, year : newYear})
        .then((response:AxiosResponse) =>{console.log("Response: " + response.status + " " + response.statusText)})
        .catch((error:AxiosError) => {console.log(error);})
    }

    function deleteCustomer():void{
        
        let deleteCustomerElement : HTMLInputElement = <HTMLInputElement>document.getElementById("customerToDelete");
        let newUri = uri + deleteCustomerElement.value;
        let customerOutput : HTMLDivElement = <HTMLDivElement>document.getElementById("deletedCustomer");


        axios.delete(newUri)
        .then(function (response: AxiosResponse): void {

            console.log(JSON.stringify(response));
            customerOutput.innerHTML = response.status + " " + response.statusText;
        })
        .catch(function (error: AxiosError): void { 
            if (error.response) 
            {                
                customerOutput.innerHTML = error.message;
            } else 
            { 
                customerOutput.innerHTML = error.message;
            }
        });                          
                
    }

