import './App.css';
import Container from '@mui/material/Container';
import Login from './pages/authentication/login/Login';
import SignIn from './pages/authentication/signin/Signin';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <Container
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <AuthProvider>
        <SignIn></SignIn>
      </AuthProvider>
    </Container>
  );
}

export default App;
