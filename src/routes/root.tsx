import '../App.css';
import { NavLink, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <nav className="root-navigation" data-testid="root-navigation">
        <ul className="root-navigation__list">
          <li>
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                isActive
                  ? 'root-navigation__item root-navigation__item_active'
                  : 'root-navigation__item'
              }
              data-testid="link-main-page"
            >
              Main Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'form'}
              className={({ isActive }) =>
                isActive
                  ? 'root-navigation__item root-navigation__item_active'
                  : 'root-navigation__item'
              }
              data-testid="link-uncontrolled-form"
            >
              Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'control-form'}
              className={({ isActive }) =>
                isActive
                  ? 'root-navigation__item root-navigation__item_active'
                  : 'root-navigation__item'
              }
              data-testid="link-controlled-form"
            >
              controlled Form
            </NavLink>
          </li>
        </ul>
      </nav>
      <section className="forms-container">
        <Outlet />
      </section>
    </>
  );
}
