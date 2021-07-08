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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { Input } from "components/Form/Input";
import { Header } from "components/Header";
import { SideBar } from "components/SideBar";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { api } from "services/api";
import { useToast } from "@chakra-ui/react";

const EditHospedeFormSchema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Digite um e-mail válido"),
  cpf: yup.string().required("CPF obrigatório"),
  nacionalidade: yup.string().required("Nacionalidade obrigatório"),
  telefone: yup.number().required("Telefone obrigatório"),
  data_nascimento: yup.date().required("Data de nascimento obrigatória")
});

export default function EditHospede() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState(0);
  const [data_nascimento, setDataNascimento] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(EditHospedeFormSchema),
  });
  async function getItem() {
    try {
      const response = await api.get(`hospedes/${id}`);
      setNome(response.data.nome);
      setEmail(response.data.email);
      setCpf(response.data.cpf);
      setTelefone(response.data.telefone);
      setDataNascimento(response.data.data_nascimento);
      setNacionalidade(response.data.nacionalidade);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar hospede.",
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
  const editHospede = useCallback(async (data) => {
    try {
      await api.put(`hospedes/${id}`, data);
      toast({
        title: "Hospede editado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao editar hospede.",
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
        <Box as="form" flex="1" borderRadius={8} bg="gray.800" p="8" onSubmit={handleSubmit(editHospede)}>
          <Heading fontSize="lg" fontWeight="normal">
            Editar hospede
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="nome"
                label="Nome completo"
                error={errors.nome}
                {...register("nome")}
                value={nome}
                onChange={(event) => setNome(event.target.value)}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register("email")}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="cpf"
                label="CPF"
                error={errors.cpf}
                {...register("cpf")}
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
              />
              <Input
                name="telefone"
                type="number"
                label="Telefone"
                error={errors.telefone}
                {...register("telefone")}
                value={telefone}
                onChange={(event) => setTelefone(Number(event.target.value))}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="data_nascimento"
                type="date"
                label="Data de nascimento"
                error={errors.data_nascimento}
                {...register("data_nascimento")}
                value={data_nascimento}
                onChange={(event) => setDataNascimento(event.target.value)}
              />
              <Input
                name="nacionalidade"
                label="Nacionalidade"
                error={errors.nacionalidade}
                {...register("nacionalidade")}
                value={nacionalidade}
                onChange={(event) => setNacionalidade(event.target.value)}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/hospedes">
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
