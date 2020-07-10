from flask import send_file
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/get_description/<dir>')
def get_description(dir):
	return jsonify({'description': f'The detailed description about {dir}'})

@app.route('/get_image/<image_name>')
def get_image(image_name):
    filename = image_name
    print(f'name is: {image_name} \n\n\n')
    return send_file(filename, mimetype='image/gif')

@app.route('/get_data')
def get_data():
    return jsonify({'name': 'new name'})

if __name__ == '__main__':
    app.run()

'''
<!DOCTYPE html>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <img src="http://127.0.0.1:5000/get_image">
</body>
</html>
''' 