import { createContext, useState, useEffect, ReactNode } from "react";

// Tipagem do contexto
export const ApiUrlContext = createContext<string>("");

// Tipagem para as props do ApiUrlProvider
type ApiUrlProviderProps = {
  children: ReactNode;
};

// Criando o provedor do contexto
export const ApiUrlProvider: React.FC<ApiUrlProviderProps> = ({ children }) => {
  const [apiUrl, setApiUrl] = useState<string>(
    import.meta.env.VITE_API_URL || "https://my-first-project-repo-production.up.railway.app/"
  );

  useEffect(() => {
    // Não é necessário fazer fetch do .env
    // A variável import.meta.env.VITE_API_URL já está disponível no ambiente
  }, []);

  return <ApiUrlContext.Provider value={apiUrl}>{children}</ApiUrlContext.Provider>;
};