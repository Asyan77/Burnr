import { useParams } from "react-router-dom"
import { getAllPhotos, getSearchedPhotosByDescription, getSearchedPhotosByTitle } from "../../store/photo";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './SearchResults.css'

function SearchResults() {
    const dispatch = useDispatch();
    let {searchTerm} = useParams();

    useEffect(() => {
        dispatch(getAllPhotos())
    }, [dispatch])

    if (!searchTerm) {
        searchTerm = "___"       
    }
    //grab all photos with the words matching in the title
    const titleMatches = useSelector(getSearchedPhotosByTitle(searchTerm.toLowerCase()))
    //grab all photos with words matching in the description
    const descriptionMatches = useSelector(getSearchedPhotosByDescription(searchTerm.toLowerCase()))
    const uniqueMatches = [...titleMatches]
    uniqueResults()
    
    // build a function to compare photoIDs, store and return only the unique ones so there's no duplicates
    function uniqueResults() {
        const idList = []
        // this loop is to first grab all photoIDs in the title matches, storing them in the idList array
        for (let i = 0; i < titleMatches.length; i++) {
                const pic = titleMatches[i];
                idList.push(pic.id)
            }
        // this loop is to go through the description matches and see if the photoIds are not currently in the idList array, then go ahead and add the photo to the unique matches array
        for (let i = 0; i < descriptionMatches.length; i ++) {
            let photo = descriptionMatches[i]
            if(!idList.includes(photo.id)) {
                uniqueMatches.push(photo)
            }
        }
    }
    console.log(window.location.href)
    
    if (uniqueMatches.length < 1) {
        return (
            <div className="no-results">No photos found for {searchTerm} 😭</div>
        )
    }

    return (
        <div className="search-page">
            <div className="search-text">Search results for {searchTerm}:</div>
            <ul className="results-grid"> 
                {uniqueMatches.map (photo => {
                    return (
                        <div key={photo.id}>
                        <Link className="result-img" to={`/photos/${photo.userId}/${photo.id}`}>
                            <img key={photo.id} className="result-photo" src={photo.photoUrl} alt="search results" />
                        </Link>  
                    </div>
                )
            })} </ul>
        </div>
    )

}

export default SearchResults