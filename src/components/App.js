import React from "react";
import Header from "./Header.js";
import Order from "./Order.js";
import Inventory from "./Inventory.js";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish.js";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    let { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = fish => {
    //1. take a copy of the exsiting state(so you never mutate)
    let fishes = { ...this.state.fishes }; //spread operator
    //2. Add our new fish to that fishes variable(using timestamp for unique key)
    fishes[`fish${Date.now()}`] = fish; //fish object from AddFishForm
    //3. set the new fishes object to this.state. Will take copied old fishes + our new fish and overwrite the existing state.
    this.setState({
      fishes: fishes
    });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    //1. take a copy of this.state.
    let order = { ...this.state.order };
    //2. either add to the order or update the number in our order
    order[key] = order.fish1 + 1 || 1;
    //3. calll setState to update our state object
    this.setState({ order });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes" />
          {/*transforms object*/}
          {Object.keys(this.state.fishes).map(key => (
            <Fish
              key={key}
              index={key}
              details={this.state.fishes[key]}
              addToOrder={this.addToOrder}
            />
          ))}
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
