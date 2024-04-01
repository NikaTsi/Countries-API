import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import Details from "./pages/details";


function App() {
    const [countries, setCountries] = useState([])
    const [searchByRegion, setSearchByRegion] = useState("all")

    useEffect(() => {
        fetchCountries();
    }, []);

    async function fetchCountries() {
        const response = await fetch(`https://restcountries.com/v3.1/${searchByRegion}`);
        const data = await response.json();
        const sortedCountries = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
        setCountries(sortedCountries);
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage countries={countries} searchByRegion={searchByRegion} setSearchByRegion={setSearchByRegion} />} />
                <Route path="/details/:country" element={<Details countries={countries} />} />
            </Routes>
        </BrowserRouter>

    )
}


export default App