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
import { Accounts } from "meteor/accounts-base";

export const RegisterPage = () => {
  const userId = useTracker(() => Meteor.userId());

  if (userId) {
    console.log("register");
    return <Navigate to="/" />;
  }

  const schema = z
    .object({
      email: z.string({ required_error: "email is required" }).email(),
      password: z
        .string({ required_error: "password is required" })
        .min(6, "password needs to be at least 6 characters long"),
      confirmPassword: z
        .string({ required_error: "please confirm your password" })
        .min(8, "password needs to be at least 6 characters long"),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
      path: ["confirmPassword"],
      message: "passwords need to match",
    });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(schema),
  });

  type Input = z.infer<typeof schema>;

  const navigate = useNavigate();

  const handleRegister = ({ email, password }: Input) => {
    Accounts.createUser({ email, password }, (error) => {
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
      <form onSubmit={form.onSubmit(handleRegister)}>
        <Container size="md">
          <Paper p="xl" shadow="xs">
            <Title order={2} mb={20}>
              Register
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
            <PasswordInput
              label="Confirm password"
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
              type="password"
              placeholder="Enter your password"
              mb={20}
            />
            <Button type="submit" fullWidth>
              Register
            </Button>
          </Paper>
          <Text mt={10}>
            Already have an account?{" "}
            <Link className="text-blue-500 hover:text-blue-700" to="/login">
              Login here.
            </Link>
          </Text>
        </Container>
      </form>
    </Layout>
  );
};
