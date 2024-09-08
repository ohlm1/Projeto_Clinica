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

    def __init__(self,nome,CPF,telefone,email):
        self.nome = nome
        self.CPF = CPF
        self.telefone = telefone
        self.email = email

    def to_dict(self):
        return {"id": self.id, 
                'nome': self.nome, 
                'CPF': self.CPF,
                'telefone':self.telefone,
                'email':self.email }




class PacienteNaoEcontrado(Exception):
    pass

def AdicionarPaciente(paciente_data):
    novo_paciente = Paciente(nome = paciente_data['nome'])
    db.session.add(novo_paciente)
    db.session.commit()

def listar_alunos():
    pacientes = Paciente.query.all()
    return [paciente.to_dict() for paciente in pacientes]