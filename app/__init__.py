from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    
    with app.app_context():
        from pacientes.registro_model import Paciente, Endereco
        from consultas.consultas_model import Consulta  # Importando o modelo Consulta
        from consultas.consultas_routes import consulta_blueprint  # Importando o blueprint de consulta
        from pacientes.index import paciente_blueprint

        db.create_all()
        app.register_blueprint(paciente_blueprint)
        app.register_blueprint(consulta_blueprint)  # Registrando o blueprint de consulta
    CORS(app)
    return app

