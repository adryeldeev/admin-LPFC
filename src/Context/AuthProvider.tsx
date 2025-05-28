import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";

// Tipagem do usuário vinda do JWT
type User = {
  id: number;
  role: "USER" | "ADMIN";
  iat?: number;
  exp?: number;
};

type LoginData = {
  email: string;
  password: string;
};

type AuthContextType = {
  token: string;
  user: User | null;
  loginAction: (data: LoginData) => Promise<void>;
  logOut: () => void;
  error: string;
  api: AxiosInstance;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>(localStorage.getItem("site") || "");
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento

  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "https://my-first-project-repo-production.up.railway.app",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const loginAction = async (data: LoginData): Promise<void> => {
    try {
      const response = await axios.post("https://my-first-project-repo-production.up.railway.app/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      const res = response.data;

      if (res.token) {
        setToken(res.token);
        localStorage.setItem("site", res.token);

        const decodedUser = jwtDecode<User>(res.token);
        setUser(decodedUser);

        setError("");
        navigate("/");
      } else {
        throw new Error(res.message || "Login falhou");
      }
    } catch (err: any) {
      console.error("Login failed:", err.message);

      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 401:
            setError("E-mail ou senha incorreta.");
            break;
          case 404:
            setError("Usuário não encontrado.");
            break;
          default:
            setError("Erro ao fazer login. Tente novamente.");
        }
      } else {
        setError("Erro de conexão. Verifique sua internet.");
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("site");

    if (storedToken) {
      try {
        const decodedUser = jwtDecode<User>(storedToken);
        setToken(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        localStorage.removeItem("site");
        setToken("");
        setUser(null);
      }
    }
    setLoading(false); // Finaliza o carregamento após a verificação
  }, []);

  const logOut = (): void => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, error, api,  loading  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
