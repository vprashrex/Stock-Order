import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Box,
  Input,
  Stack,
  Text,
  Button,
  useColorMode
} from "@chakra-ui/react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import {toast} from "react-toastify";


const initializeProductDetails = () => {
    const storedProducts = localStorage.getItem("product");
    return storedProducts ? JSON.parse(storedProducts) : [];
};

const CompletedProductDetails = () => {
    const storedProducts = localStorage.getItem("completeOrder");
    return storedProducts ? JSON.parse(storedProducts) : [];
};

export const EditOrder = ({ orderId, editOrder, setEditOrder }) => {
    const { currentProduct, authStateChange,completeauthStateChange } = useAuth();    
    const [orderDetails, setOrderDetails] = useState(null);
    const formattedDate = format(new Date(), "dd/MM/yyyy (h:mm a)");
    const [productDetails, setProductDetails] = useState(initializeProductDetails);
    const customerName = useRef();
    const sellingRate = useRef();
    const totalItems = useRef();
    const { colorMode } = useColorMode();

    useEffect(() => {
        const order = currentProduct.find(order => order.id === orderId);
        setOrderDetails(order);
    }, [orderId, currentProduct]);

    const handleEditOrder = (e) => {
        e.preventDefault();
        setEditOrder(!editOrder);
    }


    /* ------- ACTIVE ORDER EDIT FUNCTION ------- */
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: orderId,
            label: orderDetails.label,
            customerName:customerName.current.value,
            sellingRate: sellingRate.current.value,
            totalItems: totalItems.current.value,
            dateCreated: formattedDate
        };
        let products = initializeProductDetails();
        products = products.filter(product => product.id !== orderId);
        products.push(data);
        localStorage.setItem("product", JSON.stringify(products));
        setProductDetails(products);
        authStateChange();
        setEditOrder(false);
        toast.success("Sale Order Edited");
    }

    

    /* ------- COMPLETE ORDER SUBMIT FUNCTION -------- */
    const handleCompleteOrder = (e) => {
        e.preventDefault();
        let products = CompletedProductDetails();
        products = products.filter(product => product.id !== orderId);
        const order = currentProduct.find(order => order.id === orderId);
        products.push(order);
        localStorage.setItem("completeOrder", JSON.stringify(products));
        completeauthStateChange();

        let saleproducts = initializeProductDetails();
        saleproducts = saleproducts.filter(product => product.id !== orderId);
        localStorage.setItem("product", JSON.stringify(saleproducts));
        setProductDetails(saleproducts);
        authStateChange();
        setEditOrder(false);
        toast.success("Sale Order Completed!");

    }


    return (

        <>
            <form onSubmit={handleSubmit}>
                <FormControl width="lg" background={colorMode==="dark"? "teal" : "white"} className="form-sale-order" style={{ borderRadius: "8px", width: "600px", height: "500px", left: "30%", position: "fixed", top: "20%", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", overflowY: "auto" }}>
                    <Box style={{ margin: "30px" }}>
                        <span style={{ display: "flex", justifyContent: "right", fontSize: "30px", cursor: "pointer" }}>
                            <IoIosCloseCircleOutline onClick={handleEditOrder} />
                        </span>
                        <FormLabel justifyContent="center" textAlign="center" marginBottom="10px" fontSize="20px">
                            Edit Sale Order
                        </FormLabel>
                        
                        <Stack spacing={4} marginTop={4} >
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
                                    <Stack style={{ marginTop: "6%", color: colorMode === "dark"?"white":"black",fontWeight:"bold" }} direction="row" spacing={4} align="center" marginTop={2}>
                                        <Box>
                                            <Text className="text-heading">Enter Customer Name</Text>
                                            <Input 
                                                placeholder="Enter customer name"
                                                defaultValue={orderDetails.customerName}
                                                ref={customerName}
                                            />
                                        </Box>
                                        <Box>
                                            <Text className="text-heading">Selling Rate</Text>
                                            <Input 
                                                placeholder="Enter selling rate" 
                                                defaultValue={orderDetails.sellingRate}
                                                ref={sellingRate}
                                            />
                                        </Box>
                                        <Box>
                                            <Text className="text-heading">Total Items</Text>
                                            <Input 
                                                placeholder="Enter quantity" 
                                                defaultValue={orderDetails.totalItems}
                                                ref={totalItems}
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
                    <Button type="submit" colorScheme="teal" width="sm">
                        Edit
                    </Button>
                    <Button style={{marginTop:"30px"}} onClick={(e) => handleCompleteOrder(e)} colorScheme="teal" width="sm">
                      Complete Order
                    </Button>
                </FormControl>
                
            </form>
            
        </>
    );
};
