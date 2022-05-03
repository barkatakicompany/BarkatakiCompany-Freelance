import React, { useState, useEffect } from "react";
import Base from "../Base";
import "./store.css";
import ProductCard from "./ProductCard/ProductCard";
import {
  getCategories,
  getProducts,
  getProductsBySubCategoryId,
} from "./Product/helper/productHelper";
import { getBanners } from "../helper/coreApiCalls";
import { API } from "../backend";

const Store = () => {
  //variables
  const [webBanners, setWebBanners] = useState([]);
  const [mobBanners, setMobBanners] = useState([]);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  //onload
  // useEffect(() => {
  //   getBanners("store").then((res) => {
  //     if (!res.error) {
  //       setWebBanners(res);
  //     }
  //   });
  //   getBanners("store-m").then((res) => {
  //     if (!res.error) {
  //       setMobBanners(res);
  //     }
  //   });

  // }, []);

  useEffect(() => {
    loadCategories();
    getBanners("store").then((res) => {
      if (!res.error) {
        setWebBanners(res);
      }
    });
    getBanners("store-m").then((res) => {
      if (!res.error) {
        setMobBanners(res);
      }
    });
    getProducts(20).then((res) => {
      if (!res.error) {
        setProducts(res);
      }
    });
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      if (res.status === 0) {
        //show error
      } else {
        setCategories(res);
      }
    });
  };

  const loadBySubCategory = (subCateId) => {
    getProductsBySubCategoryId(subCateId).then((res) => {
      if (res.status === 0) {
        alert(res.error);
        setProducts([]);
      } else {
        setProducts(res);
      }
    });
  };

  const loadMainPage = () => {
    return (
      <div className="">
        <div className="web-banner">
          <div className="carousel" data-ride="carousel" data-interval="1500">
            <div className="carousel-inner">
              {webBanners &&
                webBanners.map((b, i) => {
                  return (
                    <div
                      className={
                        i === 0 ? "carousel-item active " : "carousel-item"
                      }
                      key={i}
                    >
                      <img
                        className="h-100 w-100"
                        src={`${API}/filesync?fileId=${b.fileId}`}
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="mobile-banner">
          <div className="carousel" data-ride="carousel" data-interval="1500">
            <div className="carousel-inner">
              {mobBanners &&
                mobBanners.map((b, i) => {
                  return (
                    <div
                      className={
                        i === 0 ? "carousel-item active " : "carousel-item"
                      }
                      key={i}
                    >
                      <img
                        className="h-100 w-100"
                        src={`${API}/filesync?fileId=${b.fileId}`}
                        loading="lazy"
                        alt=""
                      />
                    </div>
                  );
                })}
            </div>

          </div>
        
        
        
        
        
        
        
        </div>

        {/* shop by category */}
        <div className="container-fluid cate-p border-bottom">
          <div className="row justify-content-center align-items-center">
            {categories &&
              categories.map((cate, index) => {
                return (
                  <div className="dropdown" key={index}>
                    <div
                      className="dropdown-toggle btn p-2"
                      data-toggle="dropdown"
                    >
                      {cate.name}
                    </div>
                    <div className="dropdown-menu dropdown-menu-right">
                      {cate.subCategories.map((sc, i) => {
                        return (
                          <button
                            key={i}
                            className="dropdown-item"
                            type="button"
                            onClick={() => {
                              loadBySubCategory(sc._id);
                            }}
                          >
                            {sc.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* products and subcategorys */}
        <div className="container-fluid side-spacer">
          <div className="row justify-content-center align-items-center">
            {products &&
              products.map((product, index) => {
                return (
                  <ProductCard
                    product={product}
                    key={index}
                    className={"col-6 col-md-3 p-4 text-center h-100"}
                  />
                );
              })}
          </div>
        </div>
      
      </div>
    );
  };

  return (
    <Base>
          {loadMainPage()}
    </Base>
  );
};
export default Store;
