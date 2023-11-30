// import React from 'react';
import './NavBar.css'
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/session';
import UserIconButton from './UserIconButton/UserIconButton';

let uploadIcon = "assets/logos/upload-icon-64.png"

function NavBar() {
  const currentUser = useSelector(state => state.session.currentUser);
  const dispatch = useDispatch();
  let loggedInButtons;

  const handleLogOut = async () => {
    await dispatch(logoutUser(currentUser.id))
  }

  if (currentUser) {
    loggedInButtons = (
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
       <input className="search-bar" type="text" placeholder="Photos, people, or groups" disabled/>
    
        { currentUser ?
          <div className='logged-in-nav-btns'>
            <div className='explore-btn'>
             <NavLink to='/explore' className='left-side-links-navbar'>Explore</NavLink>
            </div> 

            <div className='you-btn'> 
              <NavLink to={`/user/${currentUser.id}`} className='left-side-links-navbar'>You</NavLink>
            </div> 

            <NavLink className='links-on-nav-bar' to='/upload'>
              <div className='upload-icon-navbar'>
                <img src={uploadIcon} className='upload-icon' alt='' />
              </div>
            </NavLink>

            <div className='log-out-btn'>
              <button className='log-out-btn' type='submit' onClick={handleLogOut}>Log Out</button> 
            </div>
            {/* {loggedInButtons} */}
          </div>
         :
        <div className='logged-out-nav-btns'>
            <Link to="login" className="signin-btn">Log In</Link>
            <Link to="signup" className="signup-btn">Sign Up</Link>
        </div>
        }
      
    </nav>
  );
}

export default NavBar;
