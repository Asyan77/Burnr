import { useCallback, useEffect, useState } from "react";
import "./SplashPage.css"
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SplashPage () {
    const [currentImage, setCurrentImage] = useState(0);
    const currentUser = useSelector (state => state.session.currentUser)
    const imageFiles = new Array(15)

    const rotateBackgroundIndex = useCallback(() => {
        const index = (currentImage + 1) % imageFiles.length
        setCurrentImage(index);
    }, [imageFiles.length, currentImage]);

    useEffect(() => {
        const intervalID = setInterval(rotateBackgroundIndex, 5000);
        return () => clearInterval(intervalID);
    }, [rotateBackgroundIndex])

    if (currentUser) return <Navigate to='/explore' replace={true} />

    return (
        
        <div className="whole-splash-page">
            <div className={`background-image image${currentImage}`}></div>
            <div className="background-image"></div>
            <div className="splash-text-box">
                <div className="main-text1">Excite your imagination</div>
                <div className="main-text2">Join the Burnr community, home to tens of billions of</div>
                <div className="main-text2">photos and 2 million groups.</div>
                <Link className="sign-up-link" to='/signup'>
                  <button className="start-btn">Start for free</button>
                </Link>
            </div>
        </div>
    
    )
}

export default SplashPage