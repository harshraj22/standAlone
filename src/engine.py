from flask import Flask, jsonify, send_file
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/get_description/<dir>')
def get_description(dir):
	default_response = {'description': 'No description',
						'image': '',
						'movementAllowed': False}
	response = breakpoints
	for char in dir:
		response = response.get(char, default_response)
	return jsonify({
			'description': response['description'],
			'image': response['image'],
			'movementAllowed': response['movementAllowed']
		})


@app.route('/get_image/<image_name>')
def get_image(image_name):
	filename = 'images/' + image_name
	print(f'name is: {image_name} \n\n\n')
	return send_file(filename, mimetype='image/gif')

if __name__ == '__main__':
	with open('breakpoints.json', 'r') as f:
		breakpoints = json.load(f)
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