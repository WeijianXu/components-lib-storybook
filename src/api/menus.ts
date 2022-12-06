import axios from 'axios';

let { origin } = window.location;

// if (origin.includes('localhost')) {
//   origin = 'https://test.jgwork.zjzwfw.gov.cn';
// }

export default (systemCode = 'data-screen') =>
  axios
    .get(`${origin}/cas/usercenter/menu/getMenuTree?systemCode=${systemCode}`)
    .then((res) => res.data);
