import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Flex } from '@chakra-ui/react';

export const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box width="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
            <Heading as="h1" mb={6} textAlign="center">
            Login
            </Heading>
            <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" required />
                </FormControl>
                <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" required />
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
