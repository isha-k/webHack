import { NavLink } from "react-router-dom";
import { Home, Profile, Tasks } from "../pages";

const Navbar = () => {
  return (
    <header className='header'>
      <nav className='flex text-lg gap-7 font-medium'>
      <NavLink to='/'  className={({ isActive }) => isActive ? "text-purple-400" : "text-black" }>Welcome</NavLink>
      </nav>

      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/profile' className={({ isActive }) => isActive ? "text-purple-400" : "text-black" }>
          Profile
        </NavLink>
        <NavLink to='/tasks' className={({ isActive }) => isActive ? "text-purple-400" : "text-black"}>
          Tasks
        </NavLink>
        <NavLink to='/audio' className={({ isActive }) => isActive ? "text-purple-400" : "text-black"}>
          Audio
        </NavLink>

      </nav>
    </header>
  );
};

export default Navbar;