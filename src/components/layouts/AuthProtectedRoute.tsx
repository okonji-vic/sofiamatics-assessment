import { Navigate, Outlet } from "react-router-dom"
import PageLoader from "../PageLoader"
import { useAuthStore } from "@/store/authStore"

// for standalone layout but still have protected routes
const AuthProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuthStore()

    if (isLoading) {
        return <PageLoader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default AuthProtectedRoute