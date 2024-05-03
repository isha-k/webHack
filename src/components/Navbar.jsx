import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/'>Welcome</NavLink>
      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/profile' className={({ isActive }) => isActive ? "text-blue-600" : "text-black" }>
          Profile
        </NavLink>
        <NavLink to='/tasks' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Tasks
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;