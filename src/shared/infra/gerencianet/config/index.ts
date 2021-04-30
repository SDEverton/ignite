import Gerencianet from 'gn-api-sdk-node';

const options = {
  client_id: process.env.GERENCIA_ID,
  client_secret: process.env.GERENCIA_SECRET,
  sandbox: true,
};

const gerencianet = new Gerencianet(options);

export { gerencianet };
