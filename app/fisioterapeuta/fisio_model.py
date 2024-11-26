from __init__ import db

class Fisioterapeuta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_usuario = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(128), nullable=False)  # Senha armazenada sem hash

    def __init__(self, nome_usuario, senha):
        self.nome_usuario = nome_usuario
        self.senha = senha  # Senha sem hash

    def verificar_senha(self, senha):
        return self.senha == senha  # Comparação direta de senha

    def to_dict(self):
        return {
            "id": self.id,
            "nome_usuario": self.nome_usuario
        }

    @classmethod
    def buscar_fisioterapeuta(cls, nome_usuario):
        return cls.query.filter_by(nome_usuario=nome_usuario).first()
