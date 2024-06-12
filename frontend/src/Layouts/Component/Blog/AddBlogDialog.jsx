import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Input, FormControl, InputLabel, IconButton, Autocomplete } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog, updateBlog } from '../../../store/Actions/blogActions';
import { fetchAuthors } from '../../../store/Actions/authorActions';

const styles = {
    uploadContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
        marginTop: '5px',
        border: '1px solid #aaa',
        borderRadius: '4px',
        padding: '15px',
    },
    uploadInput: {
        display: 'none',
    },
    uploadButton: {
        marginLeft: '10px',
    },
};

const AddBlogDialog = ({ open, onClose, editingBlog, setBlogs }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        author_ids: [],
        meta_title: '',
        meta_description: '',
        img: null,
        img_title: '',
        img_caption: '',
        img_alt_text: '',
        schema: '',
        slug_url: '',
        category_ids: [],
    });

    const [selectedImagePreview, setSelectedImagePreview] = useState(null);
    const dispatch = useDispatch();
    const authors = useSelector(state => state.authors.authors);

    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch]);

    useEffect(() => {
        if (editingBlog) {
            setFormData({
                title: editingBlog.title,
                description: editingBlog.description,
                content: editingBlog.content,
                author_ids: editingBlog.author_ids,
                meta_title: editingBlog.meta_title,
                meta_description: editingBlog.meta_description,
                img: null,
                img_title: editingBlog.img_title,
                img_caption: editingBlog.img_caption,
                img_alt_text: editingBlog.img_alt_text,
                schema: editingBlog.schema,
                slug_url: editingBlog.slug_url,
                category_ids: editingBlog.category_ids,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                content: '',
                author_ids: [],
                meta_title: '',
                meta_description: '',
                img: null,
                img_title: '',
                img_caption: '',
                img_alt_text: '',
                schema: '',
                slug_url: '',
                category_ids: [],
            });
        }
    }, [editingBlog]);

    const handleEditorChange = (content) => {
        setFormData(prevState => ({
            ...prevState,
            content: content
        }));
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prevState => ({
            ...prevState,
            img: file
        }));
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setSelectedImagePreview(null);
        }
    };

    const handleAuthorChange = (event, value) => {
        const authorIds = value.map(author => author._id);
        setFormData(prevState => ({
            ...prevState,
            author_ids: authorIds
        }));
    };

    const handleSave = async () => {
        const { title, description, content } = formData;

        if (!title || !description || !content) {
            console.error('Title, description, and content are required');
            return;
        }

        try {
            const formDataToSend = new FormData();
            for (let key in formData) {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach(item => formDataToSend.append(`${key}[]`, item));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            }

            if (editingBlog) {
                // Update the blog
                const response = await dispatch(updateBlog(editingBlog._id, formDataToSend));
                const updatedBlog = response.data || response.payload; // Adjust based on the response structure
                if (updatedBlog) {
                    setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
                } else {
                    console.error('Failed to update the blog: No payload in the response');
                }
            } else {
                // Add a new blog
                const response = await dispatch(addBlog(formDataToSend));
                const newBlog = response.data || response.payload; // Adjust based on the response structure
                if (newBlog) {
                    setBlogs(prevBlogs => [...prevBlogs, newBlog]);
                } else {
                    console.error('Failed to add the blog: No payload in the response');
                }
            }

            onClose();
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editingBlog ? 'Edit Blog' : 'Add Blog'}</DialogTitle>
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
                />
                <TextField
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    fullWidth
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <Editor
                    apiKey={import.meta.env.VITE_REACT_APP_KEY}
                    value={formData.content}
                    onEditorChange={handleEditorChange}
                    init={{
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                            'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                />
                <Autocomplete
                    multiple
                    id="author_ids"
                    options={authors}
                    getOptionLabel={(option) => option.name}
                    value={authors.filter(author => formData.author_ids.includes(author._id))}
                    onChange={handleAuthorChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            margin="dense"
                            label="Select Authors"
                            placeholder="Authors"
                            fullWidth
                        />
                    )}
                />
                <div style={styles.uploadContainer}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="img-input" style={{ position: 'relative' }}>Upload Image</InputLabel>
                        <Input
                            id="img-input"
                            type="file"
                            name="img"
                            onChange={handleFileChange}
                            style={styles.uploadInput}
                        />
                    </FormControl>
                    {
                        selectedImagePreview && (
                            <img src={selectedImagePreview} alt="Selected" style={{ maxHeight: '100px', marginLeft: '10px' }} />
                        )
                    }
                    <label htmlFor="img-input">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            style={styles.uploadButton}
                        >
                            <CloudUploadIcon />
                        </IconButton>
                    </label>
                </div>
                <TextField
                    margin="dense"
                    id="img_title"
                    name="img_title"
                    label="Image Title"
                    fullWidth
                    value={formData.img_title}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="img_caption"
                    name="img_caption"
                    label="Image Caption"
                    fullWidth
                    value={formData.img_caption}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="img_alt_text"
                    name="img_alt_text"
                    label="Image Alt Text"
                    fullWidth
                    value={formData.img_alt_text}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="schema"
                    name="schema"
                    label="Schema"
                    fullWidth
                    value={formData.schema}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    id="slug_url"
                    name="slug_url"
                    label="Slug URL"
                    fullWidth
                    value={formData.slug_url}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AddBlogDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    editingBlog: PropTypes.object,
    setBlogs: PropTypes.func.isRequired, // Define setBlogs as a required prop
};

export default AddBlogDialog;
