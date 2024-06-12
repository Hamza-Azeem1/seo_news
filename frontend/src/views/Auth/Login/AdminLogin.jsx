import {
  AppBar, Toolbar, styled,
  Typography, Stack
} from '@mui/material'
import AdminLoginForm from './AdminLoginForm'
const StyledRoot = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
  position: 'fixed',

}))
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}))

const AdminLogin = () => {
  return (
    <div>
      <StyledAppBar>
        <StyledToolbar>
          <Typography>
            Admin Login
          </Typography>
        </StyledToolbar>
      </StyledAppBar>
      <StyledRoot>
        <Stack>

          <Typography variant='h4' sx={{ textAlign: 'center' }}> Admin Login </Typography>
          <Typography sx={{ textAlign: 'center', mb: '1rem' }}> Sign in on the internal platform </Typography>
          <AdminLoginForm />

        </Stack>
      </StyledRoot>
    </div>
  )
}

export default AdminLogin
