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

export default function HospedeList() {
  const [data, setData] = useState([]);
  const [hospedeId, setHospedeId] = useState(0);

  async function deleteHospede(hospede) {
    setHospedeId(hospede.id);
    console.log(hospedeId);
    try {
      await api.delete(`hospedes/${hospedeId}`);
      getItems();
    } catch (error) {
      console.log(error);
    }
  }
  async function getItems() {
    try {
      const response = await api.get("hospedes");
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
              Hospedes
            </Heading>
            <Link href="/hospedes/create" passHref>
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
                <Th>Telefone</Th>
                <Th>Nacionalidade</Th>
                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((hospede) => (
                <Tr key={hospede.id}>
                  <Td>{hospede.id}</Td>
                  <Td>
                    <Text fontWeight="bold">{hospede.nome}</Text>
                    <Text fontSize="sm" color="gray.300">
                      {hospede.email}
                    </Text>
                  </Td>
                  <Td>
                    <Text>{hospede.telefone}</Text>
                  </Td>
                  <Td>
                    <Text>{hospede.nacionalidade}</Text>
                  </Td>
                  <Td>
                    <Link href={`/hospedes/${hospede.id}/edit`}>
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
                          onClick={() => deleteHospede(hospede)}
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
