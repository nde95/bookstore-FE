import { useEffect, useState } from "react";
import { productsModel } from "../../../Interfaces";
import { ProductCard } from ".";
import { useGetProductItemsQuery } from "../../../APIs/productItemAPI";
import { useDispatch, useSelector } from "react-redux";
import { setProductItem } from "../../../Storage/Redux/productSlice";
import { MainLoader } from "../Common";
import { RootState } from "../../../Storage/Redux/store";
import { SD_SortTypes } from "../../../Utils/SD";

const ProductList = () => {
  const [productItems, setProductItems] = useState<productsModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const dispatch = useDispatch();
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z);
  const { data, isLoading } = useGetProductItemsQuery(null);

  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];

  const searchValue = useSelector(
    (state: RootState) => state.productItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempProductsArray = handleFilters(
        sortName,
        selectedCategory,
        searchValue
      );
      setProductItems(tempProductsArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setProductItem(data.result));
      setProductItems(data.result);
      const tempCategoryList = ["All"];
      data.result.forEach((item: productsModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category);
        }
      });

      setCategoryList(tempCategoryList);
    }
  }, [isLoading]);

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i]);
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setProductItems(tempArray);
  };

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        if (index === 0) {
          localCategory = "All";
        } else {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory);
        const tempArray = handleFilters(sortName, localCategory, searchValue);
        setProductItems(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  };

  const handleFilters = (
    sortType: SD_SortTypes,
    category: string,
    search: string
  ) => {
    let tempProducts =
      category === "All"
        ? [...data.result]
        : data.result.filter(
            (item: productsModel) =>
              item.category.toUpperCase() === category.toUpperCase()
          );

    if (search) {
      const tempSearchProducts = [...tempProducts];
      tempProducts = tempSearchProducts.filter((item: productsModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    if (sortType === SD_SortTypes.PRICE_LOW_HIGH) {
      tempProducts.sort(
        (a: productsModel, b: productsModel) => a.price - b.price
      );
    }
    if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
      tempProducts.sort(
        (a: productsModel, b: productsModel) => b.price - a.price
      );
    }
    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempProducts.sort(
        (a: productsModel, b: productsModel) =>
          a.name.toUpperCase().charCodeAt(0) -
          b.name.toUpperCase().charCodeAt(0)
      );
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempProducts.sort(
        (a: productsModel, b: productsModel) =>
          b.name.toUpperCase().charCodeAt(0) -
          a.name.toUpperCase().charCodeAt(0)
      );
    }

    return tempProducts;
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container row">
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((categoryName, index) => (
            <li className="nav-item" key={index}>
              <button
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${
                  index === 0 && "active"
                }`}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-dark fs-6 border"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, index) => (
                <li
                  key={index}
                  onClick={() => handleSortClick(index)}
                  className="dropdown-item"
                >
                  {sortType}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {productItems.length > 0 &&
        productItems.map((productItem: productsModel, index: number) => (
          <ProductCard productItem={productItem} key={index} />
        ))}
    </div>
  );
};

export default ProductList;
