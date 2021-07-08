import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Input } from "components/Form/Input";
import { Header } from "components/Header";
import { SideBar } from "components/SideBar";
import { api } from "services/api";

const CreateQuartoFormSchema = yup.object().shape({
  data_entrada: yup.date().required("Data de entrada é obrigatória"),
  data_saida: yup.date().required("Data de saida é obrigatória"),
  preco_total: yup.number().required("Preço é obrigatório"),
  hospede: yup.object().shape({
    id: yup.number().required("Hospede é obrigatório"),
  }),
  quarto: yup.object().shape({
    id: yup.number().required("Quarto é obrigatório"),
  }),
  usuario: yup.object().shape({
    id: yup.number().required("Usuário é obrigatório"),
  }),
});

export default function CreateReserva() {
  const toast = useToast();
  const [data_entrada, setData_entrada] = useState("");
  const [data_saida, setData_saida] = useState("");
  const [preco_total, setPreco_total] = useState(0);
  const [hospedes, setHospedes] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(CreateQuartoFormSchema),
  });

  const { errors } = formState;
  async function getQuartos() {
    try {
      const response = await api.get("quartos");
      setQuartos(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar quartos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function getHospedes() {
    try {
      const response = await api.get("hospedes");
      setHospedes(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar hospedes.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function getUsuarios() {
    try {
      const response = await api.get("usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar usuarios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  const createReserva = useCallback(async (data) => {
    try {
      await api.post("reservas", data);
      toast({
        title: "Reserva criado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao criar reserva.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);
  useEffect(() => {
    getHospedes();
    getQuartos();
    getUsuarios();
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
          onSubmit={handleSubmit(createReserva)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Criar reserva
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="data_entrada"
                label="Check-In"
                type="date"
                error={errors.data_entrada}
                {...register("data_entrada")}
                value={data_entrada}
                onChange={(event) => setData_entrada(event.target.value)}
              />
              <Input
                name="data_saida"
                label="Check-out"
                type="date"
                error={errors.data_saida}
                {...register("data_saida")}
                value={data_saida}
                onChange={(event) => setData_saida(event.target.value)}
              />
              <Input
                name="preco_total"
                label="Preço"
                type="number"
                error={errors.preco_total}
                {...register("preco_total")}
                value={preco_total}
                onChange={(event) => setPreco_total(Number(event.target.value))}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Select
                bgColor="white"
                color="gray.900"
                name="hospede"
                placeholder="Selecione o hospede"
                error={errors.hospede?.id}
                {...register("hospede.id")}
              >
                {hospedes.map((hospede) => (
                  <option value={hospede.id}>{hospede.nome}</option>
                ))}
              </Select>
              <Select
                bgColor="white"
                color="gray.900"
                name="quarto"
                placeholder="Selecione o quarto"
                error={errors.hotel?.id}
                {...register("hotel.id")}
              >
                {quartos.map((quarto) => (
                  <option value={quarto.id}>{quarto.numero}</option>
                ))}
              </Select>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Select
                bgColor="white"
                color="gray.900"
                name="usuario"
                placeholder="Selecione o usuario"
                error={errors.hotel?.id}
                {...register("hotel.id")}
              >
                {usuarios.map((usuario) => (
                  <option value={usuario.id}>{usuario.nome}</option>
                ))}
              </Select>
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
                {" "}
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
