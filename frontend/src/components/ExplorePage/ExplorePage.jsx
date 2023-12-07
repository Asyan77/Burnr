import { useDispatch } from "react-redux";
import { useEffect } from "react";
import './ExplorePage.css'
import { getAllPhotos } from "../../store/photo";

const ExplorePage =() => {
  const dispatch = useDispatch();
//   const photos = useSelector(allPhotos)
//   const username = useSelector(state => )                                   0

  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch]);

    return (
      <div className="page">
        {/* <ul className="photoimage-grid"> 
          {photos.map(photo  => {
            return (
              <div>
                <a href={`/photos/${photo.id}`}> 
                  <img key={photo.id} src={photo.photoUrl} alt="" className="photoimage" />
                </a>
              </div>
            );
          })}
  
        </ul> */}
      </div>
    )
}

export default ExplorePage