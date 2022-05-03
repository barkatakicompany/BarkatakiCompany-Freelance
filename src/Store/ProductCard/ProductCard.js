import React from "react";
import { API } from "../../backend";
import "./productCard.css";
const ProductCard = ({ product, className }) => {
  return (
    <a
      href={`/store/product/${product.name.replace("/", "")}/${product._id}`}
      className={className + " w-100 h-100"}
      style={{
        textDecoration: "none",
      }}
    >
      <div className="p-0 m-0 h-100 w-100">
        <div className="border rounded shadow" style={{  minHeight:  "7rem"  }}>
          {product.images[0] ? (
            <img
              src={`${API}/filesync?fileId=${product.images[0]._id}`}
              alt={product.images[0].name}
              className="h-100 w-100 rounded"
            />
          ) : (
            <div className=""></div>
          )}

          {product.images.length > 0 &&
            product.stocks[0] &&
            product.stocks[0].mrp > product.stocks[0].sellPrice && (
              <div className="disc-text">
                {Math.floor(
                  100 -
                    (product.stocks[0].sellPrice / product.stocks[0].mrp) * 100
                )}
                % OFF
              </div>
            )}
        </div>
        <div className="mx-2 mt-3 scroll-1-line hide-scrollbar">{product.name}</div>
        <div className="mx-2 scroll-1-line hide-scrollbar">
          ₹{product.stocks[0].sellPrice.toFixed(2)}
        </div>
      </div>
    </a>
  );
};
export default ProductCard;
