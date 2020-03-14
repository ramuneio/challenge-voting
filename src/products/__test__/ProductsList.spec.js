import ProductsList from "../ProductsList";
import axios from "axios";
import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";

describe("ProductsList", () => {
  it("The vote count changes on button click", async () => {
    const fakeProducts = getFakeProducts();
    const [selectedProduct] = fakeProducts.products;
    const { id, votes } = selectedProduct;

    axios.get.mockResolvedValueOnce({
      data: fakeProducts
    });
    axios.put.mockResolvedValueOnce({
      data: {
        ...selectedProduct,
        votes: votes + 1
      }
    });

    const { getByTestId } = render(<ProductsList />);

    const button = await waitForElement(() =>
      getByTestId(`product-li-button-${id}`)
    );

    fireEvent.click(button);

    const updatedVotes = await waitForElement(() =>
      getByTestId(`product-li-votes-${id}`)
    );

    expect(Number(updatedVotes.innerHTML)).toBe(votes + 1);
  });
});

function getFakeProducts() {
  return {
    products: [
      {
        id: 1,
        title: "Yellow Pail",
        description: "On-demand sand castle construction expertise.",
        url: "#",
        votes: 17,
        submitterAvatarUrl: "images/avatars/daniel.jpg",
        productImageUrl: "images/products/image-aqua.png"
      },
      {
        id: 2,
        title: "Supermajority: The Fantasy Congress League",
        description:
          "Earn points when your favorite politicians pass legislation.",
        url: "#",
        votes: 36,
        submitterAvatarUrl: "images/avatars/kristy.png",
        productImageUrl: "images/products/image-rose.png"
      },
      {
        id: 3,
        title: "Tinfoild: Tailored tinfoil hats",
        description: "We already have your measurements and shipping address.",
        url: "#",
        votes: 23,
        submitterAvatarUrl: "images/avatars/veronika.jpg",
        productImageUrl: "images/products/image-steel.png"
      },
      {
        id: 4,
        title: "Haught or Naught",
        description: "High-minded or absent-minded? You decide.",
        url: "#",
        votes: 39,
        submitterAvatarUrl: "images/avatars/molly.png",
        productImageUrl: "images/products/image-yellow.png"
      }
    ]
  };
}
