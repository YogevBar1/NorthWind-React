import { useEffect, useState } from "react";
import CategoryModel from "../../../Models/CategoryModel";
import "./CategoryDetails.css";
import categoriesService from "../../../Services/CategoriesService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate, useParams } from "react-router-dom";
import appConfig from "../../../Utils/AppConfig";

function CategoryDetails(): JSX.Element {

    const [category, setCategory] = useState<CategoryModel>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.catId;

    useEffect(()=>{
        categoriesService.getOneCategory(id)
        .then(
            
            category => setCategory(category))
        .catch(err => {
            notifyService.error(err);
            if(err.response.status === 401) navigate("/login");
        })

    },[]);
    return (
        <div className="CategoryDetails">
			<h2>Category Details</h2>
            <h3>Category Name: {category?.name}</h3>
            <h3>Category Description: {category?.description}</h3>
            <img src={appConfig.categoriesUrl + "images/" + category?.imageName}></img>
        </div>
    );
}

export default CategoryDetails;
