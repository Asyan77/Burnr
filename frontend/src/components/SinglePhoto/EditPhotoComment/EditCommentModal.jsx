import './EditCommentModal.css'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateOneComment } from '../../../store/comment';

const EditPhotoCommentModal = ({ setShowEditForm, commentId, currentComment}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState(currentComment)

    const updateComment = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentData = new FormData()
        commentData.append('comment[comment]', comment)
        await dispatch(updateOneComment(commentId, commentData))
        setShowEditForm(false)
    }

    return (
        <div className="comment-container">          
            <form onSubmit={handleSubmit}>
                <textarea
                    className='edit-comment-textarea'
                    type="text" 
                    value={comment} 
                    required
                    onChange={updateComment}
                />
                 <div className="submit-button-edit-comment-div">
                    <button onClick={()=>setShowEditForm(false)} type="submit" className="cancel-button-edit-comment">Cancel</button>
                    <button onClick={handleSubmit} type="submit" className="submit-button-edit-comment">Done</button>
                </div>
            </form>        
        </div>
    )
}

export default EditPhotoCommentModal
