from __init__ import db
from datetime import datetime

class Consulta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    paciente_id = db.Column(db.Integer, db.ForeignKey('paciente.id'), nullable=False)
    data_hora = db.Column(db.DateTime, nullable=False)
    duracao = db.Column(db.Integer, nullable=False)
    observacoes = db.Column(db.Text, nullable=True)

    paciente = db.relationship('Paciente', backref=db.backref('consultas', lazy=True))

    def __init__(self, paciente_id, data_hora, duracao, observacoes=None):
        self.paciente_id = paciente_id
        self.data_hora = data_hora
        self.duracao = duracao
        self.observacoes = observacoes

    def to_dict(self):
        return {
            "id": self.id,
            "paciente_id": self.paciente_id,
            "data_hora": self.data_hora.isoformat() if self.data_hora else None,
            "duracao": self.duracao,
            "observacoes": self.observacoes,
            "paciente": self.paciente.to_dict() if self.paciente else None  # Inclui informações do paciente, se disponível
        }

    @classmethod
    def buscar_consulta(cls, id):
        consulta = cls.query.get(id)
        if not consulta:
            raise ConsultaNaoEncontrada(f"Consulta com ID {id} não encontrada.")
        return consulta

    def atualizar_consulta(self, data_hora=None, duracao=None, observacoes=None):
        if data_hora:
            self.data_hora = data_hora
        if duracao:
            self.duracao = duracao
        if observacoes:
            self.observacoes = observacoes
        db.session.commit()

    def deletar_consulta(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def deletar_consulta_por_id(cls, id):
        consulta = cls.buscar_consulta(id)
        db.session.delete(consulta)
        db.session.commit()

    @classmethod
    def listar_consultas(cls, order_by='data_hora', descending=False):
        order_column = getattr(cls, order_by, cls.data_hora)
        order = order_column.desc() if descending else order_column.asc()
        return cls.query.order_by(order).all()

class ConsultaNaoEncontrada(Exception):
    """Erro levantado quando uma consulta não é encontrada no banco."""
    pass
