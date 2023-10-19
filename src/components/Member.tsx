import { Box, VStack, Image, Button, Grid, Text, HStack, useColorModeValue, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { IDetailMember } from "../types";
interface IMemberProps {
    pk: number,
    firstMidName?: string,
    lastName?: string,
    name?: string,
    email?: string,
    phoneNumber?: string,
    offeringNumber: number,
}

export default function Member({ pk, firstMidName, lastName, name, email, phoneNumber, offeringNumber }: IMemberProps) {
    const gray = useColorModeValue("gray.600", "gray.300");
    return (
        /* align element to the left */
        <Link to={`/MemberList/${pk}`} >
            <VStack alignItems={"flex-start"} >
                {/* <Box position="relative" overflow={"hidden"} mb={2} rounded="3xl">
                    <Avatar minH="250" minW="250" size={"lg"} />
                    <Button variant={"unstyled"} position="absolute" top={0} right={0} color="black">
                        <FaRegHeart size="20px" />
                    </Button>
                </Box> */}
                {/* // Make two elements closer */}
                <Box boxShadow='md' rounded='md' p='6' >
                    {/* Make a grid to place star icon to the right side with the gap to s represent the seperator 3:1 ratio = 3fr, 1fr */}
                    <Grid gap={2} templateColumns={"12fr 1fr"} >
                        <Text display={"black"} as="b" noOfLines={1} fontSize="md" color="pink.700">
                            {firstMidName} {lastName}
                        </Text>
                        <HStack
                            // The UnderBar means : colon. i.e. H1:hover.
                            _hover={{
                                color: "messenger.100"
                            }}
                            spacing={1}
                        >
                            <GrUserManager size="20px" />
                        </HStack>
                    </Grid>
                    {/* only one line is allowed with dot dot dot*/}
                    <Text fontSize={"sm"} color={gray}>
                        Name: {name}
                    </Text>
                    <Text fontSize={"sm"} color={gray}>
                        Email: {email}
                    </Text>
                    <Text fontSize={"sm"} color={gray}>
                        Phone: {phoneNumber}
                    </Text>
                    <Text fontSize={"sm"} color={gray}>
                        Offering: {offeringNumber}
                    </Text>
                </Box>


            </VStack>
        </Link>
    )
}