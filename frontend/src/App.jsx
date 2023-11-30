import { createBrowserRouter } from "react-router-dom";
import SplashPage from "./components/SplashPage/SplashPage";
import LogInForm from "./components/LogInForm/LoginForm";
import ExplorePage from "./components/ExplorePage/ExplorePage";
import NewUserForm from "./components/NewUserForm/NewUserForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashPage />,
    children: [
      {
        index: true,
        element: <ExplorePage />
      },
      {
        path: 'signup',
        element: <NewUserForm/>
      },
      {
        path: 'login',
        element: <LogInForm />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to={'/'} />
  }
])




function App() {
  return <h1> Burnr part deux </h1>;
}

export default App;
