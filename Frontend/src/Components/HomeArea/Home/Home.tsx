import "./Home.css";
import productSource1 from "../../../Assets/Images/products1.jpeg"
import productSource2 from "../../../Assets/Images/products2.jpeg"
import { useEffect, useState } from "react";
import useTitle from "../../../Utils/UseTitle";
import Clock from "../Clock/Clock";

function Home(): JSX.Element {

    useTitle("NorthWind | Home");


    const arrSale2 = useState<string>("");
    const sale2Info = arrSale2[0];
    const setSale2Info = arrSale2[1];

    //Using destructuring assignment
    const [sale3Info, setSale3Info] = useState<string>("");

    const [time, setTime] = useState<string>("");


    function displaySale1(): void {
        
        alert("Sale: 50% discount on all candies!");

    }

    // useEffect(() => {
    //     //Once.
    //     setInterval(() => {
    //         displayHour();
    //         console.log("test");
    //     }, 1000);

    // },[]);


    function displaySale2(): void {
        // sale2Info = "Sale: 30% discount on all cheese!";
        setSale2Info("Sale: 30% discount on all cheese!");
    }

    function displaySale3(): void {
        setSale3Info("Sale: 15% discount on all beverages!");
    }
    function displayHour(): void {
        const now = new Date();
        setTime(now.toLocaleTimeString());
    }

    const randomNumber = Math.floor(Math.random() * 2 + 1); //1 or 2

    // Demo for getting desserts from the backend:
    const desserts = [
        { id: 1, name: "Apple Pie", price: 20 },
        { id: 2, name: "Eclair", price: 25 },
        { id: 3, name: "Pavlova", price: 24 },
        { id: 4, name: "Cheese Cake", price: 23 }
    ];

    function showAverage(): void{
        const numbers = [11,22,33,44,55];
        let sum =0;
        for(let i =0; i< numbers.length -1; i++){
            sum += numbers[i];
        }
        const avg = sum / numbers.length;
        alert("Average: " + avg);
    }


    return (
        <div className="Home">
            <h2>Welcome to NorthWind Traders!</h2>

            {/* First way: Ternary Operator */}
            {/* {randomNumber === 1 ? <img src={productSource1} /> : <img src={productSource2} />} */}

            {/* Second way: Ternary Operator */}
            {/* <img src={randomNumber ===1 ? productSource1 : productSource2}/> */}

            {/* Third way: Short Circuit:*/}
            {randomNumber === 1 && <img src={productSource1} />}
            {randomNumber === 2 && <img src={productSource2} />}

            <p>Our Desserts:
                <br />
                {desserts.map(d => <span key={d.id}>{d.name} -${d.price}🍧</span>)}
            </p>
            <hr />

            <button onClick={displaySale1}>First Sale</button>
            <hr />
            <button onClick={displaySale2}>Second Sale</button>

            <span>{sale2Info}</span>
            <hr />
            <button onClick={displaySale3}>Third Sale</button>
            <span>{sale3Info}</span>

            <hr />
            <button onClick={displayHour}>Show current time</button>
            <span>{time}</span>

            <hr />

            <button onClick={showAverage}>show Average</button>

            <Clock format="24h"/>

        </div>
    );
}

export default Home;
