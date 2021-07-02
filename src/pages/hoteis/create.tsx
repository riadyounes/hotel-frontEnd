import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";

type CreateHotelFormData = {
  name: string;
};

const CreateHotelFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
});

export default function CreateHotel() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateHotelFormSchema),
  });

  const { errors } = formState;

  const handleCreateHotel: SubmitHandler<CreateHotelFormData> = async (
    values
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" mx="auto" maxWidth={1480} px="6">
        <SideBar />
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
          onSubmit={handleSubmit(handleCreateHotel)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Criar hospede
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="name"
                label="Nome do Hotel"
                error={errors.name}
                {...register("name")}
              />
              <Input name="classificacao" label="Classificação" type="number" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input name="logradouro" label="Rua" />
              <Input name="numero" type="number" label="Número" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input name="complemento" label="Complemento" />
              <Input name="cidade" label="Cidade" />
              <Input name="estado" label="Estado" />
            </SimpleGrid>
            
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/hoteis">
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
