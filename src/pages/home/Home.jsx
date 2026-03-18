import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";

function Home() {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle("Home");
  }, [setTitle]);

  return (
    <div>
      <p>Home</p>
    </div>
  );
}
export default Home;
