import { AbsoluteCenter, Box, Container, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import checkLoggedIn from "../lib/checkLoggedIn";
import Login from "./Login";

export default function Home() {
    const inLoggedIn = checkLoggedIn();
    return (
        <>
            {
                // (!inLoggedIn) ? (<Login></Login>) : (
                <Container w='90%' maxW='container.sm' alignItems={'center'} >
                    <Box mt='100px' >
                        <Heading size='4xl' mb={14} color='gray.600'>WELCOME TO GRACEWAY CHURCH </Heading >
                        <HStack>
                            <Box w='60%'></Box>
                            <Box w='40%' color='pink.600'>
                                <Text fontSize='xl' as='b'>
                                    은혜로 받은 구원
                                </Text>
                                <Text fontSize='md' >
                                    SALVATION BY GRACE
                                </Text>
                                <Text fontSize='xl' as='b'>
                                    은혜로 세운 교회
                                </Text>
                                <Text fontSize='md'>
                                    CHURCH OF GRACE
                                </Text>
                                <Text fontSize='xl' as='b'>
                                    은헤로 사는 성도
                                </Text>
                                <Text fontSize='md'>
                                    LIFE IN GRACE
                                </Text>
                            </Box>
                        </HStack>
                    </Box >
                </Container >
                // )
            }
        </>
    );
}
