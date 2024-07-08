import {
  Box,
  Flex,
  Button,
  useColorModeValue,
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
      <Box
        bg={useColorModeValue("gray.400", "gray.700")}
        px={4}
        my={4}
        borderRadius={"5"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* LEFT SIDE */}
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            display={{ base: "none", sm: "flex" }}
          >
            <img src="/react.png" alt="logo" width={50} height={50} />
            <Text fontSize={"40"}>+</Text>
            <img src="/go.png" alt="logo" width={40} height={40} />
            <Text fontSize={"40"}>=</Text>
            <img src="/explode.png" alt="logo" width={50} height={50} />
            {/* <div className="animated-component">
              Shaking and Bouncing Component
            </div> */}
          </Flex>

          {/* RIGHT SIDE */}
          <Flex alignItems={"center"} gap={3}>
            <Text fontSize={"lg"} fontWeight={500}>
              To Dealt Tasks
            </Text>
            <a href="https://github.com/lenoben" target="_blank">
              <div className="animate-shake">
                <FaGithub size={50} />
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
