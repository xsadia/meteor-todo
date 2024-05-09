import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import { Layout } from "./Layout";

export const LoginPage = () => {
  const userId = useTracker(() => Meteor.userId());

  if (userId) {
    return <Navigate to="/" />;
  }

  const schema = z.object({
    email: z.string({ required_error: "email is required" }).email(),
    password: z
      .string({ required_error: "password is required" })
      .min(6, "password needs to be at least 6 characters long"),
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  type Input = z.infer<typeof schema>;

  const navigate = useNavigate();

  const handleLogin = ({ email, password }: Input) => {
    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        notifications.show({
          withCloseButton: true,
          color: "red",
          title: "Something went wrong",
          message: error.message,
        });

        return;
      }

      navigate("/");
    });
  };

  return (
    <Layout>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <Container size="md">
          <Paper p="xl" shadow="xs">
            <Title order={2} mb={20}>
              Login
            </Title>
            <TextInput
              label="Email"
              key={form.key("email")}
              {...form.getInputProps("email")}
              placeholder="Enter your email"
              mb={15}
            />
            <PasswordInput
              label="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
              type="password"
              placeholder="Enter your password"
              mb={20}
            />
            <Button type="submit" fullWidth>
              Login
            </Button>
          </Paper>
          <Text mt={10}>
            Don't have an account?{" "}
            <Link className="text-blue-500 hover:text-blue-700" to="/register">
              Register here.
            </Link>
          </Text>
        </Container>
      </form>
    </Layout>
  );
};
