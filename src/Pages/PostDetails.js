import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Switch, Route, useHistory, Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Pagination from "@material-ui/lab/Pagination";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    flexGrow: 1,
  },
  breadCrumbLinks: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  fab: {
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "100px",
    left: "auto",
    position: "fixed",
    background: "black",
  },
  filter: {
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed",
    background: "black",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function PostDetails(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loader, setLoader] = React.useState(false);
  const [comments, setComments] = React.useState([
    {
      name: "",
      body: "",
    },
  ]);
  const [post, setPost] = React.useState([
    {
      title: "",
      body: "",
    },
  ]);
  let { post_id } = useParams();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  useEffect(() => {
    setLoader(true);

    axios({
      url: "https://jsonplaceholder.typicode.com/posts/" + post_id,
      method: "GET",
    }).then(function (res) {
      let response = res.data;
      setPost(response);
      setLoader(false);
    });
  }, []);

  return (
    <Container>
      <Grid container justify="center">
        <h1>Post Details</h1>
        <NotificationContainer />

        <Grid container spacing={3} style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={12}>
            <Card className={classes.root}>
              <CardHeader title={"Title: " + post.title} />
              <CardContent style={{ minHeight: "210px" }}>
                <Typography variant="body2" color="textSecondary" component="p">
                  <Grid container>
                    <Grid item>
                      <h4>Body : {post.body}</h4>
                      <span
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "blue",
                        }}
                        onClick={() => {
                          fetchComments();
                        }}
                      >
                        Load Comments
                      </span>
                      {comments.map(function (comment) {
                        return (
                          <div>
                            <p>
                              <b>{comment.name}</b>
                            </p>
                            <p>
                              <i>{comment.body}</i>
                            </p>
                            <br />
                            <br />
                          </div>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Grid container justify="center">
                  <Grid item>
                    <IconButton
                      style={{
                        background: "#20201F",
                      }}
                      onClick={() => {
                        setDeleteModalOpen(true);
                      }}
                    >
                      <DeleteIcon style={{ fill: "#fff" }} />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        <div>
          <Backdrop open={loader} style={{ zIndex: 1000, color: "#fff" }}>
            <CircularProgress color="primary" />
          </Backdrop>
        </div>

        <Dialog
          open={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ color: "#fff", background: "black" }}
          >
            {" "}
            ARE YOU SURE YOU WANT TO DELETE THIS POST ?{" "}
          </DialogTitle>
          <DialogContent style={{ color: "#fff", background: "black" }}>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "#fff" }}
            >
              You won't be able to revert this change!
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ color: "#fff", background: "black" }}>
            <Button
              onClick={() => {
                setDeleteModalOpen(false);
              }}
              color="primary"
            >
              Disagree
            </Button>
            <Button color="primary" onClick={deletePost} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Container>
  );

  function fetchComments() {
    setLoader(true);
    axios({
      url:
        "https://jsonplaceholder.typicode.com/posts/" + post_id + "/comments",
      method: "GET",
    }).then(function (res) {
      let response = res.data;
      setComments(response);
      setLoader(false);
    });
  }

  function deletePost() {
    setLoader(true);
    setDeleteModalOpen(false);

    axios({
      url: "https://jsonplaceholder.typicode.com/posts/" + post_id,
      method: "delete",
    }).then(function (res) {
      setLoader(false);
      NotificationManager.success("", "Post Deleted Successfully.");
      history.push("/users/" + props.data.user_id);
    });
  }
}
const mapStateToProps = (state) => ({
  data: state.users,
});

export default connect(mapStateToProps, null)(PostDetails);
