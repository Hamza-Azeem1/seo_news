import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import { Dialog, DialogTitle, DialogContent, Avatar } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { AiFillLike } from "react-icons/ai";
import { GoLightBulb } from "react-icons/go";
import { MdQuestionAnswer } from "react-icons/md";
import { getQuestionById, createAnswer, likeQuestion, likeAnswer } from '../../../store/Actions/forumActions';
import LoginForm from './LoginForm';

const Question = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { question, loading, error } = useSelector(state => state.forum);
    const { isAuthenticated, user } = useSelector(state => state.auth);

    const [answer, setAnswer] = useState('');
    const [answerError, setAnswerError] = useState('');
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [showLoginForm, setShowLoginForm] = useState(false);

    useEffect(() => {
        dispatch(getQuestionById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (question) {
            setLiked(question.userHasLiked);
            setLikesCount(question.likes);
        }
    }, [question]);

    const handleLikeQuestion = () => {
        if (!isAuthenticated) {
            setShowLoginForm(true);
            return;
        }

        const newLikedState = !liked;
        setLiked(newLikedState);
        setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
        dispatch(likeQuestion(id));
    };

    const handleLikeAnswer = (answerId) => {
        if (!isAuthenticated) {
            setShowLoginForm(true);
            return;
        }

        dispatch(likeAnswer(id, answerId));
    };

    const handleAnswerChange = (content) => {
        setAnswer(content);
    };

    const handleSubmitAnswer = () => {
        if (!isAuthenticated) {
            setShowLoginForm(true);
            return;
        }

        if (!answer.trim()) {
            setAnswerError('Answer field is required');
            return;
        }

        dispatch(createAnswer(id, answer));
        setAnswer('');
        setAnswerError('');
    };

    const handleCloseLoginForm = () => {
        setShowLoginForm(false);
    };

    if (loading) {
        return <div className='min-h-screen flex flex-col items-center justify-center bg-[#010100] text-[#EDEFF8] text-2xl'>Loading...</div>;
    }

    if (error) {
        return <div className='min-h-screen flex flex-col items-center justify-center bg-[#010100] text-[#EDEFF8] text-2xl'>Error: {error}</div>;
    }

    if (!question) {
        return <div className='min-h-screen flex flex-col items-center justify-center bg-[#010100] text-[#EDEFF8] text-2xl'>Question not found</div>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#010100]">
            <h2 className="text-3xl font-semibold mb-8 text-center text-[#EDEFF8]">Question Details</h2>
            <div className="max-w-7xl w-full bg-gray-600 p-8 rounded-lg shadow-lg" style={{ marginBottom: '2rem' }}>
                <div className="flex items-center mb-4">
                    <Avatar src={question.author?.imageUrl} alt={question.author?.username || 'User'} />
                    <h3 className="text-xl text-[#EDEFF8] font-semibold ml-4">{question.title}</h3>
                </div>
                <div className="text-[#EDEFF8] text-lg mb-4" dangerouslySetInnerHTML={{ __html: question.content }}></div>
                <div className="relative">
                    <button
                        className={`text-[#EDEFF8] hover:text-blue-500 focus:outline-none flex flex-col items-center absolute top-0 right-0 ${liked ? 'text-blue-500' : ''}`}
                        onClick={handleLikeQuestion}
                    >
                        <AiFillLike size={24} color={'currentColor'} />
                        <span className="text-sm">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</span>
                    </button>
                </div>
                <div className="text-[#EDEFF8] text-sm mt-2">Question posted by {question.author?.username || 'User'} on {new Date(question.createdAt).toLocaleString()}</div>
            </div>

            <div className="max-w-7xl w-full bg-gray-600 p-8 rounded-lg shadow-lg mb-5">
                <h3 className="text-3xl text-[#EDEFF8] font-semibold mb-4 flex items-center">
                    <MdQuestionAnswer className="mr-2" />
                    <span>Answers ({question.answers.length}) </span>
                </h3>

                {question.answers.length === 0 && (
                    <p className="text-center text-white">No answers right now... be the first to answer the question!</p>
                )}
                {question.answers.map((ans, index) => {
                    const answerAuthorUsername = ans.author?.username || 'User';
                    const answerAuthorImageUrl = ans.author?.imageUrl || '';

                    return (
                        <div key={index} className="max-w-7xl w-full bg-[#EDEFF8] p-8 rounded-lg shadow-lg mb-4 relative">
                            <div className="flex items-center mb-4">
                                <Avatar src={answerAuthorImageUrl} alt={answerAuthorUsername} />
                                <div className="ml-4">
                                    <p className="text-lg font-semibold text-[#010100]">{answerAuthorUsername}</p>
                                    <p className="text-sm text-gray-600">Answered on {new Date(ans.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="text-lg text-[#010100] mb-4" dangerouslySetInnerHTML={{ __html: ans.content }}></div>
                            <div className="absolute top-2 right-2 flex items-center">
                                <button className="text-[#010100] hover:text-[#DC143C] focus:outline-none flex items-center" onClick={() => handleLikeAnswer(ans._id)}>
                                    <GoLightBulb size={24} color={'currentColor'} />
                                    <span className="ml-1">{ans.likes} {ans.likes === 1 ? 'like' : 'likes'}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="max-w-7xl w-full bg-[#EDEFF8] p-8 rounded-lg shadow-lg mb-8">
                <h3 className="text-xl font-semibold mb-4">{isAuthenticated ? 'Your Answer' : 'Login to Answer'}</h3>
                {isAuthenticated ? (
                    <>
                        <div className="flex items-center mb-4">
                            <Avatar src={(user && user.imageUrl) || ''} alt={user ? user.username : 'User'} />
                            <p className="ml-4 text-lg font-semibold text-[#010100]">{user ? user.username : ''}</p>
                        </div>
                        <ReactQuill
                            value={answer}
                            onChange={handleAnswerChange}
                            modules={{ toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }], ['link', 'image']] }}
                            placeholder="Write your answer here..."
                            className="mb-4"
                        />
                        {answerError && <p className="text-red-500">{answerError}</p>}
                        <button className="bg-[#268077] text-[#EDEFF8] px-8 py-4 rounded-md shadow-md hover:bg-[#4bbeb3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4" onClick={handleSubmitAnswer}>Submit Answer</button>
                    </>
                ) : (
                    <div>
                        <p className="mb-4">Please login to answer this question.</p>
                        <button className="bg-[#268077] text-[#EDEFF8] px-8 py-4 rounded-md shadow-md hover:bg-[#4bbeb3] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4" onClick={() => setShowLoginForm(true)}>Login</button>
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
export default Question;