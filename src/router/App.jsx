import { Routes, Route } from 'react-router-dom';
import routes from './routes';
import { useAuth } from '@/utils/AuthContext';
import Home from '@/pages/Home/Index';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {
        routes.map((route) => (isLoggedIn && route.name === 'Auth' ? (
          <Route key={route.name} path="/" element={<Home />} />
        ) : (
          <Route key={route.name} path={route.path} element={route.element} />
        )))
      }
    </Routes>
  );
}

export default App;
