import {
    Box, Button, HStack, IconButton, useDisclosure, Image, LightMode,
    useColorMode,
    useColorModeValue, Stack, Avatar, Menu, MenuButton, MenuList, MenuItem, useToast, Flex, MenuDivider, Collapse, Icon, Popover, PopoverTrigger, PopoverContent, MenuGroup
} from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { BsLightbulbOff, BsLightbulb } from "react-icons/bs";
import LogoImg from "./Logo";
import useUser from "../lib/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { DesktopNav, MobileNav } from "./Navs";
import { IUser } from "../types";

export default function Header() {
    const getToken = (): string | null => {
        return localStorage.getItem('logged_user');
    };
    const { userLoading, isLoggedIn, user } = useUser();

    // useDisclosure is a custom hook used to help handle common open, close, or toggle scenarios. 
    // It can be used to control feedback component such as Modal, AlertDialog, Drawer, etc.
    // const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
    const { isOpen: isSignUpOpen, onClose: onSignUpClose, onOpen: onSignUpOpen } = useDisclosure();
    const { isOpen: isHamburgerOpen, onToggle } = useDisclosure()
    const { toggleColorMode } = useColorMode();
    const logoColor = useColorModeValue("grey", "grey.200");
    const Icon = useColorModeValue(BsLightbulbOff, BsLightbulb);
    const toast = useToast();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const onLogOut = async () => {
        const toastId = toast({
            title: "Log out...",
            description: "See ya",
            status: "loading",
            position: "bottom-right",
        });
        await removeToken();
        //queryClient.fetchQuery(["me"]);
        queryClient.clear();
        //window.location.reload();
        navigate(`/`);
        toast.update(toastId, {
            status: "success",
            title: "Logout Success!",
            description: "See you later",
        });

    }
    const [tokenRemoved, setTokenRemoved] = useState(false);
    const removeToken = () => {
        localStorage.removeItem("logged_user");
        localStorage.removeItem("offNum");
        setTokenRemoved(true);
    };

    interface Props {
        children: React.ReactNode;
        to: string;
    }

    return (
        <>
            <Box px={4}>
                <Flex py={3} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        onClick={onToggle}
                        icon={isHamburgerOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        display={{ md: 'none' }}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                    <HStack spacing={8} color={logoColor} alignItems={'center'}>
                        <Box>
                            <Link to={"/"}>
                                <LogoImg />
                            </Link>
                        </Box>
                        {
                            !userLoading ? (
                                !isLoggedIn ?
                                    (
                                        <>
                                        </>)
                                    :
                                    (
                                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                                            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                                                <DesktopNav user={user} />
                                                {/* <DesktopNav user={user} /> */}
                                            </Flex>
                                        </HStack>
                                    )
                            ) : null
                        }
                    </HStack>
                    <Flex alignItems={'center'}>
                        {
                            !userLoading ? (
                                !isLoggedIn ?
                                    (
                                        <>
                                            <Button onClick={onLoginOpen} mx={"1"} size='sm'>Log in</Button>
                                            <Button onClick={onSignUpOpen} colorScheme={"blackAlpha"} mx={"1"} size='sm'>Sign up</Button>
                                        </>)
                                    :
                                    (
                                        <Menu>
                                            <MenuButton
                                                as={Button}
                                                rounded={'full'}
                                                variant={'link'}
                                                cursor={'pointer'}
                                                minW={0}>
                                                <Avatar
                                                    size={'sm'}
                                                    name={user?.data!.firstMidName}
                                                // src={user?.avatar}
                                                />
                                            </MenuButton>
                                            <MenuList>
                                                <MenuGroup title={`Hi, ${user?.data!.firstMidName}`}>
                                                    <MenuItem onClick={onLogOut}>Log out</MenuItem>
                                                </MenuGroup>

                                                {/* <MenuItem>Link 2</MenuItem>
                                            <MenuDivider />
                                            <MenuItem>Link 3</MenuItem> */}
                                            </MenuList>
                                        </Menu>
                                    )
                            ) : null
                        }
                    </Flex>
                    <LoginModal isOpen={isLoginOpen} onClose={() => { onLoginClose(); }} />
                    <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
                </Flex  >
                <Collapse in={isHamburgerOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
            </Box>
        </>
    );
}