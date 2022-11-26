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

const defaultValues = {
    title: "",
    host_email: "testhost@gmail.com",


};

const Form = () => {
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
      console.log(formValues.title)
      const configuration = {
        method: "post",
        url: "http://localhost:3000/deleteEvent",
        data: {
          title: formValues.title
        },
      };
  
      // make the API call
      axios(configuration)
        .then((result) => {
          console.log(result)
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
          
        <h1>Remove Event</h1>

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


            <Button variant="contained" color="primary" type="submit" style={{width: 200}}>
              Submit
            </Button>
          </Grid>
        </form>
      );
    };
    export default Form;