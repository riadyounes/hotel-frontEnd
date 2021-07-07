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
  FormLabel,
  Select,
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

const CreateQuartoFormSchema = yup.object().shape({
  numero: yup.string().required("Número é obrigatório"),
  preco: yup.number().required("Preço é obrigatório"),
  quant_ocupacao: yup.number().required("Ocupação é obrigatório"),
  detalhes: yup.string().required("Detalhes é obrigatório"),
  hotel: yup.object().shape({
    id: yup.number().required("Hotel é obrigatório"),
  }),
});

export default function CreateQuarto() {
  const toast = useToast();
  const [hoteis, setHoteis] = useState([]);
  const [numero, setNumero] = useState("");
  const [preco, setPreco] = useState(0);
  const [quant_ocupacao, setQuant_ocupacao] = useState(0);
  const [detalhes, setDetalhes] = useState("");
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(CreateQuartoFormSchema),
  });

  const { errors } = formState;
  const createQuarto = useCallback(async (data) => {
    try {
      await api.post("quartos", data);
      toast({
        title: "Quarto criado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao criar quarto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, []);

  async function getHoteis() {
    try {
      const response = await api.get("hoteis");
      setHoteis(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar hoteis.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    getHoteis();
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
          onSubmit={handleSubmit(createQuarto)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Criar quarto
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="numero"
                label="Número"
                type="text"
                error={errors.numero}
                {...register("numero")}
                value={numero}
                onChange={(event) => setNumero(event.target.value)}
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
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="quant_ocupacao"
                label="Ocupação"
                type="number"
                error={errors.quant_ocupacao}
                {...register("quant_ocupacao")}
                value={quant_ocupacao}
                onChange={(event) =>
                  setQuant_ocupacao(Number(event.target.value))
                }
              />
              <Input
                name="detalhes"
                label="Detalhes"
                value={detalhes}
                error={errors.detalhes}
                {...register("detalhes")}
                onChange={(event) => setDetalhes(event.target.value)}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <FormLabel htmlFor="hotel">Hotel</FormLabel>
              <Select
                name="hotel"
                id="hotel"
                placeholder="Selecione o hotel"
                error={errors.hotel?.id}
                {...register("hotel.id")}
              >
                {hoteis.map((hotel) => (
                  <option value={hotel.id}>{hotel.name}</option>
                ))}
              </Select>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/quartos">
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
