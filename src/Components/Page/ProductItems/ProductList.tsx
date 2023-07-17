import { useState, useEffect } from 'react';
import { productsModel } from '../../../Interfaces';
import { ProductCard } from '.';

const ProductList = () => {
    const [productItems, setProductItems] = useState<productsModel[]>([]);

    useEffect(() => {
      fetch("https://ndebookstoreapi.azurewebsites.net/api/ProductItem").then((response) => response.json()).then((data) => {
        console.log(data);
        setProductItems(data.result);
      });
    }, []);
  

    return (
        <div className='container row'>
          {productItems.length >0 && productItems.map((productItem, index) => (
            <ProductCard productItem={productItem} key={index} />
          ))}
        </div>
    )
}

export default ProductList;