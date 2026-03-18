import { useEffect } from "react";
import { useHeader } from "../../contexts/header-context";

const Product = () => {
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle("Product");
  }, [setTitle]);

  return (
    <div>
      <p>Product</p>
    </div>
  );
};
export default Product;
