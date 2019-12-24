import axios from 'axios'

const api=axios.create({
    baseURL:'http://10.4.22.184:8082/'
})

export const toFormData = object => {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      formData.append(key, object[key]);
    });
    return formData;
  };
export const url="http://10.4.22.184:8082/fileAccess/"
export default api;