import profile from "../assets/profile-options/profile.svg";
import shield from "../assets/profile-options/shield-done.svg";
import lock from "../assets/profile-options/lock.svg";
import logout from "../assets/profile-options/logout.svg";
import notification from "../assets/profile-options/notification.svg";
import heart from "../assets/profile-options/heart.svg";

export const optionsData = [
  {
    title: "My Account",
    description: "Make changes to your account.",
    iconSrc: profile,
    iconAlt: "Profile icon",
    navigateTo: "account",
  },
  {
    title: "Application Status",
    description: "Track the progress of your applications.",
    iconSrc: shield,
    iconAlt: "Shield-Done icon",
  },
  {
    title: "Security Settings",
    description: "Update password and security settings.",
    iconSrc: lock,
    iconAlt: "Lock icon",
  },
  {
    title: "Log out",
    description: "Further secure your account for safety.",
    iconSrc: logout,
    iconAlt: "Logout icon",
    navigateTo: "/auth",
  },
];

export const moreOptionsData = [
  {
    title: "Help & Support",
    iconSrc: notification,
    iconAlt: "Notification icon",
    navigateTo: "support",
  },
  {
    title: "About App",
    iconSrc: heart,
    iconAlt: "Heart icon",
    navigateTo: "about-app",
  },
];
