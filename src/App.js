// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
const Card = ({ flagUrl, name, altFlag }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        padding: "10px",
        border: "1px solid black",
        borderRadius: "8px",
        flexDirection: "column",
        width: "200px",
        height: "200px",
      }}
    >
      <img
        src={flagUrl}
        alt={altFlag}
        style={{ width: "100px", height: "100p" }}
      />
      <h2>{name}</h2>
    </div>
  );
};

function App() {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countries, setContries] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  useEffect(() => {
    fetch(API_URL)
      .then((respons) => respons.json())
      .then((data) => setContries(data))
      .catch((error) => console.error("Error Fetching the Data: ", error));
  }, []);
  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchData.toLowerCase())
      )
    );
  }, [searchData, countries]);
  console.log({ countries });
  const handleChange = (e) => {
    setSearchData(e.target.value);
  };
  return (
    <div className="App">
      <div>
        <input
          type="text"
          className="inputField"
          placeholder="Search for countries..."
          value={searchData}
          onChange={handleChange}
        />
      </div>
      {/* <div>{searchData}</div> */}
      <div
        className="countryCard"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexWrap: "wrap",
        }}
      >
        {/* <h1>Countries</h1> */}
        {filteredCountries.map((country) => (
          <Card
            key={country.cca3}
            flagUrl={country.flags.png}
            name={country.name.common}
            altFlag={country.flags.alt}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
