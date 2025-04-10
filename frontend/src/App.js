import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import AuthLayout from "./pages/Auth/Auth";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import NewsPage from "./pages/News";
import ProfilePage from "./pages/Profile/Profile";
import AccountPage from "./pages/Profile/Account";
import HelpSupportPage from "./pages/Profile/HelpSupport";
import AboutAppPage from "./pages/Profile/AboutApp";
import NotificationsPage from "./pages/Notifications";
import HireConsultantPage from "./pages/HireConsultant";
import { UserProvider } from "./context/UserContext";
import EditProfilePage from "./pages/Profile/EditProfile";
import ProtectedRoute from "./components/helpers/ProtectedRoute";
import CreateCasePage from "./pages/CreateCase";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { index: true, element: <Login /> },
          { path: "register", element: <SignUp /> },
        ],
      },
      {
        path: "profile",
        children: [
          { index: true, element: <ProfilePage /> },
          { path: "account", element: <AccountPage /> },
          { path: "support", element: <HelpSupportPage /> },
          { path: "about-app", element: <AboutAppPage /> },
          { path: "edit-profile", element: <EditProfilePage /> },
        ],
      },
      {
        path: "hire-rcic",
        element: (
          <ProtectedRoute allowRoles={["user"]}>
            <HireConsultantPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "create-case",
        element: (
          <ProtectedRoute allowRoles={["consultant"]}>
            <CreateCasePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: <NotificationsPage />,
      },
      {
        path: "news",
        element: <NewsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
