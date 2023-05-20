import ReactDOM from "react-dom/client";
import axios from "axios";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./style/index.css";
import { interceptor } from "./util/interceptor";

import store from "./store";
import Main from "./component";

interceptor(axios);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  </Provider>
);
