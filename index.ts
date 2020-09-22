import OssieClient from './bot/client/OssieClient';
import { token } from './config.json';

const client = new OssieClient();

client.start(token);