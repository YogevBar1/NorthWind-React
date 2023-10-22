import "./Page404.css";
import sourceImg from "../../../Assets/Images/Page404.gif"

function Page404(): JSX.Element {
    return (
        <div className="Page404">
			<h2>The page you are looking for doesn`t exist</h2>
            <img src={sourceImg}></img>
        </div>
    );
}

export default Page404;
