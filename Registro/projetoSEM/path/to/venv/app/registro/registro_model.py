from config import db


class endereco(db.Model):
    Logradouro = db.Column(db.String(100))
    linha_de_endereco1 = db.Column(db.String(100))
    número = db.Column(db.int)
     
    def __init__(self,linha_de_endereco1):
        self.nome = linha_de_endereco1

    def to_dict(self):
        return {"id": self.id, 'nome': self.nome}

class Paciente(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    CPF =  db.Column(db.String(100))
    telefone = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self,nome):
        self.nome = nome

    def to_dict(self):
        return {"id": self.id, 'nome': self.nome}




class PacienteNaoEcontrado(Exception):
    pass


