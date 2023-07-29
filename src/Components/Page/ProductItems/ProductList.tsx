import { useEffect, useState } from "react";
import { productsModel } from "../../../Interfaces";
import { ProductCard } from ".";
import { useGetProductItemsQuery } from "../../../APIs/productItemAPI";
import { useDispatch, useSelector } from "react-redux";
import { setProductItem } from "../../../Storage/Redux/productSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";

const ProductList = () => {
  const [productItems, setProductItems] = useState<productsModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductItemsQuery(null);

  const searchValue = useSelector(
    (state: RootState) => state.productItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempProductsArray = handleFilters(searchValue);
      setProductItems(tempProductsArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setProductItem(data.result));
      setProductItems(data.result);
    }
  }, [isLoading]);

  const handleFilters = (search: string) => {
    let tempProducts = [...data.result];

    if (search) {
      const tempSearchProducts = [...tempProducts];
      tempProducts = tempSearchProducts.filter((item: productsModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    return tempProducts;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      {productItems.length > 0 &&
        productItems.map((productItem: productsModel, index: number) => (
          <ProductCard productItem={productItem} key={index} />
        ))}
    </div>
  );
};

export default ProductList;
