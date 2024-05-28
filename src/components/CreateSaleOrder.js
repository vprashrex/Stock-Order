import React, { useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Code,
  FormErrorMessage,
  Box,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { IoIosCloseCircleOutline } from "react-icons/io";


export const CreateSaleOrder = ({isSaleOrder,setIsSaleOrder}) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const productOptions = [
        { value: "product1", label: "Product 1" },
        { value: "product2", label: "Product 2" },
        { value: "product3", label: "Product 3" },
        { value: "product4", label: "Product 4" },
        { value: "product5", label: "Product 5" },
        { value: "product6", label: "Product 6" }
    ];

    const handleProductChange = (selectedOptions) => {
        setSelectedProducts(selectedOptions || []);
    };

    const handleSaleOrder = (e) => {
        e.preventDefault();
        setIsSaleOrder(!isSaleOrder);
    }

    return (
        <FormControl width="lg" background="teal" className="form-sale-order" style={{borderRadius:"8px",width:"600px",height:"500px",left:"30%",position:"fixed",top:"20%",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",background:"white",overflowY:"auto"}}>
            
            <Box style={{margin:"30px"}}>
                <span style={{display:"flex",justifyContent:"right",fontSize:"30px",cursor:"pointer"}}>
                    <IoIosCloseCircleOutline onClick={(e) => handleSaleOrder(e)}/>

                </span>
                <FormLabel justifyContent="center" textAlign="center" marginBottom="10px" fontSize="20px">
                    Create Sale Order
                </FormLabel>
                <Select
                    isMulti
                    name="products"
                    options={productOptions}
                    placeholder="Select some products..."
                    closeMenuOnSelect={false}
                    onChange={handleProductChange}
                    className="multi-select"
                />
                <Stack spacing={4} marginTop={4}>
                    <Box className="card-product" style={{marginBottom:"10px",gap:"15px"}}>

                        {selectedProducts.map((product, index) => (
                            <Box key={product.value} borderWidth="1px" borderRadius="lg" padding="4" style={{background:"white"}}>
                                <div className="header">
                                    <h4 fontWeight="bold" className="heading-product">
                                        {index + 1}. {product.label}
                                    </h4>
                                    <Text color="#1a202c" width="fit-content" background="#74FF8A" padding="2px 10px" borderRadius="23px">Rs 324</Text>
                                </div>
                               
                                <Stack style={{marginTop:"6%",color:"#1a202c"}} direction="row" spacing={4} align="center" marginTop={2}>
                                    <Box>
                                        <Text className="text-heading">Selling Rate</Text>
                                        <Input placeholder="Enter selling rate"  />
                                    </Box>
                                    <Box>
                                        <Text className="text-heading">Total Items</Text>
                                        <Input placeholder="Enter quantity" />
                                    </Box>
                                </Stack>
                                <Text marginTop="10px" color="#1a202c" width="fit-content" background="#74FF8A" padding="2px 10px" borderRadius="23px" >Item's Remaining</Text>

                            </Box>
                        ))}
                    </Box>
                    
                </Stack>
            </Box>

        </FormControl>
    );
};
