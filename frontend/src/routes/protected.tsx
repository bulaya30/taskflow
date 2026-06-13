import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  // console.log(token);
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}