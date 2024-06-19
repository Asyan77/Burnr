import './NavBar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import UserIconButton from './UserIconButton/UserIconButton';
import logo from "/assets/logos/burnrLogo2.png"
import linkedInLogo from "/assets/logos/LinkedInLogo.png"
import githubLogo from "/assets/logos/GitHubLogo.png"
import { SlCloudUpload } from "react-icons/sl";
import { useState } from 'react';

function NavBar() {
  const currentUser = useSelector(state => state.session.currentUser);
  const userId = useSelector(state => state.session.currentUserId);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  function handleInputChange(e) {
    setSearchTerm(e.target.value)
  }

  function handleSearch (e) {
    e.preventDefault();
    navigate(`/photos/search/${searchTerm}`, {replace:true})
    setSearchTerm("")
  }


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

            <form className="search-bar">
              <input
                className='search-bar-input'
                type="text"
                placeholder='search for photos by title'
                value={searchTerm}
                onChange={handleInputChange}
                /> 
              <button className='search-sumbit' onClick={handleSearch}>Submit</button>
            </form>
            <Link to='https://github.com/Asyan77' className='github-logged-in' target="_blank">
               <img className='github' src={githubLogo} alt="" />
            </Link>
            <Link to='http://www.linkedin.com/in/ashley-yan' target="_blank">
               <img className='linkedIn-logged-in' src={linkedInLogo} alt="" />
            </Link>
            {/* <input className="search-bar-logged-in" type="text" placeholder="Photos, people, or groups" disabled/> */}
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
