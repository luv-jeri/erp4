import './App.css';
import Container from '@mui/material/Container';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import IndexNav from './navigation/index';

function App() {
  return (
    <Container
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Router>
        <AuthProvider>
          <IndexNav />
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
