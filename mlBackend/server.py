import os
import json
from flask import Flask,request,send_file
from utils.generator import generate_wordcloud
from utils.preprocessing import preprocess_text


app = Flask(__name__)

@app.route("/query", methods=["POST"])
def query():
  print("Pinged")
  request_body = json.loads(request.data.decode())
  text = request_body["body"]
  query_id = request_body["id"]
  processed_text = preprocess_text(text)
  

  generate_wordcloud(text,query_id)

  response = {
    "text": processed_text,
    "imageUrl": f'http://localhost:5000/assets/{query_id}.png'
  }

  return response


@app.route("/assets/<image_name>")
def assets(image_name):
  return send_file(os.path.join("assets",image_name))


if __name__ == "__main__":
  app.run(debug=True)