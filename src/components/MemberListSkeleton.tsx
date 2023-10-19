import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function MemberListSkeleton() {

    return (
        <Box>
            <Skeleton height='150px' width='300px' rounded='md' p='6'></Skeleton>


            {/* Default of SkeletonText is 3 lines */}
            {/* <SkeletonText w={"60%"} noOfLines={1} mb={7} />
            <SkeletonText w={"80%"} noOfLines={2} mb={7} />
            <SkeletonText w={"60%"} noOfLines={1} mb={7} /> */}
        </Box >
    );
}