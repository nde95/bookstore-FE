import { useGetProductItemsQuery } from "../../../APIs/productItemAPI";
import { productsModel } from "../../../Interfaces";
import { MainLoader } from "../Common";
import { useNavigate } from "react-router-dom";
const AllProductsList = () => {
  const { data, isLoading } = useGetProductItemsQuery(null);
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="table p-5">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="text-success">Current Product List</h1>
            <button
              className="btn btn-success"
              onClick={() => navigate("/products/productupsert")}
            >
              Add New
            </button>
          </div>
          <div className="p-2">
            <div className="row border">
              <div className="col-2">Image</div>
              <div className="col-1">ID</div>
              <div className="col-2">Name</div>
              <div className="col-2">Category</div>
              <div className="col-1">Price</div>
              <div className="col-2">Special Tag</div>
              <div className="col-1">Action</div>
            </div>

            {data.result.map((productItem: productsModel) => {
              return (
                <div className="row border" key={productItem.id}>
                  <div className="col-2">
                    <img
                      src={productItem.image}
                      alt="no content"
                      style={{ width: "100%", maxWidth: "120px" }}
                    />
                  </div>
                  <div className="col-1">{productItem.id}</div>
                  <div className="col-2">{productItem.name}</div>
                  <div className="col-2">{productItem.category}</div>
                  <div className="col-1">${productItem.price}</div>
                  <div className="col-2">{productItem.specialTag}</div>
                  <div className="col-1">
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        navigate("/products/productupsert/" + productItem.id)
                      }
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button className="btn btn-danger mx-2">
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default AllProductsList;
