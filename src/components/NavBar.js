import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const {currentUser,userauthStateChange} = useAuth();

  useEffect(() => {
    async function fetchData() {
      await userauthStateChange();
    }
    fetchData();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    await userauthStateChange();
    navigate("/");
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box style={{fontFamily:"Monarda",cursor:"pointer"}}>Stock Order</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://api.dicebear.com/8.x/adventurer/svg?seed=Chloe'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://api.dicebear.com/8.x/adventurer/svg?seed=Chloe'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{currentUser? currentUser.uname : "Username"}</p>
                  </Center>
                  <br />
                  <MenuDivider />

                  <MenuItem onClick={(e) => handleLogout(e)}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}