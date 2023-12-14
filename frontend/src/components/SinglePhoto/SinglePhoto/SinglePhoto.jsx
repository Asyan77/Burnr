import { useDispatch, useSelector } from 'react-redux'
import './SinglePhoto.css'
import { useEffect, useState } from 'react';
import { deleteOnePhoto, getOnePhoto, onePhoto } from '../../../store/photo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import userIcon from '/assets/logos/zebra.png'
import editIcon from '/assets/logos/editIcon.png'
import { allPhotosComments, deleteOneComment, getAllComments} from '../../../store/comment';
import CommentForm from '../CommentForm/CommentForm';
import EditPhotoCommentModal from '../EditComment/EditCommentModal';
import deleteIcon from '../../../../assets/logos/deleteIcon.png'
import { FaArrowLeftLong } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { IoStarOutline } from "react-icons/io5";
import EditPhotoDetails from '../EditPhotoDetails/EditPhotoDetails';


const SinglePhoto = () => {
    const {photoId} = useParams();
    const {userId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const photo = useSelector(onePhoto(photoId));
    const [selectedComment, setSelectedComment] = useState(null)
    const photosComments = useSelector(allPhotosComments(+photoId))
    const currentUser = useSelector(state => state.session.currentUser);
    const currentUserId = useSelector(state => state.session.currentUserId);
    const [showPhotoEdit, setShowPhotoEdit] = useState(false)
    const [showEditCommentForm, setShowEditCommentForm] = useState(false)
    

    
    useEffect(() => {
        dispatch(getAllComments(photoId))
        dispatch(getOnePhoto(photoId))
    },[dispatch, photoId, userId])
    
    const formatDate = (date) => {
        const dateObj = new Date(date)
        return dateObj.toDateString()
    }
    
    const deleteComment = async (e, commentId) => {
        e.preventDefault();
        dispatch(deleteOneComment(commentId))
    }
    
    const openEditModal = (commentId) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (showEditCommentForm) return;
        setShowEditCommentForm(true);
        setSelectedComment(commentId)
    }
  

    const openPhotoEdits = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (showPhotoEdit) return;
        setShowPhotoEdit(true);
    }

    const handleDeletePhoto = async(e) => {
        e.preventDefault();
        const res = await dispatch(deleteOnePhoto(photoId))
        if(res.ok) {
            navigate(`/photos/${userId}`)
        }
    }
    if(!photo) return null

    return (
        <div className='single-photo-page'>
            <div className='top-box-SP'>
                <Link to={`/photos/${userId}`} className='link-back-SP'> 
                    <FaArrowLeftLong className='arrow'/> Back to photostream
                </Link>
                <div className='left-box-SP'>
                    <img src={photo.photoUrl} alt="single-photo" className="single-photo-image" />
                </div>
                {userId == currentUserId ?
                <div className='photo-options-SP'>
                    <IoStarOutline className='fav-btn'/>
                     <GoTrash className='delete-photo-SP' onClick={handleDeletePhoto}/>
                </div>
                : null}
                <div className='right-box-SP'>
                    <div className='top-right-box-SP'>
                        <img className='user-icon-SP' src={userIcon}/>
                        <Link className='username-link-SP' to={`/photos/${photo.userId}`}>
                            <div className='username-SP'>{photo.username}</div>
                        </Link>
                    </div>

                    {!showPhotoEdit ?
                    <div className='mid-right-box-SP'>
                        {userId == currentUserId ?
                             <img src={editIcon} onClick={openPhotoEdits} className='edit-icon-SP'/>
                             : null}
                        <div className='text-SP title-SP'>{photo.title}</div>
                        <div className='text-SP description-SP'>{photo.description}</div>
                    </div>
                    :
                    <EditPhotoDetails setShowPhotoEdit={setShowPhotoEdit} photoId={photoId} title={photo.title} description={photo.description}  />
                    }
         
                    <div className='bottom-right-box-SP'>
                        <div className='text-SP'>11 views</div>
                        <div className='text-SP'>2 faves</div>
                        <div className='text-SP'>{photosComments.length} comments</div>
                    </div>
                    <div className='upload-SP text-SP'>Uploaded on {formatDate(photo.createdAt)}</div>
                </div>

            </div>

            <div className='bottom-box-SP'>
                <div className='comments-SP'> 
                    <div className='comment-label'>Comments</div>
                    {photosComments.map(comment => {
                        return (
                            <div className="comment-details-SP" key={comment.id}>
                                <Link to={`/photos/${comment.userId}`} className='author-link'>{comment.author} </Link>
                                <div className='edit-options-SP'>
                                    {showEditCommentForm && selectedComment === comment.id ? 
                                        <div id='edit-display'>
                                            <EditPhotoCommentModal setShowEditCommentForm={setShowEditCommentForm} commentId={comment.id} currentComment={comment.comment} />                                 
                                        </div>
                                  : <>
                                     <div className='comment-comment'>{comment.comment}</div>
                                        {comment.userId === currentUserId ?
                                            <div className="comment-buttons">
                                                <img className="delete-btn-SP" src={deleteIcon} alt="delete" onClick={e => deleteComment(e, comment.id)} />
                                                <img className="edit-btn-SP"src={editIcon} onClick={openEditModal(comment.id)} alt="edit" />
                                            </div>
                                        : null }                                    
                                    </>
                                    }
                                </div>
                            </div>
                        );
                    })}
                    {currentUser ? 
                        <CommentForm photoId={+photoId} /> : null
                    }
                </div>  
            </div>

        </div>
    
    )
}

export default SinglePhoto