"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./classes/server"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var LogisticRegression_1 = __importDefault(require("./classes/LogisticRegression"));
var server = server_1.default.instance;
//mecatronica20
//Anita
//Body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//Configuracion del cors
server.app.use(cors_1.default({
    origin: true,
    credentials: true
}));
//rutas
server.app.post("/predicciones", function (req, res, next) {
    //Se crea una nueva clase de LogisticRegression
    var LogReg = new LogisticRegression_1.default();
    //Se guardan los datos enviados al server en un arreglo
    var variables = [+req.body.accelerometer, +req.body.gyroscope, +req.body.magnetometer, +req.body.humidity];
    //Se hace la prediccion con los datos enviados al server
    var prediction = LogReg.predict_output(variables);
    //Se envian la prediccion
    res.status(200).json({
        message: "exito",
        prediction: prediction
    });
});
//server.app.use("/empresas", empresaRoutes);
server.start(5000);
