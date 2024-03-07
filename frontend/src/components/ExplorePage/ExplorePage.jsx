import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './ExplorePage.css'
import { allPhotos, getAllPhotos } from "../../store/photo";
import { Link } from "react-router-dom";

const ExplorePage =() => {
  const dispatch = useDispatch();
  const photos = useSelector(allPhotos)
  let randomPhotos = []

  function getRandomPhotos () {
    let start = 0;
    let end = photos.length-1
    while (randomPhotos.length < 20 ) {
      let randomPicture = Math.floor(Math.random() * (end - start) + start)
      if(!randomPhotos.includes(randomPicture)) {
        randomPhotos.push(randomPicture)
      }
    }
  }
  getRandomPhotos()
  
  
  useEffect(() => {
    dispatch(getAllPhotos())
  }, [dispatch]);


    return (
      <div className="page"> 
        <div className="explore">Explore</div>
        <ul className="photoimage-grid">
          {randomPhotos.map(photo  => {
            return (
              <div key={photos[photo].id}>
                <Link className="user-photoimage" to={`/photos/${photos[photo].userId}/${photos[photo].id}`}>
                  <img key={photo.id} src={photos[photo].photoUrl} alt="photos" className="user-photoimage" />
                </Link>
              </div>
            );
          })}
  
        </ul>
      </div>
    )
}

export default ExplorePage