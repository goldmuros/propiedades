from flask import Flask, render_template, request, url_for, jsonify
import pandas as pd
import numpy as np
import models as models

app = Flask(__name__)

df_train = models.prepararDatos()

#Home
@app.route('/')
def home():
  return render_template('index.html')

#Modelo
@app.route('/modelo', methods=['POST'])
def modelo():
  if request.method == 'POST':
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

    df_test = pd.read_csv(file)
    result = models.predic(df_train, df_test, model)
      
    return jsonify({'result': result})

#Producción
@app.route('/produccion', methods=['POST'])
def produccion():
  if request.method == 'POST':
    req = request.get_json(force=True)
    print('HOLA produccion')
    print(req)
    return jsonify({'result': 'ok'})


if __name__ == "__main__":
  app.run(debug=True)