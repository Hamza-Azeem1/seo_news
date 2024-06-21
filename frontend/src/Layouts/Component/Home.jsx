export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#010100] text-[#EDEFF8]">
            <main className="flex flex-col items-center justify-center flex-1">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-[#EDEFF8]">Welcome to Our Website</h1>
                <p className="text-lg mb-6 text-[#EDEFF8]">Experience our services like never before.</p>
                <button className="bg-[#40e0d0] text-white font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out hover:text-white">
                    Explore Now
                </button>
            </main>
        </div>
    );
}