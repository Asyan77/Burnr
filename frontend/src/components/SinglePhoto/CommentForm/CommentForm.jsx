import './CommentForm.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../store/comment'


const CommentForm = ({photoId}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const updateComment = (e) => {
        setComment(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData = new FormData();
        commentData.append("comment[photoId]", photoId);
        commentData.append("comment[comment]", comment)
        await dispatch(createComment(commentData))
        setComment('')
    }

  return (
    <div className="comment-form-container">
        <form onSubmit={handleSubmit}>
            <div className="comment-form-div">
                <label className="leave-comment">Leave A Comment</label>
                <textarea className='comment-textarea'
                    placeholder="Your thoughts on this photo?"
                    type="text" onChange={updateComment} value={comment} required />
            </div>
            <div className="submit-comment-btn-div">
                <button type="submit" className="submit-button-comment" >Add Comment</button>
            </div>       
        </form>
    </div>
   )
}
export default CommentForm
