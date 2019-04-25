"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogisticRegression = /** @class */ (function () {
    function LogisticRegression() {
        // Se inician los atributos con los valores calculados en el modelo de sklearn
        this.weigths = [-0.13360025, 0.19160088, 0.10749425, -0.10344981];
        this.boundary = 0.5;
        this.intercept = -0.09699679;
    }
    // Funcion para sacar el sigmoide, el sigmoide solo va de 0 a 1
    LogisticRegression.prototype.sigmoid_function = function (score) {
        return 1 / (1 + Math.exp(-score));
    };
    //Funcion para predecir el score de los datos, aqui se multiplican los pesos con los features enviados al servidor y se le agrega el intercept
    LogisticRegression.prototype.predict_score = function (feature_matrix) {
        var score = 0;
        var LEN_ARRAY = feature_matrix.length;
        for (var columna = 0; columna < LEN_ARRAY; columna++) {
            score = score + Number(this.weigths[columna]) * Number(feature_matrix[columna]);
        }
        return score + this.intercept;
    };
    //Funcion para cambiar el boundary, si el boundary es mas alto, el 0 tiene mas probabilidad de salir
    LogisticRegression.prototype.change_boundary = function (newBoundary) {
        this.boundary = newBoundary;
    };
    //Funcion para cambiar los pesos
    LogisticRegression.prototype.change_weigths = function (newWeigths) {
        this.weigths = newWeigths;
    };
    //Funcion para predecir la etiqueta, 1 mantenimiento, 0 no se necesita
    LogisticRegression.prototype.predict_label = function (result) {
        var label = "";
        if (result > this.boundary) {
            label = "Se necesita mantenimiento del motor";
        }
        else {
            label = "No se necesita mantenimiento del motor";
        }
        return label;
    };
    //Funcion que agrupa a la mayoria para enviar el resultado
    LogisticRegression.prototype.predict_output = function (feature_matrix) {
        var score = this.predict_score(feature_matrix);
        var result = this.sigmoid_function(score);
        //Si el score es mayor a boundary se necesitara mantenimiento del motor, si es menor no se necesita
        var label = this.predict_label(result);
        var data = {
            weights: this.weigths,
            boundary: this.boundary,
            score: score,
            result_sigmoid: result,
            label: label
        };
        return data;
    };
    return LogisticRegression;
}());
exports.default = LogisticRegression;
