import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import SidebarCE from "./Components/SidebarCE";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

console.log(localStorage.getItem("eventID"));
const styles = {
    textfield: {
      //height: 140,
      width: 800
      //backgroundColor: "black"
    },
    container: {
        border: "1px solid grey",
        paddingBottom: 25,
        paddingTop: 0,
        margin: 5,
        transform: "translate(-5px, -3px)",
        width: 1296
    }
};

const defaultValues = {
    id: localStorage.getItem("eventID"),
    title: "",
    details: "",
    host_email: "testhost@gmail.com",
    //attendees: "",
    max_attendees: "", //100
    is_invite_only: "", //false
    location: "", 
    start_time: "2000-01-01T05:00:00.000Z",
    end_time: "2000-01-01T05:00:00.000Z",
};

const Form = () => {
  console.log("SAVED EVENT ID: " + localStorage.getItem("eventID"));
    const [formValues, setFormValues] = useState(defaultValues);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      console.log(value);
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    /*let jsonData = {
      title: "a",
      details: "b",
      host_email: "c",
      attendees: ["ab", "cd", "ef"],
      location: "india",        
    };*/
    

    const handleSubmit = async (event) => {
      event.preventDefault();
      // console.log("TITLE"+formValues.title);
      console.log(localStorage.getItem("user"))
      const configuration = {
        method: "post",
        url: "http://localhost:3000/updateEvent",
        data: {
          id: JSON.parse(localStorage.getItem("eventID")),
          title: formValues.title,
          details: formValues.details,
          host_email: JSON.parse(localStorage.getItem("user")),
          attendees: [],
          max_attendees: formValues.max_attendees,
          is_invite_only: formValues.is_invite_only,
          location: formValues.location,
          start_time: formValues.start_time,
          end_time: formValues.end_time,        
        },
      };
  
      // make the API call
      axios(configuration)
        .then((result) => {
          console.log("yes")
          window.location = "/DashHost"
        })
        .catch((error) => {
          console.info(error)
        });

    };



    
    return (
      <form onSubmit={handleSubmit}>
      <SidebarCE />
        <Grid container maxWidth="md" spacing={3} alignItems="center" justify="center" direction="column" style={styles.container}>
        <Grid item xs={12}>
          <TextField
              required
              fullWidth
              id="title-input"
              name="title"
              label="Title"
              multiline
              value={formValues.title}
              onChange={handleInputChange}
              style={styles.textfield}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="description-input"
            name="details"
            label="Description"
            multiline
            type="text"
            value={formValues.description}
            onChange={handleInputChange}
            style={styles.textfield}
            />
        </Grid>
        <Grid item xs={12}>
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="location-input">Location</InputLabel>
          <Select
            value={formValues.age}
            id="location-input"
            name="location"
            label="Location"
            type="text"
            fullWidth
            required
            style={styles.textfield}
            onChange={handleInputChange}
          >
            <MenuItem value={"Klaus"}>Klaus</MenuItem>
            <MenuItem value={"CULC"}>CULC</MenuItem>
            <MenuItem value={"Tech Green"}>Tech Green</MenuItem>
            <MenuItem value={"CRC"}>CRC</MenuItem>
            <MenuItem value={"Exhibition Hall"}>Exhibition Hall</MenuItem>
            <MenuItem value={"Student Center"}>Student Center</MenuItem>
            <MenuItem value={"Ferst Art Center"}>Ferst Art Center</MenuItem>
            <MenuItem value={"Bobby Dodd Stadium"}>Bobby Dodd Stadium</MenuItem>
          </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
              required
              fullWidth
              id="max_attendees-input"
              name="max_attendees"
              label="Guest Capacity"
              type="text"
              value={formValues.max_attendees}
              onChange={handleInputChange}
              style={styles.textfield}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
              required
              fullWidth
              id="is_invite_only-input"
              name="is_invite_only"
              label="Invite Only (true/false)"
              type="text"
              value={formValues.is_invite_only}
              onChange={handleInputChange}
              style={styles.textfield}
          />
        </Grid>
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="datetime-input"
              name="start_time"
              label="Start Date"
              type="datetime-local"
              defaultValue="2022-01-01T00:00"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={formValues.start_time}
              onChange={handleInputChange}
              style={styles.textfield}
            />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="datetime-input"
            name="end_time"
            label="End Date"
            type="datetime-local"
            defaultValue="2022-01-01T00:00"
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            value={formValues.end_time}
            onChange={handleInputChange}
            style={styles.textfield}
          />
        </Grid>
          <Button variant="contained" color="primary" type="submit" style={{width: 200}}>
            Submit
          </Button>
        </Grid>
      </form>
    );
    };
    export default Form;