import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 700, color: 'text.secondary', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<HomeIcon />}
        onClick={() => navigate('/')}
        sx={{ mt: 3 }}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
