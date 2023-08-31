import os
import random
import matplotlib
import numpy as np
from joblib import load
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer

matplotlib.use('agg')

def generate_wordcloud(text, query_id):
  # Create a wordcloud
  wordcloud = WordCloud(width=600, height=400, random_state=21, max_font_size=110).generate(text)
  # Plot the wordcloud
  plt.rcParams["figure.autolayout"] = True
  plt.imshow(wordcloud, interpolation="bilinear")
  plt.axis('off')
  plt.savefig(os.path.join("assets",f'{query_id}.png'), format="png")


def generate_model_output(preprocessed_text):
  modelsPath = os.path.join(os.getcwd(), "models")

  # Load the saved vectorizer
  vectorizer = load(os.path.join(modelsPath, "vectorizer.joblib"))
  
  # Vectorize the preprocessed input string
  vectorized_text = vectorizer.transform([preprocessed_text])
  
  # Load the saved Random Forest model
  rf_model = load(os.path.join(modelsPath,"logistic_regression.joblib"))
  
  # Make the prediction
  prediction = int(rf_model.predict(vectorized_text)[0])  # Convert to native int
  
  # Calculate the confidence of the prediction
  confidence = np.max(rf_model.predict_proba(vectorized_text))
  
  # Create and return JSON
  result = {
      "sentiment": prediction,
      "confidence": confidence.item()  # Convert numpy.float64 to native float
  }

  return result["sentiment"]