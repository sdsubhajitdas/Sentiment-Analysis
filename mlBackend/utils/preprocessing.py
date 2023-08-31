import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer


def preprocess_text(text):
  # 1. Remove URLs
  text = re.sub(r'http\S+|www.\S+', '', text)
  
  # 2. Remove usernames
  text = re.sub(r'@\w+', '', text)
  
  # 3. Remove email addresses
  text = re.sub(r'\S+@\S+', '', text)
  
  # 4. Remove hashtags
  text = re.sub(r'#\w+', '', text)
  
  # 5. Remove HTML tags
  text = re.sub(r'<.*?>', '', text)
  
  # 6. Remove stock market tickers like $GE
  text = re.sub(r'\$\w+', '', text)
  
  # 7. Remove dates
  text = re.sub(r'\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b', '', text)
  
  # 8. Remove times
  text = re.sub(r'\b\d{1,2}:\d{1,2}\b', '', text)
  
  # 9. Character normalization (e.g., converting multiple occurrences of a character into one)
  text = re.sub(r'(.)\1+', r'\1\1', text)
  
  # 10. Remove punctuation, special characters, and numbers
  text = re.sub(r'[^a-zA-Z\s]', '', text)
  
  # 11. Lower casing
  text = text.lower()
  
  # 12. Tokenization
  text = nltk.word_tokenize(text)
  
  # 13. Remove stopwords
  stop_words = set(stopwords.words('english'))
  text = [word for word in text if word not in stop_words]
  
  # 14. Stemming
  stemmer = PorterStemmer()
  text = [stemmer.stem(word) for word in text]
  
  # 15. Lemmatization
  lemmatizer = WordNetLemmatizer()
  text = [lemmatizer.lemmatize(word) for word in text]
  
  return ' '.join(text)
