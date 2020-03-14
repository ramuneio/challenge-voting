import React, { useReducer, useEffect } from "react";
import axios from "axios";
import ProductsListItem from "./ProductsListItem";
import { productsApiRoutes } from "./products-config";
import reducer, { initialState, actionTypes } from "./products-reducer";
import FlipMove from "react-flip-move";
import Loading from "../components/loading/LoadingCubes";

function ProductsList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchAllProducts() {
      dispatch({ type: actionTypes.loadAll });
      const { data } = await axios.get(productsApiRoutes.all());
      dispatch({
        type: actionTypes.loadAllCompleted,
        products: data.products
      });
    }
    fetchAllProducts();
  }, []);

  async function vote(id) {
    dispatch({ type: actionTypes.vote, id });
    const { data } = await axios.put(productsApiRoutes.vote(id));
    const { votes } = data;
    dispatch({ type: actionTypes.voteCompleted, id, votes });
  }

  const { products, isLoading, error } = state;

  return (
    <>
      {isLoading && (
        <span className="Products-list-loading">
          <Loading />
        </span>
      )}
      {error && <span>error</span>}
      {Array.isArray(products) && (
        <FlipMove
          typeName="ol"
          data-testid="products-list"
          enterAnimation="fade"
          leaveAnimation="fade"
        >
          {products.map(p => {
            return (
              <ProductsListItem
                key={p.id}
                id={p.id}
                url={p.url}
                title={p.title}
                description={p.description}
                votes={p.votes}
                productImageUrl={p.productImageUrl}
                submitterAvatarUrl={p.submitterAvatarUrl}
                isLoading={p.isLoading}
                onVote={vote}
              />
            );
          })}
        </FlipMove>
      )}
    </>
  );
}

export default ProductsList;
