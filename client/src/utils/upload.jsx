import axios from 'axios';

const Upload = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'GigZone');
  try {
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dxp8k3sze/image/upload',
      data
    );
    const { url } = res.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};
export default Upload;
