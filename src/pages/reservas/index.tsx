import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";

export default function ReservaList() {
  const [data, setData] = useState([]);
  const [reservaId, setReservaId] = useState(0);

  async function deleteHospede(reserva) {
    setReservaId(reserva.id);
    console.log(reservaId);
    try {
      await api.delete(`reservas/${reservaId}`);
      getItems();
    } catch (error) {
      console.log(error);
    }
  }
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
      <Flex w="100%" my="6" mx="auto" maxWidth={1480} px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading fontSize="lg" fontWeight="normal">
              Reservas
            </Heading>
            <Link href="/reservas/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="cyan"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
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
                    <Text fontWeight="bold">{reserva.hospede}</Text>
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
                    <Link href="/reservas/edit">
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="yellow"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        Editar
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="red"
                      leftIcon={
                        <Icon
                          as={RiDeleteBinLine}
                          fontSize="16"
                          onClick={() => deleteHospede(reserva)}
                        />
                      }
                    >
                      Excluir
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
