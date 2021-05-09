import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import https from 'https';
import { resolve } from 'path';

const credential = {
  client_id: process.env.GERENCIA_ID,
  client_secret: process.env.GERENCIA_SECRET,
};

const data_credentials = `${credential.client_id}:${credential.client_secret}`;

const auth = Buffer.from(data_credentials).toString('base64');

const certificado = fs.readFileSync(
  resolve(__dirname, '..', '..', 'rentxdev.p12')
);

const agent = new https.Agent({
  pfx: certificado,
  passphrase: '',
});

const authenticate = () => {
  return axios({
    method: 'POST',
    url: `${process.env.GERENCIA_URL}/oauth/token`,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    httpsAgent: agent,
    data: {
      grant_type: 'client_credentials',
    },
  });
};

// const pix: AxiosInstance = async () => {
//   const authResponse = await authenticate();
//   const accessToken = authResponse.data?.access_token;

//   const config: AxiosRequestConfig = {
//     baseURL: process.env.GERENCIA_URL,
//     httpsAgent: agent,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json',
//     },
//   };

//   return axios.create(config);
// };
export { authenticate, agent };
