import { useCallback, useEffect, useState } from "react";
import "./SplashPage.css"
import { Link } from "react-router-dom";

function SplashPage () {
    const [currentImage, setCurrentImage] = useState(0);
    const imageFiles = new Array(15)

    const shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * imageFiles.length);
        setCurrentImage(index);
    }, [imageFiles.length]);

    useEffect(() => {
        const intervalID = setInterval(shuffle, 5000);
        return () => clearInterval(intervalID);
    }, [shuffle])


    return (
        
        <div className="whole-splash-page">
            <div className={`background-image image${currentImage}`}></div>
            <div className="splash-text-box">
                <div className="main-text1">Explore your creativity and excite your imagination</div>
                <div className="main-text2">Join the Burnr community, home to tens of billions of photos and 2 million groups.</div>
            </div>
            <Link to='/signup'>
                <button className="start-btn">Start for free</button>
            </Link>
        </div>
    
    )
}

export default SplashPage