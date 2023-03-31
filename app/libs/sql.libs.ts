import sql from 'mssql'

const config = {
    user: 'rcIngenieros',
    password: 'z0qceUy=6jO+',
    server: '207.38.87.135',
    database: 'db2_JrTelecom',
    port: 1439,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};

export const pool = new sql.ConnectionPool(config);
