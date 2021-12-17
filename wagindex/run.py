
from flask import Flask,render_template,request,jsonify,redirect, send_from_directory

app = Flask(__name__)
@app.route('/index')
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host='0.0.0.0' ,port=80)

