import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/reactMovie">
            首頁
          </NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/genres">
                  電影類型
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movies/filter">
                  搜尋電影
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/actors">
                  演員
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movietheaters">
                  影城
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/movies/create">
                  電影
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
