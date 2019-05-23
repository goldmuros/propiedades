from flask import Flask, render_template, redirect, request, url_for, jsonify
from werkzeug.utils import secure_filename
import pandas as pd

app = Flask(__name__)

#Home
@app.route('/')
def home():
  return render_template('index.html')

#Modelo
@app.route('/modelo', methods=['POST'])
def modelo():
  # Hacer el cross_validation del modelo seleccionado
  if request.method == 'POST':
    req = request.get_json(force=True)
    print(req['modelo'])
    return jsonify({'result': 'ok'})


#Testing
@app.route('/testing', methods=['POST'])
def testing():
  if request.method == 'POST':
    file = request.files['file']

    df = pd.read_csv(file)
    print('HOLA PANDAS: ', df)

    return jsonify({'result': 'ok'})

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