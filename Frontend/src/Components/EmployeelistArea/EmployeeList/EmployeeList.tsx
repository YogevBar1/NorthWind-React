import { useEffect, useState } from "react";
import "./EmployeeList.css";
import EmployeesModel from "../../../Models/EmployeeModel";
import employeesListService from "../../../Services/EmployeesListService";
import useTitle from "../../../Utils/UseTitle";
import notifyService from "../../../Services/NotifyService";





function EmployeeList(): JSX.Element {

    useTitle("NorthWind | Employees");


    const [frontendEmployees, setFrontedList] = useState<EmployeesModel[]>([]);




    useEffect(() => {

        // Get Employees
        employeesListService.getAllEmployees()
            .then(backendEmployees => setFrontedList(backendEmployees))
            .catch(err => notifyService.error(err));


    }, []);

    return (
        <div className="EmployeeList">


            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Title</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Birth Date</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        frontendEmployees.map(e =>
                            <tr key={e.id}>
                                <td>{e.firstName}</td>
                                <td>{e.lastName}</td>
                                <td>{e.title}</td>
                                <td>{e.country}</td>
                                <td>{e.city}</td>
                                <td>{e.birthDate}</td>
                                <td>
                                    <img src={e.imageUrl}></img>

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeList;
