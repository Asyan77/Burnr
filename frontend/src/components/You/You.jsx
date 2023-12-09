
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import './You.css'
import { getAllPhotos, getUserPhotos } from '../../store/photo';
import { useEffect } from 'react';
import profilePic from "/assets/logos/loginBackgound.png"
const You = () => {
    const dispatch = useDispatch();
    const currentUserId =  useSelector(state => state.session.currentUserId)
    const currentUser = useSelector(state => state.users[currentUserId])
    const currentUserPhotos = useSelector(getUserPhotos(currentUserId));

useEffect(() => {
    dispatch(getAllPhotos())
},[dispatch])




      return (
 
        <div className="you-page">
            <div className="you-profile-header">

                <div className='left-outer-box'>
                    <img src={profilePic} className='profile-pic-circle'></img>
                    <div className='left-inner-box1'>
                        <div className='left-inner-box2'>
                            <div className="you-username">{currentUser.username}</div>
                            <button className='follow'>Follow</button>
                            <div className='dots'>...</div>
                        </div>
                        <div className='left-inner-box3'>
                            <div className='pro'>PRO</div>
                            <div className='left-bottom-text'>{currentUser.username}s Moment</div>
                            <div className='left-bottom-text'>7.2K Followers</div>
                            <div className='left-bottom-text'>282 Following</div>
                        </div>
                    </div>   
                </div>

                <div className='right-outer-box'>
                    <div> {currentUserPhotos.length} Photos</div>
                    <div>Taiwan</div>
                    <div>Joined 2013</div>
                </div>
            </div>

            <div className='profile-middle-bar'>
                <div className='middle-bar-links'>
                    <Link className='mid-link-text'>About</Link>
                    <Link className='mid-link-text photostream'>Photostream</Link>
                    <Link className='mid-link-text'>Albums</Link>
                    <Link className='mid-link-text'>Faves</Link>
                    <Link className='mid-link-text'>Galleries</Link>
                    <Link className='mid-link-text'>Groups</Link>

                </div>
            </div>
                {<ul className="user-profile-photo-grid"> 
                    {currentUserPhotos.map(photo => {
                        return (
                            <div key={photo.id}>
                            <Link to={`/photos/${currentUserId}/${photo.id}`}>
                                 <img key={photo.id} src={photo.photoUrl} alt="user-photos" className="user-photoimage" />
                            </Link>
                            </div>
                            );
                        })}
                </ul> } 
     </div>
      );
    }

export default You