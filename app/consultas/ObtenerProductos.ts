import { Request } from "mssql";
import { Item } from "../types/serviceDoc";

export const ObtnerProductos = (sql: Request, numero_documento: string): Promise<Item[]> => {
    // console.log(numero_documento);
    const ObtnerProductosQuery = `SELECT I.codigo_item as CodigoItem,I.descripcion_item as Descripcion, I.unidad_item as Unidad,
    I.cantidad_item as Cantidad , I.precio_item as Precio, I.total_base_item as SubTotal, I.impuesto_item as Igv,I.descuento_item as Descuento,
    I.importe_item as Total, null as Lote, null as FechaVcto , null as Labora, null as Pastilla, null as Palote    
    FROM Item as I WHERE I.cod_recibo = '${numero_documento}'`;
    return new Promise((resolve, reject) => {

        sql.query(ObtnerProductosQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error al ejecutar la consulta productos: ', err);
                reject(err);
            }

            const productos = result?.recordset;
            resolve(productos);
        });

    })

}