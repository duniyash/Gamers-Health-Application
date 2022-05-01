
from email.generator import DecodedGenerator


from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
from cv2 import cv2
from keras.models import load_model
import urllib.request
from os import environ

from sqlalchemy import true

app = Flask(__name__)

model = load_model('psycho_model')

im_w = 256
im_h = 256

psychoDict = {0: "correct", 1: "incorrect"}

def convert_to_array(img):
    im = cv2.imread(img)
    img = Image.fromarray(im, 'RGB')
    image = img.resize((im_w, im_h))
    return np.array(image)

def download_image_and_save(url):
    f = open('psycho.jpg','wb')
    f.write(urllib.request.urlopen(url).read())
    f.close()

@app.route('/url', methods=['POST'])
def process_json():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        json = request.json
        download_image_and_save(json['url'])
        imageArray = convert_to_array("psycho.jpg")
        imageArray = imageArray/255
        numpyImageArray = []
        numpyImageArray.append(imageArray)
        numpyImageArray = np.array(numpyImageArray)
        prediction = model.predict(numpyImageArray)
        label = np.argmax(prediction)
        return jsonify(Response = "True", Prediction = psychoDict[label])
    else:
        return jsonify(Response = "False", Error = "Internal Error")

if __name__ == '__main__':
    app.run(debug=True)