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
import { useState, useEffect } from "react";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { api } from "../../services/api";

export default function QuartoList() {
  const [data, setData] = useState([]);
  const [quartoId, setQuartoId] = useState(0);

  async function deleteQuarto(quarto) {
    setQuartoId(quarto.id)
    console.log(quartoId)
    try {
      await api.delete(`quartos/${quartoId}`);
      getItems()
    } catch (error) {
      console.log(error);
    }
  }
  async function getItems() {
    try {
      const response = await api.get("quartos");
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
              Quartos
            </Heading>
            <Link href="/quartos/create" passHref>
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
                <Th>Id</Th>
                <Th>Número</Th>
                <Th>Preço</Th>
                <Th>Ocupação</Th>

                <Th width="8"></Th>
                <Th width="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((quarto) => (
                <Tr key={quarto.id}>
                  <Td>{quarto.id}</Td>
                  <Td>
                    <Text fontWeight="bold">{quarto.numero}</Text>

                  </Td>
                  <Td>
                    <Text>{quarto.preco}</Text>
                  </Td>
                  <Td>
                    <Text>{quarto.quant_ocupacao}</Text>
                  </Td>

                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="yellow"
                      leftIcon={<Icon as={RiPencilLine} fontSize="16"
                    />}
                    >
                      Editar
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="red"
                      leftIcon={<Icon as={RiDeleteBinLine} fontSize="16"
                      onClick={() => deleteQuarto(quarto)}
                      />}
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
