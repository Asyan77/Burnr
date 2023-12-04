// import React from 'react';
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';
import UserIconButton from './UserIconButton/UserIconButton';


function NavBar() {
  const currentUser = useSelector(state => state.session.currentUser);
  const dispatch = useDispatch();
  let sessionButtons;

  const handleLogOut = async () => {
    await dispatch(logoutUser(currentUser.id))
  }

  if (currentUser) {
    sessionButtons = (
        <div className='profile-button-div'>
          <UserIconButton user={currentUser} className='ProfileButton' />
        </div>
    )
  }

  return (
    <nav className="nav-bar">
        <NavLink className='links-on-nav-bar' to='/' >
            <img src="/assests/logos/burnrLogo2.png" className='logo-navbar' alt='' />
       </NavLink>   
        { currentUser ?
          <div className='logged-in-nav-btns'>
            <Link to='/explore' className='explore-btn nav-links'>Explore</Link>

            <NavLink to={`/user/${currentUser.id}`} className='you-btn nav-links'>You</NavLink>
    
            <input className="search-bar-logged-in" type="text" placeholder="Photos, people, or groups" disabled/>

            <NavLink className='upload-btn' to='/upload'>
             <img src="frontend/assests/logos/DefaultProfilePicture.jpg" className='upload-icon' alt='' />
            </NavLink>

           <button className='log-out-btn' type='submit' onClick={handleLogOut}>Log Out</button> 
          
           {sessionButtons}
         </div>
        :
         <div className='logged-out-nav-btns'>
            <input className="search-bar-logged-out" type="text" placeholder="Photos, people, or groups" disabled/>
            <Link to="login" className="login-btn">Log In</Link>
            <Link to="signup" className="signup-btn">Sign Up</Link>
        </div>
        }
      
    </nav>
  );
}

export default NavBar;
