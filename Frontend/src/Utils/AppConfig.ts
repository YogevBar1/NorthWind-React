class AppConfig {


    public readonly productsUrl = this.baseUrl + "/api/products/"; //Ending /

    public readonly employeesUrl =this.baseUrl+ "/api/employees/"; //Ending /

    public readonly registerUrl = this.baseUrl+ "/api/register/";

    public readonly loginUrl =this.baseUrl+ "/api/login/";

    public readonly categoriesUrl = this.baseUrl+ "/api/categories/";
    public captchaSiteKey = "";

    public constructor(public baseUrl: string) { }

}

class DevelopmentConfig extends AppConfig {
    public constructor() {
        super("http://localhost:4000");
        this.captchaSiteKey ="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
    }
}

class ProductionConfig extends AppConfig {
    public constructor() {

        super("https://northwind-traders.com");
        this.captchaSiteKey ="yourRealProductionSiteKey";

    }
}


//Singleton - one and only object that serv all the app, and you cant make another object fro outside
const appConfig = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default appConfig;

