import { createContext, useContext, useState } from "react";

const headerContext = createContext({
  title: "Home",
  setTitle: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

const HeaderProvider = ({ children }) => {
  const [title, setTitle] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <headerContext.Provider value={{ title, setTitle, searchQuery, setSearchQuery }}>
      {children}
    </headerContext.Provider>
  );
};

export const useHeader = () => useContext(headerContext);

export default HeaderProvider;
