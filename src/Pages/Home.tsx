import { Banner } from "../Components/Page/Common";
import { ProductList } from "../Components/Page/ProductItems";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="container p-2">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
