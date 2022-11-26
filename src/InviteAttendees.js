import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
//import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import SidebarCE from "./Components/SidebarCE";
import axios from "axios";

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

const Form = () => {
  console.log("SAVED EVENT ID: " + localStorage.getItem("eventID"));
    const [users, setUsers] = useState("");
    const handleInputChange = (e) => {
      setUsers(e.target.value);
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
        var user_array = users.split("\n");
        // console.log(localStorage.getItem("user"))
        var errored = false;
        for(var i = 0; i < user_array.length; i++){
            console.log(typeof user_array[i]);
            console.log(typeof localStorage.getItem("eventID"));
            console.log(user_array[i]);
            console.log(localStorage.getItem("eventID"));
            const configuration = {
                method: "post",
                url: "http://localhost:3000/addInvited",
                data: {
                    id: JSON.parse(localStorage.getItem("eventID")),
                    attendee_email: user_array[i],
                },
            };
        
            // make the API call
            axios(configuration)
                .then((result) => {
                console.log("yes")
                })
                .catch((error) => {
                console.info(error);
                return;
                });
        }
        window.location = "/DashHost"
      // console.log("TITLE"+formValues.title);
      

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
                name="Emails:"
                label="Emails:"
                multiline
                type="text"
                value={users}
                onChange={handleInputChange}
                style={styles.textfield}
                rows={2}
                maxRows={15}
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