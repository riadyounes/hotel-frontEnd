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
  numero: yup.number().required("Número é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatório"),
  logradouro: yup.string().required("Rua é obrigatório"),
  complemento: yup.string(),
  estado: yup.string().required("Estado é obrigatório"),
 
});

export default function CreateQuarto() {
  const toast = useToast();
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState(0);
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const { formState, register, handleSubmit } = useForm({
    resolver: yupResolver(CreateQuartoFormSchema),
  });

  const { errors } = formState;
  const createEnderecos = useCallback(async (data) => {
    try {
      await api.post("enderecos", data);
      toast({
        title: "Endereço criado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao criar endereço.",
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
          onSubmit={handleSubmit(createEnderecos)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Criar endereço
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="preco"
                label="Rua"
                error={errors.logradouro}
                {...register("logradouro")}
                value={logradouro}
                onChange={(event) => setLogradouro(event.target.value)}
              />
              <Input
                name="numero"
                label="Número"
                type="Number"
                error={errors.numero}
                {...register("numero")}
                value={numero}
                onChange={(event) => setNumero(Number(event.target.value))}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="quant_ocupacao"
                label="Complemento"
                error={errors.complemento}
                {...register("complemento")}
                value={complemento}
                onChange={(event) => setComplemento(event.target.value)}
              />
              <Input
                name="detalhes"
                label="Cidade"
                value={cidade}
                error={errors.cidade}
                {...register("cidade")}
                onChange={(event) => setCidade(event.target.value)}
              />
               <Input
                name="detalhes"
                label="Estado"
                value={estado}
                error={errors.estado}
                {...register("estado")}
                onChange={(event) => setEstado(event.target.value)}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/enderecos">
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
