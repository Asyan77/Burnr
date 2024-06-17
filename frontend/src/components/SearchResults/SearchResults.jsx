import { useParams } from "react-router-dom"
import { allPhotos, getAllPhotos, getSearchedPhotosByDescription, getSearchedPhotosByTitle } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function SearchResults() {
    const dispatch = useDispatch();
    const {searchTerm} = useParams();
    const titleMatches = useSelector(getSearchedPhotosByTitle(searchTerm.toLowerCase()))
    const descriptionMatches = useSelector(getSearchedPhotosByDescription(searchTerm.toLowerCase()))
    const uniqueMatches = [...titleMatches]
    uniqueResults()
    
    
    function uniqueResults() {
        const idList = []
        for (let i = 0; i < titleMatches.length; i++) {
                const pic = titleMatches[i];
                idList.push(pic.id)
            }

        for (let i = 0; i < descriptionMatches.length; i ++) {
            let photo = descriptionMatches[i]
            if(!idList.includes(photo.id)) {
                uniqueMatches.push(photo)
            }
        }
    }

    
    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])


    // return (
        // <div className="test"> {allMatches.map( photo => {
        //     return (
        //         <div key={photo.id}>
        //             <Link to={`/photos/${photo.userId}/${photo.id}`}>
        //                 <img key={photo.id} className="resultPhoto" src={photo.photoUrl} alt="search results" />
        //             </Link>  
        //         </div>
        //     )
        // })} </div>
    // )

}

export default SearchResults