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
    test_run = request.form['test']

    X_train, X_test, y_train, y_test, df_recoleta = models.prepararDatos(file, test_run)

    data_input = {'X_train': X_train,
                  'y_train': y_train,
                  'X_test': X_test,
                  'y_test': y_test,
                  'test_run': test_run,
                  'df': df_recoleta}

    result_lr = models.predict(data_input, 'lr')
    result_lasso = models.predict(data_input, 'lasso')
    result_ridge = models.predict(data_input, 'ridge')
    
    if (test_run == 'Simple'):
      data_complex = {'LinearRegression': {'score': result_lr['score']},
                      'Lasso': {'score': result_lasso['score'],
                                'coef': {},
                                'alpha_': ''},
                      'Ridge': {'score': result_ridge['score'],
                                'coef': {},
                                'alpha_': ''}
      }
    else:
      data_complex = {'LinearRegression': {'score': result_lr['score'].tolist()},
                      'Lasso': {'score': result_lasso['score'].tolist(),
                                'coef': result_lasso['coef_'],
                                'alpha_': result_lasso['alpha_']},
                      'Ridge': {'score': result_ridge['score'].tolist(),
                                'coef': result_ridge['coef_'],
                                'alpha_': result_ridge['alpha_']}
      }

    results = {'LinearRegression': {
                  'score': data_complex['LinearRegression']['score'],
                  'intercept': result_lr['intercept_'],
                  'coef': result_lr['coef_'].tolist(),
                  'r2': result_lr['r2'],
                  'mae': result_lr['MAE'],
                  'mse': result_lr['MSE'],
                  'rmse': result_lr['RMSE']
                  },
                'Lasso': {
                      'score': data_complex['Lasso']['score'],
                      'intercept': result_lasso['intercept_'],
                      'coef': data_complex['Lasso']['coef'],
                      'r2': result_lasso['r2'],
                      'mae': result_lasso['MAE'],
                      'mse': result_lasso['MSE'],
                      'rmse': result_lasso['RMSE'],
                      'alpha': data_complex['Lasso']['alpha_']
                    },
                'Ridge': {
                      'score': data_complex['Ridge']['score'],
                      'intercept': result_ridge['intercept_'],
                      'coef': data_complex['Ridge']['coef'],
                      'r2': result_ridge['r2'],
                      'mae': result_ridge['MAE'],
                      'mse': result_ridge['MSE'],
                      'rmse': result_ridge['RMSE'],
                      'alpha': data_complex['Ridge']['alpha_']
                      }
                  }
    
    return jsonify({'result': results})


#Producción
@app.route('/produccion', methods=['POST'])
def produccion():
  if request.method == 'POST':
    data_json = request.get_json(force=True)
    
    result = models.predic_prod(data_json)

    print(result)
    return jsonify({'result': result})

if __name__ == "__main__":
  app.run(debug=True)