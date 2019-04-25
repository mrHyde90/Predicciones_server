import Server from './classes/server';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Request, Response} from "express";
import LogisticRegression from './classes/LogisticRegression';

const server  = Server.instance;
//mecatronica20
//Anita
//Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

//Configuracion del cors
server.app.use(cors({
    origin: true,
    credentials: true
}));
//rutas
server.app.post("/predicciones", (req: Request, res: Response, next: Function) => {
    //Se crea una nueva clase de LogisticRegression
    const LogReg:LogisticRegression = new LogisticRegression();
    //Se guardan los datos enviados al server en un arreglo
    const variables = [+req.body.accelerometer, +req.body.gyroscope, +req.body.magnetometer, +req.body.humidity];
    //Se hace la prediccion con los datos enviados al server
    let prediction = LogReg.predict_output(variables);
    //Se envian la prediccion
    res.status(200).json({
        message: "exito",
        prediction: prediction
    });
});
//server.app.use("/empresas", empresaRoutes);

server.start( 5000);