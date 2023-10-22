import axios from "axios";
import ProductModel from "../Models/productModel";
import appConfig from "../Utils/AppConfig";
import { ProductAction, ProductsActionType, productStore } from "../Redux/ProductsState";

class ProductsService {

    // Get all products from the beckend:
    public async getAllProducts(): Promise<ProductModel[]> {


        // Get products from global state:
        let products = productStore.getState().products;

        // If there are no products in global state:
        if (products.length === 0) {

            // Get all products into response object:
            const response = await axios.get<ProductModel[]>(appConfig.productsUrl);

            // Extract the products from the response:
            products = response.data;

            // Save products in global state:
            const action: ProductAction = { type: ProductsActionType.SetProducts, payload: products };
            productStore.dispatch(action);


        }

        // Return products
        return products;
    }


    //Get one product from the backend:
    public async getOneProduct(id: number): Promise<ProductModel> {

        // Get products from global state:
        let products = productStore.getState().products;

        // Find desired product:
        let product = products.find(p => p.id === id)

        //if product not found:
        if (!product) {

            // Get one product into response Object:
            const response = await axios.get<ProductModel>(appConfig.productsUrl + id);

            //Extract the product from the response
            product = response.data;

        }

        // return product:
        return product;
    }

    // Add new product to backend:
    public async addProduct(product: ProductModel): Promise<void> {

        // Header is a Additional data sent in the request fir the configuration
        const options = {
            headers: { "Content-Type": "multipart/form-data" } //Include files in the request 
        }

        // Send product to backend:
        const response = await axios.post<ProductModel>(appConfig.productsUrl, product, options);

        // Extract the added product sent back from the backend:
        const addedProduct = response.data;

        // Add added product to global state:
        const action: ProductAction = { type: ProductsActionType.AddProduct, payload: addedProduct };
        productStore.dispatch(action);

        console.log(addedProduct);
    }


    //update existing product to backend:
    public async updateProduct(product: ProductModel): Promise<void> {

        // Header is a Additional data sent in the request fir the configuration
        const options = {
            headers: { "Content-Type": "multipart/form-data" } //Include files in the request 
        }

        // Send product to backend:
        const response = await axios.put<ProductModel>(appConfig.productsUrl + product.id, product, options);

        // Extract the added product sent back from the backend:
        const updatedProduct = response.data;


        // Update product in global state:
        const action: ProductAction = { type: ProductsActionType.UpdateProduct, payload: updatedProduct };
        productStore.dispatch(action);

    }


    //Delete product from backend
    public async deleteProduct(id: number): Promise<void> {
        //Delete the product in the backend
        await axios.delete(appConfig.productsUrl + id);

        
        // delete product in global state:
        const action: ProductAction = { type: ProductsActionType.DeleteProduct, payload: id };
        productStore.dispatch(action);


    }

    // Clear global state:
    public clear(): void{
        const action: ProductAction = {type: ProductsActionType.ClearAll };
        productStore.dispatch(action);

    }
}

const productsService = new ProductsService(); //SingleTon

export default productsService;
