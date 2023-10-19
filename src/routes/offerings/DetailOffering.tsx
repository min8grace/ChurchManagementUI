import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, } from "react-router-dom";
import { IUpdateOfferingVariable, getMember, getOfferingById, updateOffering } from "../../api";
import { IMember, IOffering, IDetailOffering } from "../../types";
import { Avatar, Box, Button, Container, Editable, EditableInput, EditablePreview, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, NumberInput, NumberInputField, Select, Skeleton, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import moment from "moment";
import { OfferingType } from "../../lib/offeringType";
import { OfferingMethod } from "../../lib/offeringMethod";
import { useForm } from "react-hook-form";

export default function DetailOffering() {
    const { offeringPk } = useParams();
    const { isLoading: isLoadingOffering, data: offeringData } = useQuery<IOffering>([`offering`, offeringPk], getOfferingById);
    const { isLoading: isLoadingMember, data: memberData } = useQuery<IMember>([`member`, offeringData?.data.memberId], getMember);
    const { register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<IUpdateOfferingVariable>();
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(updateOffering, {
        onSuccess: (data: IOffering) => {
            toast({
                status: "success",
                title: "Offering created",
                position: "bottom-right",
            });
            navigate(`/OfferingList/${data.data.id}`)
        },
    });
    const onSubmit = (data: IUpdateOfferingVariable) => {
        data.offMethod = Number(data.offMethod);
        data.offType = Number(data.offType);
        mutation.mutate(data);
    };
    return (<Box mt={10}
        pb={40}
        px={
            {
                base: 10,
                lg: 40
            }}
    >
        {isLoadingOffering ? null :
            <Container>
                <Heading textAlign={"center"}>Offering Detail</Heading>
                <VStack
                    spacing={10}
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                    mt={5}
                >
                    <FormControl>
                        <FormLabel>Offering no.</FormLabel>
                        <Input
                            {...register("offeringNumber", { required: "Please enter the offering number" })}
                            type="number"
                            min={0}
                            isReadOnly={true}
                            defaultValue={offeringData?.data.offeringNumber}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Offering Method</FormLabel>
                        <Input
                            {...register("offMethod")}
                            type="text"
                            isReadOnly={true}
                            defaultValue={OfferingMethod[Number(offeringData?.data.offMethod)]}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Offering Type</FormLabel>
                        <Input
                            {...register("offType")}
                            type="text"
                            isReadOnly={true}
                            defaultValue={OfferingType[Number(offeringData?.data.offType)]}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            {...register("description", { required: true })}
                            defaultValue={offeringData?.data.description}
                            isReadOnly={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <Input
                            {...register("amount", { required: true })}
                            type="number"
                            min={0}
                            defaultValue={offeringData?.data.amount}
                            isReadOnly={true}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Offering Date</FormLabel>
                        <Input
                            {...register("postingDate", { required: "Please enter the date" })}
                            type="date"
                            defaultValue={offeringData?.data.postingDate.toString().substring(0, 10)}
                            isReadOnly={true}
                        />
                    </FormControl>
                    {mutation.isError ? (
                        <Text color="red.500">Something went wrong</Text>
                    ) : null}
                </VStack>
            </Container>
        }
    </Box >
    );
}