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
  const [enderecos, setEnderecos] = useState([]);
  const [nome, setNome] = useState("");
  const [classificacao, setClassificacao] = useState(0);
  const [endereco, setEndereco] = useState();
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(EditQuartoFormSchema),
  });

  async function getItem() {
    try {
      const response = await api.get(`hoteis/${id}`);
      setNome(response.data.nome);
      setClassificacao(response.data.classificacao);
      setEndereco(response.data.endereco.id);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar hotel.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function getEnderecos() {
    try {
      const response = await api.get("enderecos");
      setEnderecos(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar endereços.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    getItem();
    getEnderecos();
  }, []);

  const { errors } = formState;
  const editHotel = useCallback(async (data) => {
    try {
      await api.put(`hoteis/${id}`, data);
      toast({
        title: "Hotel editado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao editar hotel.",
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
          onSubmit={handleSubmit(editHotel)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Editar Quarto
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="nome"
                label="Nome"
                type="text"
                error={errors.nome}
                {...register("nome")}
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
              <Input
                name="classificacao"
                label="Classificação"
                type="number"
                error={errors.classificacao}
                {...register("classificacao")}
                value={classificacao}
                onChange={(event) =>
                  setClassificacao(Number(event.target.value))
                }
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Select
                name="endereco"
                id="endereco"
                bgColor="white"
                color="gray.900"
                placeholder="Selecione o endereço"
                error={errors.endereco?.id}
                {...register("endereco.id")}
              >
                {enderecos.map((endereco) => (
                  <option value={endereco.id}>{endereco.logradouro}</option>
                ))}
              </Select>
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
                Editar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
