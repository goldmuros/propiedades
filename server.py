from flask import Flask, render_template, request, url_for, jsonify
import pandas as pd
import numpy as np
import models as models

app = Flask(__name__)

#Home
@app.route('/')
def home():
  return render_template('index.html')

#Modelo
@app.route('/modelo', methods=['POST'])
def modelo():
  if request.method == 'POST':
    file = request.files['file']

    df_train = pd.read_csv(file)

    result_lr = models.linear_regression(df_train)
    result_lasso = models.lasso(df_train)
    result_ridge = models.ridge(df_train)
    
    results = {'LinearRegression': {
                  'score': result_lr.tolist(),
                  'mean': np.mean(result_lr),
                  'std': np.std(result_lr) 
                  },
                'Lasso': {
                      'score': result_lasso['score'].tolist(),
                      'mean': np.mean(result_lasso['score']),
                      'std': np.std(result_lasso['score']),
                      'alpha': result_lasso['alpha']
                    },
                'Ridge': {
                      'score': result_ridge['score'].tolist(),
                      'mean': np.mean(result_ridge['score']),
                      'std': np.std(result_ridge['score']),
                      'alpha': result_ridge['alpha']
                      }
                  }
    
    return jsonify({'result': results})

#Testing
@app.route('/testing', methods=['POST'])
def testing():
  if request.method == 'POST':
    file = request.files['file']
    model = request.form['model']

    df_train = models.prepararDatos()
    df_test = pd.read_csv(file)
    result = models.predic(df_train, df_test, model)
      
    return jsonify({'result': result})

#Producción
@app.route('/produccion', methods=['POST'])
def produccion():
  if request.method == 'POST':
    data_json = request.get_json(force=True)

    model = data_json['model']
    predic_column = [[np.float64(data_json['precio_metro_usd'])]]

    df_train = models.prepararDatos()
    df_prod = read_data_json(data_json)
    
    result = models.predic_prod(df_train, df_prod, model, predic_column)

    return jsonify({'result': result})

def read_data_json(data):
  df = [[
    np.float64(data['precio_total_usd']),
    np.float64(data['sup_total']),
    np.float64(data['sup_cub']),
    np.float64(data['habitaciones']),
    np.float64(data['bus_stop']),
    np.float64(data['subway']),
    np.float64(data['park']),
    np.float64(data['school']),
    np.float64(data['police']),
    np.float64(data['hospital']),
    np.float64(data['almagro']),
    np.float64(data['barrio_norte']),
    np.float64(data['belgrano']),
    np.float64(data['caballito']),
    np.float64(data['flores']),
    np.float64(data['palermo']),
    np.float64(data['recoleta']),
    np.float64(data['san_telmo']),
    np.float64(data['villa_crespo']),
    np.float64(data['villa_urquiza']),
    np.float64(data['parrilla']),
    np.float64(data['gimnasio']),
    np.float64(data['sum']),
    np.float64(data['pileta']),
    np.float64(data['hidromasaje']),
    np.float64(data['vigilancia']),
    np.float64(data['playrooom']),
    np.float64(data['cancha']),
    np.float64(data['solarium']),
    np.float64(data['al_frente']),
    np.float64(data['nuevo']),
    np.float64(data['lavadero']),
    np.float64(data['aire']),
    np.float64(data['calefaccion']),
    np.float64(data['luminoso']),
    np.float64(data['garage']),
    np.float64(data['balcon']),
    np.float64(data['baulera']),
    np.float64(data['terraza'])
  ]]

  return df

if __name__ == "__main__":
  app.run(debug=True)