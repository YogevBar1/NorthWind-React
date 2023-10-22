import { useEffect, useState } from "react";
import "./ProductList.css";
import productsService from "../../../Services/ProductsService";
import ProductModel from "../../../Models/productModel";
import useTitle from "../../../Utils/UseTitle";
import ProductCard from "../ProductCard/ProductCard";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../../SharedArea/Spinner/Spinner";
import notifyService from "../../../Services/NotifyService";
import TotalProducts from "../TotalProducts/TotalProducts";

function ProductList(): JSX.Element {

    useTitle("NorthWind | Products");

    const navigate = useNavigate();


    // let frontendProducts =[];
    const [frontendProducts, setFrontedProducts] = useState<ProductModel[]>([]);


    useEffect(() => {

        // Get products
        productsService.getAllProducts()
            .then(backendProducts => setFrontedProducts(backendProducts))
            .catch(err => notifyService.error(err));




    }, []);

    function clearAll() {

        // Remove all products from the global
        productsService.clear();
        notifyService.success("All products has been clear");

    }

    return (

        <div className="ProductList">


            <div className="actions">
                <NavLink to="/products/new">🆕</NavLink>
                <NavLink to="/home" onClick={clearAll}>🧼</NavLink>
            </div>




            {frontendProducts.length === 0 && <Spinner />}

            {frontendProducts.map(p => <ProductCard key={p.id} product={p} />)}

            {/* {frontendProducts.map(p => <span key={p.id}>{p.name} 📦</span>)} */}

            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        frontendProducts.map(p =>
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.price.toFixed(2)} ₪</td>
                                <td>{p.stock}</td>
                                <td>
                                    <img src={p.imageUrl} />
                                </td>
                            </tr>

                        )
                    }
                </tbody>
        </table> */}


        </div >
    );
}

export default ProductList;
