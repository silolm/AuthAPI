import {Pool} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const databaseConfig = {connectionString: "postgres://transportUser:develop@192.168.0.146:5235/transport"};
const pool = new Pool(databaseConfig);

export default pool;