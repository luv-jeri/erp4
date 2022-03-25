import './App.css';
import Container from '@mui/material/Container';
import IndexNav from './navigation';

function App() {
  return (
    <Container
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <IndexNav />
    </Container>
  );
}

export default App;
