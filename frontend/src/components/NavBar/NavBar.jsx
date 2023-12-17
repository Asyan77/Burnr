import './NavBar.css'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import UserIconButton from './UserIconButton/UserIconButton';
import logo from "/assets/logos/burnrLogo2.png"
import linkedInLogo from "/assets/logos/LinkedInLogo.png"
import githubLogo from "/assets/logos/GitHubLogo.png"
import { SlCloudUpload } from "react-icons/sl";

function NavBar() {
  const currentUser = useSelector(state => state.session.currentUser);
  const userId = useSelector(state => state.session.currentUserId);

  return (
    <div className="nav-bar">
        { currentUser ?
          <div className='logged-in-nav-btns'>
            <div className='left-side-logged-in'> 
                <NavLink className='links-on-nav-bar' to='/' >
                  <img src={logo} className='logged-in-logo' alt='' />
                </NavLink>   
                <NavLink to={`/photos/${userId}`} className='you-btn nav-links'>You</NavLink>
                <Link to='/explore' className='explore-btn nav-links'>Explore</Link>
            </div>
            <Link to='https://github.com/Asyan77' className='github-logged-in' target="_blank">
               <img className='github' src={githubLogo} alt="" />
            </Link>
            <Link to='http://www.linkedin.com/in/ashley-yan' target="_blank">
               <img className='linkedIn-logged-in' src={linkedInLogo} alt="" />
            </Link>
            <input className="search-bar-logged-in" type="text" placeholder="Photos, people, or groups" disabled/>
            <Link to='/photos/upload'> 
              <SlCloudUpload className='upload-icon-NB'/>
            </Link>
            <UserIconButton className='ProfileButton' />
         </div>
        :
        <div className='logged-out-nav-btns'>
            <NavLink className='links-on-nav-bar' to='/' >
                <img src={logo} className='logged-out-logo' alt='' />
            </NavLink>  
            <Link to='https://github.com/Asyan77' className='github-logged-out' target="_blank">
               <img className='github' src={githubLogo} alt="" />
            </Link>
            <Link to='http://www.linkedin.com/in/ashley-yan' target="_blank">
               <img className='linkedIn-logged-out' src={linkedInLogo} alt="" />
            </Link>
            {/* <input className="search-bar-logged-out" type="text" placeholder="Photos, people, or groups" disabled/> */}
            <Link to="login" className="login-btn">Log In</Link>
            <Link to="signup" className="signup-btn">Sign Up</Link>
        </div>
        }
    </div>
  );
}

export default NavBar;
