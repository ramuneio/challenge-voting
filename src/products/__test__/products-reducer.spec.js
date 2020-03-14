import reducer, { actions, actionTypes } from "../products-reducer";

describe("Products reduce", () => {
  it("reducer should throw error if unknown action type", () => {
    expect(() => reducer({}, { type: "ライス" })).toThrow(
      new Error(`unknown action type: ライス`)
    );
  });

  it("vote should increase the vote count for the correct product", () => {
    const state = {
      products: [
        { id: 1, votes: 10 },
        { id: 2, votes: 20 }
      ]
    };

    const action = {
      type: actionTypes.voteCompleted,
      id: 1,
      votes: 1111
    };

    const { products } = reducer(state, action);

    expect(products.find(p => p.id === action.id).votes).toEqual(action.votes);
  });
});
