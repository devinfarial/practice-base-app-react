import SigninPage from "./modules/SigninPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./modules/HomePage";
import SignupPage from "./modules/SignupPage";
import ProductPage from "./modules/ProductPage";
import Navigation from "./components/Navigation";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import SettingPage from "./modules/SettingPage";

export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoggedIn } = useSelector((state) => state.auth);
  const toastRef = useRef();

  function AuthGuard({ children }) {
    if (!isLoggedIn) {
      return <Navigate to={"/auth/signin"} replace />;
    }

    return children;
  }
  function AdminGuard({ children }) {
    if (!user.roles.includes("ROLE_ADMIN")) {
      toastRef.current.show({
        severity: "error",
        summary: "You are not Admin",
        detail: "Please log in as an Admin to access this page.",
        life: 3000,
      });
      return <Navigate to={"/"} replace />;
    }
    return children;
  }

  function StaffGuard({ children }) {
    if (!user.roles.includes("ROLE_STAFF")) {
      toastRef.current.show({
        severity: "error",
        summary: "You are not Staff",
        detail: "Please log in as a Staff to access this page.",
        life: 3000,
      });
      return <Navigate to={"/"} replace />;
    }
    return children;
  }

  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation></Navigation>}
      <Toast position="top-center" ref={toastRef} />
      <Routes>
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/product"
          element={
            <AuthGuard>
              <StaffGuard>
                <ProductPage />
              </StaffGuard>
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <AdminGuard>
                <SettingPage />
              </AdminGuard>
            </AuthGuard>
          }
        />
        <Route
          path="/home"
          element={
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          }
        />
        <Route
          path="/"
          element={
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
