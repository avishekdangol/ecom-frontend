import { Routes, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Routes>
      {
        routes.map((route) => (
          <Route key={route.name} path={route.path} element={route.element}>
            {
              route.middleware?.length ? (
                <Route index element={route.component} />
              ) : ''
            }
          </Route>
        ))
      }
    </Routes>
  );
}

export default App;
