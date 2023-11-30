import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import SplashPage from "./components/SplashPage/SplashPage";
import LogInForm from "./components/LogInForm/LoginForm";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import NewUserForm from "./components/NewUserForm/NewUserForm";
import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <>
       <NavBar/>
      </>,
    children: [
      {
        // index: true,
        element:  <SplashPage />
      },
      {
        path: 'signup',
        element: <NewUserForm/>
      },
      {
        path: 'login',
        element: <LogInForm />
      },
      {
        path: 'explore',
        element: <ExplorePage />
      },
    ]
  },
  // {
  //   path: 'login',
  //   element: <LogInForm />
  // },
  {
    path: '*',
    element: <Navigate to={'/'} />
  }
])



function App() {
  return (
     <RouterProvider router={router} />
    ) 
}

export default App;
