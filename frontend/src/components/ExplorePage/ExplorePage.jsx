import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './ExplorePage.css'
import { allPhotos, getAllPhotos } from "../../store/photo";

const ExplorePage =() => {
  const dispatch = useDispatch();
  const photos = useSelector(allPhotos)
//   const username = useSelector(state => )                                   0

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
                <a href={`/photos/${photo.id}`}> 
                  <img key={photo.id} src={photo.photoUrl} alt="" className="photoimage" />
                </a>
              </div>
            );
          })}
  
        </ul>
      </div>
    )
}

export default ExplorePage