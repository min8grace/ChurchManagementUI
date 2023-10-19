import { useQuery } from "@tanstack/react-query";
import { Link, useParams, } from "react-router-dom";
import { GetOfferingsByMonth, GetOfferingsByOfferingNoAndMonth, GetOfferingsByYear, getMember } from "../../api";
import { IOffering, IOfferings, IDetailOffering } from "../../types";
import { Avatar, Box, Button, Flex, HStack, Heading, Select, Skeleton, Text, VStack } from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";
import { ChakraProvider } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { OfferingType, getOfferingType } from "../../lib/offeringType";
import { OfferingMethod } from "../../lib/offeringMethod";
import moment, { months } from "moment";
import getYearsArray from "../../lib/getYearsArray";
import getMonthsArray from "../../lib/getMonthsArray";
import { useEffect, useState } from "react";

export default function OfferingList() {
    const { offeringNo, year, month } = useParams();
    // const { isLoading: isLoadingMM, data: MMData } = useQuery<IOffering>([`offeringsByMonth`, year, month], GetOfferingsByMonth);
    // const { isLoading: isLoadingYY, data: YYData } = useQuery<IOffering>([`offeringsByYear`, year], GetOfferingsByYear);
    // const { isLoading: isLoadingIdYYMM, data: IdYYMMData } = useQuery<IOffering>([`offeringsByOfferingNoAndMonth`, offeringNo, year, month], GetOfferingsByOfferingNoAndMonth);

    const [selectedYear, setSelectedYear] = useState<string | null>(new Date().getFullYear().toString()); // Initial state is null, indicating no month is selected
    const [selectedMonth, setSelectedMonth] = useState<string | null>(new Date().getMonth().toString()); // Initial state is null, indicating no month is selected
    const { isLoading, data: Offerings } = useQuery<IOfferings>([`offeringsByMonth`, selectedYear, selectedMonth], GetOfferingsByMonth);
    if (!isLoading) {
        for (var off of Offerings!.data) {
            let date_String: string = (moment(off.postingDate).format("YYYY-MM-DD"));
            off.postingDateString = date_String;
        }
    }
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedYear(selectedValue);
    };
    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedMonth(selectedValue);
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
        columnHelper.accessor("id", {
            cell: (info) => (
                <HStack>
                    <Button size='sm' as='a' href={`/OfferingList/${info.getValue()}`}>View</Button>
                    <Button size='sm' as='a' href={`/OfferingList/Edit/${info.getValue()}`}>Edit</Button>
                </HStack>
            ),
            header: "",
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
                    <Select width={"125px"} placeholder={selectedYear ?? undefined} onChange={handleYearChange} value={selectedMonth ?? undefined}>{
                        getYearsArray().map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))
                    }</Select>
                    <Select width={"125px"} placeholder={selectedMonth ?? undefined} onChange={handleMonthChange} value={selectedYear ?? undefined}>{
                        getMonthsArray().map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))
                    }</Select>
                </HStack>
                <HStack width={"10%"} mt={-8} mb={5} >
                    <Button width={"70px"} size='md' as='a' href={`/OfferingList/Create`}>Add</Button>
                </HStack>
            </Flex>

            {isLoading ? null : <DataTable columns={columns} data={Offerings!.data} />}
        </Box>
    );
}