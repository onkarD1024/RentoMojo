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
import { Switch, Route, useHistory, Link, withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Store_User_Id } from "../redux/actions/User";
import { connect } from "react-redux";
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

class FetchUsers extends Component {
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
        "Name",
        "Company",
        {
          name: "Blog Posts",
          options: {
            filter: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <div>
                  <Link to={"/users/" + value}>
                    <Tooltip title="View Posts" placement="top">
                      <IconButton
                        aria-label="View"
                        onClick={() => {
                          this.props.Store_User_Id({ user_id: value });
                          this.props.history.push("/users/" + value);
                        }}
                      >
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
    axios({
      url: "https://jsonplaceholder.typicode.com/users",
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
          tempRows.push([
            i + 1,
            response[i]["name"],
            response[i]["company"]["name"],
            response[i]["id"],
          ]);
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
            title={"Users"}
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
export default withRouter(connect(null, { Store_User_Id })(FetchUsers));
