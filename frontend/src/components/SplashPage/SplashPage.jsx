import { useCallback, useEffect, useState } from "react";
import "./SplashPage.css"
import { Link, Navigate } from "react-router-dom";

function SplashPage () {
    const [currentImage, setCurrentImage] = useState(0);
    const imageFiles = new Array(10)
    const randomImage = Math.floor(Math.random() * 15);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % imageFiles.length );
          }, 5000); 
      
          return () => clearInterval(interval);
    },[])


    return (
        
        <div className="whole-splash-page">
            <div className={`background-image image${randomImage}`}></div>
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