// import * as React from 'react';
import React, {  useState, useEffect, Component } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import {useGridApiRef, useKeepGroupedColumnsHidden} from '@mui/x-data-grid-premium';
import axios from "axios";
// import Button from '@mui/material/Button';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ConstructionOutlined, JavascriptOutlined } from '@mui/icons-material';

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

export default function EventDisplayerStudent() {
  //const apiRef = useGridApiRef();
  const [attending, setAttending] = useState([]);
  const [maybe, setMaybe] = useState([]);

  function findId(data, id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]._id == id) {
            return(data[i]);
        }
    }
  }

  const handleRSVP = (id) => {
    if (confirm('Are you sure you want to attend?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }

    var configuration = {
        method: "post",
        url: "https://yellow-campus-discovery-app.herokuapp.com/deleteMaybe",
        data: {
            id: id,
            attendee_email: JSON.parse(localStorage.getItem("user")),
        }
      };
    
      console.log(JSON.parse(localStorage.getItem("user")));
      // make the API call
      axios(configuration)
        .then((result) => {
            console.log("yes");
            console.log(result);
            console.log("DONEEEEE");
            if(result.data.modifiedCount == 0){
              return;
            }
        })
        .catch((error) => {
            console.info(error);
        }).finally(() => {
          configuration = {
            method: "post",
            url: "https://yellow-campus-discovery-app.herokuapp.com/addAttendee",
            data: {
                id: id,
                attendee_email: JSON.parse(localStorage.getItem("user")),
            }
          };
        
          console.log(JSON.parse(localStorage.getItem("user")));
          // make the API call
          axios(configuration)
            .then((result) => {
                console.log("yes");
                console.log(result);
                console.log("DONEEEEE");
            })
            .catch((error) => {
                console.info(error);
            }).finally(() => {
              getData();
          });
      });
  };

  const handleMaybe = (id) => {
    if (confirm('Are you sure you want to set status to maybe?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }
    var configuration = {
        method: "post",
        url: "https://yellow-campus-discovery-app.herokuapp.com/deleteAttendee",
        data: {
            id: id,
            attendee_email: JSON.parse(localStorage.getItem("user")),
        }
      };
    
      console.log(JSON.parse(localStorage.getItem("user")));
      // make the API call
      axios(configuration)
        .then((result) => {
            console.log("yes");
            console.log(result);
            console.log("DONEEEEE");
            if(result.data.modifiedCount == 0){
              return;
            }
        })
        .catch((error) => {
            console.info(error);
        }).finally(() => {
          configuration = {
            method: "post",
            url: "https://yellow-campus-discovery-app.herokuapp.com/addMaybe",
            data: {
                id: id,
                attendee_email: JSON.parse(localStorage.getItem("user")),
            }
          };
        
          console.log(JSON.parse(localStorage.getItem("user")));
          // make the API call
          axios(configuration)
            .then((result) => {
                console.log("yes");
                console.log(result);
                console.log("DONEEEEE");
            })
            .catch((error) => {
                console.info(error);
            }).finally(() => {
              getData();
          });
      });
  };

  const handleDeleteMaybe = (id) => {
    if (confirm('Are you sure you want to delete this registration?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }
    const configuration = {
      method: "post",
      url: "https://yellow-campus-discovery-app.herokuapp.com/deleteMaybe",
      data: {
          id: id,
          attendee_email: JSON.parse(localStorage.getItem("user")),
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
      console.log("DONEEEEE");
  })
  .catch((error) => {
      console.info(error);
  }).finally(() => {
    getData();
  });
  };

  const handleDeleteAttending = (id) => {
    if (confirm('Are you sure you want to delete this registration?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }
    const configuration = {
      method: "post",
      url: "https://yellow-campus-discovery-app.herokuapp.com/deleteAttendee",
      data: {
          id: id,
          attendee_email: JSON.parse(localStorage.getItem("user")),
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
      console.log("DONEEEEE");
  })
  .catch((error) => {
      console.info(error);
  }).finally(() => {
    getData();
  });
  };

  var columns = [
    { field: 'title', headerName: 'Event Title', width: 100 },
    { field: 'num_attendees', headerName: 'Number Registered', width: 150 },
    { field: 'max_attendees', headerName: 'Max Capacity', width: 100 },
    {
      field: "maybe",
      headerName: "Maybe",
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
          handleMaybe(params.id);
          return;
          // return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Maybe</Button>;
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
          handleDeleteAttending(params.id);
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
          thisRow = findId(attending, params.id);
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
  var columns2 = [
    { field: 'title', headerName: 'Event Title', width: 100 },
    { field: 'num_attendees', headerName: 'Number Registered', width: 150 },
    { field: 'max_attendees', headerName: 'Max Capacity', width: 100 },
    {
      field: "RSVP",
      headerName: "RSVP",
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
          handleRSVP(params.id);
          return;
          // return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>RSVP</Button>;
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
          handleDeleteMaybe(params.id);
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
          thisRow = findId(maybe, params.id);
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
      url: "http://localhost:3000/returnJoinedEvent",
      data: {
        user: JSON.parse(localStorage.getItem("user")),
      }
      };
  console.log("CURRENT USER:" + localStorage.getItem("user") )
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
      var r = result.data;
      console.log(r);
      console.log(attending);
      for(var i = 0; i < r.length; i++){
        r[i]["num_attendees"] = r[i].attendees.length + r[i].maybe.length;
      }
      setAttending(r);
      // setAttending(result.data);
  })
  .catch((error) => {
      console.info(error);
      setError(error);
  }).finally(() => {
    console.log("COMPUTED SHIT: ");
    // setLoading(false);
  });

  const configuration2 = {
    method: "post",
    url: "http://localhost:3000/returnMaybeEvent",
    data: {
      user: JSON.parse(localStorage.getItem("user")),
    }
    };
console.log("CURRENT HOST:" + localStorage.getItem("user") )
JSON.parse(localStorage.getItem("user"))

console.log(JSON.parse(localStorage.getItem("user")));
// make the API call
let r2 = await axios(configuration2)
.then((result) => {
    console.log("yes");
    console.log(result);
    // rows = result.data;
    // console.log(rows);
    // setLoaded(true);
    console.log("DONEEEEE2222222222");
    // console.log(rows);
    var r = result.data;
    for(var i = 0; i < r.length; i++){
      r[i]["num_attendees"] = r[i].attendees.length + r[i].maybe.length;
    }
    setMaybe(r);
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
      <div style={{ height: 400, width: '100%' }}>
        <p>Attending Events:</p>
        <DataGrid
          rows={attending}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
        />
        <p>Maybe Attending Events:</p>
        <DataGrid
          rows={maybe}
          columns={columns2}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
        />
      </div>
    </>
  );
}