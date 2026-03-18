import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";

const Settings = () => {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle("Settings");
  }, [setTitle]);

  return (
    <div>
      <p>Settings</p>
    </div>
  );
};
export default Settings;
