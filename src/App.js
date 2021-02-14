import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import FetchUsers from "./Pages/FetchUsers";
import Posts from "./Pages/Posts";

import PostDetails from "./Pages/PostDetails";

import "react-notifications/lib/notifications.css";
import "react-datetime/css/react-datetime.css";
import "./datepicker.css";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={FetchUsers} />
      <Route path="/users/:user_id" component={Posts} />
      <Route path="/posts/:post_id" component={PostDetails} />
      <Route path="*" render={() => "Not Found!"} />
    </Switch>
  );
}

export default App;
