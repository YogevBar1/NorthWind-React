import { useEffect, useState } from "react";
import "./CategoryList.css";
import CategoryModel from "../../../Models/CategoryModel";
import categoriesService from "../../../Services/CategoriesService";
import notifyService from "../../../Services/NotifyService";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function CategoryList(): JSX.Element {

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        categoriesService.getAllCategories()
            .then(categories => setCategories(categories))
            .catch(err => {

                notifyService.error(err);
                if(err.response.status === 401) navigate("/login");
            });
    }, []);

    return (
        <div className="CategoryList">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(c =>
                        <tr key={c.id}>
                            <td>{c.name}</td>
                            <td>{c.description}</td>
                            <td>
                            <img src={"http://localhost:4000/api/categories/images/"+c.imageName}></img>
                            </td>
                            <td>
                                <NavLink to={"/categories/details/" + c.id}>
                                    🕵️
                                </NavLink>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default CategoryList;
