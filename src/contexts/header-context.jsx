import { createContext, useContext, useState } from "react";

const headerContext = createContext({
  title: "Home",
  setTitle: () => {},
});

const HeaderProvider = ({ children }) => {
  const [title, setTitle] = useState("Home");
  return (
    <headerContext.Provider value={{ title, setTitle }}>
      {children}
    </headerContext.Provider>
  );
};

export const useHeader = () => useContext(headerContext);

export default HeaderProvider;
