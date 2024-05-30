import React, { useEffect, useState } from 'react';
import { Flex, Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, IconButton, Table, Thead, Tbody, Tr, Th, Td, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { BsThreeDots } from "react-icons/bs";
import { CreateSaleOrder } from "./CreateSaleOrder";
import { EditOrder } from './EditOrder';
import { ViewOrder } from './ViewOrder';
import {useColorMode} from '@chakra-ui/react'
import { useAuth } from '../context/AuthContext';


export const SaleOrders = () => {
    const [isSaleOrder, setIsSaleOrder] = useState(false);
    const [editOrder, setEditOrder] = useState(false);
    const [viewOrder,setViewOrder] = useState(false);
    const { currentProduct,currentCompleteProduct } = useAuth();
    const [orderId,setOrderId] = useState();
    const { colorMode } = useColorMode();
    console.log(colorMode);

    const handleSaleOrder = (e) => {
        e.preventDefault();
        setIsSaleOrder(!isSaleOrder);
    }

    const handleEditOrder = (e,id) => {
        e.preventDefault();
        setOrderId(id);
        setEditOrder(!editOrder);
    }

    const handlViewOrder = (e,id) => {
        e.preventDefault();
        setOrderId(id);
        setViewOrder(!viewOrder);
    }



    return (
        <>
            <Box p={5} style={{ marginTop: "10%" }}>
                <Flex justifyContent="flex-end" marginRight="5%" mb={4}>
                    <Button leftIcon={<AddIcon />} onClick={handleSaleOrder} colorScheme="teal">
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
                                <Tbody>
                                    {currentProduct && currentProduct.length > 0 ? currentProduct.map((order) => (
                                        <Tr style={{ fontSize: "15px" }} key={order.id}>
                                            <Td>{order.id}</Td>
                                            <Td>{order.customerName}</Td>
                                            <Td>Rs.{Math.imul(order.sellingRate,order.totalItems)}/-</Td>
                                            <Td>{order.dateCreated}</Td>
                                            <Td>
                                                <IconButton onClick={(e) => handleEditOrder(e,order.id)} icon={<BsThreeDots />} />
                                            </Td>
                                        </Tr>
                                    )) : (
                                        <Tr >
                                            <Td colSpan="5">No data found!</Td>
                                        </Tr>
                                    )}
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
                                    {/* COMPLETE PRODUCT  */}
                                    {currentCompleteProduct && currentCompleteProduct.length > 0 ? currentCompleteProduct.map((order) => (
                                        <Tr style={{ fontSize: "15px" }} key={order.id}>
                                            <Td>{order.id}</Td>
                                            <Td>{order.customerName}</Td>
                                            <Td>Rs.{Math.imul(order.sellingRate,order.totalItems)}/-</Td>
                                            <Td>{order.dateCreated}</Td>
                                            <Td>
                                                <IconButton onClick={(e) => handlViewOrder(e,order.id)} icon={<BsThreeDots />} />
                                            </Td>
                                        </Tr>
                                    )) : (
                                        <Tr >
                                            <Td colSpan="5">No data found!</Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            {isSaleOrder && <CreateSaleOrder isSaleOrder={isSaleOrder} setIsSaleOrder={setIsSaleOrder} />}
            {editOrder && <EditOrder orderId={orderId} editOrder={editOrder} setEditOrder={setEditOrder} />}
            {viewOrder && <ViewOrder orderId={orderId} viewOrder={viewOrder} setViewOrder={setViewOrder} />}
        </>
    );
};
