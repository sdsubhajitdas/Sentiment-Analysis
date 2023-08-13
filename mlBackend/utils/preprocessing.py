import re
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer


def preprocess_text(text):
  text = re.sub('[^a-zA-Z]', ' ', text)
  text = text.lower()
  words = text.split()
  stops = set(stopwords.words("english"))
  meaningful_words = [w for w in words if not w in stops]
  stemmer= PorterStemmer()
  stemmed_words = [stemmer.stem(w) for w in meaningful_words]
  cleaned_text = " ".join(stemmed_words)
  return cleaned_text
