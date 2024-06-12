const Newsletter = () => {
    return (
        <div className="bg-[#010100] py-6 px-2 sm:px-4 lg:px-6">
            <div className="max-w-lg mx-auto">
                <h2 className="text-lg sm:text-2xl font-bold text-center mb-3 text-[#40e0d0]">Join our Newsletter</h2>
                <div className="flex flex-col items-center justify-center mb-4 sm:flex-row">
                    <input
                        type="email"
                        placeholder="Your email"
                        className="py-2 px-4 w-full sm:w-80 mb-2 sm:mb-0 rounded-lg text-black focus:outline-none focus:ring focus:border-green-300"
                    />
                    <button className="bg-[#1d665f] text-[#40e0d0] font-bold py-2 px-6 rounded-lg hover:bg-[#357a73] focus:outline-none focus:ring focus:border-green-300 transition duration-300 ease-in-out transform hover:scale-105 sm:ml-0 sm:mt-0">
                        Join Free
                    </button>
                </div>
                <p className="text-center text-[#4cc9ba]">
                    &quot;We will not spam nor share your info with others&quot;
                </p>
            </div>
        </div>
    );
};

export default Newsletter;
