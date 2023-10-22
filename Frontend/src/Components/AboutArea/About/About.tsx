import useTitle from "../../../Utils/UseTitle";
import "./About.css";

function About(): JSX.Element {

    useTitle("NorthWind | About");

    return (
        <div className="About">
			About
        </div>
    );
}

export default About;
