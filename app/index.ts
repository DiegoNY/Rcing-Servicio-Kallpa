import express from 'express'
import { ObtnerDocumentos } from './consultas/ObtenerDocumentos';
import { ObtnerProductos } from './consultas/ObtenerProductos';
import { pool } from './libs/sql.libs';

const app = express();

let documentos: any = []

pool.connect((err) => {

    if (err) {
        return console.error('Error de conexión: ', err);
    }
    console.log('Conectado a la base de datos!');
    const request = pool.request();

    ObtnerDocumentos(request)
        .then((documentosBD: any) => {

            documentosBD.map((documento: any) => {
                ObtnerProductos(request, documento.cod_venta)
                    .then(items => {
                        console.log(items);
                    });
            })

            documentos = documentosBD;

        })
        .catch(error => {
            console.log(error);
        })


});

app.get('/', (req, res) => {
    res.send({ productos: true, data: documentos })
})

app.listen(3011, () => {
    console.log("server iniciado")
})


