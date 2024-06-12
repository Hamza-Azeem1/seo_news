import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card, CardContent, CardActions, IconButton, Typography, Grid, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminComments = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlogId, setSelectedBlogId] = useState('');
    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState(0);

    const fetchBlogs = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/blog');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }, []);

    const fetchComments = useCallback(async () => {
        if (selectedBlogId) {
            try {
                const response = await axios.get(`http://localhost:8000/api/comments/${selectedBlogId}/comments`);
                setComments(response.data);
                setTotalComments(response.data.length);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
    }, [selectedBlogId]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleBlogChange = (event) => {
        setSelectedBlogId(event.target.value);
        setComments([]);
    };

    const handleDeleteClick = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8000/api/comments/${commentId}`);
            setComments(comments.filter(comment => comment._id !== commentId));
            setTotalComments(totalComments - 1);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="select-blog-label">Select Blog</InputLabel>
                <Select
                    labelId="select-blog-label"
                    value={selectedBlogId}
                    onChange={handleBlogChange}
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                >
                    {blogs.map((blog) => (
                        <MenuItem key={blog._id} value={blog._id}>
                            {blog.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="h6" gutterBottom>
                Total Comments: {totalComments}
            </Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {totalComments === 0 ? (
                    <Grid item xs={12}>
                        <Typography variant="body1">No comments found.</Typography>
                    </Grid>
                ) : (
                    comments.map((comment) => (
                        <Grid item xs={12} key={comment._id}>
                            <Card sx={{ backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
                                        {comment.text}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    <IconButton onClick={() => handleDeleteClick(comment._id)} sx={{ color: 'red' }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>
        </Box>
    );
};

AdminComments.propTypes = {
    blogId: PropTypes.string,
};

export default AdminComments;
