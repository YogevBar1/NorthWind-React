import axios from "axios";
import CategoryModel from "../Models/CategoryModel";
import appConfig from "../Utils/AppConfig";
import { authStore } from "../Redux/AuthState";

class CategoriesService{

    // Get all categories
    public async getAllCategories(): Promise<CategoryModel[]>{

        // If we dont have have an interceptor , we need an authorization header
        // Header containing JWT tkoen:
        // const options ={
        //     headers: {"Authorization": "Bearer " + authStore.getState().token }
        // }
        
        // Get response from backend:
        const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);

        // Extract all categories
        const categories = response.data;

        // Return
        return categories;
    }

        // Get one categories
        public async getOneCategory(id:number): Promise<CategoryModel>{

        
            // Get response from backend:
            const response = await axios.get<CategoryModel>(appConfig.categoriesUrl + id);
    
            // Extract all categories
            const category = response.data;
    
            // Return
            return category;
        }

}

const categoriesService = new CategoriesService();

export default categoriesService;