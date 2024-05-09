import React, { FC, ReactNode } from "react";
import { AppShell, Flex, Center, Title, Button } from "@mantine/core";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const userId = useTracker(() => Meteor.userId());
  const navigate = useNavigate();
  const handleLogout = () => {
    Meteor.logout(() => navigate("/login"));
  };
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Flex
          className="bg-blue-500 h-full w-full"
          align="center"
          justify="space-between"
        >
          <Center className="ml-4 min-w-1/6 w-max">
            <Title className="ml-1" order={3} c="white">
              Meteor Todo
            </Title>
          </Center>
          {userId ? (
            <Center className="mr-4 min-w-1/6 w-max">
              <Button color="red" onClick={handleLogout}>
                Logout
              </Button>
            </Center>
          ) : null}
        </Flex>
      </AppShell.Header>

      <AppShell.Main>
        <AppShell.Section>
          <Center>{children}</Center>
        </AppShell.Section>
      </AppShell.Main>
    </AppShell>
  );
};
