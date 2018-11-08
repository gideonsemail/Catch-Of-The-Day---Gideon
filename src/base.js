import Rebase from "re-base";
import firebase from "firebase";

let firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBmTXuEDUfsya9dII72pgZVf4M5kNmiAKo",
  authDomain: "cach-of-the-day-e3896.firebaseapp.com",
  databaseURL: "https://cach-of-the-day-e3896.firebaseio.com"
});

let base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is a deafult export
export default base;
