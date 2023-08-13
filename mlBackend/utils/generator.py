import os
import matplotlib
from wordcloud import WordCloud
import matplotlib.pyplot as plt

matplotlib.use('agg')

def generate_wordcloud(text, query_id):
  # Create a wordcloud
  wordcloud = WordCloud(width=600, height=400, random_state=21, max_font_size=110).generate(text)
  # Plot the wordcloud
  plt.rcParams["figure.autolayout"] = True
  plt.imshow(wordcloud, interpolation="bilinear")
  plt.axis('off')
  plt.savefig(os.path.join("assets",f'{query_id}.png'), format="png")