import React, { FC, Fragment, ReactNode } from "react";
import {
  AppShell,
  Flex,
  Center,
  Title,
  Button,
  Container,
} from "@mantine/core";
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
    <>
      <Flex
        align="center"
        justify="space-between"
        className="fixed w-screen overflow-auto top-0 bg-blue-500 shadow-md z-10 h-[80px]"
      >
        <Flex ml={16} justify="between" align="center" py={2}>
          <Title order={3} className="text-white text-lg font-semibold">
            Meteor Todo
          </Title>
        </Flex>

        {userId ? (
          <Button color="red" mr={16} onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </Flex>

      <Center mt={150} mb={20}>
        {children}
      </Center>
    </>
  );
};
