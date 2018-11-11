import React from "react";
import AddFishForm from "./AddFishForm.js";
import EditFishForm from "./EditFishForm.js";
import Login from "./Login.js";
import firebase from "firebase";
import PropTypes from "prop-types";
import base, { firebaseApp } from "../base.js";

class Inventory extends React.Component {
  static proptypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }
  authHandler = async authData => {
    ///1. look up the current store in the firebase databse
    let store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    //2. claim if there is no owner
    if (!store.owner) {
      //save it as our owner
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    //3. Set the state o the inventory component to relfect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
    console.log(authData);
  };

  authenticate = provider => {
    let authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () => {
    console.log("Logging Out");
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    let logout = <button onClick={this.logout}>Log Out!</button>;

    //1. check if theyre logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    //2. check if theyre the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you're not the owner</p>
          {logout}
        </div>
      );
    }
    //3. They must be the owner, just redner the inventory

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
