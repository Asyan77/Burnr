import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/session";
import './UserIconButton.css'

const  UserIconButton = ({ user, setLogin, setShowModal }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);


    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogOut = async () => {
        await dispatch(logoutUser(user.id))
      }

    return (
        <>
            <div className="profile-button-actual-div">
                <img onClick={openMenu} className="nav-bar-profile-picture" src='frontend/assests/logos/DefaultProfilePicture.jpg' alt='' />
            </div>
            {showMenu && (user ?
                (<div className="adjustment-for-profile-dropdown">
                    < div className="profile-dropdown">
                        <div className="hello-user-navbar">
                            <span>Hello, </span>
                            <Link to={`/user/${user.id}/`} className="username"> {user.username}</Link>
                        </div>
                        <span>
                            <button className='log-out-btn' type='submit' onClick={handleLogOut }>Log Out</button>
                        </span>
                    </div>
                </div>) :
                (<ul className="profile-dropdown">
                    <button
                        className="logout"
                        onClick={() => {
                            setLogin(true)
                            setShowModal(true)
                        }}>Log In</button>
    3
                    <button
                        className="logout"
                        onClick={() => {

                            setLogin(false)
                            setShowModal(true)
                        }}>
                        Sign Up
                    </button>
                </ul>)
            )
            }
        </>
    );
}

export default UserIconButton;