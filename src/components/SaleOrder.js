import React, { useState } from 'react';
import {Flex, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, IconButton, Table, Thead, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { BsThreeDots } from "react-icons/bs";
import {CreateSaleOrder} from "./CreateSaleOrder";


export const SaleOrders = () => {

    const [lastModified,setLastModified] = useState({id:"",lastModified:""});
    const [isSaleOrder,setIsSaleOrder] = useState(false);

    const handleSaleOrder = (e) => {
        e.preventDefault();
        setIsSaleOrder(!isSaleOrder);
    }

    const activeOrders = [
    { id: 1, name: 'Order 1', details: 'Details of order 1' },

    ];

    const completedOrders = [
    { id: 2, name: 'Order 2', details: 'Details of order 2' },

    ];

  return (
    <> 

        <Box p={5} style={{marginTop:"10%"}}>
            <Flex justifyContent="flex-end" marginRight="5%" mb={4}>
                <Button leftIcon={<AddIcon />} onClick={(e) => handleSaleOrder(e)} colorScheme="teal" >
                    Create Sale Order
                </Button>
            </Flex>

            <Tabs mt={4}>
                <TabList>
                    <Tab>Active Sale Orders</Tab>
                    <Tab>Completed Sale Orders</Tab>
                </TabList>
                <TabPanels>
                <TabPanel>
                    <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Price</Th>
                            <Th>Last Modified</Th>
                            <Th>Edit/View</Th>
                        </Tr>
                    </Thead>
                    <Tbody  >
                        {activeOrders.map((order) => (
                            <Tr style={{fontSize:"15px"}} key={order.id}>
                                <Td>{order.name}</Td>
                                <Td >{order.details}</Td>
                                <Td >Rs 100/-</Td>

                                <Td >24/5/2024 (11:07 PM)</Td>

                                <Td>
                                    <IconButton 
                                        icon={<BsThreeDots />}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                    </Table>
                </TabPanel>
                <TabPanel>
                    <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Customer Name</Th>
                            <Th>Price</Th>
                            <Th>Last Modified</Th>    
                        </Tr>
                    </Thead>
                    <Tbody>
                        {completedOrders.map((order) => (
                            <Tr style={{fontSize:"15px"}} key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.name}</Td>
                                <Td>Rs. 100/-</Td>
                                <Td >24/5/2024 (11:07 PM)</Td>

                            </Tr>
                        ))}
                    </Tbody>
                    </Table>
                </TabPanel>
                </TabPanels>
            </Tabs>


        </Box>
        {isSaleOrder && <CreateSaleOrder isSaleOrder={isSaleOrder} setIsSaleOrder={setIsSaleOrder}/> }
    </>
  );
};

