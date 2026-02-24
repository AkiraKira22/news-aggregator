import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
//import logo from '../assets/logo.png';
import country from './country';
import '../index.css';

function Header() {
    const [active, setActive] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [theme, setTheme] = useState("light-theme");
    const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

    useEffect(() => {
        document.body.className = theme
    }, [theme]);

    function toggleTheme() {
        if (theme === "light-theme") {
            setTheme("dark-theme");
        }
        else {
            setTheme("light-theme");
        }
    }

    return (
        <header>
            <nav className="fixed top-0 left-0 w-full h-auto bg-gray-800 z-10 flex items-center justify-around">
                <h3 className="relative heading font-bold md:basis-1/6 text-2xl xs:basis-4/12 mt-5 mb-5 z-50">
                    News Aggregator
                </h3>
                <ul className={"nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis 4/6 md:justify-end ${active ? 'active' : ''}"}>
                    <li>
                        <Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>
                            Home
                        </Link>
                    </li>

                    {/* Category dropdown */}
                    <li className="dropdown-li">
                        <Link className="no-underline font-semibold flex-center gap-2" onClick={()=>{setShowCategoryDropdown(!showCategoryDropdown)}}>
                            Category
                        </Link>
                        <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
                            {categories.map((element, index) => (
                                <li key={index} onClick={() => setShowCategoryDropdown(false)}>
                                    <Link to={`/top-headlines?category=${element}`} className="flex gap-3" onClick={()=>{setActive(!active)}}>
                                        <span>{element.charAt(0).toUpperCase() + element.slice(1)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* Country dropdown */}
                    <li className="dropdown-li">
                        <Link className="no-underline font-semibold flex-center gap-2" onClick={()=>{setShowCountryDropdown(!showCountryDropdown)}}>
                            Country
                        </Link>
                        <ul className={showCountryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
                            {country.map((element, index)=>(
                                <li key={index} onClick={() => setShowCountryDropdown(false)}>
                                    <Link to={`/country/${element?.iso_2_alpha}`} className="flex gap-3" onClick={()=>{setActive(!active)}}>
                                        <img src={element?.png} srcSet={`https://flagcdn.com/32x24/${element?.iso_2_alpha}.png 2x`}></img>
                                        <span>{element?.countryName}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                    <li className="flex items-center">
                        <input
                            type="checkbox"
                            className="checkbox"
                            id="checkbox"
                            checked={theme === "dark-theme"}
                            onChange={toggleTheme}
                        />
                        <label htmlFor="checkbox" className="checkbox-label">
                            <i className="fas fa-moon"></i>
                            <i className="fas fa-sun"></i>
                            <span className="ball"></span>
                        </label>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;