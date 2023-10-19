import { Box, Grid, Heading, Image, VStack, Text, Button, Skeleton, SkeletonText } from "@chakra-ui/react";
import Member from "../components/Member";
import { useEffect, useState } from "react";
import MemberListSkeleton from "../components/MemberListSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api";
import { IMembers } from "../types"

export default function Members() {
    const { isLoading, data } = useQuery<IMembers>(["members"], getMembers)
    console.log(data);
    return (
        //"1fr", it will have the same size of room as much as possible automatically
        // <Grid mt={10} px={40} columnGap={4} rowGap={8} templateColumns={"repeat(5, 1fr)"}>
        <Grid mt={10} px={
            {
                base: 10,
                lg: 40
            }}
            columnGap={4}
            rowGap={8}
            templateColumns={{
                // Chakra's base is the mobile phone
                sm: "1fr",
                md: "1fr 1fr",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
                "2xl": "repeat(5, 1fr)"
            }}>
            {isLoading ?
                (
                    <>
                        <MemberListSkeleton />
                        <MemberListSkeleton />
                        <MemberListSkeleton />
                        <MemberListSkeleton />
                        <MemberListSkeleton />
                        <MemberListSkeleton />
                        <MemberListSkeleton />
                        <MemberListSkeleton />
                    </>
                ) : (
                    null
                )}

            {data?.data.map((member) => (
                <>
                    <Member
                        pk={member.id}
                        firstMidName={member.firstMidName}
                        lastName={member.lastName}
                        name={member.name}
                        offeringNumber={member.offeringNumber}
                    />
                </>
            ))}
        </Grid >
    );
}