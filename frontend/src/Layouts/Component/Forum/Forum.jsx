import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import { MdVisibility } from 'react-icons/md';
import { FaRegCircleQuestion } from "react-icons/fa6";
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions, createQuestion } from '../../../store/Actions/forumActions';
import LoginForm from './LoginForm';
import { logout } from '../../../store/Actions/authActions';

const Forum = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);

    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state) => state.forum);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getQuestions());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChange = (content) => {
        setFormData({ ...formData, content });
    };

    const handleOpen = () => {
        if (isAuthenticated) {
            setOpen(true);
        } else {
            setShowLoginForm(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            setErrorMessage('Title and content are required.');
            return;
        }

        dispatch(createQuestion(formData));
        setFormData({ ...formData, title: '', content: '' });
        setErrorMessage('');
        handleClose();
    };

    const handleCloseLoginForm = () => {
        setShowLoginForm(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#010100]">
            <h1 className="text-3xl font-semibold mb-8 text-center text-[#EDEFF8]">Welcome to the Forum</h1>
            <div className="flex justify-center mb-12">
                <button className="bg-[#268077] text-[#EDEFF8] px-8 py-4 rounded-md shadow-md hover:bg-[#4bbeb3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleOpen}>
                    {isAuthenticated ? 'Ask Your Question' : 'Login to Ask'}
                </button>
                <button className="bg-[#268077] text-[#EDEFF8] ml-4 px-6 py-4 rounded-md shadow-md hover:bg-[#4bbeb3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Add Question</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        value={formData.title}
                        onChange={handleInputChange}
                        error={!!errorMessage}
                    />
                    <ReactQuill
                        value={formData.content}
                        onChange={handleChange}
                        modules={{ toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['link', 'image']] }}
                        formats={['bold', 'italic', 'underline', 'list', 'bullet', 'link', 'image']}
                        placeholder="Write your question here..."
                    />
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <div className="max-w-7xl w-full bg-gray-600 p-8 rounded-lg shadow-lg" style={{ marginBottom: '2rem' }}>
                <div className="flex items-center mb-4 text-white font-bold text-3xl">
                    <FaRegCircleQuestion className="mr-2 " />
                    <h2>Questions ({questions.length}) </h2>
                </div>
                {loading ? (
                    <div className="flex items-center justify-center h-48">
                        <p className="text-[#EDEFF8] text-lg">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-48">
                        <p className="text-[#EDEFF8] text-lg">{error}</p>
                    </div>
                ) : questions.length === 0 ? (
                    <div className="flex items-center justify-center h-48">
                        <p className="text-[#EDEFF8] text-lg">No questions right now. Be the first to ask!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <div key={index} className="bg-[#EDEFF8] p-6 rounded-lg shadow-md flex flex-col">
                                <h3 className="text-lg font-semibold mb-4">{question.title}</h3>
                                <div className="flex justify-end">
                                    <Link
                                        to={`/question/${question._id}`}
                                        className="text-blue-500"
                                    >
                                        <Button
                                            className='bg-[#268077] hover:bg-[#2d6e68] text-[#EDEFF8] py-2 px-4 rounded flex items-center'
                                            variant="outlined"
                                            startIcon={<MdVisibility />}
                                            style={{ width: 'fit-content', minWidth: 'auto' }}
                                        >
                                            See Details
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Dialog open={showLoginForm} onClose={handleCloseLoginForm}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <LoginForm onClose={handleCloseLoginForm} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Forum;
