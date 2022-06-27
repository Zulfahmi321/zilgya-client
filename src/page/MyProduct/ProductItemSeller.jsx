import axios from "axios";
import React from "react";
import { CheckCircle } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

function ProductItemSeller({ products, setDelMsg, setLoading }) {

  const { token } = useSelector((state) => state.auth);
  const deleteFromServer = (p_id) => {
    setLoading(true)
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_HOST_API}/product/${p_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((result) => {
        setLoading(false)
        // console.log(result.data.message);
        setDelMsg(result.data.message);
      })
      .catch((error) => {
        setLoading(false)
        console.error(error)});
  };

  const handleDelete = (id) => {
    setTimeout(() => {
      deleteFromServer(id)
    }, 500);
  };
  return (
    <>
      <div className="wl-product-item">
        <div className="wl-img-name-container">
          <div className="wl-product-img-container">
            <img
              src={products.images_url}
              alt="product"
              className="wl-product-img"
            />
          </div>
          <div className="wl-product-name">{products.name}</div>
        </div>
        <div className="wl-product-stock">
          {Number(products.stock) > 0 ? (
            <div className="">
              <CheckCircle /> In Stock
            </div>
          ) : (
            <div>sold out</div>
          )}
        </div>
        <div className="wl-product-price-container">
          <div className="wl-product-price">{products.price}</div>
          <div className="sp-delete-button" onClick={()=>handleDelete(products.id)}>Delete</div>
        </div>
      </div>
    </>
  );
}

export default ProductItemSeller;
