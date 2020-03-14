import "./ProductListItem.css";
import React, { Component } from "react";
import buttonIcon from "../assets/img/arrow.png";
import Loading from "../components/loading/LoadingArrows";

class ProductsListItem extends Component {
  render() {
    const {
      id,
      url,
      title,
      description,
      votes,
      productImageUrl,
      submitterAvatarUrl,
      onVote,
      isLoading
    } = this.props;

    return (
      <li data-testid={`product-li-${id}`} className="ProductListItem flex-r">
        <img
          alt="product image"
          className="ProductListItem-product-img"
          src={productImageUrl}
        />
        <div className="flex-r">
          <div className="ProductListItem-button-container">
            {isLoading && <Loading />}
            {!isLoading && (
              <button
                data-testid={`product-li-button-${id}`}
                disabled={isLoading}
                onClick={() => onVote(id)}
              >
                <img alt="vote button icon" src={buttonIcon} />
              </button>
            )}
          </div>
          <strong data-testid={`product-li-votes-${id}`}>{votes}</strong>
        </div>
        <h1 className="txt-truncated">
          <a href={url}>{title}</a>
        </h1>
        <p className="txt-truncated">{description}</p>
        <div className="flex-r-ai--cen">
          <h2>Submitted by:</h2>
          <img
            alt="submitter image"
            className="ProductListItem-submitter-img"
            src={submitterAvatarUrl}
          />
        </div>
      </li>
    );
  }
}
export default ProductsListItem;
