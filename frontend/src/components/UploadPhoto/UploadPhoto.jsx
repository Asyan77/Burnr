import './UploadPhoto.css'

const UploadPhoto = ( ) => {
    return (
        <div className='upload-page-container'>
            <div className='upload-middle-container'>
                <div className='upload-text1'>You can upload 981 more photos.</div>
                <div className='upload-text2'>Get automatic photo backup on all your devices with Flickr Pro. Upgrade now</div>
                <div className='upload-inner-container'>
                    <div className='upload-text3'>Drag & drop photos and videos here</div>
                    <div className='upload-text4'>or</div>
                    <button className='upload-submit-btn'>Choose photos to upload</button>
                </div>
            </div>
        </div>
    )
}

export default UploadPhoto