import { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { BsArrowDown } from 'react-icons/bs';
import axios from 'axios';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogFetched, setBlogFetched] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            if (!blogFetched) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/blog`);
                    setBlogs(response.data);
                    setBlogFetched(true);
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                }
            }
        };
        fetchBlogs();
    }, [blogFetched]);

    return (
        <div className="bg-[#010100] min-h-screen flex flex-col justify-center items-center">
            <div className="w-full px-6 py-12">
                <h1 className="text-4xl font-bold text-[#EDEFF8] mb-4 text-center">Latest Blog Posts</h1>
                <p className="text-lg text-[#EDEFF8] leading-relaxed text-center">
                    Welcome to our blog! Here you will find our latest thoughts, stories, and updates.
                </p>
            </div>
            <div className="flex-1 flex justify-center items-center">
                <div className="max-w-8xl w-full p-4">
                    {blogs.length > 0 ? (
                        <BlogCard
                            blogs={blogs}
                            setBlogs={setBlogs}
                            isAdmin={false}
                            onEdit={() => { }}
                        />
                    ) : (
                        <p className="text-[#EDEFF8] text-center text-3xl">No blog posts found.</p>
                    )}
                </div>
            </div>
            <button className="bg-[#268077] hover:bg-[#40e0d0] text-[#EDEFF8] font-bold py-2 px-4 rounded flex items-center mb-5 transition-colors duration-300 ease-in-out transform hover:scale-105">
                Show More <BsArrowDown className="ml-2" />
            </button>
        </div>
    );
};

export default Blog;
