import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./modules/home/Home";

ReactDOM.render(<Home/>, document.getElementById('root'));
