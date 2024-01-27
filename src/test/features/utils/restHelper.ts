import axios from 'axios';

export const getData = async (url) => {
  try {
    return await axios.get(url);
  } catch (e) {
    console.error('exception occurred while GET', e);
    throw e;
  }
};

export const postData = async (url, data) => {
  try {
    return await axios.post(url, data, { timeout: 5000 });
  } catch (e) {
    console.error('exception occurred while POST', e.config);
    console.error(JSON.stringify(e));
    throw e;
  }
};

export const patchData = async (url, data) => {
  try {
    return await axios.patch(url, data);
  } catch (e) {
    console.error('exception occurred while PATCH', e);
    console.error(JSON.stringify(e));
    throw e;
  }
};

export const deleteData = async (url, data) => {
  try {
    return await axios.delete(url);
  } catch (e) {
    console.error('exception occurred while DELETE', e);
    throw e;
  }
};
