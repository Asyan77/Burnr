import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './ExplorePage.css'
import { allPhotos, getAllPhotos } from "../../store/photo";
import { Link } from "react-router-dom";

const ExplorePage =() => {
  const dispatch = useDispatch();
  const photos = useSelector(allPhotos)
                                 
  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch]);


    return (
      <div className="page"> 
        <div className="explore">Explore</div>
        <ul className="photoimage-grid">
          {photos.map(photo  => {
            return (
              <div key={photo.id}>
                <Link to={`/photos/${photo.userId}/${photo.id}`}>
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