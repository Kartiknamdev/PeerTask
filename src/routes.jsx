import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import App from "./App";
import LoadingScreen from "./components/ui/LoadingScreen";
import { useAuth } from "./contextStore/auth.context";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const CreateTask = lazy(() => import("./pages/dashboard/CreateTask"));
const BrowseTasks = lazy(() => import("./pages/dashboard/BrowseTasks"));
const TaskDetails = lazy(() => import("./pages/dashboard/TaskDetails"));
const Profile = lazy(() => import("./pages/dashboard/Profile"));
const Messages = lazy(() => import("./pages/dashboard/Messages"));
const TaskHistory = lazy(() => import("./pages/dashboard/TaskHistory"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const TaskInfo = lazy(() => import("./pages/dashboard/TaskInfo"));
const Cookies = lazy(() => import("./pages/Cookies"));
const APIDOCS = lazy(() => import("./pages/APIDOCS"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const PPT = lazy(() => import("./pages/ppt"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SubmitBlog = lazy(() => import("./pages/SubmitBlog"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

const withSuspense = (Component) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component />
  </Suspense>
);

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export const Router = createBrowserRouter([
  {
    path: "/dashboardLayout",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", index: true, element: withSuspense(Dashboard) },
      { path: "create-task", element: withSuspense(CreateTask) },
      {
        path: "browse-tasks",
        element: withSuspense(BrowseTasks),
      },
      {
        path: "browse-tasks/:taskId/:createdBy",
        element: withSuspense(TaskInfo),
      },
      { path: "tasks", element: withSuspense(TaskDetails) },
      { path: "profile", element: withSuspense(Profile) },
      { path: "messages", element: withSuspense(Messages) },
      { path: "history", element: withSuspense(TaskHistory) },
      { path: "settings", element: withSuspense(Settings) },
    ],
  },

  { path: "/login", element: withSuspense(Login) },
  { path: "/signup", element: withSuspense(Register) },
  { path: "/forgot-password", element: withSuspense(ForgotPassword) },
  { path: "/cookies", element: withSuspense(Cookies) },
  { path: "/api-docs", element: withSuspense(APIDOCS) },
  { path: "/how-it-works", element: withSuspense(HowItWorks)},
  { path: "/ppt", element: withSuspense(PPT)},
  { path: "/blog", element: withSuspense(BlogPost) },
  { path: "/submit-story", element: withSuspense(SubmitBlog) },
  { path: "/terms-of-service", element: withSuspense(TermsOfService) },
  { path: "/privacy-policy", element: withSuspense(PrivacyPolicy) },
  { path: "/", element: <App /> },
]);
