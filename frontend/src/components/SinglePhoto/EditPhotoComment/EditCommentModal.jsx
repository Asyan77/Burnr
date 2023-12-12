import './EditCommentModal.css'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../store/comment";
import { getOnePhoto } from "../../../store/photo";
import EditCommentForm from "../EditCommentForm/EditCommentForm";

const EditPhotoCommentModal = ({ commentId, currentComment, user, commentOwner, photoId }) => {
    const dispatch = useDispatch();
    const [showCommentForm, setShowCommentForm] = useState(true)
    const editCommentButton = document?.getElementsByClassName('edit-comment-button')

    const deleteCommentButton = async (e, commentId) => {
        e.preventDefault()
        const res = await dispatch(deleteComment(commentId))
        if (res.ok) {
            await res.json()
            dispatch(getOnePhoto(photoId))
        }
    }

    useEffect(() => {
        if (!showCommentForm) return;

        const closeCommentForm = () => {
            setShowCommentForm(false)
        }
        for (let i = 0; i < editCommentButton.length; i++) {
            editCommentButton[i].addEventListener('click', closeCommentForm);
        }
    }, [showCommentForm, editCommentButton])

    const closeCommentForm = () => {
        setShowCommentForm(!showCommentForm)
    }

    return (
        <div className="comment-container">
            {showCommentForm ?
                <EditCommentForm setShowCommentForm={setShowCommentForm} showCommentForm={showCommentForm} photoId={photoId} commentText={currentComment} commentId={commentId} />
            : null }
            <div>
                {!showCommentForm ?
                    <div className="comment-edit-and-delete-div">
                        <span onClick={closeCommentForm} className='edit-comment-button'><i className="fa-regular fa-pen-to-square"></i></span>
                        <span onClick={e => deleteCommentButton(e, commentId)} className='edit-comment-button' ><i className="fa-regular fa-trash-can"></i></span>
                    </div>
                    : null}
            </div>
        </div>

    )
}

export default EditPhotoCommentModal
