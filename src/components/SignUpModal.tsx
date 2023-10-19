import { Button, Box, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure } from "@chakra-ui/react";
import SocialLogin from "./SocialLogin";
import { PiUserBold, PiLockBold, PiHandsPraying } from "react-icons/pi";
import { TbAbc, TbMail, TbPhone } from "react-icons/tb";

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
    return (
        <Modal motionPreset="slideInTop" onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sign Up</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
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
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><PiLockBold /></Box>
                            } />
                            <Input variant={"filled"} placeholder="Password Confirmation" />
                        </InputGroup>
                        <InputGroup mt={2}>
                            <InputLeftElement children={
                                <Box color="gray.500"><TbAbc /></Box>
                            } />
                            <Input variant={"filled"} placeholder="First Name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><TbAbc /></Box>
                            } />
                            <Input variant={"filled"} placeholder="Last Name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><PiUserBold /></Box>
                            } />
                            <Input variant={"filled"} placeholder="Korean Name" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><TbMail /></Box>
                            } />
                            <Input variant={"filled"} placeholder="Email" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><TbPhone /></Box>
                            } />
                            <Input variant={"filled"} placeholder="Phone Number" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement children={
                                <Box color="gray.500"><PiHandsPraying /></Box>
                            } />
                            <Input variant={"filled"} placeholder="Offering Number" />
                        </InputGroup>

                    </VStack>
                    <Button mt={4} w="100%" colorScheme={"pink"}>Sign Up</Button>
                    <SocialLogin />
                </ModalBody>
            </ModalContent>

        </Modal>);
}