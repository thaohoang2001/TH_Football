import "./tableDataChildPitch.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

const TableDataChildPitch = ({ columns, params }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const { data } = useFetch(`/${path}`);
  const { pitchId } = useParams();
  const [idDelete, setidDelete] = useState(null);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      if (idDelete) {
        const resp = await axios.delete(`/${path}/${id}/${pitchId}`);
        if (resp) {
          handleClose();
          reFetch();
        }
      }
      // setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const reFetch = async () => {
    try {
      const res = await axios.get(path);
      setList(res.data);
    } catch (err) {
      throw err;
    }
  };

  const handleClickOpen = (idRow) => {
    setOpen(true);
    setidDelete(idRow);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/update/${params?.id} `}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              // onClick={() => handleClickOpen(params.row._id)}
              onClick= {() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  if (!list) {
    return <>Loading</>;
  }

  return (
    <div className="TableData">
      <div className="TableDataTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Dialog when to use Delete!!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableDataChildPitch;
