import { Navigate, Route, Routes } from "react-router-dom";
import About from "../AboutArea/About/About";
import EmployeeList from "../EmployeelistArea/EmployeeList/EmployeeList";
import Home from "../HomeArea/Home/Home";
import ProductList from "../ProductsArea/ProductList/ProductList";
import Page404 from "../LayoutArea/Page404/Page404";
import ProductDetails from "../ProductsArea/ProductDetails/ProductDetails";
import AddProduct from "../ProductsArea/AddProduct/AddProduct";
import EditProduct from "../ProductsArea/EditProduct/EditProduct";
import Register from "../AuthArea/Register/Register";
import Login from "../AuthArea/Login/Login";
import CategoryList from "../CategoriesArea/CategoryList/CategoryList";
import CategoryDetails from "../CategoriesArea/CategoryDetails/CategoryDetails";
import ContactUs from "../AboutArea/ContactUs/ContactUs";
function Routing(): JSX.Element {
    return (

        <Routes>


            {/*Register: */}
            <Route path="/register" element={<Register />} />

            {/*Login: */}
            <Route path="/login" element={<Login />} />


            {/*Home Route: */}
            <Route path="/home" element={<Home />} />

            {/*products Route: */}
            <Route path="/products" element={<ProductList />} />

            {/*about Route: */}
            <Route path="/about" element={<About />} />

            
            {/*aContact us Route: */}
            <Route path="/contact-us" element={<ContactUs />} />


            {/*Employee Route: */}
            <Route path="/employees" element={<EmployeeList />} />


            {/*product details Route: */}
            <Route path="/products/details/:prodId" element={<ProductDetails />} />


            {/*Add product: */}
            <Route path="/products/new" element={<AddProduct />} />

            {/*Edit product: */}
            <Route path="/products/edit/:prodId" element={<EditProduct />} />

            {/* Categories */}
            <Route path="/categories" element={<CategoryList />} />

             {/*category details Route: */}
             <Route path="/categories/details/:catId" element={<CategoryDetails />} />



            {/*Default Route: */}
            {/* <Route path="/" element={<About />} /> */}
            <Route path="/" element={<Navigate to="/home" />} />



            {/* Page not found */}
            <Route path="*" element={<Page404 />} />



        </Routes>
    );
}

export default Routing;
