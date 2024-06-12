import { useState, useEffect } from "react";
import { MenuIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Header() {
    const [toggleMenu, setToggleMenu] = useState(false);

    useEffect(() => {
        document.body.style.overflow = toggleMenu ? "hidden" : "auto";
    }, [toggleMenu]);

    const handleMenuClick = () => {
        setToggleMenu(!toggleMenu);
    };

    const handleMenuItemClick = () => {
        setToggleMenu(false);
    };

    return (
        <div>
            <nav className="bg-[#010100] h-20 lg:flex lg:items-center">
                <div className="w-full mx-auto">
                    <div className="flex items-center justify-between w-full text-[#40e0d0]">
                        <Link to="/" className="h-12 text-4xl" style={{ paddingLeft: "20px", marginTop: "10px" }}>
                            Logo
                        </Link>
                        <div className="flex gap-6">
                            <div className="lg:hidden flex items-center mx-6">
                                <button onClick={handleMenuClick}>
                                    <MenuIcon className="h-8" />
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:flex gap-8 mx-10 font-bold">
                            <Link to="/" onClick={handleMenuItemClick}>
                                Home
                            </Link>
                            <Link to="/blog" onClick={handleMenuItemClick}>
                                Blog
                            </Link>
                            <Link to="/link" onClick={handleMenuItemClick}>
                                Links
                            </Link>
                            <Link to="/forum" onClick={handleMenuItemClick}>
                                Forum
                            </Link>
                            <Link to="/about" onClick={handleMenuItemClick}>
                                About Us
                            </Link>
                            <Link to="/contact" onClick={handleMenuItemClick}>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className={`fixed z-40 w-full bg-[#40e0d0] text-[#010100] overflow-hidden flex flex-col lg:hidden gap-12 origin-top duration-700 ${!toggleMenu ? "h-0" : "h-full"
                        }`}
                    style={{ top: "70px", paddingTop: "10px", display: toggleMenu ? "flex" : "none" }}
                >
                    <div className="px-8">
                        <div className="flex flex-col gap-8 font-bold tracking-wider">
                            <Link to="/" onClick={handleMenuItemClick}>
                                Home
                            </Link>
                            <Link to="/blog" onClick={handleMenuItemClick}>
                                Blog
                            </Link>
                            <Link to="/link" onClick={handleMenuItemClick}>
                                Links
                            </Link>
                            <Link to="/forum" onClick={handleMenuItemClick}>
                                Forum
                            </Link>
                            <Link to="/about" onClick={handleMenuItemClick}>
                                About Us
                            </Link>
                            <Link to="/contact" onClick={handleMenuItemClick}>
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
