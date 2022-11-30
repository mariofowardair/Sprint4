// import * as React from 'react';
import React, {  useState, useEffect, Component } from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue, GridToolbar } from '@mui/x-data-grid';
import {useGridApiRef, useKeepGroupedColumnsHidden} from '@mui/x-data-grid-premium';
import axios from "axios";
// import Button from '@mui/material/Button';
import { IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ConstructionOutlined, JavascriptOutlined } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import Tooltip from '@mui/material/Tooltip';

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

function getTimeString(time){
  var date = new Date(time);
  // var date = time;
  return date.toDateString() + ", "+ date.toTimeString().substring(0,5);
}
export default function EventDisplayerStudent() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const apiRef = useGridApiRef();
  //const apiRef = useGridApiRef();
  // const [attending, setAttending] = useState([]);
  // const [maybe, setMaybe] = useState([]);
  const onClickMap = (e) =>{
    var selectedData = [];
    console.log(selected);
    for(var i = 0; i < selected.length; i++){
      selectedData.push(findId(data, selected[i]));
    }
    localStorage.setItem("filteredData", JSON.stringify(selectedData));
    console.log(selectedData);
    
  }

  function findId(data, id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i]._id == id) {
            return data[i];
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
    {
      field: "has_conflict",
      filterable: false,
      headerName: "",
      width: 50,
      renderCell: (params) => {
        // console.log(params.getValue(params.id, "title"));
        if(params.getValue(params.id, "has_conflict")){
          return (
            <Tooltip title="Overlapping time with another event!!" placement="bottom">
              <ErrorIcon/>
            </Tooltip>);
        }
        return <p/>;
        // return <Button onClick={event =>  window.location.href='/EditEvent'}>Edit</Button>;
      }
    },
    { field: 'title', headerName: 'Event Title', width: 200 },
    { field: 'start_time', headerName: 'Start Time', width: 200, hide: true, valueGetter: ({ value }) => value && new Date(value), type: 'date'},
    { field: 'readable_start_time', headerName: 'Start Time', width: 200, filterable: false},
    { field: 'end_time',headerName: 'End Time', width: 100, hide: true, type: "date", valueGetter: ({ value }) => value && new Date(value),},
    { field: 'status', headerName: 'Status', width: 200, type: 'singleSelect' },
    { field: 'num_attendees', headerName: 'Number Registered', width: 150, type: "number" },
    { field: 'max_attendees', headerName: 'Max Capacity', width: 100, type: "number" },
    {
      field: "asd",
      headerName: "Change Status",
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
          if(thisRow["id"]["status"] == "Maybe"){
            handleRSVP(params.id);
          }else{
            handleMaybe(params.id);
          }
          
          return;
          // return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return <Button onClick={onClick}>{(params.getValue(params.id, "status") == "Maybe")? "RSVP": "Maybe"}</Button>;
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
      filterable: false,
      renderCell: (params) => {
        const [open, setOpen] = React.useState(false);
        var thisRow = {};
        const handleClickOpen = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api = params.api;
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
          thisRow["id"] = params.getValue(params.id, "id");
          thisRow = findId(data, params.id);
          localStorage.setItem("rowData", JSON.stringify(thisRow));
          setOpen(true);
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

  function getData() {
    var DATA = [];
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
  axios(configuration)
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
      for(var i = 0; i < r.length; i++){
        r[i]["num_attendees"] = r[i].attendees.length + r[i].maybe.length;
        r[i]["status"] = "Attending";
        r[i]["readable_start_time"] = getTimeString(r[i]["start_time"]);
        DATA.push(r[i]);
      }
      // setData(DATA);
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
axios(configuration2)
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
      r[i]["status"] = "Maybe";
      DATA.push(r[i]);
    }
    for(var i = 0; i < DATA.length; i++){
      DATA[i]["has_conflict"] = false;
    }
    for(var i = 0; i < DATA.length; i++){
      for(var j = i + 1; j < DATA.length; j++){
        if((DATA[i].end_time > DATA[j].start_time && DATA[i].start_time < DATA[j].start_time) || (DATA[j].end_time > DATA[i].start_time && DATA[j].start_time < DATA[i].start_time)){
          DATA[i]["has_conflict"] = true;
          DATA[j]["has_conflict"] = true;
        }
      }
    }
    setData(DATA);
})
.catch((error) => {
    console.info(error);
    setError(error);
}).finally(() => {
  setLoading(false);
});
  }

  if (loading) return "Loading...";
  if (error){
    console.log(error);
    return "Error!";
  }

  return (
    <>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row._id}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            ...data.initialState,
            filter: {
              filterModel: {
                items: [
                  {
                    columnField: 'rating',
                    operatorValue: '>',
                    value: '2.5',
                  },
                ],
              },
            },
          }}
          onSelectionModelChange={(newSelection) => {
            setSelected(newSelection);
          }}
        />
      </div>
      <Button onClick = {onClickMap} variant="contained">
                        View Map
                    </Button> <br/> <br />
    </>
  );
}