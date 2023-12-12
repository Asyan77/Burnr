import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import './EditCommentForm.css'
import { getOnePhoto } from "../../../store/photo";

const EditCommentForm = ({ commentId, currentComment, photoId, setShowCommentForm, showCommentForm }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState(currentComment)
    const [errors, setErrors] = useState([])
    const [disable, setDisable] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentData = new FormData()
        commentData.append('comment[comment]', comment)
        commentData.append('comment[photo_id]', photoId)
        const res = await dispatch(updateComment(commentId, commentData))
        if (res.ok) {
            await res.json();
            dispatch(getOnePhoto(photoId))
            await setShowCommentForm(!showCommentForm)
        }
    }

    const updateComment = (e) => {
        setComment(e.target.value)
    }

    useEffect(() => {
        const error = []
        if (!/\S/.test(comment) && comment.length > 0) {
            error.push('Error, blank comments not allowed')
        }
        if (error.length > 0) setDisable(true)
        if (error.length === 0) setDisable(false)
        setErrors(error)
    }, [comment])

    return (
        <div className="comment-form-container">
            <form onSubmit={handleSubmit}>
                <div className="edit-comment-form-div">
                    {errors.length > 0 ?
                        <span className="comment-error">{errors[0]}</span>
                        : null}
                    <textarea
                        className='edit-comment-textarea'
                        placeholder="Your thoughts on this photo?"
                        type="text"
                        onChange={updateComment}
                        value={comment}
                        required
                    />
                </div>
                <div className="submit-button-edit-comment-div">
                    <button disabled={disable} type="submit" className="submit-button-edit-comment">Done</button>
                </div>
            </form>
        </div>
    )
}

export default EditCommentForm
