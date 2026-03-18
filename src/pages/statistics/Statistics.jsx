import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";

const Statistics = () => {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle("Statistics");
  }, [setTitle]);

  return (
    <div>
      <p>Statistics</p>
    </div>
  );
};
export default Statistics;
