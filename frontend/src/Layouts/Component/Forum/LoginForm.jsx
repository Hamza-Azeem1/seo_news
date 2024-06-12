import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../../../store/Actions/authActions';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Button,
    Alert,
    Grid,
    Link,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm = ({ onClose }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false);
    const dispatch = useDispatch();
    const { error, isAuthenticated } = useSelector((state) => state.auth);
    const loginRef = useRef(null);

    useEffect(() => {
        if (error && loginClicked) {
            setMessage(error);
            setOpenSnackbar(true);
            if (loginRef.current) {
                loginRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (isAuthenticated) {
            onClose();
        }
    }, [error, isAuthenticated, onClose, loginRef, loginClicked]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginClicked(true); // Set login button click to true when form submitted
        if (isRegister) {
            if (formData.password !== formData.confirmPassword) {
                setMessage('Passwords do not match');
                setOpenSnackbar(true);
                return;
            }
            dispatch(register(formData.username, formData.email, formData.password));
            setMessage('Successfully registered. Now login to your account.');
            setOpenSnackbar(true);
            setIsRegister(false);
        } else {
            dispatch(login(formData.email, formData.password));
        }
    };

    const toggleRegisterMode = () => {
        setIsRegister(!isRegister);
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleLoginDialogClose = () => {
        setMessage('');
        onClose();
    };

    return (
        <>
            <Dialog open={true} onClose={handleLoginDialogClose}>
                <DialogTitle>{isRegister ? 'Register' : 'Login'}</DialogTitle>
                <DialogContent dividers>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseSnackbar}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert onClose={handleCloseSnackbar} severity={error && loginClicked ? 'error' : 'success'}>
                            {message}
                        </Alert>
                    </Snackbar>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" ref={loginRef}>
                            {isRegister ? 'Register' : 'Login'}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                {isRegister && (
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                )}
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                {isRegister && (
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {isRegister ? 'Register' : 'Login'}
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={toggleRegisterMode}>
                                        {isRegister
                                            ? 'Already have an account? Login'
                                            : "Don't have an account? Register"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLoginDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

LoginForm.propTypes = {
    onClose: PropTypes.func,
};


export default LoginForm;
