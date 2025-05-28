import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
const PrivateRouteAdmin = () => {
  const { user, token, loading } = useAuth();

 

  // Exibe um indicador de carregamento enquanto o estado está sendo atualizado
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Verifica se o token existe
  if (!token) {
    
    return <Navigate to="/login" replace />;
  }

  // Verifica se o usuário é ADMIN
  if (user?.role !== "ADMIN") {
   
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRouteAdmin;