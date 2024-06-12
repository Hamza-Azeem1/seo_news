// Authors.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors, deleteAuthor } from '../../../store/Actions/authorActions';
import AddAuthorDialog from './AddAuthorDialog';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Avatar,
    IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

const Authors = () => {
    const dispatch = useDispatch();
    const authors = useSelector((state) => state.authors.authors);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState(null);

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    const handleOpenDialog = (author) => {
        setSelectedAuthor(author);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedAuthor(null);
        setOpenDialog(false);
    };

    const handleDeleteAuthor = (id) => {
        dispatch(deleteAuthor(id));
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">All Authors</Typography>
                <Button variant="contained" color="primary" endIcon={<AddIcon />} onClick={() => handleOpenDialog(null)}>
                    Add Author
                </Button>
            </Box>
            <Grid container spacing={3}>
                {authors.map((author) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={author._id}>
                        <Card>
                            <CardMedia>
                                <Avatar
                                    alt={author.name}
                                    src={`${import.meta.env.REACT_APP_API_URL}/${author.profilePicture}`}
                                    style={{
                                        width: '250px',
                                        height: '250px',
                                        borderRadius: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </CardMedia>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6">{author.name}</Typography>
                                    <Box>
                                        <IconButton onClick={() => handleOpenDialog(author)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteAuthor(author._id)}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    {author.designation}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <AddAuthorDialog open={openDialog} handleClose={handleCloseDialog} author={selectedAuthor} />
        </Box>
    );
};

export default Authors;