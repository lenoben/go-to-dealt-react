import { Container, Stack } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";

export function confirmInput() {
  const confirmvalue = "lenoben";
  const userInput = prompt("Enter confirmation key:");
  if (userInput === confirmvalue) {
    return true;
  } else {
    alert("confirmation key is the github username");
    return false;
  }
}

function App() {
  return (
    <Stack h="100vh">
      <Navbar />
      <Container maxW={"900px"}>
        <TodoForm />
        <TodoList />
      </Container>
    </Stack>
  );
}

export default App;
