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
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from "react-router";

export default function Signup(){
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    // const history = useHistory();

    const handleClick = () => {setShow(!show)};


    const submitHandler =async () => {
        setLoading(true);
        if(!name || !email || !password || !confirmpassword) {
            toast({
                title: "Please fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        if(password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post("https://email-tool-test.onrender.com/api/user",{
                name, email, password }, 
                config
            );
            toast({
                title: "Registration successful",
                status: "success",
                duration: 6000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            navigate('/');
            // history.push("/chats")
        }
        catch(error) {
            toast({
                title: "Error Occured!!",
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
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input
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

            <FormControl id="confirmpassword" isRequired>
                <FormLabel>Confirmpassword</FormLabel>
                <InputGroup>
                    <Input
                        type={ show ? "text" : "password"}
                        placeholder='Enter Your confirmpassword'
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            { show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button 
                colorScheme='teal'
                width="100%"
                style={{ marginTop: 15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>

        </VStack>
    )
}