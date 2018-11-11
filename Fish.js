import React from "react";
import { formatPrice } from "../helpers.js";

class Fish extends React.Component {
  render() {
    {
      /*destructuring,avoid writing this.props.etc...*/
    }
    let { image, name, price, desc, status } = this.props.details;
    let isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          {/*convert to cents*/}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add To Order" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
