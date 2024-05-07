import { Flex, Checkbox, Button, Text } from "@mantine/core";
import { TrashIcon } from "lucide-react";
import { FC } from "react";

type TodoProps = {
  _id?: string;
  title: string;
};

export const Todo: FC<TodoProps> = ({ title }) => {
  return (
    <Flex align="center" justify="space-between">
      <Flex gap="sm" align="center">
        <Checkbox />
        <Text>{title}</Text>
      </Flex>
      <Flex justify="flex-end">
        <Button variant="transparent">
          <TrashIcon size={16} className="hover:text-red-500 text-gray-500" />
        </Button>
      </Flex>
    </Flex>
  );
};
