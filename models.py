import pandas as pd
from sklearn.linear_model import LinearRegression, LassoCV, RidgeCV
from sklearn.model_selection import cross_val_score
from sklearn.metrics import r2_score, mean_squared_error

feature_cols = ['price_aprox_usd', 'surface_total_in_m2', 'surface_covered_in_m2', 'rooms', 'bus_stop',	
                'subway',	'park',	'school',	'police',	'hospital',
                'Almagro', 'Barrio Norte', 'Belgrano', 'Caballito', 'Flores', 'Palermo',
                'Recoleta', 'San Telmo', 'Villa Crespo', 'Villa Urquiza', '_parrilla',
                '_gimnasio', '_sum', '_pileta', '_hidromasaje', '_vigilancia',
                '_playrooom', '_cancha', '_solarium', '_al_frente', '_nuevo?',
                '_lavadero', '_aire', '_calefaccion', '_luminoso', '_garage', '_balcon',
                '_baulera', '_terraza']

def prepararDatos():
  return pd.read_csv('datos_train.csv')

def linear_regression(df):
  X = df[feature_cols]
  y_price_usd = df.price_usd_per_m2

  model = LinearRegression()
  results = cross_val_score(model, X, y_price_usd, cv=5)
  return results

def lasso(df):
  X = df[feature_cols]
  y_price_usd = df.price_usd_per_m2
  
  model = LassoCV()
  score = cross_val_score(model, X, y_price_usd, cv=5, scoring='r2')

  model.fit(X, y_price_usd)
  
  results = {
    'score': score,
    'alpha': model.alpha_
  }
  return results  

def ridge(df):
  X = df[feature_cols]
  y_price_usd = df.price_usd_per_m2
  
  model = RidgeCV()
  score = cross_val_score(model, X, y_price_usd, cv=5, scoring='r2')

  model.fit(X, y_price_usd)
  
  results = {
    'score': score,
    'alpha': model.alpha_
  }
  return results

def predic(df_fit, df_predic, model):
  X_train = df_fit[feature_cols]
  y_train = df_fit.price_usd_per_m2

  X_test = df_predic[feature_cols]
  y_test = df_predic.price_usd_per_m2

  if (model == 'Linear Regression'):
    m = LinearRegression()
  elif (model == 'Lasso'):
    m = LassoCV()
  elif (model == 'Ridge'):
    m = RidgeCV()

  m.fit(X_train, y_train)

  pred = m.predict(X_test)

  results = { 'model': model,
              'r2_score': r2_score(y_test, pred),
              'mean_squared_error': mean_squared_error(y_test, pred) }

  return results

def predic_prod(df_fit, df_predic, model, predic_column):
  X_train = df_fit[feature_cols]
  y_train = df_fit.price_usd_per_m2

  X_test = df_predic #Array numpy con 1 solo registro
  y_test = predic_column #otro array pero con 1 solo valor

  if (model == 'Linear Regression'):
    m = LinearRegression()
  elif (model == 'Lasso'):
    m = LassoCV()
  elif (model == 'Ridge'):
    m = RidgeCV()

  m.fit(X_train, y_train)

  pred = m.predict(X_test)

  results = { 'model': model,
              'r2_score': r2_score(y_test, pred),
              'mean_squared_error': mean_squared_error(y_test, pred) }

  return results