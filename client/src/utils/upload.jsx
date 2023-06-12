import axios from 'axios';

const Upload = async (file) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'GigZone');
  data.append('quality', 'auto:low');

  try {
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dxp8k3sze/image/upload',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const { secure_url } = res.data;
    return secure_url;
  } catch (error) {
    console.log(error);
  }
};

export default Upload;
