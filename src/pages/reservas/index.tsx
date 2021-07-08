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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import { Header } from "components/Header";
import { SideBar } from "components/SideBar";
import { api } from "services/api";
import ReservaEstado from "components/ReservaEstado";

export default function Dashboard() {
  const router = useRouter();
  const { data_entrada, data_saida, estado, hospede_id, quarto_id } =
    router.query;
  const toast = useToast();
  const [hospedes, setHospedes] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [data, setData] = useState([]);
  const [reservaId, setReservaId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  async function getItems() {
    try {
      let response;
      if (data_entrada || data_saida || estado || hospede_id || quarto_id) {
        response = await api.get(
          `/reservas?data_entrada=${data_entrada}&data_saida=${data_saida}&estado=${estado}&hospede_id=${hospede_id}&quarto_id=${quarto_id}`
        );
      } else {
        response = await api.get("reservas");
      }
      setData(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar reservas.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function openDeleteReserva(reserva) {
    setReservaId(reserva.id);
    setIsOpen(true);
  }

  async function deleteReserva() {
    try {
      await api.delete(`reservas/${reservaId}`);
      setIsOpen(false);
      getItems();
      toast({
        title: "Reserva apagado.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao apagar reserva.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function getHospedes() {
    try {
      const response = await api.get("hospedes");
      setHospedes(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar hospedes.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function getQuartos() {
    try {
      const response = await api.get("quartos");
      setQuartos(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Problema ao carregar quartos.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    getItems();
    getQuartos();
    getHospedes();
  }, []);
  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" mx="auto" maxWidth={1550} px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay color="gray.900">
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Apagar Reserva
                </AlertDialogHeader>

                <AlertDialogBody>
                  Tem certeza? Esta ação, é irreversível.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="red" onClick={deleteReserva} ml={3}>
                    Apagar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          <Flex mb="4" justify="space-between" align="center">
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
                name="estado"
                placeholder="Selecione o estado"
              >
                <option value="RESERVADO">Reservado</option>
                <option value="EM_ANDAMENTO">Em andamento</option>
                <option value="FINALIZADO">Finalizado</option>
                <option value="CANCELADO">Cancelado</option>
              </Select>

              <Select
                bgColor="white"
                color="gray.900"
                name="hospede_id"
                placeholder="Selecione o hospede"
              >
                {hospedes.map((hospede) => (
                  <option value={hospede.id}>{hospede.nome}</option>
                ))}
              </Select>

              <Select
                bgColor="white"
                color="gray.900"
                name="quarto_id"
                placeholder="Selecione o quarto"
              >
                {quartos.map((quarto) => (
                  <option value={quarto.id}>
                    {quarto.numero + " - " + quarto.hotel.nome}
                  </option>
                ))}
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
                <Th>Quarto</Th>
                <Th>Preço</Th>
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
                  <Td>{reserva.hospede.nome}</Td>
                  <Td>
                    <Text fontWeight="bold">{reserva.quarto.numero}</Text>
                    <Text fontSize="sm" color="gray.300">
                      {reserva.quarto.hotel.nome}
                    </Text>
                  </Td>
                  <Td>
                    <Text>{reserva.preco_total}</Text>
                  </Td>
                  <Td>
                    <Text>{reserva.data_entrada}</Text>
                  </Td>
                  <Td>
                    <Text>{reserva.data_saida}</Text>
                  </Td>
                  <Td>
                    <ReservaEstado value={reserva.estado} />
                  </Td>
                  <Td>
                    <Link href={`/reservas/${reserva.id}/edit`}>
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
                      onClick={() => openDeleteReserva(reserva)}
                      leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
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
