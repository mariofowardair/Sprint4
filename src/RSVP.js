// import * as React from 'react';
import React, {  useState, useEffect, Component } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
import {useGridApiRef, useKeepGroupedColumnsHidden} from '@mui/x-data-grid-premium';
import axios from "axios";
// import Button from '@mui/material/Button';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ConstructionOutlined } from '@mui/icons-material';

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

export default function RSVP() {
  //const apiRef = useGridApiRef();
  const [allData, setData] = useState([]);
  const [invited, setInvited] = useState([]);

  function findId(data, id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]._id == id) {
            return(data[i]);
        }
    }
  }

  const handleRSVP = (id, dataArray) => {
    if (confirm('Are you sure you want to attend?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }

    var data = findId(dataArray, id);
    var included = false;
    var email = JSON.parse(localStorage.getItem("user"));
    for(var i = 0; i < data.attendees.length; i++){
      if(data.attendees[i] == email){
        return;
      }
    }
    for(var i = 0; i < data.maybe.length; i++){
      if(data.maybe[i] == email){
        included = true;
        break;
      }
    }
    if(data.attendees.length + data.maybe.length >= data.max_attendees && !included){
      alert("ERROR REGISTERING: Max capacity reached for event!");
      return;
    }

    var configuration = {
        method: "post",
        url: "https://yellow-campus-discovery-app.herokuapp.com/deleteMaybe",
        data: {
            id: id,
            attendee_email: email,
        }
      };
    
      console.log(JSON.parse(localStorage.getItem("user")));
      // make the API call
      axios(configuration)
        .then((result) => {
            console.log("yes");
            console.log(result);
            console.log("DONEEEEE");
            console.log("modified COUNT: "+result.data.modifiedCount);
        })
        .catch((error) => {
            console.info(error);
        }).finally(() => {
          configuration = {
            method: "post",
            url: "https://yellow-campus-discovery-app.herokuapp.com/addAttendee",
            data: {
                id: id,
                attendee_email: email,
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

  const handleMaybe = (id, dataArray) => {
    if (confirm('Are you sure you want to set status to maybe?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }
    var data = findId(dataArray, id);
    var included = false;
    var email = JSON.parse(localStorage.getItem("user"));
    for(var i = 0; i < data.maybe.length; i++){
      if(data.maybe[i] == email){
        return;
      }
    }
    for(var i = 0; i < data.attendees.length; i++){
      if(data.attendees[i] == email){
        included = true;
        break;
      }
    }
    if(data.attendees.length + data.maybe.length >= data.max_attendees && !included){
      alert("ERROR REGISTERING: Max capacity reached for event!");
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
            console.log("modified COUNT: "+result.modifiedCount);
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
      getData();
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this invitation?')) {
      // Save it!
      console.log('Thing was saved to the database.');
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
      return;
    }
    var configuration = {
      method: "post",
      url: "https://yellow-campus-discovery-app.herokuapp.com/deleteInvited",
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
  configuration = {
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
configuration = {
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
    { field: 'status', headerName: 'Status', width: 150 },
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
          handleRSVP(params.id, invited);
          return;
          // return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>RSVP</Button>;
        // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
      }
    },
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
          handleMaybe(params.id, invited);
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
          thisRow = findId(invited, params.id);
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
    { field: 'status', headerName: 'Status', width: 150 },
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
          handleRSVP(params.id, allData);
          return;
          // return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>RSVP</Button>;
        // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
      }
    },
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
          handleMaybe(params.id, allData);
          return;
          // return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>Maybe</Button>;
        // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
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
          thisRow = findId(allData, params.id);
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
      url: "http://localhost:3000/returnOpenEvent",
      data: {
      }
      };
  console.log("CURRENT USER:" + localStorage.getItem("user") )
  JSON.parse(localStorage.getItem("user"))
  
  console.log(typeof JSON.parse(localStorage.getItem("user")));
  var user = JSON.parse(localStorage.getItem("user"));
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
      for(var i = 0; i < r.length; i++){
        r[i]["num_attendees"] = r[i].attendees.length + r[i].maybe.length;
        for(var j = 0; j < r[i].attendees.length; j++){
          if(r[i].attendees[j] == user){
            r[i]["status"] = "RSVPed";
          }
        }
        if(r[i]["status"] == "RSVPed"){
          continue;
        }
        for(var j = 0; j < r[i].maybe.length; j++){
          if(r[i].maybe[j] == user){
            r[i]["status"] = "Maybe Attending";
          }
        }
        if(r[i]["status"] == "Maybe Attending"){
          continue;
        }
        r[i]["status"] = "None";
      }
      setData(r);
  })
  .catch((error) => {
      console.info(error);
      setError(error);
  }).finally(() => {
    // setLoading(false);
  });

  const configuration2 = {
    method: "post",
    url: "http://localhost:3000/returnInvitedEvent",
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
    var r = result.data;
      for(var i = 0; i < r.length; i++){
        r[i]["num_attendees"] = r[i].attendees.length + r[i].maybe.length;
        for(var j = 0; j < r[i].attendees.length; j++){
          console.log(r[i][j]);
          if(r[i].attendees[j] == user){
            r[i]["status"] = "RSVPed";
          }
        }
        if(r[i]["status"] == "RSVPed"){
          continue;
        }
        for(var j = 0; j < r[i].maybe.length; j++){
          if(r[i].maybe[j] == user){
            r[i]["status"] = "Maybe Attending";
          }
        }
        if(r[i]["status"] == "Maybe Attending"){
          continue;
        }
        r[i]["status"] = "None";
      }
    setInvited(r);
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
        <p>Invited Events:</p>
        <DataGrid
          rows={invited}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
        />
        <p>Open Events:</p>
        <DataGrid
          rows={allData}
          columns={columns2}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
        />
      </div>
    </>
  );
}
// // import * as React from 'react';
// import React, {  useState, useEffect, Component } from 'react';
// import { DataGrid, GridColDef, GridApi, GridCellValue} from '@mui/x-data-grid';
// import {useGridApiRef, useKeepGroupedColumnsHidden} from '@mui/x-data-grid-premium';
// import axios from "axios";
// // import Button from '@mui/material/Button';
// import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { ConstructionOutlined } from '@mui/icons-material';
// import ErrorIcon from '@mui/icons-material/Error';
// import Tooltip from '@mui/material/Tooltip';

// localStorage.setItem("rowData",
// JSON.stringify(
// {
//   title: "Invite only event",
//   host: "b",
//   details: "details 14",
//   host_email: "host10@gmail.com",
//   is_invite_only: true,
//   max_attendees: 100,
//   location: "location10",
//   start_time: "0",
//   end_time: "0"
// }
// ));

// useEffect(() => {
//   getData();
// }, []);

// export default function RSVP() {
//   //const apiRef = useGridApiRef();
//   const [allData, setData] = useState([]);
//   const [invited, setInvited] = useState([]);

//   function findId(data, id) {
//     for (var i = 0; i < data.length; i++) {
//         if (data[i]._id == id) {
//             return(data[i]);
//         }
//     }
//   }

//   const handleRSVP = (id, dataArray) => {
//     if (confirm('Are you sure you want to attend?')) {
//       // Save it!
//       console.log('Thing was saved to the database.');
//     } else {
//       // Do nothing!
//       console.log('Thing was not saved to the database.');
//       return;
//     }

//     var data = findId(dataArray, id);
//     var included = false;
//     var email = JSON.parse(localStorage.getItem("user"));
//     for(var i = 0; i < data.attendees.length; i++){
//       if(data.attendees[i] == email){
//         return;
//       }
//     }
//     for(var i = 0; i < data.maybe.length; i++){
//       if(data.maybe[i] == email){
//         included = true;
//         break;
//       }
//     }
//     if(data.attendees.length + data.maybe.length >= data.max_attendees && !included){
//       alert("ERROR REGISTERING: Max capacity reached for event!");
//       return;
//     }

//     var configuration = {
//         method: "post",
//         url: "https://yellow-campus-discovery-app.herokuapp.com/deleteMaybe",
//         data: {
//             id: id,
//             attendee_email: email,
//         }
//       };
    
//       console.log(JSON.parse(localStorage.getItem("user")));
//       // make the API call
//       axios(configuration)
//         .then((result) => {
//             console.log("yes");
//             console.log(result);
//             console.log("DONEEEEE");
//             console.log("modified COUNT: "+result.data.modifiedCount);
//         })
//         .catch((error) => {
//             console.info(error);
//         }).finally(() => {
//           configuration = {
//             method: "post",
//             url: "https://yellow-campus-discovery-app.herokuapp.com/addAttendee",
//             data: {
//                 id: id,
//                 attendee_email: email,
//             }
//           };
        
//           console.log(JSON.parse(localStorage.getItem("user")));
//           // make the API call
//           axios(configuration)
//             .then((result) => {
//                 console.log("yes");
//                 console.log(result);
//                 console.log("DONEEEEE");
//             })
//             .catch((error) => {
//                 console.info(error);
//             }).finally(() => {
//               getData();
//           });
//       });
//   };

//   const handleMaybe = (id, dataArray) => {
//     if (confirm('Are you sure you want to set status to maybe?')) {
//       // Save it!
//       console.log('Thing was saved to the database.');
//     } else {
//       // Do nothing!
//       console.log('Thing was not saved to the database.');
//       return;
//     }
//     var data = findId(dataArray, id);
//     var included = false;
//     var email = JSON.parse(localStorage.getItem("user"));
//     for(var i = 0; i < data.maybe.length; i++){
//       if(data.maybe[i] == email){
//         return;
//       }
//     }
//     for(var i = 0; i < data.attendees.length; i++){
//       if(data.attendees[i] == email){
//         included = true;
//         break;
//       }
//     }
//     if(data.attendees.length + data.maybe.length >= data.max_attendees && !included){
//       alert("ERROR REGISTERING: Max capacity reached for event!");
//       return;
//     }

//     var configuration = {
//         method: "post",
//         url: "https://yellow-campus-discovery-app.herokuapp.com/deleteAttendee",
//         data: {
//             id: id,
//             attendee_email: JSON.parse(localStorage.getItem("user")),
//         }
//       };
    
//       console.log(JSON.parse(localStorage.getItem("user")));
//       // make the API call
//       axios(configuration)
//         .then((result) => {
//             console.log("yes");
//             console.log(result);
//             console.log("DONEEEEE");
//             console.log("modified COUNT: "+result.modifiedCount);
//         })
//         .catch((error) => {
//             console.info(error);
//         }).finally(() => {
//           configuration = {
//             method: "post",
//             url: "https://yellow-campus-discovery-app.herokuapp.com/addMaybe",
//             data: {
//                 id: id,
//                 attendee_email: JSON.parse(localStorage.getItem("user")),
//             }
//           };
        
//           console.log(JSON.parse(localStorage.getItem("user")));
//           // make the API call
//           axios(configuration)
//             .then((result) => {
//                 console.log("yes");
//                 console.log(result);
//                 console.log("DONEEEEE");
//             })
//             .catch((error) => {
//                 console.info(error);
//             }).finally(() => {
//               getData();
//           });
//       });
//       getData();
//   };

//   const handleDelete = (id) => {
//     if (confirm('Are you sure you want to delete this invitation?')) {
//       // Save it!
//       console.log('Thing was saved to the database.');
//     } else {
//       // Do nothing!
//       console.log('Thing was not saved to the database.');
//       return;
//     }
//     var configuration = {
//       method: "post",
//       url: "https://yellow-campus-discovery-app.herokuapp.com/deleteInvited",
//       data: {
//           id: id,
//           attendee_email: JSON.parse(localStorage.getItem("user")),
//       }
//     };
//   console.log("CURRENT HOST:" + localStorage.getItem("user") )
//   JSON.parse(localStorage.getItem("user"))
  
//   console.log(JSON.parse(localStorage.getItem("user")));
//   // make the API call
//   axios(configuration)
//   .then((result) => {
//       console.log("yes");
//       console.log(result);
//       console.log("DONEEEEE");
//   })
//   .catch((error) => {
//       console.info(error);
//   }).finally(() => {
//     getData();
//   });
//   configuration = {
//     method: "post",
//     url: "https://yellow-campus-discovery-app.herokuapp.com/deleteMaybe",
//     data: {
//         id: id,
//         attendee_email: JSON.parse(localStorage.getItem("user")),
//     }
//   };
// console.log("CURRENT HOST:" + localStorage.getItem("user") )
// JSON.parse(localStorage.getItem("user"))

// console.log(JSON.parse(localStorage.getItem("user")));
// // make the API call
// axios(configuration)
// .then((result) => {
//     console.log("yes");
//     console.log(result);
//     console.log("DONEEEEE");
// })
// .catch((error) => {
//     console.info(error);
// }).finally(() => {
//   getData();
// });
// configuration = {
//   method: "post",
//   url: "https://yellow-campus-discovery-app.herokuapp.com/deleteAttendee",
//   data: {
//       id: id,
//       attendee_email: JSON.parse(localStorage.getItem("user")),
//   }
// };
// console.log("CURRENT HOST:" + localStorage.getItem("user") )
// JSON.parse(localStorage.getItem("user"))

// console.log(JSON.parse(localStorage.getItem("user")));
// // make the API call
// axios(configuration)
// .then((result) => {
//   console.log("yes");
//   console.log(result);
//   console.log("DONEEEEE");
// })
// .catch((error) => {
//   console.info(error);
// }).finally(() => {
// getData();
// });
//   };

//   var columns = [
//     {
//       field: "has_conflict",
//       headerName: "",
//       width: 50,
//       renderCell: (params) => {
//         // console.log(params.getValue(params.id, "title"));
//         if(params.getValue(params.id, "has_conflict") == true){
//           return 
//             <Tooltip title="Overlapping time with another event!!" placement="bottom">
//               <ErrorIcon/>
//             </Tooltip>
//         }
//         return;
//         // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
//       }
//     },
//     { field: 'title', headerName: 'Event Title', width: 100 },
//     { field: 'num_attendees', headerName: 'Number Registered', width: 150 },
//     { field: 'max_attendees', headerName: 'Max Capacity', width: 100 },
//     { field: 'status', headerName: 'Status', width: 150 },
//     {
//       field: "RSVP",
//       headerName: "RSVP",
//       sortable: false,
//       renderCell: (params) => {
//         const onClick = (e) => {
//           e.stopPropagation(); // don't select this row after clicking
  
//           const api = params.api;
//           var thisRow = {};
  
//           api
//             .getAllColumns()
//             .filter((c) => c.field !== "__check__" && !!c)
//             .forEach(
//               (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
//             );
          
//           thisRow["id"] = params.id;
//           localStorage.setItem("eventID", JSON.stringify(params.id));
//           handleRSVP(params.id, invited);
//           return;
//           // return alert(JSON.stringify(thisRow, null, 4));
//         };
  
//         return <Button onClick={onClick}>RSVP</Button>;
//         // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
//       }
//     },
//     {
//       field: "maybe",
//       headerName: "Maybe",
//       sortable: false,
//       renderCell: (params) => {
//         const onClick = (e) => {
//           e.stopPropagation(); // don't select this row after clicking
  
//           const api = params.api;
//           var thisRow = {};
  
//           api
//             .getAllColumns()
//             .filter((c) => c.field !== "__check__" && !!c)
//             .forEach(
//               (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
//             );
          
//           thisRow["id"] = params.id;
//           localStorage.setItem("eventID", JSON.stringify(params.id));
//           handleMaybe(params.id, invited);
//           return;
//           // return alert(JSON.stringify(thisRow, null, 4));
//         };
  
//         return <Button onClick={onClick}>Maybe</Button>;
//         // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
//       }
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       sortable: false,
//       renderCell: (params) => {
//         const onClick = (e) => {
//           e.stopPropagation(); // don't select this row after clicking
  
//           const api = params.api;
//           const thisRow = {};
  
//           api
//             .getAllColumns()
//             .filter((c) => c.field !== "__check__" && !!c)
//             .forEach(
//               (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
//             );
          
//           thisRow["id"] = params.getValue(params.id, "id");
//           handleDelete(params.id);
//           return;
//         };
  
//         return <Button onClick={onClick}>Del</Button>;
//       }
//     },
//     {
//       field: "specs",
//       width: 80,
//       headerName: "Details",
//       sortable: false,
//       renderCell: (params) => {
//         const [open, setOpen] = React.useState(false);
//         var thisRow = {};
//         const handleClickOpen = (e) => {
//           setOpen(true);
//           e.stopPropagation(); // don't select this row after clicking
  
//           const api = params.api;
  
//           api
//             .getAllColumns()
//             .filter((c) => c.field !== "__check__" && !!c)
//             .forEach(
//               (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
//             );
//           thisRow["id"] = params.getValue(params.id, "id");
//           thisRow = findId(invited, params.id);
//           localStorage.setItem("rowData", JSON.stringify(thisRow));
//         };
  
//         const handleClose = () => {
//           setOpen(false);
//         };
//         return (
//           <>
//             <Button onClick={handleClickOpen}>
//               <IconButton>
//                 <MoreVertIcon/>
//               </IconButton>
//             </Button>
//             <Dialog
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">
//                 {JSON.parse(localStorage.getItem("rowData")).title}
//               </DialogTitle>
//               <DialogContent>
//                 <DialogContentText id="alert-dialog-description">
//                   {`Location: ${JSON.parse(localStorage.getItem("rowData")).location}`}
//                   <br></br>
//                   {`Start Time: ${JSON.parse(localStorage.getItem("rowData")).start_time}`}
//                   <br></br>
//                   {`End Time: ${JSON.parse(localStorage.getItem("rowData")).end_time}`}
//                   <br></br>
//                   {`Host Email: ${JSON.parse(localStorage.getItem("rowData")).host_email}`}
//                   <br></br>
//                   {`Details: ${JSON.parse(localStorage.getItem("rowData")).details}`}
//                   <br></br>
//                   {`Guest Capacity: ${JSON.parse(localStorage.getItem("rowData")).max_attendees}`}
//                   <br></br>
//                   {`Invite Only: ${JSON.parse(localStorage.getItem("rowData")).is_invite_only}`}
//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Exit</Button>
//               </DialogActions>
//             </Dialog>
//           </>
//         );
//       }
//     },
//   ];
//   var columns2 = [
//     {
//       field: "has_conflict",
//       headerName: "",
//       width: 50,
//       renderCell: (params) => {
//         // console.log(params.getValue(params.id, "title"));
//         if(params.getValue(params.id, "has_conflict") == true){
//           return 
//             <Tooltip title="Overlapping time with another event!!" placement="bottom">
//               <ErrorIcon/>
//             </Tooltip>
//         }
//         return;
//         // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
//       }
//     },
//     { field: 'title', headerName: 'Event Title', width: 100 },
//     { field: 'num_attendees', headerName: 'Number Registered', width: 150 },
//     { field: 'max_attendees', headerName: 'Max Capacity', width: 100 },
//     { field: 'status', headerName: 'Status', width: 150 },
//     {
//       field: "RSVP",
//       headerName: "RSVP",
//       sortable: false,
//       renderCell: (params) => {
//         const onClick = (e) => {
//           e.stopPropagation(); // don't select this row after clicking
  
//           const api = params.api;
//           var thisRow = {};
  
//           api
//             .getAllColumns()
//             .filter((c) => c.field !== "__check__" && !!c)
//             .forEach(
//               (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
//             );
          
//           thisRow["id"] = params.id;
//           localStorage.setItem("eventID", JSON.stringify(params.id));
//           handleRSVP(params.id, allData);
//           return;
//           // return alert(JSON.stringify(thisRow, null, 4));
//         };
  
//         return <Button onClick={onClick}>RSVP</Button>;
//         // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
//       }
//     },
//     {
//       field: "maybe",
//       headerName: "Maybe",
//       sortable: false,
//       renderCell: (params) => {
//         const onClick = (e) => {
//           e.stopPropagation(); // don't select this row after clicking
  
//           const api = params.api;
//           var thisRow = {};
  
//           api
//             .getAllColumns()
//             .filter((c) => c.field !== "__check__" && !!c)
//             .forEach(
//               (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
//             );
          
//           thisRow["id"] = params.id;
//           localStorage.setItem("eventID", JSON.stringify(params.id));
//           handleMaybe(params.id, allData);
//           return;
//           // return alert(JSON.stringify(thisRow, null, 4));
//         };
  
//         return <Button onClick={onClick}>Maybe</Button>;
//         // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
//       }
//     },
//     {
//       field: "specs",
//       width: 80,
//       headerName: "Details",
//       sortable: false,
//       renderCell: (params) => {
//         const [open, setOpen] = React.useState(false);
//         var thisRow = {};
//         const handleClickOpen = (e) => {
//           setOpen(true);
//           e.stopPropagation(); // don't select this row after clicking
  
//           const api = params.api;
  
//           api
//             .getAllColumns()
//             .filter((c) => c.field !== "__check__" && !!c)
//             .forEach(
//               (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
//             );
//           thisRow["id"] = params.getValue(params.id, "id");
//           thisRow = findId(allData, params.id);
//           localStorage.setItem("rowData", JSON.stringify(thisRow));
          
  
//         };
  
//         const handleClose = () => {
//           setOpen(false);
//         };
//         return (
//           <>
//             <Button onClick={handleClickOpen}>
//               <IconButton>
//                 <MoreVertIcon/>
//               </IconButton>
//             </Button>
//             <Dialog
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">
//                 {JSON.parse(localStorage.getItem("rowData")).title}
//               </DialogTitle>
//               <DialogContent>
//                 <DialogContentText id="alert-dialog-description">
//                   {`Location: ${JSON.parse(localStorage.getItem("rowData")).location}`}
//                   <br></br>
//                   {`Start Time: ${JSON.parse(localStorage.getItem("rowData")).start_time}`}
//                   <br></br>
//                   {`End Time: ${JSON.parse(localStorage.getItem("rowData")).end_time}`}
//                   <br></br>
//                   {`Host Email: ${JSON.parse(localStorage.getItem("rowData")).host_email}`}
//                   <br></br>
//                   {`Details: ${JSON.parse(localStorage.getItem("rowData")).details}`}
//                   <br></br>
//                   {`Guest Capacity: ${JSON.parse(localStorage.getItem("rowData")).max_attendees}`}
//                   <br></br>
//                   {`Invite Only: ${JSON.parse(localStorage.getItem("rowData")).is_invite_only}`}
//                 </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Exit</Button>
//               </DialogActions>
//             </Dialog>
//           </>
//         );
//       }
//     },
//   ];
//   /*const initialState = useKeepGroupedColumnsHidden({
//     //apiRef,
//     initialState: {
//       ...data.initialState,
//       rowGrouping: {
//         ...data.initialState?.rowGrouping,
//         model: ['commodity'],
//       },
//       sorting: {
//         sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
//       },
//     },
//   });*/
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   getData();
//   // Hmmm

//   async function getData() {
//     const configuration = {
//       method: "post",
//       url: "http://localhost:3000/returnOpenEvent",
//       data: {
//       }
//       };
//   console.log("CURRENT USER:" + localStorage.getItem("user") )
//   JSON.parse(localStorage.getItem("user"))
  
//   console.log(typeof JSON.parse(localStorage.getItem("user")));
//   var user = JSON.parse(localStorage.getItem("user"));
//   // make the API call
//   let r = await axios(configuration)
//   .then((result) => {
//       console.log("yes");
//       console.log(result);
//       // rows = result.data;
//       // console.log(rows);
//       // setLoaded(true);
//       console.log("DONEEEEE");
//       // console.log(rows);
//       var r = result.data;
//       for(var i = 0; i < r.length; i++){
//         r[i]["has_conflict"] = false;
//         r[i]["num_attendees"] = r[i].attendees.length + r[i].maybe.length;
//         for(var j = 0; j < r[i].attendees.length; j++){
//           if(r[i].attendees[j] == user){
//             r[i]["status"] = "RSVPed";
//           }
//         }
//         if(r[i]["status"] == "RSVPed"){
//           continue;
//         }
//         for(var j = 0; j < r[i].maybe.length; j++){
//           if(r[i].maybe[j] == user){
//             r[i]["status"] = "Maybe Attending";
//           }
//         }
//         if(r[i]["status"] == "Maybe Attending"){
//           continue;
//         }
//         r[i]["status"] = "None";
//       }
//       for(var i = 0; i < r.length; i++){
//         if(r[i].status == "None"){
//           continue;
//         }
//         for(var j = i + 1; j < r.length; j++){
//           if(r[j].status == "None"){
//             continue;
//           }
//           if(r[i].start_time < r[j].end_time || r[j].start_time < r[i].end_time){
//             r[i]["has_conflict"] = true;
//             r[j]["has_conflict"] = true;
//           } 
//         }
//       }
//       setData(r);
//     axios(configuration2)
//     .then((result) => {
//         console.log("yes");
//         console.log(result);
//         var open = allData;
//         var r = result.data;
//           for(var i = 0; i < r.length; i++){
//             r[i]["has_conflict"] = false;
//             r[i]["num_attendees"] = r[i].attendees.length + r[i].maybe.length;
//             for(var j = 0; j < r[i].attendees.length; j++){
//               console.log(r[i][j]);
//               if(r[i].attendees[j] == user){
//                 r[i]["status"] = "RSVPed";
//               }
//             }
//             if(r[i]["status"] == "RSVPed"){
//               continue;
//             }
//             for(var j = 0; j < r[i].maybe.length; j++){
//               if(r[i].maybe[j] == user){
//                 r[i]["status"] = "Maybe Attending";
//               }
//             }
//             if(r[i]["status"] == "Maybe Attending"){
//               continue;
//             }
//             r[i]["status"] = "None";
//           }
//         //   for(var i = 0; i < r.length; i++){
//         //     if(r[i].status == "None"){
//         //       continue;
//         //     }
//         //     for(var j = i + 1; j < r.length; j++){
//         //       if(r[j].status == "None"){
//         //         continue;
//         //       }
//         //       if(r[i].start_time < r[j].end_time || r[j].start_time < r[i].end_time){
//         //         r[i]["has_conflict"] = true;
//         //         r[j]["has_conflict"] = true;
//         //       } 
//         //     }
//         //   }
//         //   for(var i = 0; i < r.length; i++){
//         //     if(r[i].status == "None"){
//         //       continue;
//         //     }
//         //     for(var j = 0; j < open.length; j++){
//         //       if(open[j].status == "None"){
//         //         continue;
//         //       }
//         //       if(r[i].start_time < open[j].end_time || r[i].end_time > open[j].start_time ){
//         //         open[j]["has_conflict"] = true;
//         //         r[i]["has_conflict"] = true;
//         //       }
//         //     }
//         //   }
//         //   console.log("COMPUTED DATA");
//         // console.log(open);
//         // console.log(r);
//         // setData(open);
//         setInvited(r);
//     })
//     .catch((error) => {
//         console.info(error);
//         setError(error);
//     }).finally(() => {
//       setLoading(false);
//     });
//   })
//   .catch((error) => {
//       console.info(error);
//       setError(error);
//   }).finally(() => {
//     // setLoading(false);
//   });

//   console.log("REACHED");
//   const configuration2 = {
//     method: "post",
//     url: "http://localhost:3000/returnInvitedEvent",
//     data: {
//         user: JSON.parse(localStorage.getItem("user")),
//     }
//     };
// console.log("CURRENT HOST:" + localStorage.getItem("user") )
// JSON.parse(localStorage.getItem("user"))

// console.log(JSON.parse(localStorage.getItem("user")));
// // make the API call
//   }

//   if (loading) return "Loading...";
//   if (error) return "Error!";

//   // <pre>{JSON.stringify(data, null, 2)}</pre>
//   /*return (
//     <>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           {...data}
//           apiRef={apiRef}
//           loading={loading}
//           disableSelectionOnClick
//           initialState={initialState}
//           experimentalFeatures={{ newEditingApi: true }}
//         />
//       </div>
//     </>
//   )*/
//   return (
//     <>
//       <div style={{ height: 400, width: '100%' }}>
//         <p>Invited Events:</p>
//         <DataGrid
//           rows={invited}
//           columns={columns}
//           pageSize={10}
//           rowsPerPageOptions={[10]}
//           getRowId={(row) => row._id}
//         />
//         <p>Open Events:</p>
//         <DataGrid
//           rows={allData}
//           columns={columns2}
//           pageSize={10}
//           rowsPerPageOptions={[10]}
//           getRowId={(row) => row._id}
//         />
//       </div>
//     </>
//   );
// }