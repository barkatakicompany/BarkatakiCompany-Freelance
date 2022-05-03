import React, { useState, useEffect } from "react";
import { API } from "../../backend";
import Base from "../../Base";
import { isAuthenticated } from "../../User/helper/auth";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  addProduct,
  getCategories,
  getProductById,
  getProducts,
  getSubCategories,
  updateProduct,
  addCategory,
  addSubCategory,
  uploadFile,
} from "./helper/apiCalls";

export default function ProductManagement() {
  const [pageView, setPageView] = useState({
    category: false,
    subCategory: false,
    product: false,
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    _id: undefined,
    dsc: "",
    features: [],
    stocks: [],
    name: "",
    category: "",
    subCategory: "",
    disclaimer: "",
    keyVal: [{}],
    images: [],
  });
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getCategories().then((res) => {
      if (res.status === 0) {
        alert(res.error);
      } else {
        setCategories(res);
      }
    });
  };
  const loadSubCategories = (categoryId) => {
    getSubCategories(categoryId).then((res) => {
      if (res.status === 0) {
        alert(res.error);
      } else {
        setSubCategories(res);
      }
    });
  };
  const loadProducts = (subCategoryId) => {
    getProducts(subCategoryId).then((res) => {
      if (res.status === 0) {
        alert(res.error);
      } else {
        setProducts(res);
      }
    });
  };

  return (
    <Base>
      <div className="row container-fluid m-0 p-0 justify-content-center p-4 align-items-center">
        <div className="border p-4 rounded shadow col">
          <h1 className="text-center display-4">Product Management</h1>
          <div className="row container-fluid m-0 p-0">
            <div className="input-group col-6 mb-4">
              <label>Category</label>
              <div className="input-group">
                <select
                  className="custom-select"
                  onChange={(e) => {
                    setPageView({
                      ...pageView,
                      category: e.target.value,
                      subCategory: false,
                      product: false,
                    });

                    setProduct({
                      ...product,
                      _id: undefined,
                      dsc: "",
                      features: [],
                      stocks: [],
                      name: "",
                      category: e.target.value,
                      subCategory: "",
                      disclaimer: "",
                      images: [],
                      tags: [],
                    });
                    setSubCategories([]);
                    setProducts([]);
                    loadSubCategories(e.target.value);
                  }}
                >
                  <option disabled selected>
                    Select Category
                  </option>

                  {categories.map((c, i) => {
                    return (
                      <option key={i} value={c._id} className="">
                        {c.name}
                      </option>
                    );
                  })}
                </select>
                <div className="input-group-append">
                  <button
                    type="button"
                    className="input-group-text btn "
                    data-toggle="modal"
                    data-target="#categoryModel"
                  >
                    Add New
                  </button>
                </div>
              </div>
            </div>
            {pageView.category && (
              <div className="input-group col-6 mb-4">
                <label>Sub Category</label>
                <div className="input-group">
                  <select
                    className="custom-select"
                    onChange={(e) => {
                      setPageView({
                        ...pageView,
                        subCategory: e.target.value,
                        product: false,
                      });
                      setProduct({
                        ...product,
                        _id: undefined,
                        dsc: "",
                        features: [],
                        stocks: [],
                        name: "",
                        subCategory: e.target.value,
                        disclaimer: "",
                        images: [],
                        tags: [],
                      });
                      setProducts([]);
                      loadProducts(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      Select Sub Category
                    </option>

                    {subCategories.map((sc, i) => {
                      return (
                        <option key={i} value={sc._id} className="">
                          {sc.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="input-group-text btn "
                      data-toggle="modal"
                      data-target="#subCategoryModel"
                    >
                      Add New
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {pageView.subCategory && (
            <div className="row container-fluid m-0 p-0">
              <div className="input-group col-6 mb-4">
                <label>Product</label>
                <div className="input-group">
                  <select
                    className="custom-select"
                    onChange={(e) => {
                      getProductById(e.target.value).then((res) => {
                        if (res.status === 0) {
                          alert(res.error);
                        } else {
                          setProduct({
                            _id: undefined,
                            dsc: "",
                            features: [],
                            stocks: [{ mrp: 0, sellPrice: 0 }],
                            name: "",
                            category: "",
                            subCategory: "",
                            disclaimer: "",
                            keyVal: [{}],
                            images: [],
                          });
                          setProduct(res);
                          setPageView({ ...pageView, product: res._id });
                        }
                      });
                    }}
                  >
                    <option disabled selected>
                      Select Product
                    </option>

                    {products.map((p, i) => {
                      return (
                        <option key={i} value={p._id} className="">
                          {p.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className=" col-2 mb-4">
                <div
                  className="input-group"
                  style={{ position: "absolute", bottom: "0" }}
                >
                  <div
                    className="btn btn-warning"
                    onClick={() => {
                      setPageView({
                        ...pageView,
                        product: true,
                      });
                      setProduct({
                        ...product,
                        _id: undefined,
                        dsc: "",
                        features: [],
                        stocks: [],
                        name: "",
                        disclaimer: "",
                        images: [],
                        tags: [],
                        keyVal: [{}],
                      });
                    }}
                  >
                    Add New
                  </div>
                </div>
              </div>

              {product._id &&
                isAuthenticated() &&
                isAuthenticated().roles.find((x) => x === "ROLE_DELETE") && (
                  <div className="input-group col-2 mb-4">
                    <div
                      className="btn btn-warning"
                      style={{ position: "absolute", bottom: "0" }}
                      onClick={() => {
                        alert("Feature Not Added Yet");
                      }}
                    >
                      Delete
                    </div>
                  </div>
                )}
            </div>
          )}
          <div>
            {/* product */}
            {pageView.product && (
              <div className="row container-fluid m-0 p-0 pt-4 justify-content-center  border-top">
                <div className="col-6">
                  {/* name */}
                  <div className="input-group mb-4">
                    <label>Name</label>
                    <div className="input-group">
                      <input
                        name="name"
                        id="name"
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={product.name}
                        onChange={(e) => {
                          setProduct({ ...product, name: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  {/* stock */}
                  <div className="input-group mb-4">
                    <label>
                      Stocks <small>(PRICE - DISCOUNT - SELL PRICE)</small>
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mrp"
                        onBlur={(e) => {
                          e.target.value = parseInt(e.target.value).toFixed(2);
                        }}
                        value={
                          product.stocks[0]
                            ? parseInt(product.stocks[0].mrp)
                              ? parseInt(product.stocks[0].mrp)
                              : 0
                            : ""
                        }
                        onChange={(e) => {
                          var stk;
                          if (product.stocks[0]) {
                            stk = product.stocks[0];
                            stk.mrp = parseFloat(e.target.value);
                            setProduct({ ...product, stocks: [stk] });
                          } else {
                            stk = {
                              mrp: parseFloat(e.target.value),
                              sellPrice: 0,
                              disc: 0,
                              active: true,
                            };
                            setProduct({ ...product, stocks: [stk] });
                          }
                        }}
                      />
                      <input
                        type="text"
                        id="disc"
                        className="form-control"
                        onBlur={(e) => {
                          e.target.value = parseInt(e.target.value).toFixed(2);
                        }}
                        value={
                          product.stocks[0]
                            ? parseInt(
                                100 -
                                  (product.stocks[0].sellPrice /
                                    product.stocks[0].mrp) *
                                    100
                              )
                              ? parseInt(
                                  100 -
                                    (product.stocks[0].sellPrice /
                                      product.stocks[0].mrp) *
                                      100
                                )
                              : 0
                            : ""
                        }
                        placeholder="Discount(%)"
                        onChange={(e) => {
                          var stk;
                          if (product.stocks[0]) {
                            stk = product.stocks[0];
                            var sp =
                              stk.mrp -
                              (parseInt(stk.mrp) * parseInt(e.target.value)) /
                                100;

                            stk.sellPrice = sp;
                            setProduct({ ...product, stocks: [stk] });
                          } else {
                            stk = {
                              mrp: 0,
                              sellPrice: 0,
                              disc: parseInt(e.target.value),
                              active: true,
                            };
                            setProduct({ ...product, stocks: [stk] });
                          }
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sell Price"
                        onBlur={(e) => {
                          e.target.value = parseInt(e.target.value).toFixed(2);
                        }}
                        value={
                          product.stocks[0]
                            ? parseInt(product.stocks[0].sellPrice)
                              ? parseInt(product.stocks[0].sellPrice)
                              : 0
                            : ""
                        }
                        onChange={(e) => {
                          var stk;
                          if (product.stocks[0]) {
                            stk = product.stocks[0];
                            stk.sellPrice = parseFloat(e.target.value);
                            setProduct({ ...product, stocks: [stk] });
                          } else {
                            stk = {
                              mrp: 0,
                              sellPrice: parseFloat(e.target.value),
                              disc: 0,
                              active: true,
                            };
                            setProduct({ ...product, stocks: [stk] });
                          }
                          return;
                        }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <input
                            type="checkbox"
                            checked={
                              product.stocks[0]
                                ? product.stocks[0].active
                                : true
                            }
                            placeholder="Active"
                            onClick={(e) => {
                              var stk;
                              if (product.stocks[0]) {
                                stk = product.stocks[0];
                                stk.active = !stk.active;
                                setProduct({
                                  ...product,
                                  stocks: [stk],
                                });
                              } else {
                                stk = {
                                  mrp: 0,
                                  sellPrice: 0,
                                  active: e.target.checked,
                                };
                                setProduct({ ...product, stocks: [stk] });
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  {/* author */}
                  <label>Author</label>
                  <div className="input-group mb-4">
                    <input
                      name="author"
                      id="author"
                      type="text"
                      className="form-control"
                      placeholder="Author"
                      value={
                        product.keyVal.find((kv) => kv.key === "author")
                          ? product.keyVal.find((kv) => kv.key === "author")
                              .value
                          : ""
                      }
                      onChange={(e) => {
                        var kv = product.keyVal;

                        if (kv.find((kv) => kv.key === "author")) {
                          kv.find((kv) => kv.key === "author").value =
                            e.target.value;
                        } else {
                          kv.push({
                            key: "author",
                            value: e.target.value,
                          });
                        }
                        setProduct({ ...product, keyVal: kv });
                      }}
                    />
                  </div>
                </div>
                {/* isbn */}
                <div className="col-6">
                  <label>ISBN</label>
                  <div className="input-group mb-4">
                    <input
                      name="isbn"
                      id="isbn"
                      type="text"
                      className="form-control"
                      placeholder="ISBN"
                      value={
                        product.keyVal.find((kv) => kv.key === "isbn")
                          ? product.keyVal.find((kv) => kv.key === "isbn").value
                          : ""
                      }
                      onChange={(e) => {
                        var kv = product.keyVal;

                        if (kv.find((kv) => kv.key === "isbn")) {
                          kv.find((kv) => kv.key === "isbn").value =
                            e.target.value;
                        } else {
                          kv.push({
                            key: "isbn",
                            value: e.target.value,
                          });
                        }
                        setProduct({ ...product, keyVal: kv });
                      }}
                    />
                  </div>
                </div>
                {/* disclaimer */}
                <div className="col-12">
                  <div className="input-group mb-4">
                    <label>Disclaimer</label>
                    <div className="input-group">
                      <input
                        name="disclaimer"
                        id="disclaimer"
                        type="text"
                        className="form-control"
                        placeholder="Disclaimer"
                        value={product.disclaimer}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            disclaimer: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* description */}
                <div className="col-12">
                  <div className="input-group mb-4">
                    <label>Description</label>
                    <div className="input-group">
                      <CKEditor
                        className="h-100 w-100"
                        editor={ClassicEditor}
                        data={product.dsc}
                        onChange={(event, editor) => {
                          setProduct({
                            ...product,
                            dsc: editor.getData(),
                          });
                        }}
                      />
                      {/* <textarea
                        name="dsc"
                        id="dsc"
                        type="text"
                        className="form-control"
                        placeholder="Description"
                        value={product.dsc}
                        onChange={(e) => {
                          setProduct({
                            ...product,
                            dsc: e.target.value,
                          });
                        }}
                      /> */}
                    </div>
                  </div>
                </div>
                {/* features */}
                <div className="col-12">
                  <div className="input-group mb-4">
                    <label>Features</label>

                    <div className="input-group">
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Features"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (e.target.value.trim() === "") {
                              return;
                            }
                            var x = product.features;
                            x.push(e.target.value);
                            setProduct({ ...product, features: x });
                            e.target.value = "";
                          }
                        }}
                        onBlur={(e) => {
                          e.preventDefault();
                          if (e.target.value.trim() === "") {
                            return;
                          }
                          var x = product.features;
                          x.push(e.target.value);
                          setProduct({ ...product, features: x });
                          e.target.value = "";
                        }}
                      />
                    </div>
                    <div className="row m-0 p-0">
                      {product.features &&
                        product.features.map((f, i) => {
                          return (
                            <div
                              className="row m-1 p-0 justify-content-center align-items-center border rounded"
                              key={i}
                            >
                              <div className="p col p-2">{f}</div>
                              <div
                                style={{
                                  width: "2rem",
                                }}
                                onClick={() => {
                                  var x = product.features;
                                  x.splice(i, 1);
                                  setProduct({
                                    ...product,
                                    features: x,
                                  });
                                }}
                              >
                                <svg
                                  viewBox="0 0 16 16"
                                  className="bi bi-x  h-100 w-100"
                                  fill="#E21717"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                  />
                                </svg>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/* tags */}
                <div className="col-12">
                  <div className="input-group mb-4">
                    <label>Tags</label>
                    <div className="input-group">
                      <input
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (e.target.value.trim() === "") {
                              return;
                            }
                            var x = product.tags;
                            x.push(e.target.value);
                            setProduct({ ...product, tags: x });
                            e.target.value = "";
                          }
                        }}
                        type="text"
                        className="form-control"
                        placeholder="tag"
                        onBlur={(e) => {
                          e.preventDefault();
                          if (e.target.value.trim() === "") {
                            return;
                          }
                          var x = product.tags;
                          x.push(e.target.value);
                          setProduct({ ...product, tags: x });
                          e.target.value = "";
                        }}
                      />
                    </div>
                    <div className="row m-0 p-0">
                      {product.tags &&
                        product.tags.map((t, i) => {
                          return (
                            <div
                              className="row m-1 p-0 justify-content-center align-items-center border rounded"
                              key={i}
                            >
                              <div className="p col p-2">{t}</div>
                              <div
                                style={{
                                  width: "2rem",
                                }}
                                onClick={() => {
                                  var x = product.tags;
                                  x.splice(i, 1);
                                  setProduct({
                                    ...product,
                                    tags: x,
                                  });
                                }}
                              >
                                <svg
                                  viewBox="0 0 16 16"
                                  className="bi bi-x  h-100 w-100"
                                  fill="#E21717"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                  />
                                </svg>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                {/* images */}
                <div className="col-12">
                  {product._id && (
                    <div className="col m-0 p-0 mb-4">
                      <div className="input-group">
                        <label>Images</label>
                        <div className="input-group">
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              accept="image/png,image/gif,image/jpeg"
                              id="fileInput"
                              onChange={(e) => {
                                if (!e.target.files[0]) {
                                  return;
                                }
                                if (e.target.files[0].size > 2097152) {
                                  alert("File size cannot be more than 2mb.");
                                  return;
                                }
                                document.getElementById(
                                  "fileStatus"
                                ).innerText = "Uploading File...";
                                document.getElementById("fileLabel").innerText =
                                  e.target.files[0].name;
                                var formData = new FormData();
                                formData.set("file", e.target.files[0]);
                                formData.set("for", "product");
                                formData.set("forId", product._id);
                                uploadFile(formData).then((res) => {
                                  if (res.status === 0) {
                                    alert(res.error);
                                  } else {
                                    document.getElementById(
                                      "fileStatus"
                                    ).innerText = "File Uploaded Successfully";
                                    var x = product.images;
                                    x.push(res);
                                    setProduct({ ...product, images: x });
                                  }
                                });
                              }}
                            />
                            <label
                              className="custom-file-label"
                              style={{ overflow: "hidden" }}
                              id="fileLabel"
                            >
                              Choose file
                            </label>
                          </div>
                        </div>
                        <p id="fileStatus"> </p>
                      </div>
                      <div className="row m-0 p-0 ">
                        {product.images &&
                          product.images.map((img, i) => {
                            return (
                              <div
                                className="align-items-center m-1"
                                style={{ position: "relative" }}
                                key={i}
                              >
                                <img
                                  src={API + "filesync?fileId=" + img._id}
                                  alt=""
                                  className="border rounded p-2"
                                  style={{ maxWidth: "14rem" }}
                                />
                                <div
                                  style={{
                                    width: "2rem",
                                    zIndex: 1,
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                  }}
                                  onClick={() => {
                                    var x = product.images;
                                    x.splice(i, 1);
                                    setProduct({
                                      ...product,
                                      images: x,
                                    });
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 16 16"
                                    className="bi bi-x  h-100 w-100"
                                    fill="#E21717"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )}
                </div>
                {/* validation and save btn */}
                <div
                  className="btn col-4 border"
                  onClick={(e) => {
                    if (product.name.trim() === "") {
                      alert("Please enter a name");
                      return;
                    }
                    if (product.stocks[0] === undefined) {
                      alert("Please add a stock");
                      return;
                    }
                    if (!parseFloat(product.stocks[0].sellPrice)) {
                      alert("Please enter valid SELL PRICE.");
                      return;
                    }
                    if (!parseFloat(product.stocks[0].mrp)) {
                      alert("Please enter valid MRP.");
                      return;
                    }

                    if (!product._id) {
                      delete product._id;
                      delete product.images;
                      addProduct(product).then((res) => {
                        if (res.status === 0) {
                          alert(res.error);
                        } else {
                          setProduct(res);
                          alert("Product added successfully");
                          loadProducts(pageView.subCategory);
                        }
                      });
                    } else {
                      updateProduct(product).then((res) => {
                        if (res.status === 0) {
                          alert(res.error);
                        } else {
                          alert("Product updated successfully");
                          document.location.reload();
                        }
                      });
                    }
                  }}
                >
                  {product._id ? "Update" : "Add"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="modals">
        <div
          className="modal fade"
          id="categoryModel"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="categoryModelLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="categoryModelLabel">
                  Add New Category
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-4">
                  <input
                    id="cateName"
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                  />
                </div>
                <div className="input-group mb-4">
                  <textarea
                    id="cateDsc"
                    className="form-control"
                    placeholder="Category Description"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    var category = {
                      name: document.getElementById("cateName").value.trim(),
                      dsc: document.getElementById("cateDsc").value.trim(),
                    };
                    if (category.name === "") {
                      alert("Enter Category Name");
                      return;
                    }
                    addCategory(category).then((res) => {
                      if (res.status === 0) {
                        alert(res.error);
                        return;
                      }
                      alert("Category Added.");
                      document.getElementById("cateName").value = "";
                      document.getElementById("cateDsc").value = "";
                      loadCategories();
                    });
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="subCategoryModel"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="subCategoryModelLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="subCategoryModelLabel">
                  Add New Sub Category
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sub Category Name"
                    id="scateName"
                  />
                </div>
                <div className="input-group mb-4">
                  <textarea
                    className="form-control"
                    placeholder="Sub Category Description"
                    id="scateDsc"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    var scategory = {
                      name: document.getElementById("scateName").value.trim(),
                      dsc: document.getElementById("scateDsc").value.trim(),
                      category: pageView.category,
                    };
                    if (scategory.name === "") {
                      alert("Enter Category Name");
                      return;
                    }
                    addSubCategory(scategory).then((res) => {
                      if (res.status === 0) {
                        alert(res.error);
                        return;
                      }
                      alert("Sub Category Added.");
                      document.getElementById("scateName").value = "";
                      document.getElementById("scateDsc").value = "";
                      loadSubCategories(pageView.category);
                    });
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
