import { Button } from "@chakra-ui/react";
import React from "react";
import {
  IoIosCloseCircleOutline,
  IoIosDoneAll,
  IoIosSend,
  IoIosFingerPrint,
} from "react-icons/io";

const ReservaEstado = ({ value }) => {
  const status = {
    EM_ANDAMENTO: {
      color: "#c59b30",
      icon: IoIosFingerPrint,
      message: "Em andamento",
    },
    CANCELADO: {
      color: "#c53030",
      icon: IoIosCloseCircleOutline,
      message: "Cancelado",
    },
    RESERVADO: {
      color: "#153ce9",
      icon: IoIosSend,
      message: "Reservado",
    },
    FINALIZADO: {
      color: "#33c530",
      icon: IoIosDoneAll,
      message: "Finalizado",
    },
  };

  const Icon = status[value].icon;

  return (
    <Button
      as="a"
      size="sm"
      fontSize="sm"
      color={status[value].color}
      colorScheme="gray"
      leftIcon={<Icon fontSize="16" />}
    >
      {status[value].message}
    </Button>
  );
};

export default ReservaEstado;
