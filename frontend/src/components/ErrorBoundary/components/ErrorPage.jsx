import { Box, Button, Card, Stack, Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'

const StyledRoot = styled(Card)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}))
const StyledButton = styled('a')(({ theme }) => ({
  width: '10rem',
  borderRadius: '20px',
  background: '#D33737',
  fontWeight: 'bold',
  fontSize: '15px',
  marginTop: '3rem',
  height: '30px',
  textDecoration: 'none',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    background: '#962525'
  }
}))


const ErrorPage = () => {
  return (
    <div>
      <StyledRoot elevation={0}>
        <Stack>

          <Typography sx={{ fontWeight: 'bold', fontSize: '10vw', color: '#d33737' }}>
            Oops...!
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '4vw', }} >
              Error 404:
            </Typography>
            <Typography sx={{ fontSize: '4vw', ml: '1rem' }}>  Page Not found </Typography>
          </div>
          <Typography sx={{ fontWeight: 'bold', }}> We're sorry. the page you requested could not be found at the moment </Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <StyledButton variant='contained' component={Link} href='/'>
              Go Home
            </StyledButton>
          </div>

        </Stack>
        <Box sx={{ mt: '5rem' }}>
          <img src='/assets/images/error.png' />
        </Box>
      </StyledRoot>

    </div>
  )
}

export default ErrorPage