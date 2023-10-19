import { useQuery } from "@tanstack/react-query";
import { Link, useParams, } from "react-router-dom";
import { GetOfferingsByDateRange, GetOfferingsByMonth, GetOfferingsByOfferingNoAndMonth, GetOfferingsByYear, getMember } from "../../api";
import { IOffering, IOfferings, IDetailOffering } from "../../types";
import { Avatar, Box, Button, Flex, FormControl, HStack, Heading, Input, Select, Skeleton, Text, VStack } from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";
import { ChakraProvider } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { OfferingType, getOfferingType } from "../../lib/offeringType";
import { OfferingMethod } from "../../lib/offeringMethod";
import moment, { months } from "moment";
import getYearsArray from "../../lib/getYearsArray";
import getMonthsArray from "../../lib/getMonthsArray";
import { useEffect, useState } from "react";

export default function OfferingMyDateRangeList() {
    const { offeringNo } = useParams();
    const [selectedDateFrom, setSelectedDateFrom] = useState<string | null>(moment(Date.now()).format("YYYY-MM-DD").substring(0, 8) + "01");
    const [selectedDateTo, setSelectedDateTo] = useState<string | null>(moment(Date.now()).format("YYYY-MM-DD"));
    const { isLoading, data: Offerings } = useQuery<IOfferings>([`OfferingsByDateRange`, offeringNo, selectedDateFrom, selectedDateTo], GetOfferingsByDateRange);
    if (!isLoading) {
        for (var off of Offerings!.data) {
            let date_String: string = (moment(off.postingDate).format("YYYY-MM-DD"));
            off.postingDateString = date_String;
        }
        console.log("Offerings", Offerings)
    }
    const handleDateChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        if (name === 'DateFrom') {
            setSelectedDateFrom(value);
        }
        else if (name === 'DateTo') {
            setSelectedDateTo(value);
        }
    };
    const columnHelper = createColumnHelper<IDetailOffering>();
    const columns = [
        columnHelper.accessor("offeringNumber", {
            cell: (info) => info.getValue(),
            header: "Offering No.",
        }),
        columnHelper.accessor("offMethod", {
            cell: (info) => {
                return OfferingMethod[info.getValue()];
            },
            header: "Method",
        }),
        columnHelper.accessor("offType", {
            cell: (info) => {
                return OfferingType[info.getValue()];
            },
            header: "Type",
        }),
        columnHelper.accessor("description", {
            cell: (info) => info.getValue(),
            header: "Description"
        }),
        columnHelper.accessor("amount", {
            cell: (info) => info.getValue(),
            header: "Amount",
            meta: {
                isNumeric: true
            }
        }),
        columnHelper.accessor("postingDateString", {
            cell: (info) => info.getValue(),
            header: "Offering Date",
        }),
        // columnHelper.accessor("id", {
        //     cell: (info) => (
        //         <HStack>
        //             <Button size='sm' as='a' href={`/OfferingList/${info.getValue()}`}>View</Button>
        //             <Button size='sm' as='a' href={`/OfferingList/Update/${info.getValue()}`}>Edit</Button>
        //         </HStack>
        //     ),
        //     header: "",
        // }),

    ];
    return (

        <Box mt={10}
            pb={40}
            px={
                {
                    base: 10,
                    lg: 40
                }}
        >
            <Flex justifyContent={'space-between'} >
                <HStack width={"80%"} mt={-8} mb={5} >
                    <VStack>
                        <FormControl >
                            <label>From: </label>
                            <Input
                                required
                                name="DateFrom"
                                width={"150px"}
                                size="md"
                                type="date"
                                onChange={handleDateChange}
                                value={selectedDateFrom ?? undefined}
                            />
                        </FormControl>
                    </VStack>
                    <VStack>
                        <FormControl >
                            <label>To: </label>
                            <Input
                                required
                                name="DateTo"
                                width={"150px"}
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                                onChange={handleDateChange}
                                value={selectedDateTo ?? undefined}
                            />
                        </FormControl>
                    </VStack>
                </HStack>
            </Flex>
            {isLoading ? null : <DataTable columns={columns} data={Offerings!.data} />}
        </Box>
    );
}