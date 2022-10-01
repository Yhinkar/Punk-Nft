 // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.9;

 import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
 import "@openzeppelin/contracts/access/Ownable.sol";

 contract punkNft is ERC721, Ownable{
    uint256 public priceMInt;
    uint256 public totalSupply;
    uint256 public maxSupply;
    uint256 public mintPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdraWallet;
    mapping(address => uint256) public walletMints;


    constructor() payable ERC721("punkNFT", "PT"){
        priceMInt = 0.01 ether;
        totalSupply = 0;
        maxSupply = 500;
        mintPerWallet = 2;
        //////////////////////////////////////////////////
    }


    function mint(uint _amount) public payable{
        require(isPublicMintEnabled, "minting not enabled");
        require(msg.value == _amount + priceMInt, "wrong mint value");
        require(totalSupply + _amount <= maxSupply, "sold out");
        require(walletMints[msg.sender] + _amount <= mintPerWallet, "exceed max wallet");

        for (uint i = 0; i< _amount; i++){
            uint256 newtokenId = totalSupply + 1;
            totalSupply ++;
            _safeMint(msg.sender, newtokenId);
        }
    }
    function setIsMintEnabled(bool _isPublicMintEnabled) external onlyOwner{
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setTokenUri(string memory _baseTokenUri) external onlyOwner{
        baseTokenUri = _baseTokenUri;
    }

    function tokenURI(uint _tokenID) public view override returns(string memory){
        require(_exists(_tokenID), "token doesn't exist");
        return string(abi.encodePacked(baseTokenUri, Strings.toString(_tokenID), ".json"));

    }

    function withdraw() external onlyOwner{
        (bool success, ) = withdraWallet.call{value: address(this).balance}("");
        require(success, "withdraw failed");
    }
 }