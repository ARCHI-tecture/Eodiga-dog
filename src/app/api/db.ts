import { PoolConnection, MysqlError } from "mysql";
import mysql from "mysql";

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
};

const pool = mysql.createPool(config);

export function getConnection(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
        pool.getConnection((error: MysqlError | null, connection: PoolConnection) => {
            if (error) return reject(error);
            return resolve(connection);
        });
    });
}

export function query<T>(connection: PoolConnection, sql: string, params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error: MysqlError | null, results: T) => {
            if (error) return reject(error);
            return resolve(results);
        });
    });
}
