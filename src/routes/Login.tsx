import { Button, Box, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure, AbsoluteCenter, Container } from "@chakra-ui/react";
import SocialLogin from "../components/SocialLogin";
import { PiUserBold, PiLockBold } from "react-icons/pi";
import { usernameLogIn } from "../api";
import { ILogin } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Login() {
    // const { isLoading, data } = useQuery<IData>(["members"], getMembers)
    //console.log(data);
    // const onLogIn = async () => {

    //     await logIn();
    //     const { isLoading, data, isError } = useQuery<ILogin>(["logInToken"], logIn, {
    //         retry: false,
    //     });
    //     console.log(data);
    // }

    // const handleLogin = () => {
    //     // Call the login function with username and password
    //     usernameLogIn("string", "string")
    //         .then((data) => {
    //             // Handle successful login response here
    //             console.log('Login successful', data);
    //             // Redirect or perform other actions upon successful login
    //         })
    //         .catch((error) => {
    //             // Handle login error here
    //             console.error('Login failed', error);
    //             // Display error message or perform other actions upon login failure
    //         });
    // };

    return (

        <Container h='100%' w='100%' >
            <AbsoluteCenter mt={"60"} w='350px'>
                <VStack alignItems={"flex-start"}>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.500"><PiUserBold /></Box>
                        } />
                        <Input variant={"filled"} placeholder="Username" />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement children={
                            <Box color="gray.500"><PiLockBold /></Box>
                        } />
                        <Input variant={"filled"} placeholder="Password" />
                    </InputGroup>

                </VStack>
                {/* <Button mt={4} w="100%" colorScheme={"cyan"} onClick={handleLogin}>Log in</Button> */}
                <SocialLogin />
            </AbsoluteCenter>
        </Container >);
}