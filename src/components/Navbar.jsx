import { NavLink } from "react-router-dom";
import { Home, Profile, Tasks } from "../pages";

const Navbar = () => {
  return (
    <header className='header'>
      <nav className='flex text-lg gap-7 font-medium'>
      <NavLink to='/'  className={({ isActive }) => isActive ? "text-purple-400" : "text-white" }>Welcome</NavLink>
      </nav>

      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/profile' className={({ isActive }) => isActive ? "text-blue-600" : "text-white" }>
          Profile
        </NavLink>
        <NavLink to='/tasks' className={({ isActive }) => isActive ? "text-blue-600" : "text-white"}>
          Tasks
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;