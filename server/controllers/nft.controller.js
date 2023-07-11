const multer = require('multer');
const fs = require('fs');
const { NFTStorage, File } = require('nft.storage');
const MulX20 = require('../../smartContract/artifacts/contracts/MulX20.sol/MulX20.json');
const MulX721 = require('../../smartContract/artifacts/contracts/MulX721.sol/MulX721.json');
const ethers = require('ethers');
const Sequelize = require('sequelize');
const { Users, Imgs } = require('../models');

require('dotenv').config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;
const provider = new ethers.JsonRpcProvider(process.env.GANACHE_URL);

const MulX20ContractAddress = process.env.MULX20_CONTRACT_ADDRESS;
const MulX721ContractAddress = process.env.MULX721_CONTRACT_ADDRESS;

const ServerPrivateKey = process.env.SERVER_PRIVATE_KEY;
const ServerWallet = new ethers.Wallet(ServerPrivateKey, provider);

const MulX721Contract = new ethers.Contract(
  MulX721ContractAddress,
  MulX721.abi,
  ServerWallet
);

// // diskStorage를 사용할 경우
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

// memoryStorage를 사용할 경우
const multerStorage = multer.memoryStorage();

const upload = multer({ storage: storage });

const fileNameParser = (fileName) => Buffer.from(fileName, 'latin1').toString('utf8');

const storeNFT = async (req, res) => {
  const nftMetadata = req.body;

  const file = req.files.img[0];
  const filePath = file.path;
  const fileName = file.originalname;

  const nft = {
    name: nftMetadata.nickName,
    title: nftMetadata.title,
    description: nftMetadata.description,
    category: nftMetadata.category,
    price: nftMetadata.price,
    UserAddress: nftMetadata.userAddress,
  };

  if (file.mimetype.startsWith('image/')) {
    nft.image = new File([fs.readFileSync(filePath)], fileName, {
      type: file.mimetype,
    });
  } else {
    nft.image = new Blob([fs.readFileSync(filePath)], { type: file.mimetype });
  }

  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store(nft);

  //console.log(file);
  //console.log(metadata.url);

  return metadata.url;
};

module.exports = {
  articleFormDataHandler: upload.fields([
    { name: 'img', maxCount: 1 },
    { name: 'name', maxCount: 1 },
    { name: 'title', maxCount: 1 },
    { name: 'description', maxCount: 1 },
    { name: 'category', maxCount: 1 },
    { name: 'price', maxCount: 1 },
    { name: 'userAddress', maxCount: 1 },
  ]),

  mint: async (req, res) => {
    try {
      const metadata = await storeNFT(req, res);
      const metadataURL = metadata.replace('ipfs://', 'https://ipfs.io/ipfs/');
      const ownerAddress = req.body.userAddress;
      //console.log(metadataURL);

      const user = await Users.findOne({ where: { address: ownerAddress } });

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const setMulX20 = await MulX721Contract.setToken(MulX20ContractAddress);

      const tx = await MulX721Contract.mintNFT(ownerAddress, metadataURL, req.body.price);
      const tokenId = await MulX721Contract.getTokenId();
      //console.log(tokenId);
      const getNFTPrice = await MulX721Contract.getNftPrice(tokenId);

      res.status(200).json({
        owner: ownerAddress,
        tokenId: tokenId.toString(),
        tokenURL: metadataURL,
        price: getNFTPrice.toString(),
      });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: 'Failed to mint NFT.' });
    }
  },
  findAllNfts: async (req, res) => {
    try {
      const nftList = await MulX721Contract.getAllNftList();
      //console.log(nftList);

      const serializedNftList = nftList.map((nft) => {
        return {
          tokenId: nft[0].toString(),
          uri: nft[1],
        };
      });

      res.status(200).json({ nftList: serializedNftList });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: 'Failed to find all NFTs.' });
    }
  },

  findOwnerNfts: async (req, res) => {
    try {
      const { address } = req.params;
      const nftOwnerList = await MulX721Contract.getNftTokenList(address);

      //console.log(nftOwnerList);

      const serializedNftList = nftOwnerList.map((nft) => {
        return {
          tokenId: nft[0].toString(),
          uri: nft[1],
        };
      });

      res.status(200).json({ nftList: serializedNftList });
      //res.status(200).json('test');
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: 'Failed to find owner NFTs.' });
    }
  },

  setPrice: async (req, res) => {
    try {
      const { address, tokenId, price } = req.body;

      const user = await Users.findOne({ where: { address: address } });

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const owner = await MulX721Contract.getOwnerOfTokenId(tokenId);
      if (owner !== address) {
        return res.status(403).json({ error: 'You are not owner of this NFT.' });
      }

      const setNftPrice = await MulX721Contract.setNftPrice(tokenId, price);
      const viewPrice = await MulX721Contract.getNftPrice(tokenId);

      res.status(200).json({
        tokenId: tokenId,
        price: viewPrice.toString(),
      });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: 'Failed to set price.' });
    }
  },
  getPrice: async (req, res) => {
    try {
      const { tokenId } = req.params;
      const price = await MulX721Contract.getNftPrice(tokenId);
      res.status(200).json({
        tokenId: tokenId,
        price: price.toString(),
      });
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: 'Failed to get price.' });
    }
  },

  buyNft: async (req, res) => {
    try {
      const { address, tokenId } = req.body;

      const user = await Users.findOne({ where: { address: address } });

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      buyerPrivateKey = user.privatekey;
      const buyerWallet = new ethers.Wallet(buyerPrivateKey, provider);

      const BuyMulX20Contract = new ethers.Contract(
        MulX20ContractAddress,
        MulX20.abi,
        buyerWallet
      );

      const BuyMulX721Contract = new ethers.Contract(
        MulX721ContractAddress,
        MulX721.abi,
        buyerWallet
      );

      const priceNft = await BuyMulX721Contract.getNftPrice(tokenId);
      const ownerAddress = await BuyMulX721Contract.getOwnerOfTokenId(tokenId);
      console.log(ownerAddress);

      if (priceNft == 0) {
        return res.status(403).json({ error: 'This NFT is not for sale.' });
      }

      const priceNftWei = ethers.parseEther(priceNft.toString());

      const approve = await BuyMulX20Contract.approve(
        MulX721ContractAddress,
        priceNftWei
      );
      const tx = await MulX20Contract.transferFrom(
        MulX721ContractAddress,
        ownerAddress,
        priceNftWei,
        { from: buyerWallet }
      );
      console.log(tx);
      // // res.status(200).json({ tx: tx });
      res.status(200).json('test');
    } catch (error) {
      //console.log(error);
      res.status(500).json({ error: 'Failed to buy NFT.' });
    }
  },
};
