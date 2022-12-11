import "./home.css";
import React, { Component } from "react";
import axios from "axios";
// import convert from "xml-js";

class Home extends Component {
  state = {
    fuelPrices: [],
  };
    
  componentDidMount() {
    axios
      .get("https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/xml; charset=utf-8",
          "Access-Control-Allow-Methods": "GET, POST",
          "Access-Control-Allow-Headers":
            "Accept, Content-Type, Content-Length, Accept-Encoding, X-Token, Authorization",
        },
        withCredentials: true,
        credentials: "same-origin",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.error);
        }
        console.log(response.data);
        // const data = JSON.parse(
        //   convert.xml2json(response.data)
        // );
        this.setState({ fuelPrices: response.data });
      });
//     var xhr = new XMLHttpRequest();
//     var json_obj, status = false;
//     xhr.open("GET", "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?", true);
//     xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//     xhr.onload = function (e) {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           var json_obj = JSON.parse(xhr.responseText);
//           status = true;
//           this.setState({ fuelPrices: json_obj });
//         } else {
//           console.error(xhr.statusText);
//         }
//       }
//     }.bind(this);
//     xhr.onerror = function (e) {
//       console.error(xhr.statusText);
//     };
//     xhr.send(null);
  }
  render() {
    const { fuelPrices } = this.state;

    return (
      <div className="container">
        <ul className="list-group">

          {fuelPrices.map((item, index) => {
            return <li class="list-group-item" key={index}>{item}</li>;
          })}

        </ul>
      </div>
    );
  }
  
}

export default Home;
