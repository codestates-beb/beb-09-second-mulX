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
    mapping(uint256 => address) private _tokenApprovals;

    constructor() payable ERC721("MyNFTs", "MNFT") {
        nftFee = 1e17; // 0.1 MulX Mint fee
    }

    function mintNFT(
        address recipient,
        string memory tokenURI,
        uint256 _nftPrice
    ) public returns (uint256, uint256) {
        //require(token.balanceOf(recipient) > nftPrice);

        //token.transferFrom(recipient, msg.sender, nftPrice);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        // 토큰의 소유권을 BuyMulX721Contract 컨트랙트에게 위임
        approve(address(this), newItemId);
        _setTokenURI(newItemId, tokenURI);
        NftPrice[newItemId] = _nftPrice;

        return (newItemId, NftPrice[newItemId]);
    }

    function getTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    function setToken(address tokenAddress) public returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        return true;
    }

    function getToken() public view returns (address) {
        return address(token);
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

    function buyNftToken(uint256 _tokenId) public {
        uint256 price = NftPrice[_tokenId] * 1 ether;
        require(price > 0, "Invalid NFT price");
        require(
            token.allowance(msg.sender, address(this)) >= price,
            "Token allowance not set"
        );

        address seller = ownerOf(_tokenId);
        require(
            token.transferFrom(msg.sender, seller, price),
            "Token transfer failed"
        );

        //Transfer NFT from seller to buyer
        IERC721(address(this)).safeTransferFrom(seller, msg.sender, _tokenId);
    }

    function getApproved(
        uint256 _tokenId
    ) public view virtual override returns (address) {
        require(
            _exists(_tokenId),
            "ERC721: approved query for nonexistent token"
        );
        return _tokenApprovals[_tokenId];
    }

    function getAllowance(
        address buyer,
        address spender
    ) public view returns (uint256) {
        return token.allowance(buyer, spender);
    }

    function setMmulTransferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public returns (bool) {
        return token.transferFrom(sender, recipient, amount);
    }

    // NFT 토큰의 승인된 주소를 설정하는 함수
    function approve(
        address _approved,
        uint256 _tokenId
    ) public virtual override {
        address owner = ownerOf(_tokenId);
        require(_approved != owner, "ERC721: approval to current owner");
        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all"
        );
        _approve(_approved, _tokenId);
    }

    // NFT 토큰의 승인된 주소를 설정하는 내부 함수
    function _approve(
        address _approved,
        uint256 _tokenId
    ) internal virtual override {
        _tokenApprovals[_tokenId] = _approved;
    }
}
