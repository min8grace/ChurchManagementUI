import {
    Box, Button, HStack, IconButton, useDisclosure, Image, LightMode,
    useColorMode,
    useColorModeValue, Stack, Avatar, Menu, MenuButton, MenuList, MenuItem, useToast, Flex
} from "@chakra-ui/react";
import { PiChurch } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsLightbulbOff, BsLightbulb } from "react-icons/bs";
import { Text } from "@chakra-ui/react";
import useUser from "../lib/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { logOut } from "../api";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import LoginModal from "./z_LoginModal copy";
import SignUpModal from "../components/SignUpModal";
import LogoImg from "../components/Logo";

export default function z_Header() {
    const getToken = (): string | null => {
        return localStorage.getItem('logged_user');
    };
    const { userLoading, isLoggedIn, user } = useUser();

    // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios. 
    // It can be used to control feedback component such as Modal, AlertDialog, Drawer, etc.
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { isOpen: isMenuOpen, onOpen: onMenuClose, onClose: onMenuOpen } = useDisclosure()
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("messenger.500", "messenger.200");
    const Icon = useColorModeValue(BsLightbulbOff, BsLightbulb);
    const toast = useToast();
    const queryClient = useQueryClient();
    const onLogOut = async () => {
        const toastId = toast({
            title: "Log out...",
            description: "See ya",
            status: "loading",
            position: "bottom-right",
        });
        await removeItem();
        toast.update(toastId, {
            status: "success",
            title: "Done!",
            description: "See you later",
        });
    }
    const [tokenRemoved, setTokenRemoved] = useState(false);
    const removeItem = () => {
        localStorage.removeItem("logged_user");
        setTokenRemoved(true);
    };
    const isLoggedInNow = () => {
        console.log(`getToken() === null:  ${getToken() === null}`);
        return getToken() === null;
    };
    return (
        <Flex
            justifyContent={"space-between"}
            py={5}
            px={10}
            alignItems="center"
            direction={{
                sm: "column",
                md: "row"
            }}
            // spacing={{
            //     sm: 3,
            //     md: 0,
            // }}
            borderBottomWidth={1}
        >
            <IconButton
                size={'md'}
                icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isMenuOpen ? onMenuClose : onMenuOpen}
            />
            <HStack color={logoColor}>
                <Link to={"/"}>
                    <LogoImg />
                </Link>
                {/* <Text as='b' fontSize={"lg"} color={logoColor}>
                    GRACEWAY CHURCH
                </Text> */}
            </HStack>
            <HStack spacing={2}>
                <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon />} />
                {
                    isLoggedInNow() ? (
                        <>
                            <Button onClick={onLoginOpen}>Log in</Button>
                            <LightMode>
                                <Button onClick={onSignUpOpen} colorScheme={"purple"}>Sign up</Button>
                            </LightMode>
                        </>) : (<Menu>
                            <MenuButton>
                                <Avatar size={"md"} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>)
                }
                {/* {!userLoading ? (
                    !isLoggedIn ? (
                        <>
                            <Button onClick={onLoginOpen}>Log in</Button>
                            <LightMode>
                                <Button onClick={onSignUpOpen} colorScheme={"purple"}>Sign up</Button>
                            </LightMode>
                        </>
                    ) : (
                        <Menu>
                            <MenuButton>
                                <Avatar size={"md"} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={onLogOut}>Log out</MenuItem>
                            </MenuList>
                        </Menu>

                    )
                ) : null} */}
            </HStack>
            <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
            <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
        </Flex  >
    );
}