import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { addLink } from '../../../store/Actions/linkActions';
import Zoom from '@mui/material/Zoom';

const Links = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPendingMessage, setShowPendingMessage] = useState(false); // State to control the pending message display
    const links = useSelector(state => state.links.links);
    const dispatch = useDispatch();

    useEffect(() => {
        if (showPendingMessage) {
            const timer = setTimeout(() => {
                setShowPendingMessage(false);
            }, 3000); // Set timeout to remove pending message after 3 seconds
            return () => clearTimeout(timer); // Clear timeout when component unmounts or when showPendingMessage changes
        }
    }, [showPendingMessage]);

    const handleClose = () => {
        setOpen(false);
        setErrorMessage('');
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        if (!title.trim() || !link.trim()) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        dispatch(addLink(title, link));
        setTitle('');
        setLink('');
        setShowPendingMessage(true); // Show pending message after submitting link

        handleClose();
    };

    return (
        <div style={{ backgroundColor: '#121212', padding: '20px', minHeight: '100vh' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#FFFFFF' }}>Share your Blogs with Community!</h1>
            <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '20px' }}>Submit Your Blog</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Submit Your Blog</DialogTitle>
                <DialogContent>
                    {errorMessage && <p style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</p>}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="link"
                        label="Link"
                        type="text"
                        fullWidth
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '20px' }}>Submit</Button>
                </DialogContent>
            </Dialog>
            {showPendingMessage && ( // Conditionally render pending message
                <div style={{ marginBottom: '20px', backgroundColor: '#424242', padding: '10px' }}>
                    <Typography variant="h5" style={{ color: '#FFFFFF' }}>Pending Approval</Typography>
                    <Typography variant="body1" style={{ color: '#FFFFFF' }}>Your submitted link is pending approval by the admin.</Typography>
                </div>
            )}
            {links.map((link, index) => (
                link.approved && (
                    <Zoom key={index} in={true} style={{ transitionDelay: `${index * 200}ms` }}>
                        <Card style={{ marginBottom: '20px', backgroundColor: '#424242' }}>
                            <CardContent>
                                <Typography variant="h5" style={{ color: '#FFFFFF' }}>{link.title}</Typography>
                                <Button variant="contained" color="primary" onClick={() => window.open(link.link, '_blank')} style={{ marginTop: '10px' }}>Open Link</Button>
                            </CardContent>
                        </Card>
                    </Zoom>
                )
            ))}
            {links.length === 0 && <p style={{ fontSize: '1.2rem', color: '#FFFFFF' }}>No linked blogs found.</p>}
        </div>
    );
};

export default Links;
