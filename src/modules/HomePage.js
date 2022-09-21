import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function HomePage(){
    const { isLoggedIn } = useSelector(state => state.auth);

    if (!isLoggedIn) {
        return <Navigate to="/auth/signin" />;
      }
    return(
        <h1>YOURE LOGGED IN</h1>
    )
}