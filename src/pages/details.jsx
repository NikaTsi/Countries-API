import React from "react"
import { useParams, Link } from "react-router-dom"
import darkArrow from "../assets/darkArrow.svg"
import arrow from "../assets/arrow.svg"
import header from "../components/header"

const Details = ({ countries }) => {
    const { country } = useParams()
    const selectedCountry = countries.find((item) => item.name.common === country);

    const theme = localStorage.getItem("theme");

    if (!selectedCountry) {
        return <></>;
    }


    const population = () => {
        return selectedCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const nativeName = selectedCountry.name.nativeName ? selectedCountry.name.nativeName[Object.keys(selectedCountry.name.nativeName)[0]].common : "N/A";
    const subregion = selectedCountry.subregion ? selectedCountry.subregion : "N/A";
    const capital = selectedCountry.capital ? selectedCountry.capital : "N/A";
    const currencies = selectedCountry.currencies ? selectedCountry.currencies[Object.keys(selectedCountry.currencies)[0]].name : "N/A";

    const languages = selectedCountry.languages ? Object.values(selectedCountry.languages) : null;
    const langDisplay = languages !== null ? languages.join(", ") : "N/A";

    const borderCountriesArr = selectedCountry.borders ? Object.values(selectedCountry.borders) : null;

    function renderBorderCountries() {
        return borderCountriesArr !== null ? (
            borderCountriesArr.map((item) => {
                const foundCountry = countries.find((country) => country.cca3 === item);
                return (
                    <Link to={`/details/${foundCountry.name.common}`} className={`flex w-24 h-7 justify-center items-center shadow-list rounded-[2px] overflow-hidden font-light text-xs text-center ${theme === "dark" ? "text-[#FFF] bg-[#2B3844]" : "bg-[#fff] text-[#111517]"}`}>
                        {foundCountry.name.common}
                    </Link>
                );
            })
        ) : (
            <h4 className={`font-semibold text-base ${theme === "dark" ? "text-[#FFF]" : "text-[#111517]"}`}>"No Border Countries.."</h4>
        );
    }



    return (
        <main className={`flex flex-col w-full min-h-screen font-nunito ${theme === "dark" ? "bg-[#202C36]" : "bg-[#FAFAFA] xl:bg-[#FFF]"}`}>

            {header()}

            <Link to={"/"} className={`flex w-[104px] py-[6px] mx-7 mt-10 mb-16 gap-2 items-center justify-center rounded-[2px] shadow-back font-light text-sm lg:text-[16px] lg:w-[136px] lg:h-10 lg:gap-[10px] lg:justify-start lg:pl-8 lg:rounded-[6px] lg:my-20 lg:ml-20 lg:py-0 ${theme === "dark" ? "bg-[#2B3844] text-[#FFF]" : "bg-[#FFF] text-[#111517]"}`}>
                {theme === "dark" ? <img src={arrow}/> : <img src={darkArrow}/>}
                <h4>Back</h4>
            </Link>

            <section className="flex flex-col w-full px-7 items-center xl:flex-row xl:px-20 xl:justify-between xl:gap-[10%] xl:items-start" >
                <img className="flex rounded-[6px] xl:w-[40%] " src={selectedCountry.flags.svg}/>
                <div className={`flex flex-col w-full ${theme === "dark" ? "text-[#FFF]" : "text-[#111517]"}`}>
                    <div className="flex flex-col font-light sm:flex-row xl:justify-between">
                        <div className="flex flex-col w-full font-light text-sm leading-8 lg:text-[16px]">
                            <h4 className="mt-11 mb-4 font-extrabold text-[22px] lg:text-[32px] xl:mt-[39px] xl:mb-[23px]">{selectedCountry.name.common}</h4>
                            <h4><span className="font-semibold">Native Name: </span>{nativeName}</h4>
                            <h4><span className="font-semibold">Population: </span>{population()}</h4>
                            <h4><span className="font-semibold">Region: </span>{selectedCountry.region}</h4>
                            <h4><span className="font-semibold">Sub Region: </span>{subregion}</h4>
                            <h4><span className="font-semibold">Capital: </span>{capital}</h4>
                        </div>
                        <div className="flex flex-col w-full mt-[34px] font-light text-sm leading-8 sm:mt-[92px] lg:text-[16px]">
                            <h4><span className="font-semibold">Top Level Domain: </span>{selectedCountry.tld}</h4>
                            <h4><span className="font-semibold">Currencies: </span>{currencies}</h4>
                            <h4><span className="font-semibold">Languages: </span>{langDisplay}</h4>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-[34px] xl:mt-[70px] xl:flex-row pb-[60px]">
                        <h4 className="font-semibold  text-[16px] xl:w-[180px]">Border Countries:</h4>
                        <div className="flex flex-wrap gap-[10px]">
                            {renderBorderCountries()}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}


export default Details