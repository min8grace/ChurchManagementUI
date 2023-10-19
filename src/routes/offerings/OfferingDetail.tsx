import { useQuery } from "@tanstack/react-query";
import { useParams, } from "react-router-dom";
import { getMember, getOfferingById } from "../../api";
import { IMember, IOffering } from "../../types";
import { Avatar, Box, Editable, EditableInput, EditablePreview, HStack, Heading, Skeleton, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import { OfferingType } from "../../lib/offeringType";
import { OfferingMethod } from "../../lib/offeringMethod";

export default function OfferingDetail() {
    const { offeringPk } = useParams();
    const { isLoading: isLoadingOffering, data: offeringData } = useQuery<IOffering>([`offering`, offeringPk], getOfferingById);
    const { isLoading: isLoadingMember, data: memberData } = useQuery<IMember>([`member`, offeringData?.data.memberId], getMember);
    let temp: string = "abc";
    return (<Box mt={10}
        pb={40}
        px={
            {
                base: 10,
                lg: 40
            }}
    >
        {isLoadingOffering ? null :
            <>
                <HStack width={"50%"} justifyContent={"space-between"} mt={10}>
                    <VStack alignItems={"flex-start"}>
                        <Skeleton isLoaded={!isLoadingOffering} height={"100%"}>
                            <Heading fontSize={"2xl"} color={"gray"}>
                                {memberData?.data.firstMidName} {memberData?.data.lastName}
                            </Heading>
                        </Skeleton>
                    </VStack>
                    <Avatar name={memberData?.data.lastName} size={"lg"} />
                </HStack>
                <HStack width={"50%"} >
                    <VStack spacing={5} alignItems={"flex-start"}>
                        <Skeleton isLoaded={!isLoadingOffering} height={"100%"}>
                            {/* <Editable defaultValue={memberData?.data!.name}>
                                Name :
                                <EditablePreview />
                                <EditableInput />
                            </Editable> */}
                            <Text fontSize={"sm"} color={"gray.600"}>Name : {memberData?.data.name}</Text>
                        </Skeleton>
                        <Skeleton isLoaded={!isLoadingOffering} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Offering no. : {offeringData?.data?.offeringNumber}</Text></Skeleton>
                        <Skeleton isLoaded={!isLoadingOffering} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Method : {OfferingMethod[offeringData!.data?.offMethod]}</Text></Skeleton>
                        <Skeleton isLoaded={!isLoadingOffering} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Type: {OfferingType[offeringData!.data?.offType]}</Text></Skeleton>
                        <Skeleton isLoaded={!isLoadingOffering} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Description : {offeringData?.data?.description}</Text></Skeleton>
                        <Skeleton isLoaded={!isLoadingOffering} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Amount : {offeringData?.data?.amount}</Text></Skeleton>
                        <Skeleton isLoaded={!isLoadingOffering} height={"100%"}><Text fontSize={"sm"} color={"gray.600"}>Date : {moment(offeringData?.data?.postingDate).format("YYYY-MM-DD")}</Text></Skeleton>
                    </VStack>
                </HStack>
            </>
        }
    </Box >
    );
}