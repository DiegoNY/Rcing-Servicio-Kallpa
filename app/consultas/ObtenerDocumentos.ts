export const ObtnerDocumentos = (sql: any) => {

    const ObtnerDocumentosQuery = `
    SELECT TOP 1 
    D.cod_venta as CodVenta,D.nombre_cliente as cliente ,D.numero_identificacion as NroDocCliente, D.direccion_cliente as DirCliente,
    D.tipo_identificacion as TipoDoc,D.serie_recibo as Serie, D.correlativo_recibo as Correlativo, D.fecha_recibo as FechaEmision,D.hora_recibo as HoraEmision,
    D.fecha_recibo as FechaVencimiento, D.moneda_recibo as Moneda, D.forma_pago_recibo as FormaPago , D.base_imponible_recibo as Base, D.total_impuesto_recibo as Igv,
    D.total_excentos_recibo as MontoExcento,D.total_gratuitos_recibo as MontoGratuito,D.total_descuento_recibo as Descuento,
    D.total_recibo as TotalDocumento, D.porcentaje_impuesto as Porcentaje,D.cod_guia as NGuia,D.tasa_cambio as TipoCambio
    FROM Cabecera_Recibo AS D
    `;

    return new Promise((resolve, reject) => {

        sql.query(ObtnerDocumentosQuery, (err: any, result: any) => {
            if (err) {
                reject(err);
                return console.error('Error al ejecutar la consulta: ', err);
            }

            const documentos = result?.recordset;
            resolve(documentos);

        });
    })

}