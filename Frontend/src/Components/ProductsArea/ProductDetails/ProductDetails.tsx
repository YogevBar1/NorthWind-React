import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useEffect, useState } from "react";
import productsService from "../../../Services/ProductsService";
import ProductModel from "../../../Models/productModel";
import Spinner from "../../SharedArea/Spinner/Spinner";
import notifyService from "../../../Services/NotifyService";

function ProductDetails(): JSX.Element {

    const params = useParams();
    const id = +params.prodId; //Same name as define in the Route Parameter

    const navigate = useNavigate();


    const [frontendProduct, setFrontendProduct] = useState<ProductModel>();

    useEffect(() => {
        productsService.getOneProduct(id)
            .then(backendProduct => setFrontendProduct(backendProduct))
            .catch(err => notifyService.error(err));

    }, []);

    async function deleteMe(): Promise<void> {
        try {
            const ok = window.confirm("Are you sure you want to delete the item?");
            if (!ok) return;
            await productsService.deleteProduct(id);
            notifyService.success("Product has been deleted");
            navigate("/products");


        }
        catch (err: any) {
            notifyService.error(err);
        }

    }

    // Also conditional rendering:
    if(!frontendProduct) return <Spinner />

    return (
        <div className="ProductDetails">
            <h2>Product Details</h2>

            <h3>Name: {frontendProduct?.name}</h3>
            <h3>Price: {frontendProduct?.price}</h3>
            <h3>Stock: {frontendProduct?.stock}</h3>
            <br /><br />


            <img src={frontendProduct?.imageUrl} />
            <br /><br />

            <NavLink to="/products">Back</NavLink>
            <span> | </span>
            <NavLink to={"/products/edit/" + frontendProduct?.id }>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={deleteMe}>Delete</NavLink>
        </div>
    );
}

export default ProductDetails;
