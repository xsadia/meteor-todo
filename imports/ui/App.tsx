import React from "react";
import { AppShell, Burger, Flex } from "@mantine/core";
import { Satellite } from "lucide-react";

export const App = () => (
  <AppShell
    header={{ height: 60 }}
    navbar={{
      width: 300,
      breakpoint: "sm",
      // collapsed: { mobile: !opened },
    }}
    padding="md"
  >
    <AppShell.Header className="bg-indigo-600">
      <Flex className="h-full w-1/6" align="center" justify="center">
        <Satellite />
      </Flex>
    </AppShell.Header>

    <AppShell.Main></AppShell.Main>
  </AppShell>
);
