from flask import Flask, render_template
import os
from app.routes import all_blueprints
from app.extensions import db

def create_app():
    app = Flask(__name__, instance_relative_config=True, static_folder='../static', template_folder='../templates')
    
    app.config.from_object('config')
    
    db.init_app(app)

    #SEMUA MODEL DATABASE (TEMA, SUBTEMA, DAN PETA)
    from app.models import Tema, Subtema, Peta

    for bp in all_blueprints:
        app.register_blueprint(bp)

    @app.route("/")
    def home():
        return render_template("index.html")

    return app
