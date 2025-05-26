import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Router } from "./routes.jsx";
import "./index.css";
import LoadingScreen from "./components/ui/LoadingScreen.jsx";
import { TaskProvider } from "./contextStore/task.context.jsx";
import { AuthProvider } from "./contextStore/auth.context.jsx";
import { MessageProvider } from "./contextStore/message.context.jsx";
import { ThemeProvider } from "./contextStore/theme.context.jsx";
import { BACKEND_URL } from "../constant.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <MessageProvider>
            <Suspense fallback={<LoadingScreen />}>
              <RouterProvider router={Router} />
            </Suspense>
          </MessageProvider>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
    <ToastContainer />
  </StrictMode>
);
