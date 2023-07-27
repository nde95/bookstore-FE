import React, { useEffect, useState } from "react";
import { InputHelper, toastNotify } from "../../../Helper";
import { useCreateProductItemMutation } from "../../../APIs/productItemAPI";
import { useNavigate } from "react-router-dom";

const productItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: "",
  price: "",
};

const ProductUpsert = () => {
  const [imageToBeStored, setImageToBeStored] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [productItemInputs, setProductItemInputs] = useState(productItemData);
  const [loading, isLoading] = useState(false);
  const [createNewProduct] = useCreateProductItemMutation();
  const navigate = useNavigate();

  const handleProductItemInputs = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const tempData = InputHelper(e, productItemInputs);
    setProductItemInputs(tempData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpeg", "jpg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return e === imgType;
      });

      if (file.size > 1000 * 1024) {
        setImageToBeStored("");
        toastNotify("File must be smaller than 1 MB", "error");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToBeStored("");
        toastNotify("Image must be a jpeg, jpg or png format.", "error");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToBeStored(file);
      reader.onload = (e) => {
        const imgUrl = e.target?.result as string;
        setImageToDisplay(imgUrl);
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isLoading(true);
    if (!imageToBeStored) {
      toastNotify("Please choose an image to upload", "error");
      isLoading(false);
      return;
    }

    const formData = new FormData();

    formData.append("Name", productItemInputs.name);
    formData.append("Description", productItemInputs.description);
    formData.append("SpecialTag", productItemInputs.specialTag);
    formData.append("Category", productItemInputs.category);
    formData.append("Price", productItemInputs.price);
    formData.append("File", imageToBeStored);

    const response = await createNewProduct(formData);
    if (response) {
      isLoading(false);
      navigate("/products/productlist");
    }

    isLoading(false);
  };

  return (
    <div className="container border mt-5 p-5">
      <h3 className="offset-2 px-2 text-success">Add Product</h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-5 offset-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={productItemInputs.name}
              onChange={handleProductItemInputs}
            />
            <textarea
              className="form-control mt-3"
              placeholder="Enter Description"
              name="description"
              rows={10}
              value={productItemInputs.description}
              onChange={handleProductItemInputs}
            ></textarea>
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Special Tag"
              name="specialTag"
              value={productItemInputs.specialTag}
              onChange={handleProductItemInputs}
            />
            <input
              type="text"
              className="form-control mt-3"
              placeholder="Enter Category"
              name="category"
              value={productItemInputs.category}
              onChange={handleProductItemInputs}
            />
            <input
              type="number"
              className="form-control mt-3"
              required
              placeholder="Enter Price"
              name="price"
              value={productItemInputs.price}
              onChange={handleProductItemInputs}
            />
            <input
              type="file"
              onChange={handleFileChange}
              className="form-control mt-3"
            />
            <div className="text-center">
              <button
                type="submit"
                style={{ width: "50%" }}
                className="btn btn-success mt-5"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="col-md-5 text-center">
            <img
              src={imageToDisplay}
              style={{ width: "100%", borderRadius: "30px" }}
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductUpsert;
