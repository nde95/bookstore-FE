import React, { useEffect, useState } from "react";
import { InputHelper, toastNotify } from "../../../Helper";
import {
  useCreateProductItemMutation,
  useGetProductItemByIdQuery,
  useUpdateProductItemMutation,
} from "../../../APIs/productItemAPI";
import { useNavigate, useParams } from "react-router-dom";
import { MainLoader } from "../Common";

const productItemData = {
  name: "",
  description: "",
  specialTag: "",
  category: "",
  price: "",
};

const ProductUpsert = () => {
  const { id } = useParams();

  const [imageToBeStored, setImageToBeStored] = useState<any>();
  const [imageToDisplay, setImageToDisplay] = useState<string>("");
  const [productItemInputs, setProductItemInputs] = useState(productItemData);
  const [loading, isLoading] = useState(false);
  const [createNewProduct] = useCreateProductItemMutation();
  const [updateProductEntry] = useUpdateProductItemMutation();
  const navigate = useNavigate();

  const { data } = useGetProductItemByIdQuery(id);

  useEffect(() => {
    if (data && data.result) {
      const tempData = {
        name: data.result.name,
        description: data.result.description,
        specialTag: data.result.specialTag,
        category: data.result.category,
        price: data.result.price,
      };
      setProductItemInputs(tempData);
      setImageToDisplay(data.result.image);
    }
  }, [data]);

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
    if (!imageToBeStored && !id) {
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
    if (imageToDisplay) formData.append("File", imageToBeStored);

    let response;
    if (id) {
      //update
      formData.append("Id", id);
      response = await updateProductEntry({ data: formData, id });
      toastNotify("Menu Item updated successfully", "success");
    } else {
      //create new
      response = await createNewProduct(formData);
      toastNotify("New product created successfully", "success");
    }

    if (response) {
      isLoading(false);
      navigate("/products/productlist");
    }

    isLoading(false);
  };

  return (
    <div className="container border mt-5 p-5 bg-light">
      {loading && <MainLoader />}
      <h3 className="offset-2 px-2 text-success">
        {id ? "Edit Product" : "Add Product"}
      </h3>
      <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-7">
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
            <div className="row">
              <div className="col-6">
                <button
                  type="submit"
                  className="btn btn-success mt-5 form-control"
                >
                  {id ? "Update" : "Create Product Listing"}
                </button>
              </div>
              <div className="col-6">
                <a
                  onClick={() => navigate(-1)}
                  className="btn btn-secondary form-control mt-5"
                >
                  Back to List
                </a>
              </div>
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
