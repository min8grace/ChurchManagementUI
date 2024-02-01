import { useQuery } from "@tanstack/react-query";
import { useParams, } from "react-router-dom";
import { getMember } from "../../api";
import { IMember } from "../../types";
import { Avatar, Box, HStack, Heading, Skeleton, Text, VStack } from "@chakra-ui/react";
import moment from "moment";

export default function DetailMember() {
    const { memberPk } = useParams();
    const { isLoading, data } = useQuery<IMember>([`member`, memberPk], getMember);

    return (<Box mt={10}
        pb={40}
        px={
            {
                base: 10,
                lg: 40
            }}
    >
        <HStack width={"40%"} justifyContent={"space-between"} mt={10}>
            <VStack alignItems={"flex-start"}>
                <Skeleton isLoaded={!isLoading} height={"100%"}>
                    <Heading fontSize={"2xl"} color={"gray"}>
                        {data?.data?.name}
                    </Heading>
                </Skeleton>
            </VStack>
            <Avatar name={data?.data.lastName} size={"lg"} />
        </HStack>
        <HStack width={"50%"} >
            <VStack spacing={5} alignItems={"flex-start"} >
                <Skeleton isLoaded={!isLoading} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>First Name : {data?.data?.firstMidName}</Text></Skeleton>
                <Skeleton isLoaded={!isLoading} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Last Name : {data?.data?.lastName}</Text></Skeleton>
                <Skeleton isLoaded={!isLoading} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>E-mail: {data?.data?.email}</Text></Skeleton>
                <Skeleton isLoaded={!isLoading} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Phone : {data?.data?.phoneNumber}</Text></Skeleton>
                <Skeleton isLoaded={!isLoading} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Offering number : {data?.data?.offeringNumber}</Text></Skeleton>
                <Skeleton isLoaded={!isLoading} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Registration Date : {moment(data?.data?.registrationDate).format("YYYY-MM-DD")}</Text></Skeleton>
            </VStack>
        </HStack>
    </Box>
    );
}