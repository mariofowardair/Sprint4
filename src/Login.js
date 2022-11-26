import React, { useState }from 'react'
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // prevent the form from refreshing the whole page
        e.preventDefault();
        // set configurations
        const configuration = {
            method: "post",
            url: "https://yellow-campus-discovery-app.herokuapp.com/login",
            data: {
            email,
            password,
            },
        };

        // make the API call
        axios(configuration)
        .then((result) => {
            // set the cookie
            cookies.set("TOKEN", result.data.token, {
                path: "/",
            });
            // redirect user to the auth page
            // window.location.href = "/auth";
            localStorage.setItem("user", JSON.stringify(result.data.email));
            // console.log(result.data.email)

            console.log(localStorage.getItem("user"))
            let usertype = result.data.usertype
            if (usertype == 1) {
              navigate(`/DashStudent`)

            } else if (usertype == 2) {
              navigate(`/DashHost`)
            } else if (usertype == 3) {
              navigate(`/DashTeacher`)
            }
            // console.log(result.data.usertype)
            setLogin(true);


        })
        .catch((error) => {
        error = new Error();
        });
      }

    return (
        <>
        <h2>Login</h2>
        <Form onSubmit={(e)=>handleSubmit(e)}>
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

        {/* display success message */}
        {login ? (
          <p className="text-success">You Are Logged in Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Logged in</p>
        )}

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </Button>
      </Form>
        </>
    )
}