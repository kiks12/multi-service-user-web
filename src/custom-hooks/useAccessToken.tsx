import { createContext, useContext, useState } from "react";

interface contextType {
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const accessTokenContext = createContext<contextType>({
  accessToken: "",
  setAccessToken: () => {},
});


export const AccessTokenProvider: React.FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>("");

  {
    /*
  useEffect(() => {
    setAccessToken(serverSideToken);

    return () => setAccessToken('');
  }, [setAccessToken, serverSideToken]);
  */
  }

  return <accessTokenContext.Provider value={{ accessToken, setAccessToken }}>{children}</accessTokenContext.Provider>;
};

export const useAccessToken = () => {
  return useContext(accessTokenContext);
};
