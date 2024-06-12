import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { deleteBlog } from '../../../store/Actions/blogActions';

const BlogCard = ({ blogs, isAdmin, onEdit, setBlogs }) => {
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        const filtered = blogs.filter(
            (blog) =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBlogs(filtered);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setFilteredBlogs(blogs);
    };

    useEffect(() => {
        setFilteredBlogs(blogs);
    }, [blogs]);

    const handleEdit = (blog) => {
        onEdit(blog);
    };

    const handleDelete = async (id) => {
        try {
            const response = await dispatch(deleteBlog(id));
            if (response.data) {
                setBlogs(blogs.filter(blog => blog._id !== id));
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="px-4 py-8">
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog, index) => (
                        <div key={index} className="max-w-md rounded overflow-hidden shadow-lg bg-gray-600">
                            <div className="relative">
                                {blog.img && (
                                    <img
                                        className="w-full h-48 object-cover"
                                        src={`http://localhost:8000/uploads/${blog.img}`}
                                        alt={blog.img_alt_text || blog.title}
                                    />
                                )}
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{blog.title}</div>
                                <div className="text-[#EDEFF8] text-lg mb-2" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) + '...' }} />
                                {isAdmin ? (
                                    <Box display="flex" justifyContent="space-between">
                                        <IconButton color="secondary" onClick={() => handleEdit(blog)}>
                                            <EditIcon /> Edit
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleDelete(blog._id)}>
                                            <DeleteIcon /> Delete
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Link
                                        to={`/blog/${blog.schema}/${blog._id}`}
                                        className="inline-block bg-[#268077] hover:bg-[#40e0d0] text-white font-bold py-2 px-4 rounded items-center mb-5"
                                    >
                                        Read More
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-white">
                        {searchTerm.trim() === '' ? (
                            <p>No blog posts found.</p>
                        ) : (
                            <p className="text-white text-2xl">No results found.</p>
                        )}
                        <button onClick={clearSearch} className="text-white underline cursor-pointer mt-4">
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    blogs: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            img: PropTypes.string,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
    isAdmin: PropTypes.bool,
    onEdit: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired,
};

BlogCard.defaultProps = {
    isAdmin: false,
};

export default BlogCard;