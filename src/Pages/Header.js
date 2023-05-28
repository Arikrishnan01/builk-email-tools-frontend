import React from 'react';
import './header.css';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
  return (
    <div className='header'>
        <h1 className='headerTitle'>builk email application </h1>
        <Button 
                colorScheme='teal'
                width="10%"
                style={{ marginTop: 15, marginRight: 100}}
                onClick={() => navigate('/admin')}
                // isLoading={loading}
            >
                Login
            </Button>
    </div>
  )
}
