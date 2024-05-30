import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Input,
  Stack,
  Text,
  useColorMode
} from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuth } from '../context/AuthContext';


export const ViewOrder = ({ orderId, viewOrder, setViewOrder }) => {
    const {currentCompleteProduct } = useAuth();    
    const [orderDetails, setOrderDetails] = useState(null);
    const {colorMode} = useColorMode();


    useEffect(() => {
        const order = currentCompleteProduct.find(order => order.id === orderId);
        setOrderDetails(order);
    }, [orderId, currentCompleteProduct]);

    const handleVierOrder = (e) => {
        e.preventDefault();
        setViewOrder(!viewOrder);
    }

    return (
        <>
            <FormControl width="lg" background={colorMode==="dark"? "teal" : "white"} className="form-sale-order" style={{ borderRadius: "8px", width: "600px", height: "500px", left: "30%", position: "fixed", top: "20%", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",  overflowY: "auto" }}>
                <Box style={{ margin: "30px" }}>
                    <span style={{ display: "flex", justifyContent: "right", fontSize: "30px", cursor: "pointer" }}>
                        <IoIosCloseCircleOutline onClick={handleVierOrder} />
                    </span>
                    <FormLabel justifyContent="center" textAlign="center" marginBottom="10px" fontSize="20px">
                        View Complete Order
                    </FormLabel>
                    
                    <Stack spacing={4} marginTop={4} style={{display:"flex",flexDirection:"column"}}>
                        {orderDetails ? (
                            <Box className="card-product" style={{ marginBottom: "10px", gap: "15px" }}>
                                <div className="header" style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
                                    <Text fontWeight="bold" fontSize="20px" className="heading-product">
                                        {orderDetails.label}
                                    </Text>
                                    <Text color="#1a202c" width="fit-content" background="#74FF8A" padding="2px 10px" borderRadius="23px">
                                        Rs.{Math.imul(parseInt(orderDetails.sellingRate), parseInt(orderDetails.totalItems))}/-
                                    </Text>
                                </div>
                                <Stack style={{display:"flex",flexDirection:"column", marginTop: "6%", color: colorMode === "dark"? "white" : "black",fontWeight:"bold" }} direction="row" spacing={4} align="center" marginTop={2}>
                                    <Box>
                                        <Text className="text-heading">Customer Name</Text>
                                        <Input 
                                            placeholder="Enter customer name"
                                            defaultValue={orderDetails.customerName}
                                            readOnly
                                        />
                                    </Box>
                                    <Box>
                                        <Text className="text-heading">Selling Rate</Text>
                                        <Input 
                                            placeholder="Enter selling rate" 
                                            defaultValue={orderDetails.sellingRate}
                                            readOnly
                                        />
                                    </Box>
                                    <Box>
                                        <Text className="text-heading">Total Items</Text>
                                        <Input 
                                            placeholder="Enter quantity" 
                                            defaultValue={orderDetails.totalItems}
                                            readOnly
                                        />
                                    </Box>
                                </Stack>
                                <Text marginTop="10px" color="#1a202c" width="fit-content" background="#74FF8A" padding="2px 10px" borderRadius="23px">Item's Remaining</Text>
                            </Box>
                        ) : (
                            <Text>No order details found for this order ID.</Text>
                        )}
                    </Stack>
                </Box>

            </FormControl>

        </>
    );
};
