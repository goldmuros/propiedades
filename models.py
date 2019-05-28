import pandas as pd
from sklearn.model_selection import cross_val_score
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Lasso, LassoCV, Ridge, RidgeCV
from sklearn.preprocessing import StandardScaler

df_r = pd.DataFrame()

def prepararDatos(file, test_run):
  df = pd.read_csv(file)
  y = df['price_usd_per_m2']
  X = df

  features_drops = ['Unnamed: 0', 'price_usd_per_m2', 'price_per_m2', 'price_aprox_usd']
  
  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1)

  columnas_a_truncar = ['price_aprox_usd', 'surface_total_in_m2',
                      'surface_covered_in_m2', 'price_per_m2', 'rooms']

  truncate_outliers(X_train, columnas_a_truncar, 1)

  X_train = X_train.drop(features_drops, axis=1)
  X_test = X_test.drop(features_drops, axis=1)

  se = StandardScaler()

  X_train = se.fit_transform(X_train)
  X_test = se.transform(X_test)

  # NO HACER ESTO, corto dedos!!!!!
  # X_train = StandardScaler().fit_transform(X_train)
  # X_test = StandardScaler().fit_transform(X_test)
  
  return X_train, X_test, y_train, y_test, df

def predict(data_input, model):
  X = data_input['X_train']
  y = data_input['y_train']
  X_test = data_input['X_test']
  y_test = data_input['y_test']

  test_run = data_input['test_run']

  if (model == 'lr'):
    m = LinearRegression()
  elif (model == 'lasso'):
    if (test_run == 'Simple'):
      m = Lasso()
    else:
      m = LassoCV()
  elif (model == 'ridge'):
    if (test_run == 'Simple'):
      m = Ridge()
    else:
      m = RidgeCV()

  model_fit = m.fit(X, y)

  #Pickle
  name_pickle = model + '.pkl'
  with open(name_pickle, 'wb') as f_model:
    pickle.dump(model_fit, f_model)
  
  f_model.close()

  score = 0
  if (test_run == 'Simple'):
    score = model_fit.score(X, y)
  else:
    score = cross_val_score(m, X, y, cv=5)  

  y_pred = m.predict(X_test)

  dict_coef_ = {}
  if (model != 'lr'):
    df_r = data_input['df']

    features_drops = ['Unnamed: 0', 'price_usd_per_m2', 'price_per_m2']

    df = df_r.drop(features_drops, axis=1)
    dict_coef_ = dict(zip(df.columns, model_fit.coef_))
 
  if (model == 'lr'):
    return {'score': score,
            'intercept_': model_fit.intercept_,
            'coef_': model_fit.coef_,
            'r2': r2_score(y_test, y_pred),
            'MAE': mean_absolute_error(y_test,y_pred),
            'MSE': mean_squared_error(y_test,y_pred),
            'RMSE': np.sqrt(mean_squared_error(y_test,y_pred))}
  else:
    if (test_run == 'Simple'):
      return {'score': score,
            'intercept_': model_fit.intercept_,
            'coef_': model_fit.coef_,
            'r2': r2_score(y_test, y_pred),
            'MAE': mean_absolute_error(y_test,y_pred),
            'MSE': mean_squared_error(y_test,y_pred),
            'RMSE': np.sqrt(mean_squared_error(y_test,y_pred))}
    else:
      return {'score': score,
              'intercept_': model_fit.intercept_,
              'coef_': dict_coef_,
              'r2': r2_score(y_test, y_pred),
              'MAE': mean_absolute_error(y_test,y_pred),
              'MSE': mean_squared_error(y_test,y_pred),
              'RMSE': np.sqrt(mean_squared_error(y_test,y_pred)),
              'alpha_': m.alpha_}

def predic_prod(data):
  model = data['model']

  name_pickle = model + '.pkl'
  with open(name_pickle, 'rb') as f_model:
    model_fit = pickle.load(f_model)

  data_list = read_data_json(data)

  predic = model_fit.predict(data_list)

  results = { 'model': model,
              'predic': predic.tolist()}

  return results

def read_data_json(data):
  df = [[
    np.float64(data['precio_total_usd']),
    np.float64(data['sup_total']),
    np.float64(data['sup_cub']),
    np.float64(data['habitaciones']),
    np.int64(data['bus_stop']),
    np.int64(data['subway']),
    np.int64(data['park']),
    np.int64(data['school']),
    np.int64(data['police']),
    np.int64(data['hospital']),
    np.int64(data['parrilla']),
    np.int64(data['gimnasio']),
    np.int64(data['sum']),
    np.int64(data['pileta']),
    np.int64(data['hidromasaje']),
    np.int64(data['vigilancia']),
    np.int64(data['playrooom']),
    np.int64(data['cancha']),
    np.int64(data['solarium']),
    np.int64(data['al_frente']),
    np.int64(data['nuevo']),
    np.int64(data['lavadero']),
    np.int64(data['aire']),
    np.int64(data['calefaccion']),
    np.int64(data['luminoso']),
    np.int64(data['garage']),
    np.int64(data['balcon']),
    np.int64(data['baulera']),
    np.int64(data['terraza'])
  ]]

  return df

def truncate_outliers(dataframe, columnas, porcentaje_a_cortar):
  for i in columnas:
    lower = np.nanpercentile(dataframe[i], porcentaje_a_cortar)
    higher = np.nanpercentile(dataframe[i], 100 - porcentaje_a_cortar)
    
    dataframe[i] = np.where((dataframe[i] < lower),
                lower, dataframe[i])
    dataframe[i] = np.where((dataframe[i] > higher),
                higher, dataframe[i])

