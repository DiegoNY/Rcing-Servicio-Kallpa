export const ObtnerProductos = (sql: any, numero_documento: string) => {

    const ObtnerProductosQuery = `SELECT * FROM Item WHERE Item.cod_recibo = '${numero_documento}'`;
    return new Promise((resolve, reject) => {

        sql.query(ObtnerProductosQuery, (err: Error, result: any) => {
            if (err) {
                console.error('Error al ejecutar la consulta: ', err);
                reject(err);
            }

            const productos = result?.recordset;
            resolve(productos);
        });

    })

}