import { Request } from "mssql";
import { Documento } from "../types/serviceDoc";

export const ObtnerDocumentos = (sql: Request): Promise<Documento[]> => {

    const ObtnerDocumentosQuery = `
    SELECT TOP 8 
    D.cod_venta as CodVenta,D.nombre_cliente as cliente ,D.tipo_identificacion as TipoDocCliente,D.numero_identificacion as NroDocCliente, D.direccion_cliente as DirCliente,
    D.tipo_identificacion as TipoDoc,D.serie_recibo as Serie, D.correlativo_recibo as Correlativo, D.fecha_recibo as FechaEmision,D.hora_recibo as HoraEmision,
    D.fecha_recibo as FechaVencimiento, D.moneda_recibo as Moneda, 
    
    CASE 
        WHEN D.forma_pago_recibo ='EFECTIVO' THEN'CONTADO'
    END as FormaPago

    , D.base_imponible_recibo as Base, D.total_impuesto_recibo as Igv,
    D.total_excentos_recibo as MontoExcento,D.total_gratuitos_recibo as MontoGratuito,D.total_descuento_recibo as Descuento,
    D.total_recibo as TotalDocumento, D.porcentaje_impuesto as Porcentaje,D.cod_guia as NGuia,D.tasa_cambio as TipoCambio, D.fecha_nota as FechaReferencia,
    D.hora_nota as HoraReferencia, D.tipo_doc_referencia as TipoReferencia , D.serie_correlativo_ref as DocumentoReferencia, D.codigo_motivo_nota as CodMotivo,
    D.detalle_cod_motivo as Motivo, D.descripcion as Otros,
    
    CASE 
        WHEN D.porc_detraccion > 0 THEN '1'
    END AS Detraccion,
    
    D.porc_detraccion as PorcDetraccion, D.monto_detraccion as MontoDetraccion, null as RegimenPercepcion, null as TasaPercepcion, null MontoPercepcion, 1 as Estado
    FROM Cabecera_Recibo AS D
    `;


    return new Promise((resolve, reject) => {

        sql.query(ObtnerDocumentosQuery, (err: any, result: any) => {
            if (err) {
                console.error('Error al ejecutar la consulta: ', err);
                reject(err);
                return
            }

            const documentos = result?.recordset;
            resolve(documentos);

        });
    })

}