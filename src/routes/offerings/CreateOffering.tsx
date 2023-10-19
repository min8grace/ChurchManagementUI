import { Mutation, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, } from "react-router-dom";
import { ICreateOfferingVariable, createOffering, getMember, getOfferingById } from "../../api";
import { IMember, IOffering, IDetailOffering } from "../../types";
import { Avatar, Box, Button, Container, Editable, EditableInput, EditablePreview, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, NumberInput, NumberInputField, Select, Skeleton, Text, Textarea, VStack, useToast } from "@chakra-ui/react";
import moment from "moment";
import { OfferingMethod } from "../../lib/offeringMethod";
import { useForm } from "react-hook-form";
import { OfferingType } from "../../lib/offeringType";

export default function CreateOffering() {
    // const { offeringPk } = useParams();
    // const { isLoading: isLoadingOffering, data: offeringData } = useQuery<IOffering>([`offering`, offeringPk], getOfferingById);
    // const { isLoading: isLoadingMember, data: memberData } = useQuery<IMember>([`member`, offeringData?.data.memberId], getMember);
    const { register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<ICreateOfferingVariable>();
    const toast = useToast();
    const navigate = useNavigate();
    const mutation = useMutation(createOffering, {
        onSuccess: (data: IOffering) => {
            toast({
                status: "success",
                title: "Offering created",
                position: "bottom-right",
            });
            navigate(`/OfferingList/${data.data.id}`)
        },
    });
    const onSubmit = (data: ICreateOfferingVariable) => {
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

        <Container>
            <Heading textAlign={"center"}>Add Offering</Heading>
            <VStack
                spacing={10}
                as="form"
                onSubmit={handleSubmit(onSubmit)}
                mt={5}
            >
                <FormControl>
                    <FormLabel>Offering no.</FormLabel>
                    <Input
                        {...register("offeringNumber", { required: true })}
                        type="number"
                        required
                        min={0}
                    />
                    {/* <FormHelperText>Write your offering number</FormHelperText> */}
                </FormControl>

                <FormControl>
                    <FormLabel>Offering Method</FormLabel>
                    <Select
                        {...register("offMethod", { required: true })}
                        placeholder="Choose an offering method">

                        {Object.keys(OfferingMethod).map((value, key) =>
                            isNaN(Number(value)) ? null :
                                <option key={Number(value)} value={Number(value)}>{OfferingMethod[Number(value)]}</option>
                        )}
                    </Select>
                    {/* <FormHelperText>Write your offering number</FormHelperText> */}
                </FormControl>
                <FormControl>
                    <FormLabel>Offering Type</FormLabel>
                    <Select
                        {...register("offType", { required: true })}
                        placeholder="Choose an offering type">

                        {Object.keys(OfferingType).map((value, key) =>
                            isNaN(Number(value)) ? null :
                                <option key={Number(value)} value={Number(value)}>{OfferingType[Number(value)]}</option>
                        )}
                    </Select>
                    {/* <FormHelperText>Write your offering number</FormHelperText> */}
                </FormControl>

                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea {...register("description", { required: true })} />
                    {/* <FormHelperText>Write your offering number</FormHelperText> */}
                </FormControl>

                <FormControl>
                    <FormLabel>Amount</FormLabel>
                    <Input
                        {...register("amount", { required: true })}
                        required
                        type="number"
                        min={0}

                    />
                    {/* <FormHelperText>Write your offering number</FormHelperText> */}
                </FormControl>


                <FormControl>
                    <FormLabel>Offering Date</FormLabel>
                    <Input
                        {...register("postingDate", { required: true })}
                        required
                        type="date"
                    />
                    {/* <FormHelperText>Write your offering number</FormHelperText> */}
                </FormControl>
                {mutation.isError ? (
                    <Text color="red.500">Something went wrong</Text>
                ) : null}
                <Button
                    type="submit"
                    isLoading={mutation.isLoading}
                    colorScheme={"pink"}
                    size="lg"
                    w="100%"
                >Save</Button>
            </VStack>
        </Container>

    </Box >
    );
}