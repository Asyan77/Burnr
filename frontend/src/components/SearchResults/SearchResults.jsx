import { useParams } from "react-router-dom"
import { getAllPhotos } from "../../store/photo";
import { useSelector } from "react-redux";

function SearchResults() {
const {searchTerm} = useParams();
const allPhotos = useSelector(getAllPhotos())

function onSearch(searchTerm) {
    let search = searchTerm.toLowerCase()
    const pics = Object.values(allPhotos)
    let descriptionRes = pics.find((photos) => photos.description.toLowerCase().includes(search))
    let titleRes = pics.find(photos => photos.title.toLowerCase().includes(search))
    const searchRes = [descriptionRes, titleRes]
    console.log(searchRes)
    return searchRes
    }



onSearch()



return (
    <div className="test">Is this working? </div>
)
}

export default SearchResults