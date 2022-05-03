import React, { useState, useEffect } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { API } from "../../backend";
import Base from "../../Base";
import { getProductById } from "./helper/productHelper";
import "./product.css";
import { isAuthenticated } from "../../User/helper/auth";
import { saveCartItem } from "../Cart/helper/cartHelper";
const Product = () => {
  const {
    params: { productId },
  } = useRouteMatch();

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  const [product, setProduct] = useState({});
  const [redirectTo, setRedirect] = useState("");

  const getProduct = (id) => {
    getProductById(id).then((res) => {
      if (res.status === 0) {
        alert(res.error);
      } else {
        setProduct(res);
      }
    });
  };
  const addToCart = () => {
    if (!isAuthenticated()) {
      setRedirect("/signin");
      return;
    }
    var cartItem = {
      product: productId,
      stock: product.stocks[0]._id,
      qty: 1,
    };
    saveCartItem(cartItem).then((res) => {
      if (res.status === 0) {
        alert(res.error);
      } else {
        alert("Item Added Successfully.");
      }
    });
  };
  const doRedirect = () => {
    return <Redirect to={redirectTo} />;
  };
  return (
    <Base>
      <section>
        {redirectTo && doRedirect()}
        {product.name && (
          <div className="side-spacer">
            <div className="row m-0 justify-content-center align-items-top">
              <div className="col-md-5 p-2" style={{ maxHeight: "40rem" }}>
                <center>
                  <div
                    id="carouselExampleIndicators"
                    class="carousel slide w-100 rounded shadow col-8 p-0"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">
                      {product.images &&
                        product.images.map((img, i) => {
                          return (
                            <div
                              class={
                                "carousel-item " + (i === 0 ? "active" : "")
                              }
                            >
                              <img
                                src={`${API}/filesync?fileId=${img._id}`}
                                class="d-block w-100 rounded"
                                alt={img.name}
                              />
                            </div>
                          );
                        })}
                    </div>
                    {product.images && product.images.length > 1 && (
                      <a
                        class="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="sr-only">Previous</span>
                      </a>
                    )}
                    {product.images && product.images.length > 1 && (
                      <a
                        class="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="sr-only">Next</span>
                      </a>
                    )}
                  </div>
                </center>
              </div>
              <div className="col-md-7 p-2">
                <h3>
                  {product.name.split("~")[0]}
                  <br />
                  <small>{product.name.split("~")[1]}</small>
                </h3>
                {product.keyVal.find((kv) => kv.key === "author") && (
                  <h5 className="">
                    -By&nbsp;
                    {product.keyVal.find((kv) => kv.key === "author").value}
                  </h5>
                )}
                <p
                  className=""
                  dangerouslySetInnerHTML={{ __html: product.dsc }}
                ></p>
                {product.keyVal.find((kv) => kv.key === "isbn") && (
                  <p className="">
                    ISBN:&nbsp;
                    {product.keyVal.find((kv) => kv.key === "isbn").value}
                  </p>
                )}
                <h4>
                  {product.stocks[0].mrp === product.stocks[0].sellPrice && (
                    <h4 className="">₹ {product.stocks[0].mrp.toFixed(2)}</h4>
                  )}
                  {product.stocks[0].mrp > product.stocks[0].sellPrice && (
                    <h4 className="row mx-0">
                      ₹ {product.stocks[0].sellPrice.toFixed(2)}
                      <span>&nbsp;&nbsp;</span>
                      <h4 style={{ textDecoration: "line-through" }}>
                        ₹ {product.stocks[0].mrp.toFixed(2)}
                      </h4>
                      &nbsp;
                    </h4>
                  )}
                </h4>
                <center>
                  <big>
                    <div className="m-1 p-2 button" onClick={addToCart}>
                      Add to Cart
                    </div>
                  </big>
                </center>
              </div>
            </div>
          </div>
        )}
      </section>
    </Base>
  );
};
export default Product;
