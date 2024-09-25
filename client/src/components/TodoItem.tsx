import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "./TodoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, confirmInput } from "../App";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      if (todo.completed) return alert("Todo is already completed");
      if (!confirmInput()) {
        return;
      }
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "PATCH",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      if (!confirmInput()) {
        return;
      }
      try {
        const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="card">
      <Flex gap={2} alignItems={"center"} justifyContent={"space-between"}>
        <Flex direction={"column"} gap={1}>
          <Flex direction={"row"} gap={1} alignItems={"center"}>
            {!todo.completed ? (
              <div className="p circle yellow"></div>
            ) : (
              <div className="p circle green"></div>
            )}
            {!todo.completed ? (
              <Text fontSize={"large"} textAlign={"center"} color={"gray.500"}>
                In progress
              </Text>
            ) : (
              <Text fontSize={"large"} textAlign={"center"} color={"gray.500"}>
                Done
              </Text>
            )}
          </Flex>
          <Text
            fontSize={"x-large"}
            color={todo.completed ? "green.500" : "yellow.500"}
            as="b"
            textDecoration={todo.completed ? "line-through" : "none"}
          >
            {todo.body}
          </Text>
        </Flex>

        <Flex gap={2} alignItems={"center"}>
          <Box
            color={"green.500"}
            cursor={"pointer"}
            onClick={() => updateTodo()}
          >
            {!isUpdating && <FaCheckCircle size={20} />}
            {isUpdating && <Spinner size={"sm"} />}
          </Box>
          <Box
            color={"red.500"}
            cursor={"pointer"}
            onClick={() => deleteTodo()}
          >
            {!isDeleting && <MdDelete size={25} />}
            {isDeleting && <Spinner size={"sm"} />}
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};
export default TodoItem;
