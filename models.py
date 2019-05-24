import pandas as pd
from sklearn.linear_model import LinearRegression, LassoCV, RidgeCV
from sklearn.model_selection import cross_val_score

feature_cols = ['price_aprox_usd', 'surface_total_in_m2',
                'surface_covered_in_m2', 'rooms',
                'Almagro', 'Barrio Norte', 'Belgrano', 'Caballito', 'Flores', 'Palermo',
                'Recoleta', 'San Telmo', 'Villa Crespo', 'Villa Urquiza', '_parrilla',
                '_gimnasio', '_sum', '_pileta', '_hidromasaje', '_vigilancia',
                '_playrooom', '_cancha', '_solarium', '_al_frente', '_nuevo?',
                '_lavadero', '_aire', '_calefaccion', '_luminoso', '_garage', '_balcon',
                '_baulera', '_terraza']

# lasso_alpha_ = 0
# ridge_alpha_ = 0

def prepararDatos():
  return pd.read_csv('datos_finales.csv')

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
  # lasso_alpha_ = model.alpha_
  
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
  # ridge_alpha_ = model.alpha_
  
  results = {
    'score': score,
    'alpha': model.alpha_
  }
  return results

# def lasso_alpha():
#   return lasso_alpha_

# def ridge_alpha():
#   return ridge_alpha_