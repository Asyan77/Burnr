import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/session";
import './UserIconButton.css'
import userIcon from '/assets/logos/DefaultProfilePicture.jpg'

const  UserIconButton = () => {
    const currentUser = useSelector(state => state.session.currentUser);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);


    const openMenu = (e) => {
        e.stopPropagation();
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false)
        };
 
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogOut = async () => {
        await dispatch(logoutUser(currentUser.id))
        navigate('/')
      }

    return (
        <div className="whole-box">
          <img onClick={openMenu} className="user-icon-btn" src={userIcon} alt='' />
          {showMenu ? (
          < div className="dropdown-content-box">
            <div className="dropdown-content1">
                <span >Hello, </span>
                <Link to={`/photos/${currentUserId}/`} className="username"> {currentUser}</Link>
            </div>
            <div className='log-out' onClick={handleLogOut}>Log Out</div>
          </div>   
             ) : null}
        </div>
    );
}

export default UserIconButton;