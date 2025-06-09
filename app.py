from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Make sure CORS is enabled

# Load locations from the same CSV you used for prediction
data = pd.read_csv("Bengaluru_House_Data.csv")

@app.route("/locations", methods=["GET"])
def get_locations():
    locations = sorted(data["location"].dropna().unique().tolist())
    return jsonify(locations)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    location = data['location']
    total_sqft = float(data['total_sqft'])
    bath = int(data['bath'])
    bhk = int(data['bhk'])

   
    estimated_price = round(total_sqft * bhk * 0.0015, 2)

    return jsonify({'price': estimated_price})
if __name__ == "__main__":
    app.run(debug=True)