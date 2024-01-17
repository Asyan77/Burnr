import './You.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { getAllUserPhotos, getUserPhotos } from '../../store/photo';
import { useEffect } from 'react';
import profilePic from "/assets/logos/loginBackgound.png"
import {getOneUser, getUser} from '../../store/user';


const You = () => {
    const {userId} = useParams();
    const dispatch = useDispatch();
    const photos = useSelector(getUserPhotos(+userId));  
    const user = useSelector(getUser(userId))
  
    
    useEffect(() => {
        dispatch(getAllUserPhotos(userId))
        dispatch(getOneUser(userId))
    },[dispatch, userId])

      return (
        <div className="you-page">
            <div className="you-profile-header">
                <img src={profilePic} className='profile-pic-circle'></img>         
                <div className='header-details-box1'>
                    <div className='header-inner-box1'>
                        <div className="you-username">{user?.username}</div>
                        <div className='follow'>Follow</div>
                        <button className='dots'>...</button>         
                    </div>
                    <div className='header-inner-box2'>
                        <div className='left-inner-box3'>
                            <div className='pro'>PRO</div>
                            <div className='moment'>{user?.username}s Moment</div>
                            <div className='left-bottom-text'>7.2K Followers</div>
                            <div className='left-bottom-text'>282 Following</div>
                        </div>
                        <div className='right-outer-box'>
                            <div className='right-bottom-text-you text'> {photos.length} Photos</div>
                            <div className='right-bottom-text-you text'>Taiwan</div>
                            <div className='text'>Joined 2013</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile-middle-bar'>
                <div className='middle-bar-links'>
                    <div className='mid-link-text'>About</div>
                    <div className='mid-link-text photostream'>Photostream</div>
                    <div className='mid-link-text'>Albums</div>
                    <div className='mid-link-text'>Faves</div>
                    <div className='mid-link-text'>Galleries</div>
                    <div className='mid-link-text'>Groups</div>
                </div>
            </div>
            {<ul className="user-profile-photo-grid"> 
                {photos.map(photo => {
                    return (
                        <div key={photo.id}>
                        <Link to={`/photos/${userId}/${photo.id}`}>
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