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

const EditEnderecoFormSchema = yup.object().shape({
  numero: yup.number().required("Número é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatório"),
  logradouro: yup.string().required("Rua é obrigatório"),
  complemento: yup.string(),
  estado: yup.string().required("Estado é obrigatório"),
});

export default function EditHospede() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState(0);
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const { register, formState, handleSubmit } = useForm({
    resolver: yupResolver(EditEnderecoFormSchema),
  });
  async function getItem() {
    try {
      const response = await api.get(`enderecos/${id}`);
      setLogradouro(response.data.logradouro);
      setNumero(response.data.numero);
      setComplemento(response.data.complemento);
      setCidade(response.data.data_nascimento);
      setEstado(response.data.estado);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar endereço.",
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
  const editEnderecos = useCallback(async (data) => {
    try {
      await api.put(`enderecos/${id}`, data);
      toast({
        title: "Endereço editado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao editar endereço.",
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
          onSubmit={handleSubmit(editEnderecos)}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Editar endereço
          </Heading>
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                name="rua"
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
                name="complemento"
                label="Complemento"
                error={errors.complemento}
                {...register("complemento")}
                value={complemento}
                onChange={(event) => setComplemento(event.target.value)}
              />
              <Input
                name="cidade"
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
