import axios from 'axios';

let { origin } = window.location;

if (origin.includes('localhost')) {
  origin = 'https://test.jgwork.zjzwfw.gov.cn';
}

export default (data: any) => {
  return axios
    .post(`${origin}/cas/usercenter/open/recordOperationLog`, data)
    .then((res) => res.data || res);
};
