import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import server from './server';

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

const port = 3000;

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
