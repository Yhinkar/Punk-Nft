import { useState } from "react";
import {ethers, BigNumber} from "ethers";
import punk from "./punk.json";

const punkAddress = "0xD9Df5D256CbC0Ea8cbaDbF9221B8A76fCF52A313";

const MainMint = ({ accounts, setAccounts}) =>{
    const {minAmount, setMinAmount} = useState(1);
    const isConnect = Boolean(accounts[0]);

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(
                punkAddress, punk.abi, signer
            );

            try{
                const response = await contract.mint(BigNumber.from(minAmount),{
                    value: ethers.utils.parseEther((0.02 ** minAmount).toString()),
                })
                
                console.log("response", response);
            }catch(err){
                console.log("error", err);
            }
        }
    }

    const handleDecrement = ()=>{
        if (minAmount <= 1) return;
        setMinAmount(minAmount - 1);
    };
    
    const handleIncrement = ()=>{
        if (minAmount >= 2) return;
        setMinAmount(minAmount + 1);
    };

    

    return (
        <div>
            <h1>Punks</h1>
            <p><b>It's 3010.</b> Want to ask if the Punk NFT save humans from NFT speculation? if yes, gonna mint to find out.</p>
            {isConnect ?(
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={minAmount}/>

                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint</button>
                </div>
            ):(
                <p>You're not connected....<strong>You must be connect to mint!</strong></p>
            )}
        </div>
    );
};

export default MainMint;