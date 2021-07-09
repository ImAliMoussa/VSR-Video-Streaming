import axios from 'axios';

// for reference https://github.com/axios/axios/issues/175#issuecomment-165521644
// easily switch from using local django server and remote hosted django server
// the aws server may not be working because keep it running all the time is expensive
const djangoAxios = axios.create({
  // baseURL: 'http://localhost:8000'
  baseURL: 'http://a9624974ff0d144f8899afe12f6eef8e-501389063.eu-central-1.elb.amazonaws.com',
});

export default djangoAxios;
