import { useDispatch, useSelector } from 'react-redux'
import './SinglePhoto.css'
import { useEffect } from 'react';
import { getOnePhoto, onePhoto } from '../../../store/photo';
import { Link, useParams } from 'react-router-dom';
import { getUsername } from '../../../store/user';
import userIcon from '/assets/logos/zebra.png'
import editIcon from '/assets/logos/editIcon.png'


const SinglePhoto = () => {
    // const history = unstable_HistoryRouter();
    const {photoId} = useParams();
    const {userId} = useParams();
    const dispatch = useDispatch();
    const photo = useSelector(onePhoto(photoId));
    const username = useSelector(getUsername(userId))
    

    useEffect(() => {
         dispatch(getOnePhoto(photoId))
    },[dispatch, photoId])

    return (
        <div className='single-photo-page'>
            <div className='top-box-SP'>
                <Link className='link-back-SP'> Back to photostream</Link>
                <div className='left-box-SP'>
                    <img src={photo.photoUrl} alt="single-photo" className="single-photo-image" />
                </div>

                <div className='right-box-SP'>
                    <div className='top-right-box-SP'>
                        <img className='user-icon-SP' src={userIcon}/>
                        <div className='username-SP'>{username}</div>
                    </div>

                    <div className='mid-right-box-SP'>
                        <img src={editIcon} className='edit-icon-SP'/>
                        <div className='text-SP title-SP'>{photo.title}</div>
                        <div className='text-SP'>{photo.description}description</div>
                    </div>
         
                    <div className='bottom-right-box-SP'>
                        <div className='text-SP'>11 views</div>
                        <div className='text-SP'>2 faves</div>
                        <div className='text-SP'>0 comments</div>
                    </div>
                    <div className='upload-SP text-SP'>Uploaded on {photo.createdAt}</div>
                </div>

            </div>

            <div className='bottom-box-SP'>
                <div className='comments-box-SP'>comments

                </div>
            </div>
        </div>
    
    )
}

export default SinglePhoto