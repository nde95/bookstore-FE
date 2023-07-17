import { productsModel } from "../../../Interfaces";
import { Link } from "react-router-dom"

interface Props {
    productItem: productsModel;
}

const ProductCard = (props: Props) => {
    return (
        <div className="col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/ProductDetails/${props.productItem.id}`}>
              <img
                src={props.productItem.image}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
          </div>
        {props.productItem.specialTag && props.productItem.specialTag.length > 0 && (
        <i
            className="bi bi-star btn btn-success"
            style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            padding: "5px 10px",
            borderRadius: "3px",
            outline: "none !important",
            cursor: "pointer",
            }}
        >
            &nbsp; {props.productItem.specialTag}
        </i>
        )}


          <i
            className="bi bi-cart-plus btn btn-outline-danger"
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          ></i>

          <div className="text-center">
          <Link to={`/ProductDetails/${props.productItem.id}`} style={{ textDecoration: "none" }}>
            <p className="card-title m-0 text-success fs-3">{props.productItem.name}</p>
          </Link>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.productItem.category}
            </p>
          </div>
          <p className="card-text" style={{ textAlign: "center" }}>
            {props.productItem.description}
          </p>
          <div className="row text-center">
            <h4>$ {props.productItem.price}</h4>
          </div>
        </div>
      </div>
    </div>
    )
}

export default ProductCard;