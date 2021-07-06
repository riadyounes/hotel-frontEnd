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

export default function CreateQuarto() {
  const [numero, setNumero] = useState(0);
  const [preco, setPreco] = useState(0);
  const [quant_ocupacao, setQuant_ocupacao] = useState(0);
  const [detalhes, setDetalhes] = useState("descrição");

  const createQuarto = useCallback(async (data) => {
    try {
      await api.post("quartos", data);
    } catch (error) {
      console.log(error.error);
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
          onSubmit={createQuarto}
        >
          <Heading fontSize="lg" fontWeight="normal">
            Criar reserva
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input name="data_saida" label="Check-out" type="date" />
              <Input name="data_saida" label="Check-out" type="date" />
              <Input name="preco_total" label="Preço" type="number" />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Select
                bgColor="white"
                color="gray.900"
                size="lg"
                placeholder="Selecione o hospede"
              >
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
              <Select
                bgColor="white"
                color="gray.900"
                size="lg"
                placeholder="Selecione o usuario"
              >
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
              </Select>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Select
                bgColor="white"
                color="gray.900"
                size="lg"
                placeholder="Select country"
                
              >
                <option>United Arab Emirates</option>
                <option>Nigeria</option>
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
              <Button type="submit" colorScheme="blue">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
