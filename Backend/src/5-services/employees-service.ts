import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import EmployeeModel from "../3-models/employee-model";

import { ResourceNotFoundError } from "../3-models/error-models";
import imageHelper from "../2-utils/image-helper";
import appConfig from "../2-utils/app-config";


// Get all employees
async function getAllEmployees(): Promise<EmployeeModel[]> {

    //Create sql:
    const sql = `SELECT employeeID as employeeId ,firstName as firstName , lastName as lastName,birthDate as birthDate ,
     country as country ,
     city as city,
     CONCAT('${appConfig.domainName}/api/employees/',imageName) as imageUrl
     FROM employees`;

    // Get employees from database;
    const employees = await dal.execute(sql);

    //Return employees:
    return employees;
}


// Get one employee
async function getOneEmployee(id: number): Promise<EmployeeModel> {

    // Create SQL:
    const sql = `SELECT
    employeeID as employeeID,
    firstName as firstName,
    lastName as lastName,
    birthDate as birthDate,
    country as country,
    city as city,
    CONCAT('${appConfig.domainName}/api/employees/',imageName) as imageUrl
    FROM employees
    WHERE employeeID = ${id}`;

    


    // Get employee from database containing onr employee;
    const employees = await dal.execute(sql);

    // Extract the single employee
    const employee = employees[0];

    // If no such employee:
    if (!employee) throw new ResourceNotFoundError(id);

    //Return employee:
    return employee;



}



// add one employee
async function addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {

    employee.validate();

    // Save image:
    const imageName = await imageHelper.saveImage(employee.image);


    //Create sql
    const sql = `INSERT INTO employees(firstName, lastName, birthDate, country, city, ImageName)
    VALUES('${employee.firstName}', '${employee.lastName}', '${employee.birthDate}', '${employee.country}', '${employee.city}', '${imageName}')`;

    // Execute sql,get back info object
    const info: OkPacket = await dal.execute(sql);

    // Extract new id, set it back in the given employee
    employee.id = info.insertId

    // Get Image Url:
    employee.imageUrl = `${appConfig.domainName}/api/employees/${imageName}`;

    //Remove image from employee object because we don`t response it back:
    delete employee.image;


    // Return added employee
    return employee;

}

// Update employee
async function updateEmployee(employee: EmployeeModel): Promise<EmployeeModel> {

    employee.validate();

    let sql = "";
    let imageName = "";

    if (employee.image) {
        const oldImage = await getOldImage(employee.id);
        imageName = await imageHelper.updateImage(employee.image, oldImage);

        sql = `UPDATE EMPLOYEES SET 
        firstName = '${employee.firstName}',
        lastName = '${employee.lastName}',
        birthDate = '${employee.birthDate}',
        country = '${employee.country}',
        city = '${employee.city}',
        ImageName ='${imageName}'
        WHERE employeeId = '${employee.id}'`;
    }

    else {
        sql = `UPDATE EMPLOYEES SET 
        firstName = '${employee.firstName}',
        lastName = '${employee.lastName}',
        birthDate = '${employee.birthDate}',
        country = '${employee.country}',
        city = '${employee.city}'
        WHERE employeeId = '${employee.id}'`;
    }

    // Execute sql,get back info object
    const info: OkPacket = await dal.execute(sql);

    // If no such product:
    if (info.affectedRows === 0) throw new ResourceNotFoundError(employee.id);

    // Get image URL:
    employee.imageUrl = `${appConfig.domainName}/api/employees/${imageName}`;


    // Remove Give image from product object because we dont response it back
    delete employee.image;

    // Return added employee
    return employee;

}

// Delete employee
async function deleteEmployee(id: number): Promise<void> {

    // Take old image
    const oldImage = await getOldImage(id);

    // Delete this image:
    await imageHelper.deleteImage(oldImage);


    //Create sql
    const sql = `DELETE from employees WHERE employeeId =${id}`;

    // Execute sql,get back info object
    const info: OkPacket = await dal.execute(sql);

    // If employee not exist (can also ignore this case):
    if(info.affectedRows===0) throw new ResourceNotFoundError(id);

}

// Get image name:
async function getOldImage(id: number): Promise<string> {
    const sql = `SELECT imageName FROM employees where employeeId =${id}`;
    const employees = await dal.execute(sql);
    const employee = employees[0];
    if (!employee) return null;
    const imageName = employee.imageName;
    return imageName;
}

export default {
    getAllEmployees,
    getOneEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
};