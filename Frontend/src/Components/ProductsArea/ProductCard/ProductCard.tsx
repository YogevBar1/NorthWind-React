import { NavLink } from "react-router-dom";
import ProductModel from "../../../Models/productModel";
import "./ProductCard.css";

interface ProductCardProps {
    product: ProductModel;
}

function ProductCard(props: ProductCardProps): JSX.Element {


    function formatPrice(price: number): import("react").ReactNode {
        return `₪${price.toFixed(2)}`;
    }

    return (
        <div className="ProductCard">

            <div>
                {props.product.name}
                <br />
                Price: {formatPrice(+props.product.price)}
                <br />
                Stock: {props.product.stock}

            </div>

            <div>
                <NavLink to={"/products/details/" + props.product.id}>
                <img src={props.product.imageUrl} />
                </NavLink>

            </div>

        </div>
    );
}

export default ProductCard;
