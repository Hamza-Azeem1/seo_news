import { useState, useEffect } from 'react';
import { Button, styled, TextField, Stack, Typography } from '@mui/material';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../../store/Actions/adminActions';

const StyledButton = styled(Button)(({ theme }) => ({
    margin: '10px 0',
    background: theme.palette.primary.main,
    '&:hover': {
        background: theme.palette.secondary.main
    }
}));

const initialValues = {
    email: '',
    password: ''
};

const AdminLoginForm = () => {
    const [formValues, setFormValues] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.admin.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(adminLogin(formValues));
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            setFormValues(initialValues);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextField
                    label='Email'
                    sx={{
                        mb: '1rem',
                        width: '350px',
                        backgroundColor: '#EDEFF8',
                        border: error && formValues.email.trim() === '' ? '1px solid red' : 'none'
                    }}
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                />
                <TextField
                    label='Password'
                    sx={{
                        mb: '1rem',
                        width: '350px',
                        backgroundColor: '#EDEFF8',
                        border: error && formValues.password.trim() === '' ? '1px solid red' : 'none'
                    }}
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    required
                    autoComplete='off'
                    type="password"
                />
                {error && <Typography color="error">{error}</Typography>}
                {
                    loading ?
                        <StyledButton type='submit' variant='disabled'>
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="30"
                                visible={loading}
                            />
                        </StyledButton> :
                        <StyledButton type='submit' sx={{ color: '#fff' }}>
                            Login
                        </StyledButton>
                }
            </Stack>
        </form>
    );
};

export default AdminLoginForm;
