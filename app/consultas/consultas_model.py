from __init__ import db
from datetime import datetime

class Consulta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    paciente_id = db.Column(db.Integer, db.ForeignKey('paciente.id'), nullable=False)  # Relaciona a consulta a um paciente
    data_hora = db.Column(db.DateTime, nullable=False)  # Data e hora da consulta
    duracao = db.Column(db.Integer, nullable=False)  # Duração da consulta em minutos
    observacoes = db.Column(db.Text, nullable=True)  # Observações sobre a consulta

    paciente = db.relationship('Paciente', backref=db.backref('consultas', lazy=True))  # Relacionamento com Paciente

    def __init__(self, paciente_id, data_hora, duracao, observacoes=None):
        self.paciente_id = paciente_id
        self.data_hora = data_hora
        self.duracao = duracao
        self.observacoes = observacoes

    def to_dict(self):
        return {
            "id": self.id,
            "paciente_id": self.paciente_id,
            "data_hora": self.data_hora.isoformat() if self.data_hora else None,  # Convertendo para formato ISO
            "duracao": self.duracao,
            "observacoes": self.observacoes
        }

    @classmethod
    def buscar_consulta(cls, id):
        return cls.query.get(id)

    def atualizar_consulta(self, data_hora, duracao, observacoes):
        self.data_hora = data_hora
        self.duracao = duracao
        self.observacoes = observacoes
        db.session.commit()

    def deletar_consulta(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def deletar_consulta_por_id(cls, id):
        consulta = cls.buscar_consulta(id)
        if consulta:
            db.session.delete(consulta)
            db.session.commit()
        else:
            raise Exception(f"Consulta com ID {id} não encontrada.")

    @classmethod
    def listar_consultas(cls):
        return cls.query.all()

class ConsultaNaoEncontrada(Exception):
    pass
