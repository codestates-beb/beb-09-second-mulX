// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MulX721 is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 nftFee;

    struct NftTokenData {
        uint256 nftTokenId;
        string nftTokenURI;
    }

    mapping(uint256 => string) public metadataURIs;
    mapping(uint256 => uint256) public NftPrice;

    constructor() ERC721("MyNFTs", "MNFT") {
        nftFee = 1e17; // 0.1 MulX Mint fee
    }

    function mintNFT(
        address recipient,
        string memory tokenURI,
        uint256 _nftPrice
    ) public onlyOwner returns (uint256, uint256) {
        //require(token.balanceOf(recipient) > nftPrice);

        //token.transferFrom(recipient, msg.sender, nftPrice);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        NftPrice[newItemId] = _nftPrice;

        return (newItemId, NftPrice[newItemId]);
    }

    function getTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function setToken(address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        return true;
    }

    function setNftPrice(
        uint256 _tokenId,
        uint256 _price
    ) public onlyOwner returns (uint256) {
        return NftPrice[_tokenId] = _price;
    }

    function getNftPrice(uint256 _tokenId) public view returns (uint256) {
        return NftPrice[_tokenId];
    }

    // function buyNFT() public returns (bool) {
    //     require(token.balanceOf(msg.sender) > nftPrice);
    //     token.transferFrom(msg.sender, address(this), nftPrice);
    //     return true;
    // }

    function getAllNftList() public view returns (NftTokenData[] memory) {
        uint256 nftLength = _tokenIds.current();
        NftTokenData[] memory nftTokenData = new NftTokenData[](nftLength);

        for (uint256 i = 0; i < nftLength; i++) {
            uint256 nftTokenId = i + 1;
            string memory nftTokenURI = tokenURI(nftTokenId);

            nftTokenData[i] = NftTokenData(nftTokenId, nftTokenURI);
        }

        return nftTokenData;
    }

    function getNftTokenList(
        address _nftTokenOwner
    ) public view returns (NftTokenData[] memory) {
        uint256 balanceLength = balanceOf(_nftTokenOwner); // 발행한 nft 갯수 확인

        NftTokenData[] memory nftTokenData = new NftTokenData[](balanceLength);

        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 nftTokenId = tokenOfOwnerByIndex(_nftTokenOwner, i);
            string memory nftTokenURI = tokenURI(nftTokenId);

            nftTokenData[i] = NftTokenData(nftTokenId, nftTokenURI);
        }

        return nftTokenData;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    function balanceOf(address _owner) public view returns (uint256) {
        uint256 counter = 0;
        for (uint256 i = 1; i <= totalSupply(); i++) {
            if (ownerOf(i) == _owner) {
                counter++;
            }
        }
        return counter;
    }

    function getOwnerOfTokenId(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    function tokenOfOwnerByIndex(
        address _owner,
        uint256 _index
    ) public view returns (uint256) {
        require(
            _index < balanceOf(_owner),
            "ERC721Enumerable: owner index out of bounds"
        );

        uint256 counter = 0;
        for (uint256 i = 1; i <= totalSupply(); i++) {
            if (ownerOf(i) == _owner) {
                if (counter == _index) {
                    return i;
                }
                counter++;
            }
        }
        return 0;
    }
}
