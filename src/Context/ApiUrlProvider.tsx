import { createContext, useState, ReactNode } from "react";

export const ApiUrlContext = createContext<string>("");

type ApiUrlProviderProps = {
  children: ReactNode;
};

export const ApiUrlProvider: React.FC<ApiUrlProviderProps> = ({ children }) => {
  const [apiUrl] = useState<string>(() => {
    const url = import.meta.env.VITE_API_URL;
    if (!url) {
      console.warn("VITE_API_URL não definida. Usando fallback.");
      return "https://my-first-project-repo-production.up.railway.app/";
    }
    return url;
  });

  return <ApiUrlContext.Provider value={apiUrl}>{children}</ApiUrlContext.Provider>;
};
