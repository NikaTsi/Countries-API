import React, { useState } from "react";
import { Link } from "react-router-dom";
import search from "../assets/darkSearch.svg";
import dropdown from "../assets/darkDropDown.svg";
import darkDropdown from "../assets/dropDown.svg";
import header from "../components/header"


const HomePage = ({ countries, searchByRegion, setSearchByRegion }) => {
    const [showContinentList, setShowContinetList] = useState(false)
    const [dropdownRotation, setDropdownRotation] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const theme = localStorage.getItem("theme");

    const toggleContinentList = () => {
        setShowContinetList(!showContinentList)
    }
    const toggleDropdownRotation = () => {
        setDropdownRotation(!dropdownRotation)
    }
    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (searchByRegion === "all" || country.region === searchByRegion)
    );

    const continentList = () => {
        if (showContinentList) {
            return (
                <div className={`flex absolute flex-col gap-2 w-[200px] top-[52px] left-0 z-10 shadow-input rounded-[5px] py-4 pl-6 font-normal text-xs lg:top-[60px] lg:text-sm ${theme === "dark" ? "bg-[#2B3844] text-[#FFF]" : "bg-[#FFF] text-[#111517]"}`}>
                    <h3 onClick={() => setSearchByRegion("all")} className="hover:translate-x-1 duration-300">All</h3>
                    <h3 onClick={() => setSearchByRegion("Africa")} className="hover:translate-x-1 duration-300">Africa</h3>
                    <h3 onClick={() => setSearchByRegion("Americas")} className="hover:translate-x-1 duration-300">Americas</h3>
                    <h3 onClick={() => setSearchByRegion("Asia")} className="hover:translate-x-1 duration-300">Asia</h3>
                    <h3 onClick={() => setSearchByRegion("Europe")} className="hover:translate-x-1 duration-300">Europe</h3>
                    <h3 onClick={() => setSearchByRegion("Oceania")} className="hover:translate-x-1 duration-300">Oceania</h3>
                </div>
            )
        }
        return null
    }

    function renderCountries() {
        if (filteredCountries.length !== 0) {
            return filteredCountries.map((country, index) => (
                <Link to={`/details/${country.name.common}`} key={index} className={`flex flex-col w-[264px] h-[336px] rounded-[5px] shadow-box cursor-pointer overflow-hidden duration-300 hover:-translate-y-5 ${theme === "dark" ? "bg-[#2B3844]" : "bg-[#fff]"}`}>
                    <img className="flex w-full h-[160px]" src={country.flags.png} alt={country.flags.alt} />
                    <div className={`flex flex-col mt-6 ml-6 ${theme === "dark" ? "text-[#FFF]" : "text-[#111517]"}`}>
                        <h4 className="mb-4 font-extrabold text-lg">{country.name.common}</h4>
                        <div className="flex flex-col gap-2 font-light text-sm leading-4">
                            <h4><span className="font-semibold">Population: </span>{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                            <h4><span className="font-semibold">Region: </span>{country.region}</h4>
                            <h4><span className="font-semibold">Capital: </span>{country.capital ? country.capital : "N/A"}</h4>
                        </div>
                    </div>
                </Link>
            ));
        } else if (filteredCountries.length == 0) {
            return (
                <div className="flex text-center">
                    <h1 className={`font-semibold text-sm ${theme === "dark" ? "text-[#FFF]" : "text-[#111517]"}`}>No matching countries were found for "{searchTerm}"</h1>
                </div>
            )
        }
    }

    return (
        <main className={`flex flex-col w-full min-h-screen font-nunito ${theme === "dark" ? "bg-[#202C36]" : "bg-[#FAFAFA]"}`}>

            {header()}

            <nav className="flex flex-col mx-4 mt-6 mb-8 gap-10 lg:flex-row lg:my-12 lg:mx-20 lg:justify-between lg:gap-0">
                <div className="flex relative items-center">
                    <img className={`absolute left-8 top-4 lg:top-5 lg:left-8 ${theme === "dark" ? "brightness-200" : "brightness-0"}`} src={search} />
                    <input className={`outline-none pl-[74px] w-full h-12 shadow-input rounded-[5px] font-normal text-xs leading-5 lg:h-[60px] lg:w-[480px] lg:text-sm ${theme === "dark" ? "bg-[#2B3844] placeholder-[#FFF] text-[#FFF]" : "bg-[#fff] text-[#111517] placeholder-[#C4C4C4]"}`} type="text" placeholder="Search for a country..." value={searchTerm} onChange={handleSearch} />
                </div>

                <div onClick={() => { toggleContinentList(); toggleDropdownRotation(); }} className={`flex relative pl-6 py-[14px] w-[200px] h-12 shadow-input rounded-[5px] cursor-pointer lg:py-[18px] lg:h-14 ${theme === "dark" ? "bg-[#2B3844] text-[#FFF]" : "bg-[#fff] text-[#111517]"}`}>
                    <h3 className="font-normal text-xs leading-5 lg:text-sm">Filter by Region</h3>
                    <img className={`absolute top-[19px] right-[19px] duration-300 lg:top-[22px] lg:right-[18px]  ${dropdownRotation ? "rotate-0" : "rotate-90"} `} src={theme === "dark" ? darkDropdown : dropdown} />
                    {continentList()}

                </div>
            </nav>

            <section className={`flex flex-wrap w-full justify-center gap-y-10 gap-x-[75px] px-8 pb-[65px] lg:gap-y-[75px] ${theme === "dark" ? "bg-[#202C36]" : "bg-[#FAFAFA]"}`}>
                {renderCountries()}
            </section>

        </main>
    )
}

export default HomePage;