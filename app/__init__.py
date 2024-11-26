from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Inicializa o CORS antes de qualquer coisa
    CORS(app)
    
    db.init_app(app)

    with app.app_context():
        # Certifique-se de que os modelos estão sendo importados corretamente
        from pacientes.registro_model import Paciente, Endereco
        from consultas.consultas_model import Consulta
        from consultas.consultas_routes import consulta_blueprint
        from pacientes.index import paciente_blueprint
        from fisioterapeuta import fisioterapeuta_bp

        # Criação das tabelas no banco de dados
        db.create_all()  # Em produção, considere o uso de migrações com Flask-Migrate

        # Registrando os blueprints
        app.register_blueprint(paciente_blueprint)
        app.register_blueprint(consulta_blueprint)
        app.register_blueprint(fisioterapeuta_bp)
    
    return app
