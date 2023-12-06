import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/session";
import './UserIconButton.css'
import userIcon from '/assests/logos/DefaultProfilePicture.jpg'

const  UserIconButton = () => {
    const currentUser = useSelector(state => state.session.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    let openDropDown;


    const openMenu = (e) => {
        e.stopPropagation();
        if (showMenu) return;
        setShowMenu(true);
        console.log('is this working?')
    };

    useEffect(() => {
        if (!showMenu) return;
        console.log("inside useEffect")
        const closeMenu = () => {
            setShowMenu(false);
        };
 
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogOut = async () => {
        await dispatch(logoutUser(currentUser.id))
        navigate('/')
      }

      if (showMenu) {
        openDropDown =
        <div className="profile-dropdown">
            < div className="dropdown-content">
                <div className="hello-user">
                    <span>Hello, </span>
                    <Link to={`/photos/user/${currentUser.id}/`} className="username"> {currentUser.username}</Link>
                </div>
                <span>
                    <button className='log-out-btn' type='submit' onClick={handleLogOut }>Log Out</button>
                </span>
            </div>
        </div>
      }

    return (
        <>
            <div className="profile-button-actual-div">
                <img onClick={openMenu} className="user-icon-btn" src={userIcon} alt='' />
            </div>
            {openDropDown}
            
        </>
    );
}

export default UserIconButton;