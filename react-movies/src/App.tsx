import { Route, Routes } from "react-router-dom";
import Menu from "./menu/Menu";
import routes from "./routes-config/routes-config";
import configureValidation from './Validation'
configureValidation();
function App() {
  return (
    <>
      <Menu />
      <div className="container">
        <Routes>
          {routes.map((route) => {
            return (
              <Route key={route.path} path={route.path} element={<route.components/>}/>
            );
          })}
        </Routes>
      </div>
      <footer className="bd-footer py-5 mt-5 bg-light">
        <div className="container">Abe Hsiao{new Date().getFullYear().toString()}</div>
      </footer>
    </>
  );
}

export default App;
