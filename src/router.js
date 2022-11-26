import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./DashPages/Dashboard";
import DashHost from "./DashPages/DashHost";
import DashStudent from "./DashPages/DashStudent";
import DashTeacher from "./DashPages/DashTeacher";
import CreateEvent from "./CreateEvent";
import DeleteEvent from "./DeleteEvent";
import EditEvent from "./EditEvent";
import ViewEvent from "./ViewEvent";
import RSVP from "./RSVP";
import EventDisplayer from "./EventDisplayer";
import EventDisplayerStudent from "./EventDisplayerStudent";
import InviteAttendees from "./InviteAttendees";
import Home from './Home'
import Map from './Map';

import Start from "./Start";
import Account from "./Account";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/account" element={<Account />} />
      <Route path="/CreateEvent" element={<CreateEvent />} />
      <Route path="/EditEvent" element={<EditEvent />} />
      
      <Route path="/DeleteEvent" element={<DeleteEvent/>} />
      <Route path="/RSVP" element={<RSVP/>} />
      <Route path="/ViewEvents" element={<EventDisplayer/>} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/DashHost" element={<DashHost/>} />
      <Route path="/DashStudent" element={<DashStudent/>} />
      <Route path="/DashTeacher" element={<DashTeacher/>} />
      <Route path="/InviteAttendees" element={<InviteAttendees/>} />
      <Route path="/ViewEventStudent" element={<EventDisplayerStudent/>} />
      <Route path="/map" element={<Map/>} />
    </Routes>
  );

  /* object-based routes
  return useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "games", element: <Games /> },
    { path: "game-details/:id", element: <GameDetails /> },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        { path: "/", element: <DashboardDefaultContent /> },
        { path: "inbox", element: <Inbox /> },
        { path: "settings-and-privacy", element: <SettingsAndPrivacy /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);
*/
};
export default Router;
