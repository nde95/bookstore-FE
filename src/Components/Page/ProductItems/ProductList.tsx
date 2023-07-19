import { useEffect } from 'react';
import { productsModel } from '../../../Interfaces';
import { ProductCard } from '.';
import { useGetProductItemsQuery } from '../../../APIs/productItemAPI';
import { useDispatch } from "react-redux";
import { setProductItem } from '../../../Storage/Redux/productSlice';
import { MainLoader } from '../Common';

const ProductList = () => {
   // const [productItems, setProductItems] = useState<productsModel[]>([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetProductItemsQuery(null);

    useEffect(() => {
      if (!isLoading){
        dispatch(setProductItem(data.result));
      }
    }, [isLoading]);
  
    if(isLoading){
      return (
        <MainLoader />
      )
    }

    return (
        <div className='container row'>
          {data.result.length >0 && data.result.map((productItem : productsModel, index : number) => (
            <ProductCard productItem={productItem} key={index} />
          ))}
        </div>
    )
}

export default ProductList;