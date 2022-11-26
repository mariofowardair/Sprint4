import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import HomeHeader from "./HomeComponents/HomeHeader.js";

export default function Home() {
    return (
        <div style={{ backgroundImage: `url(https://wallpaperaccess.com/full/3426852.jpg)`, width: "100%", height: "100%", position: "absolute", right: 0, bottom: 0}}>
            <CssBaseline />
            <HomeHeader />
        </div>
    );
}