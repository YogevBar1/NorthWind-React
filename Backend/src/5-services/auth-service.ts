import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import dal from "../2-utils/dal";
import cyber from "../2-utils/cyber";
import { UnauthorizedError, ValidationError } from "../3-models/error-models";
import CredentialsModel from "../3-models/credentials-model";
import RoleModel from "../3-models/role-model";
// Import a password strength validation library (for example, zxcvbn)
import zxcvbn from 'zxcvbn';

//Register a new user
async function register(user: UserModel): Promise<string> {

    //Validation:
    user.validate();

    // Set "User" as role
    user.roleId = RoleModel.User;

    //is username taken:
    if (await isUsernameTaken(user.username)) {
        throw new ValidationError(`Username ${user.username} already taken`);
    }

    
    // // Check password strength
    // const passwordStrength = zxcvbn(user.password);

    // if (passwordStrength.score < 2) {
    //     throw new ValidationError('Password is not strong enough');
    // }

    user.password = cyber.hashPassword(user.password);

    //SQL:
    const sql = `INSERT INTO users(firstName, lastName, username, password, roleId) 
                VALUES(?,?,?,?,?)`;

    // Execute
    const info: OkPacket = await dal.execute(sql,[user.firstName,user.lastName,user.username,user.password,user.roleId]);

    // set back new id:
    user.id = info.insertId;

    // Get new token:
    const token = cyber.getNewToken(user);

    // Return token
    return token;

}

// Login:
async function login(credentials: CredentialsModel): Promise<string>{

    // Validation
    credentials.validate();

    credentials.password = cyber.hashPassword(credentials.password);


    // SQL:
    const sql= `SELECT * FROM users WHERE 
                username= ? AND
                password = ?`;

    // Execute 
    const users = await dal.execute(sql,[credentials.username, credentials.password]);

    // Extract user:
    const user = users[0];

    // If no such user:
    if(!user) throw new UnauthorizedError("Incorrect Username or Password");

    // Generate JWT:
    const token = cyber.getNewToken(user);

    // Return token
    return token;

}

// Is username taken:
async function isUsernameTaken(username: string): Promise<boolean> {
    // SQL to check if the username already exists in the database
    const sql = `SELECT COUNT(*) as count FROM users WHERE username = '${username}'`; //Exists

    // Execute
    const result = await dal.execute(sql);
    const count = result[0].count;

    // 'result' should be an array with a single element that has a 'count' property
    // representing the number of rows with the given username in the database
    return count > 0;
}

export default {
    register,
    login
};