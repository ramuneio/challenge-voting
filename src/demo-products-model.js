// This file is for demo purposes only act as a demo api.
import products from "./assets/products.json";

function generateVoteCount() {
  return Math.floor(Math.random() * 50 + 15);
}

products.forEach(p => {
  p.votes = generateVoteCount();
});

export function incrementVotes(productId) {
  let product = products.find(p => String(p.id) === String(productId));
  if (product) {
    product.votes += 1;
  }
  return product;
}

export default products;
