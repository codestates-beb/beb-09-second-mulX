import axios from 'axios';

export async function postFormAPI(email, title, contents, image) {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('title', title);
    formData.append('content', contents);
    formData.append('post_img', image);

    const response = await axios.post('http://localhost:8080/post', formData);

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}