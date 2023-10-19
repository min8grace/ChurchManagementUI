import { useQuery } from "@tanstack/react-query";
import { Link, useParams, } from "react-router-dom";
import { GetOfferingsByDateRange, GetOfferingsByMonth, GetOfferingsByOfferingNoAndMonth, GetOfferingsByOfferingNoAndYear, GetOfferingsByYear, getMember } from "../../api";
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

export default function OfferingMyYearlyList() {
    const { offeringNo } = useParams();
    const [selectedYear, setSelectedYear] = useState<string | null>(new Date().getFullYear().toString()); // Initial state is null, indicating no month is selected
    const { isLoading, data: Offerings } = useQuery<IOfferings>([`GetOfferingsByOfferingNoAndYear`, offeringNo, selectedYear], GetOfferingsByOfferingNoAndYear);

    if (!isLoading) {
        for (var off of Offerings!.data) {
            let date_String: string = (moment(off.postingDate).format("YYYY-MM-DD"));
            off.postingDateString = date_String;
        }
        console.log("Offerings", Offerings)
    }
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedYear(selectedValue);
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
                    <Select width={"125px"} placeholder={selectedYear ?? undefined} onChange={handleYearChange} value={selectedYear ?? undefined}>{
                        getYearsArray().map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))
                    }</Select>
                </HStack>
            </Flex >
            {isLoading ? null : <DataTable columns={columns} data={Offerings!.data} />}
        </Box >
    );
}