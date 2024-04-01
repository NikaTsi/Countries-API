import React from 'react';
import { Link } from 'react-router-dom';
import moon from "../assets/moon.svg";
import emptyMoon from "../assets/emptyMoon.svg";
import { useTheme } from '../useTheme';

export default function Header() {
  const { theme, changeTheme } = useTheme();

  return (
    <header className={`flex w-full justify-between items-center px-4 py-[30px] shadow-header lg:px-20 lg:py-6 ${theme === "dark" ? "bg-[#2B3844]" : "bg-[#fff]"}`}>
      <Link to={"/"} className={`font-extrabold text-sm  lg:text-2xl ${theme === "dark" ? "text-[#FFF]" : "text-[#111517]"}`}>Where in the world?</Link>
      <div onClick={changeTheme} className="flex transform duration-800">
        <div className={`flex gap-2 items-center cursor-pointer ${theme === "light" ? "hidden" : "flex"}`}>
          <img src={emptyMoon} />
          <h2 className="font-semibold text-xs text-[#FFF] lg:text-base">Light Mode</h2>
        </div>
        <div className={`flex gap-2 items-center cursor-pointer ${theme === "dark" ? "hidden" : "flex"}`}>
          <img src={moon} />
          <h2 className="font-semibold text-xs text-[#111517] lg:text-base">Dark Mode</h2>
        </div>
      </div>
    </header>
  )
}