// import * as React from 'react';
import React, {  useState, useEffect, Component } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue, GridToolbar } from '@mui/x-data-grid';
import {useGridApiRef, useKeepGroupedColumnsHidden} from '@mui/x-data-grid-premium';
import axios from "axios";
// import Button from '@mui/material/Button';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ConstructionOutlined, Email } from '@mui/icons-material';

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

const dialog_styles = {
  dialogPaper: {
      minHeight: '80vh',
      maxHeight: '80vh',
  },
};


export default function EventDisplayer() {
  const [data, setData] = useState([]);
  const [attendeeData, setAttendee] = useState([]);

  function findId(id) {
    console.log("DATA RN: ");
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        if (data[i]._id == id) {
            return(data[i]);
        }
    }
  }
  
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }
    const configuration = {
      method: "post",
      url: "https://yellow-campus-discovery-app.herokuapp.com/deleteEvent",
      data: {
          id: id,
      }
    };
  console.log("CURRENT HOST:" + localStorage.getItem("user") )
  JSON.parse(localStorage.getItem("user"))
  
  console.log(JSON.parse(localStorage.getItem("user")));
  // make the API call
  axios(configuration)
  .then((result) => {
      console.log("yes");
      console.log(result);
      // rows = result.data;
      // console.log(rows);
      // setLoaded(true);
      console.log("DONEEEEE");
  })
  .catch((error) => {
      console.info(error);
  }).finally(() => {
    getData();
  });
  };

  const handleDeleteAttendee = (id, type, email) => {
    console.log("BEFORE DATA");
    console.log(attendeeData);
    console.log(type);
    if (confirm('Are you sure you want to delete this user?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }
    var configuration = {};
    if(type == "Attending"){
      console.log("ATTENDING POST");
      configuration = {
        method: "post",
        url: "https://yellow-campus-discovery-app.herokuapp.com/deleteAttendee",
        data: {
            id: id,
            attendee_email: email,
        }
      };
    }else if(type == "Maybe Attending"){
      configuration = {
        method: "post",
        url: "https://yellow-campus-discovery-app.herokuapp.com/deleteMaybe",
        data: {
            id: id,
            attendee_email: email,
        }
      };
    }else{
      configuration = {
        method: "post",
        url: "https://yellow-campus-discovery-app.herokuapp.com/deleteInvited",
        data: {
            id: id,
            attendee_email: email,
        }
      };
    }
     
  // make the API call
  axios(configuration)
  .then((result) => {
      console.log("yes");
      console.log(result);
      // rows = result.data;
      // console.log(rows);
      // setLoaded(true);
      console.log("DONEEEEE");
  })
  .catch((error) => {
      console.info(error);
  }).finally(() => {
  });

  configuration = {
    method: "post",
    url: "https://yellow-campus-discovery-app.herokuapp.com/deleteInvited",
    data: {
        id: id,
        attendee_email: email,
    }
  };
  // make the API call
  axios(configuration)
  .then((result) => {
      console.log("yes");
      console.log(result);
      // rows = result.data;
      // console.log(rows);
      // setLoaded(true);
      console.log("DONEEEEE");
      getData().then(generateAttendeeData(id));
  })
  .catch((error) => {
      console.info(error);
  }).finally(() => {
    console.log("AFTER DATA");
    console.log(attendeeData);
  });
  
  };
  
  async function generateAttendeeData(id){
    var row = await findId(id);
    console.log("ROW: ");
    console.log(row);
    var d = [];
    var included = new Set();
    for(var i = 0; i < row.attendees.length; i++){
      d.push({
        email: row.attendees[i],
        type: "Attending",
      });
      included.add(row.attendees[i]);
    }
    for(var i = 0; i < row.maybe.length; i++){
      d.push({
        email: row.maybe[i],
        type: "Maybe Attending",
      });
      included.add(row.maybe[i]);
    }
    for(var i = 0; i < row.invited.length; i++){
      if(included.has(row.invited[i])){
        continue;
      }
      d.push({
        email: row.invited[i],
        type: "Invited",
      });
    }
    console.log("DATA GENERATED: ");
    console.log(d);
    setAttendee(d);
  }

  var attendee_columns = [
    { field: 'email', headerName: 'User Email', width: 200 },
    { field: 'type', headerName: 'Registration Type', width: 200 },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          // localStorage.setItem("eventID", JSON.stringify(params.id));

          handleDeleteAttendee(JSON.parse(localStorage.getItem("eventID")), params.getValue(params.id, "type"), params.getValue(params.id, "email"));
          e.stopPropagation(); // don't select this row after clicking'
          getData().then(generateAttendeeData(JSON.parse(localStorage.getItem("eventID"))));
          return;
        };
  
        return <Button onClick={onClick}>Del</Button>;
      }
    },
  ];

  var columns = [
    { field: 'title', headerName: 'Event Title', width: 200 },
    { field: 'location', headerName: 'Location', width: 120 },
    {
      field: "attendees",
      width: 120,
      headerName: "Attendees",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const [open, setOpen] = React.useState(false);
        var thisRow = {};
        const handleClickOpen = (e) => {
          generateAttendeeData(params.id);
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
          localStorage.setItem("eventID", JSON.stringify(params.id));
          setOpen(true);
        };
  
        const handleClose = () => {
          setOpen(false);
        };
        return (
          <>
            <Button onClick={handleClickOpen}>View</Button>
            <Dialog
              PaperProps={{
                sx: {
                  width: "100%",
                  height: "80%",
                  maxheight: 900
                }
              }}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Attendees:
              </DialogTitle>
              <DialogContent>
              <div style={{ 
                height: '100%',
                width: '100%', 
                margin: 'auto'}}>
                <DataGrid
                  rows={attendeeData}
                  columns={attendee_columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row.email}
                />
              </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Exit</Button>
              </DialogActions>
            </Dialog>
          </>
        );
      }
    },
    {
      field: "invite",
      headerName: "Invite",
      sortable: false,
      filterable: false,
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
          window.location.href='/InviteAttendees';
          return;
          // return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Invite</Button>;
        // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
      }
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      filterable: false,
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
      filterable: false,
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
          handleDelete(params.id);
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
      filterable: false,
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
                  {`End Time: ${JSON.parse(localStorage.getItem("rowData")).end_time}`}
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
  //const apiRef = useGridApiRef();
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
  // useEffect(() => {
  //   getData();
  // }, []);
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
        height: 700, 
        width: '75%', 
        margin: 'auto'}}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </>
  );
}