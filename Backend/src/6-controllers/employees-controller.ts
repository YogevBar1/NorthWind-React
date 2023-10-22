import express, { NextFunction, Request, Response } from "express";
import employeesService from "../5-services/employees-service";
import StatusCode from "../3-models/status-code";
import EmployeeModel from "../3-models/employee-model";
import verifyToken from "../4-middleware/verify-token";
import verifyAdmin from "../4-middleware/verify-admin";
import { request } from "http";
import path from "path";

// Create the router part of express:
const router = express.Router()

// Get http://loaclhost:4000/api/employees
router.get("/employees", async (request: Request, response: Response, next: NextFunction) => {

    try {

        // Get all products from database:
        const employees = await employeesService.getAllEmployees();

        // Response back all employees:
        response.json(employees);
    }
    catch (err: any) {
        next(err);
    }
});

// Get http://loaclhost:4000/employees/:id
router.get("/employees/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {

    try {
        // Get route id:
        const id = +request.params.id;

        // Get one products from database:
        const employee = await employeesService.getOneEmployee(id);

        // Response back all employees:
        response.json(employee);
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://loaclhost:4000/employees
router.post("/employees", verifyToken, async (request: Request, response: Response, next: NextFunction) => {

    try {
        // Add image from request.files into request.body:
        request.body.image = request.files?.image;

        // Get employee send from frontend
        const employee = new EmployeeModel(request.body);

        // Add product to database:
        const addedEmployee = await employeesService.addEmployee(employee);

        // Response back all employees:
        response.status(StatusCode.Created).json(employee);

    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://loaclhost:4000/employees/:id
router.put("/employees/:id", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Extract route id into body:
        request.body.id = +request.params.id;

        // Add image from request.files into request.body:
        request.body.image = request.files?.image;


        // Get employee send from frontend
        const employee = new EmployeeModel(request.body);


        // Update employee in database:
        const updatedEmployee = await employeesService.updateEmployee(employee);

        // Response back all employees:
        response.json(updatedEmployee);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE http://loaclhost:4000/employees/:id
router.delete("/employees/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Get route id:
        const id = +request.params.id;


        // delete employee in database:
        await employeesService.deleteEmployee(id);

        // Response back:
        response.sendStatus(StatusCode.NoContent);
    }
    catch (err: any) {
        next(err);
    }
});

// Get "http://localhost:4000/products/:imageName"
router.get("/employees/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get image name:
        const imageName = request.params.imageName;

        // Get absolute path:
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        console.log(absolutePath);

        // Response back the image file
        response.sendFile(absolutePath);

    }
    catch (err: any) {
        next(err);
    }
});


// Export the above router
export default router;