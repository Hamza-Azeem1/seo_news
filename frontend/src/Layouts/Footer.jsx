import { FaFacebook, FaInstagram, FaLinkedin, FaCopyright } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Newsletter from './Component/NewsLetter';
import Logo from "/logo.png";

const Footer = () => {
    return (
        <footer className="bg-[#010100] text-[#40e0d0] py-10">
            <Newsletter />
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-center items-center mb-8">
                    <div className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0">
                        <Link to="/" className="h-12" style={{ paddingLeft: "20px", marginTop: "10px" }}>
                            <img src={Logo} alt="Logo" className="h-12 mx-auto md:mx-0" />
                        </Link>
                        <p className="italic mt-2">Build your ideas with Us.</p>
                    </div>
                    <div className="w-full md:w-3/4 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="mb-8 md:w-1/4">
                                <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
                                <ul className="list-none p-0 m-0">
                                    <li className="mb-2">
                                        <Link to="/blog" className="hover:underline">
                                            Blog
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/about" className="hover:underline">
                                            About Us
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/contact" className="hover:underline">
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mb-8 md:w-1/4">
                                <h2 className="text-lg font-semibold mb-2">Our Partners</h2>
                                <ul className="list-none p-0 m-0">
                                    <li className="mb-2">
                                        <a href="#">App Development</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#">Web Development</a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="#">UI/UX Development</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/4">
                                <h2 className="text-lg font-semibold mb-2">Contact Info</h2>
                                <p className="mb-2">Email: your@email.com</p>
                                <p className="mb-2">Phone: +123 456 7890</p>
                                <div className="flex justify-center md:justify-start text-2xl">
                                    <a href="#" className="mr-2">
                                        <FaFacebook />
                                    </a>
                                    <a href="#" className="mr-2">
                                        <FaInstagram />
                                    </a>
                                    <a href="#">
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm flex justify-center items-center">
                        <FaCopyright className="mr-1" />
                        2023 - SEO News. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
