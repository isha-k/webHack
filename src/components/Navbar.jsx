import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink to='/' className='text-white'>Welcome</NavLink>
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