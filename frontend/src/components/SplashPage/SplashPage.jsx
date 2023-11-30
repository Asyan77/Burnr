import { Outlet } from "react-router-dom"
import NavBar from "../NavBar/NavBar"
import "./SplashPage.css"

function SplashPage () {
    return (
        <>
            <h1>Splash page</h1>
            <NavBar />
            <Outlet />
        </>
    )
}

export default SplashPage