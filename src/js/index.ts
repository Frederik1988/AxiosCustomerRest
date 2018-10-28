import axios, {
    AxiosResponse, 
    AxiosError} from "../../node_modules/axios/index";

    interface ICustomer{
        id:number;
        firstName:string;
        lastName:string;
        year:number;
    }

    let showAllCustomerElement : HTMLDivElement = <HTMLDivElement>document.getElementById("content");
    let getAllCustomersButton : HTMLButtonElement = <HTMLButtonElement>document.getElementById("getAllCustomerBtn");
    getAllCustomersButton.addEventListener("click", showAllCustomers);
    let uri : string = "https://restcustomerservice20181024123050.azurewebsites.net/api/customer";

    function showAllCustomers():void{
        axios.get<ICustomer[]>(uri)
        .then(function (response:AxiosResponse<ICustomer[]>):void{

            let result : string = "<ol>";
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
            });

            result += "</ol>";
            showAllCustomerElement.innerHTML = result;
        })
    }


