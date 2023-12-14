import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadOnePhoto } from "../../../store/photo";
import bikeLogo from "/assets/logos/burnr-logo-bike.png"
import './UploadPhotoForm.css'
import {useNavigate } from "react-router-dom";

const UploadPhotoForm = () => {
    // const history = useHistory(); // so that we can redirect after the image upload is successful
    // const [album, setAlbum] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")
    const [errors, setErrors] = useState([])
    const [disable, setDisable] = useState(true)
    const currentUserId = useSelector(state => state.session.currentUserId)
    // const userAlbums = useSelector(state => { return state })
    // const userAlbumsArray = Object.values(userAlbums.albumReducer.albumsForUser)

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateTags = (e) => {
        setTags(e.target.value)
    }

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        const errors = []
        if (image) {
            if (image?.type !== 'image/jpg' && image?.type !== 'image/jpeg' && image?.type !== 'image/png') errors.push('File Type Not Supported. Please upload a png, jpg, or jpeg')
            setTitle(image.name.split('.')[0])

        } else setTitle('')
        if (!image) errors.push('Please upload image to continue')
        if (errors.length > 0) setDisable(true)
        if (errors.length === 0) setDisable(false)
        setErrors(errors)

    }, [image, disable])


    // useEffect(() => {
    //     dispatch(getUserAlbums(currentUser.id))
    // }, [currentUser.id, dispatch])

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.length > 0) return
        const formData = new FormData();
        formData.append("photo[photo]", image);
        formData.append("photo[title]", title)
        formData.append("photo[description]", description)
        formData.append("photo[tags]", tags)
        formData.append('photo[user_id]', currentUserId)
        // if (album > 0) formData.append("albums", +album)

        setImageLoading(true);

        const res = await dispatch(uploadOnePhoto(formData))
        if (res.ok) {
            console.log(res)
            setImage(null);
            setTags('');
            setTitle('');
            setErrors([]);
            setDisable(true);
            setDescription('');
            setImageLoading(false)
            navigate(`/photos/${currentUserId}`)
        } 
    }


    return (
        <div className="whole-upload-container">
            <form onSubmit={handleSubmit}>
                <img src={bikeLogo} className="upload-logo" alt="logo" />
                <div className='errors-for-sign-up'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                        ))}
                </div>
                <div className='all-sign-up-form-inputs-labels'>
                    <input 
                        className="choose-file-button-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={updateImage}/>
                </div>

                <div className='all-sign-up-form-inputs-labels'>
                    <label>Title</label>
                    <input 
                        className='sign-up-form-inputs-only' 
                        placeholder="Required" 
                        type="text" 
                        onChange={updateTitle} 
                        value={title} />
                </div>

                <div className='all-sign-up-form-inputs-labels'>
                    <label>Description</label>
                    <input
                        className='sign-up-form-inputs-only'
                        placeholder="optional"
                        type="text"
                        onChange={updateDescription}
                        value={description}
                        />
                </div>
                <div className='all-sign-up-form-inputs-labels'>
                    <label>Tag</label>
                    <input
                        className='sign-up-form-inputs-only'
                        placeholder="optional"
                        type="text"
                        onChange={updateTags}
                        value={tags}
                        />
                </div>
                {/* <div className='all-sign-up-form-inputs-labels'>
                    <label>Album</label>
                    <select
                    name="albums"
                    id="albums"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    className='sign-up-form-inputs-only'
                    >
                    <option value='' style={{ color: 'grey' }}>Not Required</option>
                    {userAlbumsArray.map((al) => (
                        <option key={al.id} value={al.id}>{al.name}</option>
                        ))}
                        </select>
                    </div> */}
                <div className='upload-submit-button-div'>
                    <button disabled={disable} className='sign-up-submit-button' type='submit'>Upload</button>
                    {(imageLoading) && <p>Loading...</p>}
                </div>
            </form>
         </div>
    )
}

export default UploadPhotoForm