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

const EditQuartoFormSchema = yup.object().shape({
  numero: yup.string().required("Número é obrigatório"),
  preco: yup.number().required("Preço é obrigatório"),
  quant_ocupacao: yup.number().required("Ocupação é obrigatório"),
  detalhes: yup.string().required("Detalhes é obrigatório"),
  hotel: yup.object().shape({
    id: yup.number().required("Hotel é obrigatório"),
  }),
});

export default function EditQuarto() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [hoteis, setHoteis] = useState([]);
  const [numero, setNumero] = useState(0);
  const [preco, setPreco] = useState(0);
  const [quant_ocupacao, setQuant_ocupacao] = useState(0);
  const [detalhes, setDetalhes] = useState("");
  const [hotel, setHotel] = useState();
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(EditQuartoFormSchema),
  });

  async function getItem() {
    try {
      const response = await api.get(`quartos/${id}`);
      setNumero(response.data.numero);
      setPreco(response.data.preco);
      setQuant_ocupacao(response.data.quant_ocupacao);
      setDetalhes(response.data.detalhes);
      setHotel(response.data.hotel.id);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar quarto.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

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
    getItem();
    getHoteis();
  }, []);

  const { errors } = formState;
  const editQuarto = useCallback(async (data) => {
    try {
      await api.put(`quartos/${id}`, data);
      toast({
        title: "Quarto editado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao editar quarto.",
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
          onSubmit={handleSubmit(editQuarto)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Editar Quarto
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
                onChange={(event) => setNumero(Number(event.target.value))}
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
              
              <Select
                name="hotel"
                id="hotel"
                placeholder="Selecione o hotel"
                bgColor="white"
                color="gray.900"
                size="lg"
                error={errors.hotel?.id}
                value={hotel}
                {...register("hotel.id")}
              >
                {hoteis.map((hotel) => (
                  <option  value={hotel.id}>{hotel.nome}</option>
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
                Editar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
