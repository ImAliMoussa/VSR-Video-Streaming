import axios from 'axios';

// for reference https://github.com/axios/axios/issues/175#issuecomment-165521644
// easily switch from using local django server and remote hosted django server
// the aws server may not be working because keep it running all the time is expensive
const djangoAxios = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'http://ad3fe70a36d764389b5b61d50ce54fae-140035799.eu-central-1.elb.amazonaws.com',
});

export default djangoAxios;
