from __init__ import db
from datetime import datetime


class Endereco(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    logradouro = db.Column(db.String(100), nullable=False)
    linha_de_endereco1 = db.Column(db.String(100), nullable=False)
    numero = db.Column(db.Integer, nullable=False)

    def __init__(self, logradouro, linha_de_endereco1, numero):
        self.logradouro = logradouro
        self.linha_de_endereco1 = linha_de_endereco1
        self.numero = numero

    def to_dict(self):
        return {
            "id": self.id,
            "logradouro": self.logradouro,
            "linha_de_endereco1": self.linha_de_endereco1,
            "numero": self.numero
        }

    @classmethod
    def buscar_endereco(cls, id):
        return cls.query.get(id)

    def atualizar_endereco(self, logradouro, linha_de_endereco1, numero):
        self.logradouro = logradouro
        self.linha_de_endereco1 = linha_de_endereco1
        self.numero = numero
        db.session.commit()

    def deletar_endereco(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def deletar_endereco_por_id(cls, id):
        endereco = cls.buscar_endereco(id)
        if endereco:
            db.session.delete(endereco)
            db.session.commit()
        else:
            raise Exception(f"Endereço com ID {id} não encontrado.")

    @classmethod
    def listar_enderecos(cls):
        return cls.query.all()

class Paciente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    CPF = db.Column(db.String(14), nullable=False, unique=True)
    telefone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    endereco_id = db.Column(db.Integer, db.ForeignKey('endereco.id'))
    endereco = db.relationship('Endereco', backref=db.backref('paciente', uselist=False))
    data_nascimento = db.Column(db.Date, nullable=True)  # Adicionando o campo de data de nascimento

    def __init__(self, nome, CPF, telefone, email, data_nascimento, endereco_id=None):
        self.nome = nome
        self.CPF = CPF
        self.telefone = telefone
        self.email = email
        self.data_nascimento = data_nascimento  # Inicializando o novo atributo
        self.endereco_id = endereco_id

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "CPF": self.CPF,
            "telefone": self.telefone,
            "email": self.email,
            "data_nascimento": self.data_nascimento.isoformat() if self.data_nascimento else None,  # Convertendo para formato ISO
            "endereco": self.endereco.to_dict() if self.endereco else None
        }

    @classmethod
    def criar_paciente(cls, nome, CPF, telefone, email, data_nascimento):
        novo_paciente = cls(nome=nome, CPF=CPF, telefone=telefone, email=email, data_nascimento=data_nascimento, endereco_id=None)
        db.session.add(novo_paciente)
        db.session.commit()
        return novo_paciente

    def adicionar_endereco(self, logradouro, linha_de_endereco1, numero):
        endereco = Endereco(logradouro=logradouro, linha_de_endereco1=linha_de_endereco1, numero=numero)
        db.session.add(endereco)
        db.session.commit()
        self.endereco = endereco
        db.session.commit()

    @classmethod
    def buscar_paciente(cls, id):
        return cls.query.get(id)

    def atualizar_paciente(self, nome, CPF, telefone, email, data_nascimento):
        self.nome = nome
        self.CPF = CPF
        self.telefone = telefone
        self.email = email
        self.data_nascimento = data_nascimento  # Atualizando a data de nascimento
        db.session.commit()

    def deletar_paciente(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def deletar_paciente_por_id(cls, id):
        paciente = cls.buscar_paciente(id)
        if paciente:
            db.session.delete(paciente)
            db.session.commit()
        else:
            raise Exception(f"Paciente com ID {id} não encontrado.")

    @classmethod
    def listar_pacientes(cls):
        return cls.query.all()

class PacienteNaoEcontrado(Exception):
    pass
