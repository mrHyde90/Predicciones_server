export default class LogisticRegression {
    // los atributos de instancia de la clase
    private weigths: number[]; // los pesos de cada variable, fueron calculados anteriormente usando python y sklearn
    private boundary:number; //El boundary, fija de que punto el label se convierte en 0 o 1, si se sube aumenta la probabilidad de 0
    private intercept:number; //El intercept es el valor inicial que se fija al modelo, fue calculado anteriormente usando python y sklearn

    public constructor(){
        // Se inician los atributos con los valores calculados en el modelo de sklearn
        this.weigths = [-0.13360025,  0.19160088,  0.10749425, -0.10344981];
        this.boundary = 0.5;
        this.intercept = -0.09699679;
    }

    // Funcion para sacar el sigmoide, el sigmoide solo va de 0 a 1
    public sigmoid_function(score: number){
        return 1/(1 + Math.exp(-score))
    }

    //Funcion para predecir el score de los datos, aqui se multiplican los pesos con los features enviados al servidor y se le agrega el intercept
    public predict_score(feature_matrix: number[]){
        let score:number = 0;
        const LEN_ARRAY = feature_matrix.length;
        for(let columna = 0;columna < LEN_ARRAY; columna++ ){
             score = score + Number(this.weigths[columna]) * Number(feature_matrix[columna]);
        }
        return score + this.intercept;
    }

    //Funcion para cambiar el boundary, si el boundary es mas alto, el 0 tiene mas probabilidad de salir
    public change_boundary(newBoundary: number){
        this.boundary = newBoundary;
    }

    //Funcion para cambiar los pesos
    public change_weigths(newWeigths: number[]){
        this.weigths = newWeigths;
    }

    //Funcion para predecir la etiqueta, 1 mantenimiento, 0 no se necesita
    private predict_label(result: number){
        let label = "";
        if(result > this.boundary){
            label = "Se necesita mantenimiento del motor";
        } else {
            label = "No se necesita mantenimiento del motor";
        }
        return label;
    }

    //Funcion que agrupa a la mayoria para enviar el resultado
    public predict_output(feature_matrix: number[]){
        const score = this.predict_score(feature_matrix);
        const result = this.sigmoid_function(score);
        //Si el score es mayor a boundary se necesitara mantenimiento del motor, si es menor no se necesita
        const label = this.predict_label(result);
        const data = {
            weights: this.weigths,
            boundary: this.boundary,
            score: score,
            result_sigmoid: result,
            label: label
        };
        return data;
    }
}
