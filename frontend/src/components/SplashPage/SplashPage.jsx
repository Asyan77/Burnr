import { useCallback, useEffect, useState } from "react";
import "./SplashPage.css"
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SplashPage () {
    const [currentImage, setCurrentImage] = useState(0);
    const currentUser = useSelector (state => state.session.currentUser)
    const imageFiles = new Array(15)

    const shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * imageFiles.length);
        setCurrentImage(index);
    }, [imageFiles.length]);

    useEffect(() => {
        const intervalID = setInterval(shuffle, 5000);
        return () => clearInterval(intervalID);
    }, [shuffle])

    if (currentUser) return <Navigate to='/explore' replace={true} />

    return (
        
        <div className="whole-splash-page">
            <div className={`background-image image${currentImage}`}></div>
            <div className="splash-text-box">
                <div className="main-text1">Excite your imagination</div>
                <div className="main-text2">Join the Burnr community, home to tens of billions of .</div>
                <div className="main-text2">photos and 2 million groups</div>
                <Link to='/signup'>
                    <button className="start-btn">Start for free</button>
                </Link>
            </div>
        </div>
    
    )
}

export default SplashPage