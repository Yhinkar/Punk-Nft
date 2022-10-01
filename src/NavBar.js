import React  from "react";
import {Box, Button, Flex, Image, Link, Spacer} from '@chakra-ui/react';
import Twitter from "./assets/social-media-icons/twitter_32x32.png"
import Email from "./assets/social-media-icons/email_32x32.png"
const NavBar = ({ accounts, setAccounts}) =>{
    const isConnect = Boolean(accounts[0]);

    async function connectAcct() {
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            }); 
            setAccounts(accounts);
        }
    }
    return(
        <Flex justify="space-between" align="center" padding="30px">
            <Flex justify="space-around" width="40%" padding="0.75%">
                <Link href="https://www.twitter.com">
                    <Image src = {Twitter} boxSize = "42px" margin= "0 15px"/>
                </Link>

                <Link href="https://www.gmail.com">
                    <Image src = {Email} boxSize = "42px" margin= "0 15px"/>
                </Link>
            </Flex>

           

            <Flex justify="space-between" align="center" padding="30px">
            <Spacer/>

            <Box margin="0 5px">About</Box>
            <Spacer/>
            <Spacer/>
            <Box margin="0 15px">Mint</Box>
            <Spacer/>

            {isConnect ?(
            <Box margin="0 15px">Connected</Box>
           ) :(
            <Button 
            backgroundColor= "#a52a2a"
            borderRadius="10px"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            color="white"
            cursor="pointer"
            fontFamily="inherit"
            padding="15px"
            margin= "0 15px"
            onClick={connectAcct}>Connect</Button>
           )}
            </Flex>
          


           
        </Flex>

       

    );
};

export default NavBar;