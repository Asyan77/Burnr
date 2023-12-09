import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import SplashPage from "./components/SplashPage/SplashPage";
import LogInForm from "./components/LogInForm/LoginForm";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import NewUserForm from "./components/NewUserForm/NewUserForm";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import You from "./components/You/You";
import SinglePhoto from "./components/SinglePhoto/SinglePhoto.jsx/SinglePhoto";
const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <>
        <NavBar/>
        <Outlet/>
      </>,
    children: [
      { index: true, element:  <SplashPage /> },
      { path: 'signup', element: <NewUserForm/>  },
      { path: 'login', element: <LogInForm /> },
      { path: 'explore', element: <ExplorePage /> },
    ]
  },
  {
    path: '/photos',
    element: 
      <>
        <NavBar/>
        <Outlet/>
      </>,
    children: [
      // { index: true, element:  <You/> },
      { path: ':userId', element: <You/>  },
      { path: ':userId/:photoId', element: <SinglePhoto/>  },
      // { path: ':username/albums', element: <Albums /> },
      // { path: 'username/albums/:albumId', element: <AlbumPhotos/> },
    ]
  },
  {
    path: '*',
    element: <Navigate to={'/'} replace={true}/>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
    ) 
}

export default App;
