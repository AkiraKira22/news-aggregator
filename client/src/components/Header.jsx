import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
//import logo from '../assets/logo.png';
import country from './country';

function Header() {
    const [active, setActive] = useState(false);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [theme, setTheme] = useState("light-theme");
    const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
    
    useEffect(() => {
        document.body.className = themel
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
                <h3 className="relative heading font-bold md:basis1/6 text-2xl xs:basis-4/12 z-50 md-5 mt-5">
                <span className="logo">
                    <img src="" alt="news-aggregator" />
                </span>
                </h3>
                <ul className={"nav-ul flex gap-11 md:gap-14 xs:gap-12 lg:basis-3/6 md:basis 4/6 md:justify-end ${active ? 'active' : ''}"}>
                    <li>
                        <Link className="no-underline font-semibold" to="/" onClick={() => setActive(!active)}>
                            Home
                        </Link>
                    </li>
                    <li className="dropdown-li">
                        <Link className="no-underline font-semibold flex-center gap-2" onClick={()=>{setShowCategoryDropdown(!showCategoryDropdown)}}>
                            Category    
                        </Link>
                    </li>

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

                    <ul className={showCategoryDropdown ? "dropdown p-2 show-dropdown" : "dropdown p-2"}>
                        {categories.map((element, index) => (
                            <li key={index} onClick={() => setShowCategoryDropdown(false)}>
                                <Link to={`/headlines?category=${element}`} className="flex gap-3" onClick={()=>{setActive(!active)}}>
                                    <span>{element.charAt(0).toUpperCase() + element.slice(1)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <li>
                        <Link className="no-underline font-semibold" to="#" onClick={toggleTheme}>
                            <input type="checkbox" className="checkbox" id="checkbox" />
                            <label for="checkbox" class="checkbox-label">
                                <i class="fas fa-moon"></i>
                                <i class="fas fa-sun"></i>
                                <span class="ball"></span>
                            </label>
                        </Link>
                    </li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;