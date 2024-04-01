import { useState, useEffect } from "react";

export const useTheme = () => {
    const [theme, setTheme] = useState("light")

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);



    return { theme, changeTheme }
}