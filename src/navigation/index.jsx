import AuthNav from './auth';
import AppNav from './app';
import { useAuth } from '../context/AuthContext';

export default function IndexNav() {
  const { user } = useAuth();
  return <>{user ? <AppNav /> : <AuthNav />}</>;
}
