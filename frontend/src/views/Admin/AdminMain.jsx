import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import CommentIcon from '@mui/icons-material/Comment';
import LinkIcon from '@mui/icons-material/Link';
import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BlogCard from '../../Layouts/Component/Blog/BlogCard';
import Authors from '../../Layouts/Component/Author/Authors';
import AdminForum from '../../Layouts/Component/Forum/AdminForum';
import AdminComments from '../../Layouts/Component/Comment/AdminComments';
import AdminLinks from '../../Layouts/Component/Link/AdminLinks';
import { useDispatch } from 'react-redux';
import { adminLogOut } from '../../store/Actions/adminActions';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AddBlogDialog from '../../Layouts/Component/Blog/AddBlogDialog';

const drawerWidth = 240;

const listData = [
    { title: 'Manage Blogs', icon: <ArticleIcon /> },
    { title: 'Manage Authors', icon: <AccountCircleIcon /> },
    { title: 'Manage Forum', icon: <ForumIcon /> },
    { title: 'Manage Comment', icon: <CommentIcon /> },
    { title: 'Manage Links', icon: <LinkIcon /> },
];

const AdminMain = () => {
    const [selectedItem, setSelectedItem] = useState(listData[0].title);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch('http://localhost:8000/api/blog');
            const data = await res.json();
            setBlogs(data);
        };
        fetchBlogs();
    }, []);

    const handleItemClick = (title) => {
        setSelectedItem(title);
    };

    const handleSignOut = () => {
        dispatch(adminLogOut());
        navigate('/admin-login');
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingBlog(null);
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setOpenDialog(true);
    };

    const handleSave = (updatedBlog) => {
        const updatedBlogs = blogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog);
        setBlogs(updatedBlogs);
        handleCloseDialog();
    };

    return (
        <>
            <Helmet>
                <title>Admin_Dashboard</title>
                <meta name="robots" content="noindex, nofollow"></meta>
            </Helmet>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>
                        <Button variant='contained' sx={{ ml: 'auto' }} color='secondary' onClick={handleSignOut}>
                            Signout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List sx={{ p: 1 }}>
                            {listData.map((val, ind) => (
                                <ListItem
                                    key={ind}
                                    disablePadding
                                    sx={{
                                        backgroundColor: selectedItem === val.title ? '#268077' : 'transparent',
                                        mt: 2,
                                        borderRadius: '15px',
                                        color: selectedItem === val.title ? '#fff' : '#000',
                                        '&:hover': {
                                            backgroundColor: '#268077',
                                        },
                                    }}
                                    onClick={() => handleItemClick(val.title)}
                                >
                                    <ListItemButton>
                                        <ListItemIcon sx={{
                                            color: selectedItem === val.title ? '#fff' : '#000',
                                        }}>{val.icon}</ListItemIcon>
                                        <ListItemText primary={val.title} sx={{ fontWeight: selectedItem === val.title && 'bold' }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Box>
                        {selectedItem === 'Manage Blogs' && (
                            <>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">
                                            All Blogs
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ color: 'white' }}
                                            endIcon={<AddIcon />}
                                            onClick={handleOpenDialog}
                                        >
                                            Add Blog
                                        </Button>
                                        <AddBlogDialog open={openDialog} onClose={handleCloseDialog} editingBlog={editingBlog} onSave={handleSave} setBlogs={setBlogs} />
                                    </Grid>
                                </Grid>
                                {blogs.length > 0 ? (
                                    <BlogCard blogs={blogs} isAdmin={true} onEdit={handleEdit} setBlogs={setBlogs} />
                                ) : (
                                    <p className="text-black text-center text-3xl">No blog posts found.</p>
                                )}
                            </>
                        )}
                        {selectedItem === 'Manage Authors' && (
                            <>
                                <Authors />
                            </>
                        )}
                        {selectedItem === 'Manage Forum' && (
                            <>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4" gutterBottom>
                                            Questions and Answers
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ color: 'white' }}
                                            endIcon={<AddIcon />}
                                        >
                                            Add Forum
                                        </Button>
                                    </Grid>
                                </Grid>
                                <AdminForum />
                            </>
                        )}
                        {selectedItem === 'Manage Comment' && (
                            <>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">
                                            All Comments
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <AdminComments blogs={blogs} />
                            </>
                        )}
                        {selectedItem === 'Manage Links' && (
                            <>
                                <AdminLinks />
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AdminMain;
