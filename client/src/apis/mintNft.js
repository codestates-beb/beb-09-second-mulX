import axios from 'axios';

export async function mintNftAPI(img, nickName, title, description, category, price, userAddress, callback) {
  try {
    const formData = new FormData();
    formData.append('img', img);
    formData.append('nickName', nickName);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('userAddress', userAddress);

    const response = await axios.post('http://localhost:8080/nft/mint', formData);

    callback(null, response.data);
  } catch (error) {
    callback(error, null);
  }
}
