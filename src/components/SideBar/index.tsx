import { Box, Stack, Text, Link, Icon } from "@chakra-ui/react";
import {
  RiCalendarCheckLine,
  RiContactsLine,
  RiDashboardLine,
  RiHotelBedLine,
  RiHotelLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          {/* <NavLink href="/" icon={RiDashboardLine}>Dashboard</NavLink> */}
          <NavLink href="/reservas" icon={RiCalendarCheckLine}>Reservas</NavLink>
          <NavLink href="/hospedes" icon={RiContactsLine}>Hospedes</NavLink>
          <NavLink href="/hoteis" icon={RiHotelLine}>Hoteis</NavLink>
          <NavLink href="/quartos" icon={RiHotelBedLine}>Quartos</NavLink>
        </NavSection>
       
      </Stack>
    </Box>
  );
}
