import './CommentForm.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment } from '../../../store/comment'
import { getOnePhoto } from '../../../store/photo'
import { Link } from 'react-router-dom'


const CommentForm = ({photoId}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [errors, setErrors] = useState([])
    const [disable, setDisable] = useState(true)
    const user = useSelector(state => state.session.currentUser);

    const updateComment = (e) => {
        setComment(e.target.value)
    }

    useEffect(() => {
    }, [comment])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentData = new FormData();
        commentData.append("comment[photoId]", photoId);
        commentData.append("comment[comment]", comment)

        const res = await dispatch(createComment(commentData))
        await dispatch(getOnePhoto(photoId))
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
            <button type="submit" className="submit-button-comment" >Comment</button>
        </div>
    
        
    </form>
</div>
)
}
export default CommentForm
