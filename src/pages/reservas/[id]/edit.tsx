import { useRouter } from "next/router";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Input } from "components/Form/Input";
import { Header } from "components/Header";
import { SideBar } from "components/SideBar";
import { useState, useEffect, useCallback } from "react";
import { api } from "services/api";

const EditReservaFormSchema = yup.object().shape({
  data_entrada: yup.date().required("Data de entrada é obrigatória"),
  data_saida: yup.date().required("Data de saida é obrigatória"),
  preco: yup.number().required("Preço é obrigatório"),
});

export default function EditReserva() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [data_entrada, setData_entrada] = useState("");
  const [data_saida, setData_saida] = useState("");
  const [preco, setPreco] = useState(0);
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(EditReservaFormSchema),
  });

  async function getItem() {
    console.log(id);
    try {
      const response = await api.get(`reservas/${id}`);
      setData_entrada(response.data.data_entrada);
      setData_saida(response.data.data_saida);
      setPreco(response.data.preco);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar reserva.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    getItem();
  }, []);

  const { errors } = formState;
  const editReserva = useCallback(async (data) => {
    try {
      await api.put(`reservas/${id}`, data);
      toast({
        title: "Reserva editada.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao editar reserva.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);

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
          onSubmit={handleSubmit(editReserva)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Editar Reserva
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="data_entrada"
                label="Data de entrada"
                type="date"
                error={errors.data_entrada}
                {...register("data_entrada")}
                value={data_entrada}
                onChange={(event) => setData_entrada(event.target.value)}
              />
              <Input
                name="data_saida"
                label="Data de saida"
                type="date"
                error={errors.data_saida}
                {...register("data_saida")}
                value={data_saida}
                onChange={(event) => setData_saida(event.target.value)}
              />
              <Input
                name="preco"
                label="Preço"
                type="number"
                error={errors.preco}
                {...register("preco")}
                value={preco}
                onChange={(event) => setPreco(Number(event.target.value))}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/reservas">
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={formState.isSubmitting}
              >
                Editar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
