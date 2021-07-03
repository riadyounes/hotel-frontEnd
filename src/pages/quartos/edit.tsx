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
  } from "@chakra-ui/react";
  import { SubmitHandler, useForm } from "react-hook-form";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import Link from "next/link";
  import { Input } from "../../components/Form/Input";
  import { Header } from "../../components/Header";
  import { SideBar } from "../../components/SideBar";
  import { useState } from "react";
  import { useCallback } from "react";
  import { api } from "../../services/api";

  const EditQuartoFormSchema = yup.object().shape({
    numero: yup.number().required("Numero obrigatório"),
    preco: yup.number().required("Numero obrigatório"),
    quant_ocupacao: yup.number().required("Numero obrigatório"),
    detalhes: yup.string().required("Numero obrigatório"),

  });
  
  export default function EditQuarto() {
    const [ numero, setNumero ] = useState(0);
    const [ preco, setPreco] = useState(0);
    const [ quant_ocupacao, setQuant_ocupacao] = useState(0);
    const [ detalhes, setDetalhes] = useState("descrição");
    const { formState, register, handleSubmit } = useForm({
      resolver: yupResolver(EditQuartoFormSchema),
    });
  
    const { errors } = formState;
    // const editQuarto = useCallback(async (data) => {
    //   try {
    //     await api.post("quartos", data);
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
            //onSubmit={handleSubmit(createQuarto)}
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
                  type="number"
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
                onChange={(event) => setQuant_ocupacao(Number(event.target.value))}
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
              <Select placeholder="Select country" isDisabled>
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
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
  