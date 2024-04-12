import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseUrl = 'http://20.163.175.115/api/';

const get = async endPoints => {
  const accessToken = await AsyncStorage.getItem('access');

  return axios.get(baseUrl + endPoints, {
    headers: {
        Authorization: `Bearer ${accessToken}`, // Use the passed token
      },
  }
    );
};
const postFormdata = async (endPoints, formData) => {
  const accessToken = await AsyncStorage.getItem('access');

  return axios.post(baseUrl + endPoints, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`, // Use the passed token
      },
  });
};

const post = async (endPoints, body) => {
  const accessToken = await AsyncStorage.getItem('access');

  return axios.post(baseUrl + endPoints, body, {
    headers: {
        Authorization: `Bearer ${accessToken}`, // Use the passed token
      },
  });
};

const remove = async (endPoints) => {
  const accessToken = await AsyncStorage.getItem('access');

  return axios.delete(baseUrl + endPoints, {
    headers: {
        Authorization: `Bearer ${accessToken}`, // Use the passed token
      },
  });
};

export default {get, post, postFormdata, remove};
