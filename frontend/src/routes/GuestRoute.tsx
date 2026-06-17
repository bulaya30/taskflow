import { Navigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

type GuestRouteProps = {
  children: React.ReactNode;
};

export default function GuestRoute({
  children,
}: GuestRouteProps) {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}