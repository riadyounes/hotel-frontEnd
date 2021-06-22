import { extendTheme } from '@chakra-ui/react';

export const theme= extendTheme({
    
    colors:{
        teal: {
            "900": "#1D4044",
            "800": "#234E52",
            "700": "#285E61",
            "600": "#2C7A7B",
            "500": "#319795",
            "400": "#38B2AC",
            "300": "#4FD1C5",
            "200": "#81E6D9",
            "100": "#B2F5EA",
            "50":  "#E6FFFA",
        } 
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto,'
    },
    styles: {   
        global: {
            body: {
                bg: 'gray.100',
                color: 'gray.50',   
            }
        }
    }

})