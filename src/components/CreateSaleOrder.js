import React, { useState, useEffect } from "react";
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
import { Select } from "chakra-react-select";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ProductData } from "./data/ProductSchema";
import { useAuth } from "../context/AuthContext";
import { format } from 'date-fns';
import {toast} from "react-toastify";


const initializeProductDetails = () => {
  const storedProducts = localStorage.getItem("product");
  return storedProducts ? JSON.parse(storedProducts) : {};
};

export const CreateSaleOrder = ({ isSaleOrder, setIsSaleOrder }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productDetails, setProductDetails] = useState(initializeProductDetails);
    const [errorMessages, setErrorMessages] = useState({});
    const { authStateChange } = useAuth();
    const formattedDate = format(new Date(), "dd/MM/yyyy (h:mm a)");
    const {colorMode} = useColorMode();

    const productOptions = Array.from(
    new Set(ProductData.map((product) => product))
    ).map((product) => ({
      value: product.sku[0].id,
      label: product.brand,
      price: product.sku[0].amount,
      quantity: product.sku[0].quantity_in_inventory,
      unit: product.sku[0].unit,
    }));

    const handleProductChange = (selectedOptions) => {
      setSelectedProducts(selectedOptions || []);
    };

    const handleSaleOrder = (e) => {
      e.preventDefault();
      setIsSaleOrder(!isSaleOrder);
    };

    const handleInputChange = (productValue, productLabel, productQuantity, field, value) => {
      if (field === "totalItems" && value > productQuantity) {
          setErrorMessages((prevMessages) => ({
              ...prevMessages,
              [productValue]: `Quantity exceeds available stock of ${productQuantity}`,
          }));
          return;
      }else{
          setErrorMessages((prevMessages) => ({
              ...prevMessages,
              [productValue]: "",
          }));
      }

      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [productValue]: {
            ...prevDetails[productValue],
            id: productValue,
            label: productLabel,
            [field]: value,
            dateCreated:formattedDate
        },
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem("product", JSON.stringify(Object.values(productDetails)));
      authStateChange();
      toast.success("Sale Order Created!");
      
    };

    useEffect(() => {
      localStorage.setItem("product", JSON.stringify(productDetails));
    }, [productDetails]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        width="lg"
        className="form-sale-order"
        background={colorMode==="dark"? "teal" : "white"}
        style={{
          borderRadius: "8px",
          width: "600px",
          height: "500px",
          left: "30%",
          position: "fixed",
          top: "20%",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          overflowY: "auto",
        }}
      >
        <Box style={{ margin: "30px" }} >
          <span
            style={{
              display: "flex",
              justifyContent: "right",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            <IoIosCloseCircleOutline onClick={handleSaleOrder} />
          </span>
          <FormLabel
            justifyContent="center"
            textAlign="center"
            marginBottom="10px"
            fontSize="20px"
          >
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
            <Box
              className="card-product"
              style={{ marginBottom: "10px", gap: "15px" }}
            >
              {selectedProducts.map((product, index) => (
                <Box
                  key={product.value}
                  borderWidth="1px"
                  borderRadius="lg"
                  padding="4"
                  style={{ background: "white" }}
                >
                  <div className="header">
                    <h4 fontWeight="bold" className="heading-product">
                      {product.value}. {product.label}
                    </h4>
                    <Text
                      color="#1a202c"
                      width="fit-content"
                      background="#74FF8A"
                      padding="2px 10px"
                      borderRadius="23px"
                    >
                      Rs. {product.price}
                    </Text>
                  </div>
                  <Stack
                    style={{ marginTop: "6%", color: "#1a202c" }}
                    direction="row"
                    spacing={4}
                    align="center"
                    marginTop={2}
                  >
                    <Box>
                      <Text className="text-heading">Selling Rate</Text>
                      <Input
                        value={productDetails[product.value]?.sellingRate || ""}
                            onChange={(e) =>
                            handleInputChange(
                                product.value,
                                product.label,
                                product.quantity,
                                "sellingRate",
                                e.target.value
                            )
                        }
                        type="number"
                        placeholder="Enter selling rate"
                        required
                      />
                    </Box>
                    <Box>
                      <Text className="text-heading">Total Items</Text>
                      <Input
                        value={productDetails[product.value]?.totalItems || ""}
                        onChange={(e) =>
                          handleInputChange(
                            product.value,
                            product.label,
                            product.quantity,
                            "totalItems",
                            e.target.value
                          )
                        }
                        type="number"
                        placeholder="Enter quantity"
                        required
                      />
                      {errorMessages[product.value] && (
                        <Text color="red">{errorMessages[product.value]}</Text>
                      )}
                    </Box>
                  </Stack>
                  <Text
                    marginTop="10px"
                    color="#1a202c"
                    width="fit-content"
                    background="#74FF8A"
                    padding="2px 10px"
                    borderRadius="23px"
                  >
                    {product.quantity + " " + product.unit} Items Remaining
                  </Text>
                </Box>
              ))}
            </Box>
          </Stack>
        </Box>
        <Button type="submit" colorScheme="teal" width="sm">
          Submit
        </Button>
      </FormControl>
    </form>
  );
};
