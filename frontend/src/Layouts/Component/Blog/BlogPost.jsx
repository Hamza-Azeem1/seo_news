import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import CommentSection from '../Comment/Comments';
import { Container, Typography, Button, Box, CircularProgress, Avatar, Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useSelector } from 'react-redux';
import LoginForm from '../Forum/LoginForm';

const BlogPost = () => {
    const { schema, id } = useParams();
    const [blog, setBlog] = useState(null);
    const [authors, setAuthors] = useState([]);
    const [showLoginForm, setShowLoginForm] = useState(false);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.userId);

    const fetchBlog = useCallback(async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/blog/${schema}/${id}`);
            setBlog(response.data);
            if (response.data.author_ids.length) {
                const authorResponse = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/authors`, {
                    params: { ids: response.data.author_ids.join(',') }
                });
                const filteredAuthors = authorResponse.data.filter(author => response.data.author_ids.includes(author._id));
                setAuthors(filteredAuthors);
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    }, [schema, id]);

    useEffect(() => {
        fetchBlog();
    }, [fetchBlog]);

    if (!blog) {
        return (
            <Container sx={{ maxWidth: 'lg', py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress color="inherit" />
                </Box>
            </Container>
        );
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formattedDate = blog.updatedAt ? formatDate(blog.updatedAt) : formatDate(new Date().toISOString());

    // Sanitize HTML content using DOMPurify
    const sanitizedContent = DOMPurify.sanitize(blog.content);

    const handleOpenLoginForm = () => {
        setShowLoginForm(true);
    };

    const handleCloseLoginForm = () => {
        setShowLoginForm(false);
    };

    return (
        <>
            <Box sx={{ bgcolor: '#17181B', color: '#EDEFF8', py: 4 }}>
                <Container sx={{ maxWidth: 'lg', py: 4 }}>
                    <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, fontWeight: 'bold', mb: 4 }}>
                        {blog.title}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: { xs: '20px', md: '10px' } }}>
                                {authors.map(author => (
                                    <Avatar
                                        key={author._id}
                                        src={`${import.meta.env.VITE_REACT_APP_API}/${author.profilePicture}`}
                                        alt={author.name}
                                        sx={{ width: { xs: 50, md: 70 }, height: { xs: 50, md: 70 }, mr: 2 }}
                                    />
                                ))}
                                <Box>
                                    {authors.map(author => (
                                        <Box key={author._id}>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', fontSize: { xs: '1rem', sm: 'inherit' } }}>
                                                {author.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#fff', fontSize: { xs: '0.8rem', sm: 'inherit' } }}>
                                                {author.designation}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ textAlign: 'right', marginTop: { xs: '20px', md: 0 } }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#fff', fontSize: { xs: '0.8rem', sm: 'inherit' } }}>
                                Last Updated: {formattedDate}
                            </Typography>
                        </Grid>
                    </Grid>
                    {blog.img && (
                        <Box component="img"
                            src={`${import.meta.env.VITE_REACT_APP_API}/uploads/${blog.img}`}
                            alt={blog.title}
                            sx={{ width: '100%', height: 'auto', mb: 4, borderRadius: 1, boxShadow: 3 }}
                        />
                    )}
                    <Typography component={'div'} variant="body1" sx={{ lineHeight: 1.6, textAlign: 'justify', color: '#fff' }}>
                        {sanitizedContent}
                    </Typography>
                    <Button
                        component={Link}
                        to="/blog"
                        variant="contained"
                        sx={{ bgcolor: '#268077', '&:hover': { bgcolor: '#40e0d0' }, fontWeight: 'bold', mt: 4 }}
                    >
                        Go Back
                    </Button>
                </Container>
            </Box>
            {isAuthenticated ? (
                <CommentSection blogId={id} userId={userId} />
            ) : (
                <Box sx={{ bgcolor: '#17181B', maxWidth: 'xl', py: 4, textAlign: 'center' }}>
                    <Button variant="contained" sx={{ bgcolor: '#268077', '&:hover': { bgcolor: '#40e0d0' }, fontWeight: 'bold' }} onClick={handleOpenLoginForm}>
                        Sign in to comment
                    </Button>
                </Box>
            )}
            <Dialog open={showLoginForm} onClose={handleCloseLoginForm}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <LoginForm onClose={handleCloseLoginForm} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BlogPost;
