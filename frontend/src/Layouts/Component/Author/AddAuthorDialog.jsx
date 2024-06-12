import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Typography,
} from '@mui/material';
import { createAuthor, updateAuthor } from '../../../store/Actions/authorActions';

const AddAuthorDialog = ({ open, handleClose, author }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (author) {
            setName(author.name || '');
            setDesignation(author.designation || '');
            setProfilePicture(author.profilePicture || null);
            setPreview(author.profilePicture ? `http://localhost:8000/${author.profilePicture}` : null);
        } else {
            setName('');
            setDesignation('');
            setProfilePicture(null);
            setPreview(null);
        }
    }, [author]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (author) {
            dispatch(updateAuthor(author._id, { name, designation, profilePicture }));
        } else {
            dispatch(createAuthor({ name, designation, profilePicture }));
        }
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{author ? 'Edit Author' : 'Add Author'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Designation"
                        fullWidth
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    />
                    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                        <Button
                            variant="contained"
                            component="label"
                            style={{ marginBottom: '10px' }}
                        >
                            Choose Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        {preview && (
                            <Box mt={2} textAlign="center">
                                <Typography variant="h6">Uploaded Image</Typography>
                                <img
                                    src={preview}
                                    alt="Selected Profile"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'cover',
                                        borderRadius: '50%',
                                        marginTop: '10px'
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {author ? 'Update Author' : 'Add Author'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

AddAuthorDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    author: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        designation: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
};

export default AddAuthorDialog;
