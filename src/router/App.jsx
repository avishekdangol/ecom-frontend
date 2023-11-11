import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes";
import Preloader from "../components/preloader";

function App() {
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.name} path={route.path} element={route.element}>
            {route.middleware?.length ? (
              <Route index element={route.component} />
            ) : (
              ""
            )}
          </Route>
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
