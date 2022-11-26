// import * as React from 'react';
import React, {  useState, useEffect, Component } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import {useGridApiRef, useKeepGroupedColumnsHidden} from '@mui/x-data-grid-premium';
import axios from "axios";
// import Button from '@mui/material/Button';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ConstructionOutlined } from '@mui/icons-material';

var global_data = [];

localStorage.setItem("rowData",
JSON.stringify(
{
  title: "Invite only event",
  host: "b",
  details: "details 14",
  host_email: "host10@gmail.com",
  is_invite_only: true,
  max_attendees: 100,
  location: "location10",
  start_time: "0",
  end_time: "0"
}
));

function findId(id) {
  for (var i = 0; i < global_data.length; i++) {
      if (global_data[i]._id == id) {
          return(global_data[i]);
      }
  }
}

//Issue: not deleting the row from table
const handleDelete = (id) => {
  var new_rows = []
  rows = rows.filter((row) => (row.id != id));
  for(var i = 0; i < rows.length; i++){
      if(rows[i].id != id){
          new_rows.push(rows[i]);
      }
  }
  console.log(new_rows);
  console.log(rows);
  rows = new_rows;
  // console.log(typeof id);
};

var columns = [
  { field: 'title', headerName: 'Event Title', width: 100 },
  { field: 'location', headerName: 'Location', width: 120 },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        var thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        
        thisRow["id"] = params.id;
        localStorage.setItem("eventID", JSON.stringify(params.id));
        window.location.href='/EditEvent';
        return;
        // return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Edit</Button>;
      // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
    }
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        
        thisRow["id"] = params.getValue(params.id, "id");
        handleDelete(thisRow["id"]);
        return;
      };

      return <Button onClick={onClick}>Del</Button>;
    }
  },
  {
    field: "specs",
    width: 80,
    headerName: "Details",
    sortable: false,
    renderCell: (params) => {
      const [open, setOpen] = React.useState(false);
      var thisRow = {};
      const handleClickOpen = (e) => {
        setOpen(true);
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );
        thisRow["id"] = params.getValue(params.id, "id");
        thisRow = findId(params.id);
        localStorage.setItem("rowData", JSON.stringify(thisRow));
        

      };

      const handleClose = () => {
        setOpen(false);
      };
      return (
        <>
          <Button onClick={handleClickOpen}>
            <IconButton>
              <MoreVertIcon/>
            </IconButton>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {JSON.parse(localStorage.getItem("rowData")).title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {`Location: ${JSON.parse(localStorage.getItem("rowData")).location}`}
                <br></br>
                {`Start Time: ${JSON.parse(localStorage.getItem("rowData")).start_time}`}
                <br></br>
                {`Host Email: ${JSON.parse(localStorage.getItem("rowData")).host_email}`}
                <br></br>
                {`Details: ${JSON.parse(localStorage.getItem("rowData")).details}`}
                <br></br>
                {`Guest Capacity: ${JSON.parse(localStorage.getItem("rowData")).max_attendees}`}
                <br></br>
                {`Invite Only: ${JSON.parse(localStorage.getItem("rowData")).is_invite_only}`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Exit</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  },
];

export default function EventDisplayer() {
  //const apiRef = useGridApiRef();
  const [data, setData] = useState(null);
  /*const initialState = useKeepGroupedColumnsHidden({
    //apiRef,
    initialState: {
      ...data.initialState,
      rowGrouping: {
        ...data.initialState?.rowGrouping,
        model: ['commodity'],
      },
      sorting: {
        sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
      },
    },
  });*/
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hmmm

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const configuration = {
      method: "post",
      url: "https://yellow-campus-discovery-app.herokuapp.com/returnHostedEvent",
      data: {
          user: JSON.parse(localStorage.getItem("user")),
      }
      };
  console.log("CURRENT HOST:" + localStorage.getItem("user") )
  JSON.parse(localStorage.getItem("user"))
  
  console.log(JSON.parse(localStorage.getItem("user")));
  // make the API call
  let r = await axios(configuration)
  .then((result) => {
      console.log("yes");
      console.log(result);
      // rows = result.data;
      // console.log(rows);
      // setLoaded(true);
      console.log("DONEEEEE");
      // console.log(rows);
      setData(result.data);
      global_data = result.data;
  })
  .catch((error) => {
      console.info(error);
      setError(error);
  }).finally(() => {
    setLoading(false);
  });
  }

  if (loading) return "Loading...";
  if (error) return "Error!";

  // <pre>{JSON.stringify(data, null, 2)}</pre>
  /*return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          {...data}
          apiRef={apiRef}
          loading={loading}
          disableSelectionOnClick
          initialState={initialState}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </div>
    </>
  )*/
  return (
    <>
      <div style={{ 
        height: 400, 
        width: '50%', 
        margin: 'auto'}}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
        />
      </div>
    </>
  );
}