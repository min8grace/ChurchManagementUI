import { Button, Box, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure, useToast } from "@chakra-ui/react";
import { PiUserBold, PiLockBold } from "react-icons/pi";
import {
    IUsernameLoginError,
    IUsernameLoginSuccess,
    IUsernameLoginVariables,
    usernameLogIn,
} from "../api";
import { ILogin } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { redirect } from 'react-router-dom';
import { useForm } from "react-hook-form";
import SocialLogin from "../components/SocialLogin";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}
interface IForm {
    username: string;
    password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    // const { isLoading, data } = useQuery<IData>(["members"], getMembers)
    //console.log(data);
    // const onLogIn = async () => {

    //     await logIn();
    //     const { isLoading, data, isError } = useQuery<ILogin>(["logInToken"], logIn, {
    //         retry: false,
    //     });
    //     console.log(data);
    // }
    // const [username, SetUsername] = useState("");
    // const [password, SetPassword] = useState("");
    // const onChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    //     const { name, value } = event.currentTarget;
    //     if (name === "username") {
    //         SetUsername(value);
    //     } else if (name === "password") {
    //         SetPassword(value);
    //     }
    // }
    // const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     handleLogin(username, password);
    // }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IForm>();

    // console.log(watch());
    console.log("errors", errors);
    const toast = useToast();
    const queryClient = useQueryClient();
    const mutation = useMutation(usernameLogIn, {
        onMutate: () => {
            console.log("mutation starting");
        },
        onSuccess: (data) => {
            toast({
                title: "welcome back!",
                status: "success",
            });
            //onClose();
            //queryClient.refetchQueries(["me"]);
        },
        onError: (error) => {

            console.log("mutation has an error");

        },
    });
    const onSubmit = ({ username, password }: IForm) => {
        setTimeout(() => { console.log('World!'); }, 2000);
        mutation.mutate({ username, password });

    };

    // const handleLogin = async (username: string, password: string) => {
    //     // const history = useHistory();
    //     // Call the login function with username and password
    //     let successfulLogin = false;
    //     const result = await usernameLogIn(username, password)
    //         .then((data) => {
    //             // Handle successful login response here
    //             console.log('Login successful', data);
    //             successfulLogin = true;
    //             // Redirect or perform other actions upon successful login
    //             // history.PUSH('/');
    //         })
    //         .catch((error) => {
    //             // Handle login error here
    //             console.error('Login failed', error);
    //             // Display error message or perform other actions upon login failure
    //         });
    //     console.log('successfulLogin', successfulLogin);
    //     return (successfulLogin) ? redirect('/offerings') : null;
    // };

    return (
        <Modal motionPreset="slideInTop" onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                    <VStack>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><PiUserBold /></Box>
                            } />
                            <Input
                                // required
                                // name="username"
                                // onChange={onChange}
                                // value={username}
                                isInvalid={Boolean(errors.password?.message)}
                                {...register("password", {
                                    required: "Please write a password",
                                })}
                                variant={"filled"}
                                placeholder="Username"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><PiLockBold /></Box>
                            } />
                            <Input
                                // required
                                // name="password"
                                // onChange={onChange}
                                // value={password}
                                isInvalid={Boolean(errors.username?.message)}
                                {...register("username", {
                                    required: "Please write a username",
                                })}
                                type="password"
                                variant={"filled"}
                                placeholder="Password"
                            />
                        </InputGroup>

                    </VStack>
                    <Button isLoading={mutation.isLoading} mt={4} w="100%" colorScheme={"pink"} type="submit">Log in</Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>

        </Modal >);
}