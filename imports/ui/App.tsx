import React from "react";
import {
  AppShell,
  Input,
  Center,
  Flex,
  Button,
  Stack,
  Title,
} from "@mantine/core";
import { Satellite } from "lucide-react";
import { Todo } from "./Todo";

export const App = () => {
  const todos = Array.from({ length: 10 }, (_, k) => `Todo ${k + 1}`);
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Flex
          className="bg-indigo-600 h-full w-full"
          align="center"
          justify="start"
        >
          <Center className="ml-4 min-w-1/6 w-max">
            <Satellite color="#fff" />
            <Title className="ml-1 text-base text-white" order={1}>
              Meteor Todo
            </Title>
          </Center>
        </Flex>
      </AppShell.Header>

      <AppShell.Main>
        <AppShell.Section>
          <Center>
            <Stack justify="center" align="center" gap="xl">
              <Flex gap="sm">
                <Input.Wrapper>
                  <Input placeholder="Add a new task" />
                </Input.Wrapper>
                <Button>Add</Button>
              </Flex>
              {todos.map((todo) => (
                <div className="mx-4 min-w-[250px]">
                  <Todo title={todo} />
                </div>
              ))}
            </Stack>
          </Center>
        </AppShell.Section>
      </AppShell.Main>
    </AppShell>
  );
};
