import * as React from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { Component } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Switch, Route, useHistory, Link, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const options = {
  filterType: "textField",
  selectableRows: false,
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      open: false,
      selected_user_id: null,
      deleteModalOpen: false,
      columns: [
        {
          name: "#",
          options: {
            filter: false,
          },
        },
        "Title",
        {
          name: "Post Details",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <Link to={"/posts/" + value}>
                    <Tooltip title="View Post Details" placement="top">
                      <IconButton aria-label="View">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </div>
              );
            },
          },
        },
      ],
      loader: false,
      isCreateButtonClicked: false,
    };
  }

  componentDidMount() {
    this.setState({ loader: true });
    const user_id = this.props.match.params.user_id;
    axios({
      url: "https://jsonplaceholder.typicode.com/posts?userId=" + user_id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then(
      function (res) {
        console.log(res.data);
        let response = res.data;
        let tempRows = [...this.state.rows];
        for (let i = 0; i < response.length; i++) {
          tempRows.push([i + 1, response[i]["title"], response[i]["id"]]);
        }
        this.setState({ rows: tempRows });
        this.setState({ loader: false });
      }.bind(this)
    );
  }

  render() {
    return (
      <Container>
        <NotificationContainer />

        <div style={{ marginTop: "15px" }}>
          <MUIDataTable
            title={"Posts"}
            data={this.state.rows}
            columns={this.state.columns}
            options={options}
          />
        </div>

        <div>
          <Backdrop
            open={this.state.loader}
            style={{ zIndex: 1000, color: "#fff" }}
          >
            <CircularProgress color="primary" />
          </Backdrop>
        </div>
      </Container>
    );
  }
}
export default withRouter(Posts);
