import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const PageNotFound = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-[#39c7b9] text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-8">Oops! The page you are looking for doesn&apos;t exist.</p>
            <Link
                to="/"
                className="flex items-center bg-[#40e0d0] text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
                <AiOutlineHome className="h-6 w-6 mr-2" />
                Back to Home
            </Link>
        </div>
    );
};

export default PageNotFound;
