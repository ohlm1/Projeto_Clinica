from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    
    with app.app_context():
        from registro_model import Paciente, Endereco
        from index import paciente_blueprint,endereco_blueprint
        db.create_all()
        app.register_blueprint(paciente_blueprint)
        app.register_blueprint(endereco_blueprint)
    
    return app