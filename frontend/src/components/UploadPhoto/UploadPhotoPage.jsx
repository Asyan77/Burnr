import { useDispatch, useSelector } from 'react-redux';
import './UploadPhotoPage.css'
import { useEffect, useState } from 'react';
import { getAllUserPhotos } from '../../store/photo';
import UploadPhotoForm from './UploadPhotoForm/UploadPhotoForm';

const UploadPhoto = ( ) => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.currentUserId);
    const userPhotos = useSelector(state => state.photos)
    const photoCount = Object.keys(userPhotos).length
    const [showUploadForm, setShowUploadForm] = useState(false)

    useEffect(()=> {
        dispatch(getAllUserPhotos(userId))
    },[dispatch, userId])

    const openUploadModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (showUploadForm) return;
        setShowUploadForm(true);
    }

    useEffect(() => {
        if (!showUploadForm) return;
        const closeUploadForm = () => {
            setShowUploadForm(false)
        };
        return () => document.removeEventListener("click", closeUploadForm);
    }, [showUploadForm]);

    console.log(window.location.href)

    return (
        <div className='upload-page-container'>
            {!showUploadForm ?
            <div className='upload-middle-container'>
                <div className='upload-text1'>You can upload {1000 - photoCount} more photos.</div>
                <div className='upload-text2'>Get automatic photo backup on all your devices with Flickr Pro. Upgrade now</div>
                <div className='upload-inner-container'>
                    <div className='upload-text3'>Drag & drop photos and videos here</div>
                    <div className='upload-text4'>or</div>
                    <button className='upload-submit-btn' onClick={openUploadModal}>Choose photos to upload</button>
                </div>
            </div>
           :
           <>
            <div className='upload-photo-form-container'>
                <UploadPhotoForm/>
            </div>
           </>
           }
        </div>
    )
}

export default UploadPhoto