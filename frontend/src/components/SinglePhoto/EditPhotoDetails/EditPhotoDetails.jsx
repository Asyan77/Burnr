import { useDispatch } from 'react-redux'
import './EditPhotoDetails.css'
import { useState } from 'react'
import { updateOnePhoto } from '../../../store/photo'

const EditPhotoDetails = ({setShowPhotoEdit, photoId, title, description}) => {
    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState(title)
    const[newDescription, setNewDescription] = useState(description);

    const updateTitle = (e) => {
        setNewTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setNewDescription(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const photoData = new FormData()
        photoData.append('photo[title]', newTitle)
        photoData.append('photo[description]', newDescription)
        await dispatch(updateOnePhoto(photoId, photoData))
        setShowPhotoEdit(false)
    }
    return (
        <div className="comment-container-EPD">          
            <form className='photo-edit-form-fields' onSubmit={handleSubmit}>
                <textarea
                    className='edit-photo-title'
                    type="text" 
                    value={newTitle} 
                    required
                    placeholder='title'
                    onChange={updateTitle}
                />
                <textarea
                    className='edit-photo-desscription'
                    type="text" 
                    value={newDescription} 
                    required
                    placeholder='Tell us about your photo!'
                    onChange={updateDescription}
                />
                 <div className="submit-button-edit-photo-div">
                    <button onClick={()=>setShowPhotoEdit(false)} type="submit" className="cancel-button-edit-photo">Cancel</button>
                    <button onClick={handleSubmit} type="submit" className="submit-button-edit-photo">Done</button>
                </div>
            </form>        
        </div>
    )
}

export default EditPhotoDetails