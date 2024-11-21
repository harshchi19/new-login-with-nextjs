import { Toaster } from 'react-hot-toast';
import AuthForm from './components/AuthForm';

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AuthForm />
    </>
  );
}

export default App;