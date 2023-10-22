import Joi from "joi";
import { ValidationError } from "./error-models";
import { UploadedFile } from "express-fileupload";

class EmployeeModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public birthDate: Date;
    public country: string;
    public city: string;
    public imageUrl: string;
    public image : UploadedFile;

    public constructor(employee: EmployeeModel) {  //Copy-Constructor
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.birthDate = employee.birthDate;
        this.country = employee.country;
        this.city = employee.city;
        this.imageUrl = employee.imageUrl;
        this.image = employee.image;
    }

    // Validation schema - build once
    private static validationSchema = Joi.object({
        id: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        birthDate: Joi.required(),
        country:Joi.string().required().min(2).max(50),
        city: Joi.string().required().min(2).max(50),
        imageUrl: Joi.string().optional().min(40).max(200),
        image: Joi.object().optional()
    });

    // Validate properties and throw if not valid:
    public validate(): void {
      
        const result = EmployeeModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }
}




export default EmployeeModel;


