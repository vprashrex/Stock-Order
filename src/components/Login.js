import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Flex } from '@chakra-ui/react';
import {useRef} from "react";
import createToken from './jwtservice';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { useAuth } from '../context/AuthContext';


export const Login = () => {

  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const {userauthStateChange} = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.current.value === "admin" && password.current.value === "admin"){
      const uname = username.current.value;
      const token = await createToken({ uname });
      localStorage.setItem('token', token);
      toast.success("Logged in Sucessful!");
      await userauthStateChange();
      navigate("/dashboard"); 
    }else{
      toast.error('Invalid username or password');
    }

  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box width="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
            <Heading as="h1" mb={6} textAlign="center">
            Login
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input type="name" ref={username} required />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" ref={password} required />
                </FormControl>
                  <Button type="submit" colorScheme="teal" width="full">
                    Login
                  </Button>
              </VStack>
            </form>
        </Box>
    </Flex>
  );
};
