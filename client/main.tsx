import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { TodoPage } from "../imports/ui/TodoPage";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoginPage } from "/imports/ui/LoginPage";
import { RegisterPage } from "/imports/ui/RegisterPage";

const theme = createTheme({});
const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);
  root.render(
    <MantineProvider theme={theme}>
      <Notifications position="top-right" zIndex={1000} />
      <RouterProvider router={router} />
    </MantineProvider>
  );
});
