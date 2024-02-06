# ![logo](app/assets/header1.png)

### Basic Overview
Burnr, a clone of Flickr, is a photo-sharing platform and social network where users can share photos from Burning Man. Without signing in users are only able to browse photos. Upon sign-in they are directed to the Explore page where they can browse photos from all users. From there the exploration begins! Here are a few ways to get started: 

- _Photo Show Page_ - Clicking on a photo opens up the photo's show page that display's the photo's details. Such as the name of photo's owner, the title, description, comments, etc. Here users can interact by leaving a comment. Users can edit and delete their own comments. Users can delete and edit their own photos from here as welll. 

- _User Profiles_ - View profiles by clicking on their username from the photo's show page. You can view your own profile by clicking You in the navigation bar. User profiles contain all photos of a given user. 

- _Upload a photo_ - Get your profile inagurated by adding a photo to your profile page by clicking on the upload cloud on the navigation bar. Once you select a photo and click to upload, you will be directed back to your profile page where your newest photo is added!

[Become a Burnr & start exploring!](https://burnr-wccn.onrender.com/)

### Tech Stack
This app uses the following open-source packages: 
 - [AWS](https://aws.amazon.com/) to store and render every photo in this app
 - [Render](https://render.com/) to host this app online
 - [Ruby on Rails](https://rubyonrails.org/) for the backend server 
 - [PostgreSQL](https://www.postgresql.org/) stores the database
 - [React-Icons](https://react-icons.github.io/react-icons/) for icons used on Burnr

### Components
A couple of the most challenging peices to this app were user authentication, edit forms, and the SinglePageShow component. Here's how I approached these challenges: 

1. User Authentication - The set up for user auth felt tricky due to the transfering of CSRF token, and setting it in sessionStorage, plus converting snake_case to camelCase and vice-versa. On the frontend I set up a helper function `csrfFetch` to make the process modular when sending each fetch request to the backend. 
```
export const csrfFetch = async (url, options = {}) => {
    options.method ||= 'GET';
    options.headers ||= {};

    if (options.method.toUpperCase() !== 'GET') {
      options.headers['X-CSRF-Token'] ||= sessionStorage.getItem('X-CSRF-Token');
      if(!(options.body instanceof FormData)) {
      options.headers['Content-Type'] ||= 'application/json'
      options.headers['Accept'] ||= 'application/json'
    }
     }
    const res = await fetch(url, options);
    // const text = await res.text()
    return res;
 };
  ```

  On the backend, I added these lines of code to handle converting the different case-styles and attaching CSRF tokens. 

```
Jbuilder.key_format camelize: :lower
Jbuilder.deep_format_keys true

def snake_case_params
    params.deep_transform_keys!(&:underscore)
end

def attach_authenticity_token
    headers['X-CSRF-Token'] = form_authenticity_token 
end
```

2. Edit Forms - Opening/closing of forms for editing comments and photo details was difficult because the form itself was in a different component, plus the edit options could only be avilable if you were the owner of that comment or photo. Also for editing comments, figuring out how to target the right comment was tricky, at first it was targeting every comment made by that user. 

This code snippet shows how the editComment modals changed state, and how I targed the right comment
```
 const [showPhotoEdit, setShowPhotoEdit] = useState(false)
    const [showEditCommentForm, setShowEditCommentForm] = useState(false)

    const openEditModal = (commentId) => (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (showEditCommentForm) return;
        setShowEditCommentForm(true);
        setSelectedComment(commentId)
    }
```

Conditionals were added to render edit options if the photo or comment belongs to the current user, plus included the `setShowEditCommentForm` function as a prop to the component I was able to solve closing the modal after submitting an update.
```
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
```

3. SinglePhoto show page - This page required the most design and logistics. Pulling data from various slices of state, plus featuring 2 of the more challenging pieces of the CRUD process, updating, for both photos and comments. Click [here](frontend/src/components/SinglePhoto/SinglePhoto/SinglePhoto.jsx) To see how all of these pieces interlaced for form the photo's show page. 

```
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
```


### Upcoming Features! 
- Faves - store your favorite photos in your Faves tab within the user profile page
- Search bar - search for certain themed photos
- Albums - create and view albums for your photos
