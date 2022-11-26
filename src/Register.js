import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import validator from "validator"


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function Register() {
  // initial state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [usertype, setUserType] = useState(0);

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    
    if((!validator.isEmail(email)) || password == "" || usertype == 0){
      console.log("INVALID");
      return;
    }

    // set configurations
    const configuration = {
      method: "post",
      url: "https://yellow-campus-discovery-app.herokuapp.com/register",
      data: {
        email,
        password,
        usertype,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });
  };
  // drop down formatting

  const handleChange = (event) => {
    setUserType(event.target.value);
  };


  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>


        {/* drop down select */}
        <FormControl fullWidth>
        <InputLabel id="userType-select-label">User Type</InputLabel>
        <Select
          labelId="userType-select-label"
          id="userType-select-label"
          value={usertype}
          label="User Type"
          onChange={handleChange}
        >
          <MenuItem value={1}>Student</MenuItem>
          <MenuItem value={2}>Organizer</MenuItem>
          <MenuItem value={3}>Faculty</MenuItem>
        </Select>
      </FormControl>

        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>

      </Form>
    </>
  );
}