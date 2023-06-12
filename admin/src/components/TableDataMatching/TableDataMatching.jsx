import "./tableDataMatching.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
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

const TableDataMatching = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [idDelete, setidDelete] = useState(null);
  const { data } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async () => {
    try {
      if (idDelete) {
        const resp = await axios.delete(`/${path}/${idDelete}`);
        if (resp) {
          handleClose();
          reFetch();
        }
      }
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
            {/* <Link
              to={`/${path}/update/${params?.id} `}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Update</div>
            </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleClickOpen(params.row._id)}
              // onClick={() => handleDelete(params.row._id)}
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
    <div>
      <div className="TableData">

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
    </div>
  );
};

export default TableDataMatching;
