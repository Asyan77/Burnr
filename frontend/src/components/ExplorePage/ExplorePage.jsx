import './ExplorePage.css'
import { useDispatch, useSelector, } from "react-redux";
import { allPhotos, getAllPhotos} from "../../store/photo";
import { Link } from "react-router-dom";
import { useEffect, useCallback, useState  } from "react";

const ExplorePage =() => {
  const dispatch = useDispatch();
  const photos = useSelector(allPhotos);
  const [randomPhotos, setRandomPhotos] = useState([])

  let randomPhotoIdx = []
  
  
  useEffect(() => {
    dispatch(getAllPhotos())
  },[dispatch])
  
  const getRandomPhotos = useCallback (() => {
    let end = photos.length-1
    while (randomPhotos.length < 20 ) {
      let randomIdx = Math.floor(Math.random() * end)
      if (!randomPhotoIdx.includes(randomIdx)) {
        randomPhotoIdx.push(randomIdx)
        randomPhotos.push(photos[randomIdx])
        
      }
    }
  }, [photos.length, randomPhotos, randomPhotoIdx, photos])
  
  if (photos && photos.length > 20) {
    getRandomPhotos()
  }
  
  // getRandomPhotos()
  console.log(randomPhotos)

    return (
      <div className="page"> 
        <div className="explore">Explore</div>
        <ul className="photoimage-grid">
          {randomPhotos.map(photo  => {
            return (
              <div key={photo.id}>
                <Link className="user-photoimage" to={`/photos/${photo.userId}/${photo.id}`}>
                  <img key={photo.id} src={photo.photoUrl} alt="photos" className="user-photoimage" />
                </Link>
              </div>
            );
          })}
  
        </ul>
      </div>
    )
}

export default ExplorePage



{/* <ul className="photoimage-grid">
{randomPhotos.map(photo  => {
  return (
    <div key={photos[photo].id}>
      <Link className="user-photoimage" to={`/photos/${photos[photo].userId}/${photos[photo].id}`}>
        <img key={photo.id} src={photos[photo].photoUrl} alt="photos" className="user-photoimage" />
      </Link>
    </div>
  );
})}

</ul> */}