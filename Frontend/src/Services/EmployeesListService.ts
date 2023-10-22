import axios from "axios";
import EmployeesModel from "../Models/EmployeeModel";
import appConfig from "../Utils/AppConfig";

class EmployeesListService{

    // Get all products from the beckend:
    public async getAllEmployees(): Promise <EmployeesModel[]>{ 

        // Get all employees into response object:
        const response =await axios.get<EmployeesModel[]>(appConfig.employeesUrl);

        // Extract the products from the response:
        const employees = response.data;

        // Return 
        return employees;


        
    }
}

const employeesListService = new EmployeesListService(); //SingleTon

export default employeesListService;
