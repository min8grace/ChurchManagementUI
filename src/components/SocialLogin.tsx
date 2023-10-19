import { Box, Divider, HStack, Text, VStack, Button } from "@chakra-ui/react";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { FaComment } from "react-icons/fa";

export default function SocialLogin() {
    return (<Box mb={4}>
        <HStack>
            <Divider />
        //as="b" transforms to Html tag b, bold
            <Text textTransform={"uppercase"} color="gray.500" fontSize="xs" as="b">Or</Text>
            <Divider />
        </HStack>
        <VStack>
            <Button leftIcon={<BsFacebook />} colorScheme={"facebook"} w="100%">Continue with Facebook</Button>
            <Button leftIcon={<FaComment />} colorScheme={"yellow"} w="100%">Continue with Kakao</Button>
        </VStack>
    </Box>);
}