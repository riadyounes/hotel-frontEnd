import {
  Flex,
  Box,
  Heading,
  Link,
  Button,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  SimpleGrid,
  Select,
  Input,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { RiRunLine, RiSendPlaneFill } from "react-icons/ri";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";
import { api } from "../services/api";

export default function Dashboard() {
  const [data, setData] = useState([]);

  async function getItems() {
    try {
      const response = await api.get("reservas");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" mx="auto" maxWidth={1550} px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Box as="form">
            <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
              <Input
                bgColor="white"
                color="gray.900"
                name="data_entrada"
                label="Check-In"
                type="date"
              />
              <Input
                bgColor="white"
                color="gray.900"
                name="data_saida"
                label="Check-out"
                type="date"
              />
              <Select
                bgColor="white"
                color="gray.900"
                placeholder="Selecione o estado"
              >
                <option>Reservado</option>
                <option>Em andamento</option>
                <option>Finalizado</option>
              </Select>
              <Button type="submit" colorScheme="blue">
                Pesquisar
              </Button>
            </SimpleGrid>
          </Box>
          <Table mt="10" colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Hospede</Th>
                <Th>Check-In</Th>
                <Th>Check-Out</Th>
                <Th>Estado</Th>
                <Th width="6"></Th>
                <Th width="6"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((reserva) => (
                <Tr key={reserva.id}>
                  <Td>{reserva.id}</Td>
                  <Td>
                    <Text fontWeight="bold">{reserva.nome}</Text>
                    <Text fontSize="sm" color="gray.300">
                      {reserva.hospede}
                    </Text>
                  </Td>
                  <Td>
                    <Text>{reserva.data_entrada}</Text>
                  </Td>
                  <Td>
                    <Text>{reserva.data_saida}</Text>
                  </Td>
                  <Td>
                    <Text>{reserva.estado}</Text>
                  </Td>
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="yellow"
                      leftIcon={<Icon as={RiRunLine} fontSize="16" />}
                    >
                      Em andamento
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="red"
                      leftIcon={<Icon as={RiSendPlaneFill} fontSize="16" />}
                    >
                      Finalizado
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
