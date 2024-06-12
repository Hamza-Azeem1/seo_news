import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import { FaComment, FaRegHeart, FaReply } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const CommentSection = ({ blogId, userId }) => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.REACT_APP_API_URL}/api/comments/${blogId}/comments`);
            const fetchedComments = response.data.map(comment => ({
                ...comment,
                replyOpen: false,
                replyText: '',
                liked: comment.likedBy.includes(userId)
            }));
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }, [blogId, userId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = async () => {
        if (comment.trim() !== '') {
            try {
                await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/comments/${blogId}/comments`, { text: comment });
                fetchComments();
                setComment('');
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const handleLike = async (index) => {
        const updatedComments = [...comments];
        const comment = updatedComments[index];
        try {
            await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/comments/${comment._id}/like`, { userId });
            if (comment.liked) {
                comment.likes -= 1;
                comment.liked = false;
            } else {
                comment.likes += 1;
                comment.liked = true;
            }
            setComments(updatedComments);
        } catch (error) {
            console.error('Error liking/unliking comment:', error);
        }
    };

    const handleReplyChange = (index, e) => {
        const updatedComments = [...comments];
        updatedComments[index].replyText = e.target.value;
        setComments(updatedComments);
    };

    const handleReplyToggle = (index) => {
        const updatedComments = [...comments];
        updatedComments[index].replyOpen = !updatedComments[index].replyOpen;
        setComments(updatedComments);
    };

    const handleReplySubmit = async (index) => {
        const updatedComments = [...comments];
        const comment = updatedComments[index];
        if (comment.replyText.trim() !== '') {
            try {
                await axios.post(`${import.meta.env.REACT_APP_API_URL}/api/comments/${comment._id}/replies`, { text: comment.replyText });
                comment.replies.push({
                    text: comment.replyText,
                    timestamp: new Date().toLocaleString(),
                });
                comment.replyText = '';
                comment.replyOpen = false;
                setComments(updatedComments);
            } catch (error) {
                console.error('Error adding reply:', error);
            }
        }
    };

    return (
        <div className='bg-[#17181B]'>
            <div className="container mx-auto py-8">
                <div className="max-w-full mx-auto bg-gray-600 rounded-lg shadow-lg p-6">
                    <div className="flex items-center mb-4">
                        <FaComment className="mr-2" />
                        <h2 className="text-xl font-bold">Comments ({comments.length})</h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-center mb-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="py-2 px-4 w-full rounded-lg bg-white text-black focus:outline-none focus:ring focus:border-blue-300 border-gray-300"
                            value={comment}
                            onChange={handleCommentChange}
                        />
                        <button
                            className="bg-[#35746d] text-[#EDEFF8] py-2 px-4 rounded-full hover:bg-[#52b8ad] focus:outline-none focus:ring focus:border-blue-300 md:ml-2 mt-2"
                            onClick={handleSubmitComment}
                        >
                            Comment
                        </button>
                    </div>

                    <div className="space-y-4">
                        {comments.map((comment, index) => (
                            <div key={index} className="bg-gray-400 p-4 rounded-lg flex flex-col">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col mb-4">
                                        <div className="flex items-center">
                                            <Avatar src={''} className="mr-2" />
                                            <div>
                                                <p className="text-lg font-semibold text-[#010100] mt-5">
                                                    {'User'}
                                                </p>
                                                <p className="ml-2">{comment.text}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button className="text-[#EDEFF8] hover:text-red-500 focus:outline-none flex flex-col items-center" onClick={() => handleLike(index)}>
                                            <FaRegHeart size={24} color={comment.liked ? 'red' : 'currentColor'} />
                                            <span>{comment.likes} {comment.likes === 1 ? 'like' : 'likes'}</span>
                                        </button>
                                        <button className="text-[#EDEFF8] hover:text-gray-700 focus:outline-none" onClick={() => handleReplyToggle(index)}>
                                            <FaReply size={24} />
                                            <span className="inline text-[#EDEFF8]">Reply</span>
                                        </button>
                                    </div>
                                </div>
                                {comment.replyOpen && (
                                    <div className="mt-4">
                                        <input
                                            type="text"
                                            placeholder="Reply to this comment..."
                                            className="py-1 px-2 rounded focus:outline-none focus:ring focus:border-blue-300 border-gray-300"
                                            value={comment.replyText}
                                            onChange={(e) => handleReplyChange(index, e)}
                                        />
                                        <button
                                            className="bg-[#35746d] text-white py-1 px-2 rounded hover:bg-[#52b8ad] focus:outline-none focus:ring focus:border-blue-300 ml-2"
                                            onClick={() => handleReplySubmit(index)}
                                        >
                                            Reply
                                        </button>
                                    </div>
                                )}
                                <div className="pl-4 mt-2 space-y-2">
                                    <div className="text-xs text-[#EDEFF8]">{new Date(comment.timestamp).toLocaleString()}</div>
                                    {comment.replies.length > 0 && (
                                        <div>
                                            <button className="text-blue-500 hover:text-blue-700 focus:outline-none" onClick={() => handleReplyToggle(index)}>
                                                <div className="flex items-center">
                                                    {comment.replyOpen ? (
                                                        <>
                                                            <IoIosArrowUp className="mr-2" />
                                                            <span>Show less</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <IoIosArrowDown className="mr-2" />
                                                            <span>Show replies</span>
                                                        </>
                                                    )}
                                                </div>
                                            </button>
                                            <span className="text-[#EDEFF8] ml-2">{comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}</span>
                                        </div>
                                    )}
                                    {comment.replyOpen && comment.replies.map((reply, idx) => (
                                        <div key={idx}>
                                            <div className="flex flex-col mb-4">
                                                <div className="flex items-center">
                                                    <Avatar src={''} className="mr-2" />
                                                    <div>
                                                        <p className="text-lg font-semibold text-[#010100] mt-5">
                                                            {'User'}
                                                        </p>
                                                        <p className="ml-2">{reply.text}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-xs text-[#EDEFF8]">{new Date(reply.timestamp).toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

CommentSection.propTypes = {
    blogId: PropTypes.string.isRequired,
    userId: PropTypes.string
}

export default CommentSection;