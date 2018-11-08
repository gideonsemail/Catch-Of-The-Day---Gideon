import React from "react";
import { getFunName } from "/Users/admin/Dropbox/Wes Bos Courses/React-For-Beginners-Starter-Files-master/catch-of-the-day/src/helpers.js";

class StorePicker extends React.Component {
  myInput = React.createRef();
  goToStore = event => {
    event.preventDefault();
    let storeName = this.myInput.value.value;
    this.props.history.push(`/store/${storeName}`);
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

export default StorePicker;
