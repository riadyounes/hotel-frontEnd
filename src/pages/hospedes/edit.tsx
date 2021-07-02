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
  import { Input } from "../../components/Form/Input";
  import { Header } from "../../components/Header";
  import { SideBar } from "../../components/SideBar";
  import { useState } from "react";
  import { useCallback } from "react";
  import { api } from "../../services/api";
  
  const CreateUserFormSchema = yup.object().shape({
    nome: yup.string().required("Nome obrigatório"),
    email: yup
      .string()
      .required("E-mail obrigatório")
      .email("Digite um e-mail válido"),
    cpf: yup.string().required("CPF obrigatório"),
    nacionalidade: yup.string().required("Nacionalidade obrigatório"),
    telefone: yup.number().required("Telefone obrigatório"),
  });
  
  export default function CreateHospede() {
    const [nome, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState(0);
    const [data_nascimento, setDataNascimento] = useState("");
    const [nacionalidade, setNacionalidade] = useState("");
  
    const { register, handleSubmit, formState } = useForm({
      resolver: yupResolver(CreateUserFormSchema),
    });
  
    const { errors } = formState;
    
    // const createHospede = useCallback(async (data) => {
    //   try {
    //     await api.put("hospedes", data);
    //   } catch (error) {
    //     console.log(error.error);
    //   }
    // }, []);
  
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
          
          >
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
                    onChange={(event) => setName(event.target.value)}
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
  