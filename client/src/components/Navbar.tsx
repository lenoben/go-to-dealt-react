import {
  Box,
  Flex,
  Button,
  useColorMode,
  Text,
  Container,
} from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"900px"}>
      <Box my={4} borderRadius={"5"} p={2}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* LEFT SIDE */}
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <Flex direction="column">
              <Text fontSize={"xx-large"} as="b">
                Tasks to be dealt with
              </Text>
              <Text fontSize={"medium"} as="i">
                <a
                  href="https://github.com/lenoben"
                  target="_blank"
                  className="link"
                >
                  Github.com/lenoben
                </a>
              </Text>
            </Flex>
          </Flex>

          {/* RIGHT SIDE */}
          <Flex alignItems={"center"} gap={3}>
            <a href="https://github.com/lenoben" target="_blank">
              <div className="animate-shake logo-card">
                <FaGithub size={20} />
              </div>
            </a>
            {/* Toggle Color Mode */}
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Container>
  );
}
