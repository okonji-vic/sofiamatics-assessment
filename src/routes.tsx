import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardLayout from "./components/layouts/DashboardLayout";
import PageLoader from "./components/PageLoader";
import AuthProtectedRoute from "./components/layouts/AuthProtectedRoute";



// Lazy load route components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

export const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/user/dashboard" replace /> },
    {
        path: "/user",
        element: <AuthProtectedRoute />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    {
                        path: "hospitals",
                        element: (
                            <Suspense fallback={<PageLoader />}>
                                <Dashboard />
                            </Suspense>
                        ),
                    },
                    
                ],
            },
        ],
    },
    { 
        path: "*", 
        element: (
            <Suspense fallback={<PageLoader/>}>
                <NotFound/>
            </Suspense>
        )
    }
]);