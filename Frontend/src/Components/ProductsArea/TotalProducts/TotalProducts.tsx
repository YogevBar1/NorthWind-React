import { useEffect, useState } from "react";
import "./TotalProducts.css";
import { productStore } from "../../../Redux/ProductsState";
import notifyService from "../../../Services/NotifyService";

function TotalProducts(): JSX.Element {

    const [count, setCount] = useState<number>();
    
    useEffect(()=>{
        setCount(productStore.getState().products.length);

        //Subscribe to change in the global state:
        const unsubscribe = productStore.subscribe(()=>{

            // Update local state with the correct data:
            setCount(productStore.getState().products.length);

        });

        // Calling unsubscribe when our component destroyed:
        return () => unsubscribe();

    }, []);

    if (count ===0) return null;

    return (
        <div className="TotalProducts">
			<span>Total Products: {count}</span>
        </div>
    );
}

export default TotalProducts;
