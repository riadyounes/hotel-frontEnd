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
  
  export default function EnderecoList() {
    const [data, setData] = useState([]);
    const [enderecoId, setEnderecoId] = useState(0);
  
    async function deleteEndereco(endereco) {
      setEnderecoId(endereco.id);
      console.log(enderecoId);
      try {
        await api.delete(`enderecos/${enderecoId}`);
        getItems();
      } catch (error) {
        console.log(error);
      }
    }
    async function getItems() {
      try {
        const response = await api.get("enderecos");
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
                Endereços
              </Heading>
              <Link href="/enderecos/create" passHref>
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
                  <Th>logradouro</Th>
                  <Th>Numero</Th>
                  <Th>Complemento</Th>
                  <Th>Cidade</Th>
                  <Th>Estado</Th>
                  <Th width="8"></Th>
                  <Th width="8"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((endereco) => (
                  <Tr key={endereco.id}>
                    <Td>{endereco.id}</Td>
                    <Td>
                      <Text fontWeight="bold">{endereco.logradouro}</Text>
                      
                    </Td>
                    <Td>
                      <Text>{endereco.numero}</Text>
                    </Td>
                    <Td>
                      <Text>{endereco.complemento}</Text>
                    </Td>
                    <Td>
                      <Text>{endereco.cidade}</Text>
                    </Td>
                    <Td>
                      <Text>{endereco.estado}</Text>
                    </Td>
                    <Td>
                      <Link href={`/enderecos/${endereco.id}/edit`}>
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
                        onClick={() => deleteEndereco(endereco)}
                        leftIcon={
                          <Icon
                            as={RiDeleteBinLine}
                            fontSize="16"
                           
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
  