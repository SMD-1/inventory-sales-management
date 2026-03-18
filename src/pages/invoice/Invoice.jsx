import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";

const Invoice = () => {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle("Invoice");
  }, [setTitle]);

  return (
    <div>
      <p>Invoice</p>
    </div>
  );
};
export default Invoice;
