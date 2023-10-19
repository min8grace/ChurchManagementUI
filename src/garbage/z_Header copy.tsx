import {
    Box, Button, HStack, IconButton, useDisclosure, Image, LightMode,
    useColorMode,
    useColorModeValue, Stack, Avatar, Menu, MenuButton, MenuList, MenuItem, useToast, Flex, MenuDivider
} from "@chakra-ui/react";
import { PiChurch } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignUpModal from "../components/SignUpModal";
import { BsLightbulbOff, BsLightbulb } from "react-icons/bs";
import LogoImg from "../components/Logo";
import { Text } from "@chakra-ui/react";
import useUser from "../lib/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { logOut } from "../api";
import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
// import { userData } from "../helpers/Authentication";

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
    const logoColor = useColorModeValue("grey", "grey.200");
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
    interface Props {
        children: React.ReactNode;
        to: string;
    }
    // const Links = ['Members', 'Offering', 'About']
    const Links = [
        { label: 'Members', to: '/MemberList/' },
        { label: 'Offering', to: '/Offerings/' },
        { label: 'About', to: '/About/' },
    ];
    const NavLink = ({ children, to }: Props) => {
        // const { children } = props

        return (
            <Box
                as="a"
                px={2}
                py={1}
                rounded={'md'}
                _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                }}
                href={to}>
                {children}
            </Box>
        )
    }
    // if (userData) {
    //     console.log('User information:', userData);
    //     // Use userData for further processing (e.g., displaying user details)
    // }
    return (
        <>
            <Box px={4}>
                <Flex py={3} alignItems={'center'} justifyContent={'space-between'}
                // justifyContent={"space-between"}
                // py={5}
                // px={10}
                // alignItems="center"
                // direction={{
                //     sm: "column",
                //     md: "row"
                // }}
                // borderBottomWidth={1}
                >
                    <IconButton
                        size={'md'}
                        icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isMenuOpen ? onMenuClose : onMenuOpen}
                    />
                    <HStack spacing={8} color={logoColor} alignItems={'center'}>
                        <Box>
                            <Link to={"/"}>
                                <LogoImg />
                            </Link>
                        </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.label} to={link.to}>{link.label}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                // name={user?.name}
                                // src={user?.avatar}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>

                    {/* <HStack alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
                        <IconButton onClick={toggleColorMode} variant={"ghost"} aria-label="Toggle dark mode" icon={<Icon />} />
                        {
                            isLoggedInNow() ? (
                                <></>) : (<Menu>
                                    <MenuButton>
                                        <Avatar size={"md"} />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem onClick={onLogOut}>Log out</MenuItem>
                                    </MenuList>
                                </Menu>)
                        }
                    </HStack > */}
                    <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
                    <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
                </Flex  >
                {isMenuOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.label} to={link.to}>{link.label}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

        </>
    );
}

interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Inspiration',
        children: [
            {
                label: 'Explore Design Work',
                subLabel: 'Trending Design to inspire you',
                href: '#',
            },
            {
                label: 'New & Noteworthy',
                subLabel: 'Up-and-coming Designers',
                href: '#',
            },
        ],
    }
]