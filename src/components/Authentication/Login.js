import React from 'react';
import { useState} from 'react';
import { VStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    // const history = useHistory();

    const handleClick = () => {setShow(!show)};

    // const submitHandler = () => {};
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          return;
        }
    
        // console.log(email, password);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const { data } = await axios.post(
            "https://email-tool-test.onrender.com/api/user/login",
            { email, password },
            config
          );
    
          // console.log(JSON.stringify(data));
          toast({
            title: "Login Successful",
            status: "success",
            duration: 7000,
            isClosable: true,
            position: "bottom",
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          setLoading(false);
          navigate('/');

        //   history.push("/chats");
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        }
      };


    return(
        <VStack spacing='5px'>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
                            value={password}
                            type={ show? "text": "password"}
                            placeholder='Enter Your Padssword'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleClick}>
                                { show ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
            </FormControl>

            <Button 
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>

        </VStack>
    )
}