import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import { App } from "/imports/ui/App";

import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({});

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container!);
  root.render(
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  );
});
