import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import "./Register.css";
import notifyService from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import appConfig from "../../../Utils/AppConfig";
import { useState } from "react";

function Register(): JSX.Element {

    const  {register, handleSubmit} = useForm<UserModel>();
    const navigate = useNavigate();
    const [isBot,setIsBot] = useState<boolean>(true);

    async function send(user: UserModel){
        try{
            await authService.register(user);
            notifyService.success("You have been successfully registered");
            navigate("/home");
        }
        catch(err:any){
            notifyService.error(err);
        }

  
    }

    function reCaptchaChecked(value: string){
        setIsBot(value?.length ===0);
        
    }

    return (
        <div className="Register">
			
            <h2>Register</h2>
            <form onSubmit={handleSubmit(send)}>
                <label>First Name:</label>
                <input type="text" {...register("firstName")}/>

                <label>Last Name:</label>
                <input type="text" {...register("lastName")}/>

                <label>Username:</label>
                <input type="text" {...register("username")}/>

                <label>Password:</label>
                <input type="password"  {...register("password")}/>

                <div className="ReCaptchaContainer">
                    <ReCAPTCHA sitekey={appConfig.captchaSiteKey} onChange={reCaptchaChecked}/>
                </div>
                <button disabled={isBot}>Register</button>



            </form>
        </div>
    );
}

export default Register;
