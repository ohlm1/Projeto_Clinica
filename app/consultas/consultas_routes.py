from flask import Blueprint, request, jsonify
from datetime import datetime
from pacientes.registro_model import Paciente
from pacientes.index import buscar_paciente
from .consultas_model import Consulta
from __init__ import db
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

consulta_blueprint = Blueprint('consulta', __name__)

# Função auxiliar para respostas de erro
def erro_resposta(mensagem, codigo=400):
    return jsonify({'error': mensagem}), codigo

# Função auxiliar para buscar paciente
def get_paciente_by_id(paciente_id):
    paciente = buscar_paciente(paciente_id)
    if not paciente:
        raise ValueError(f"Paciente com ID {paciente_id} não encontrado.")
    return paciente

# Criar consulta (POST)
@consulta_blueprint.route('/criar_consulta', methods=['POST'])
def criar_consulta():
    try:
        form_data = request.json

        # Validação de paciente
        paciente_id = form_data.get('paciente_id')
        if not paciente_id or not str(paciente_id).isdigit():
            return erro_resposta('ID do paciente inválido ou ausente.')

        paciente = get_paciente_by_id(paciente_id)

        # Verificar se o paciente está ativo
        if paciente.status != 'ativo':
            return erro_resposta(f'Paciente com ID {paciente_id} está inativo. Não é possível criar consulta.', 400)

        # Validação de data e hora
        data_hora_str = form_data.get('data_hora')
        if not data_hora_str:
            return erro_resposta('Data e hora são necessárias.')
        try:
            data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')
        except ValueError:
            return erro_resposta('Formato de data e hora inválido. Use YYYY-MM-DDTHH:MM.')

        # Validação de duração
        duracao = form_data.get('duracao')
        if not duracao or not str(duracao).isdigit():
            return erro_resposta('Duração inválida ou ausente.')

        # Criar a consulta
        consulta = Consulta(
            paciente_id=paciente_id,
            data_hora=data_hora,
            duracao=int(duracao),
            observacoes=form_data.get('observacoes')
        )
        db.session.add(consulta)
        db.session.commit()

        return jsonify({
            'message': 'Consulta criada com sucesso!',
            'consulta': consulta.to_dict(),
        }), 201

    except SQLAlchemyError as e:
        db.session.rollback()
        return erro_resposta(f'Erro ao salvar no banco de dados: {str(e)}', 500)
    except ValueError as e:
        return erro_resposta(str(e), 404)
    except Exception as e:
        return erro_resposta(f'Erro inesperado ao criar consulta: {str(e)}', 500)

# Listar todas as consultas (GET)
@consulta_blueprint.route('/listar_consultas', methods=['GET'])
def listar_consultas():
    try:
        consultas = Consulta.query.order_by(Consulta.data_hora.asc()).all()
        return jsonify([consulta.to_dict() for consulta in consultas]), 200
    except Exception as e:
        return erro_resposta(f'Erro ao listar consultas: {str(e)}', 500)

# Buscar consulta por ID (GET)
@consulta_blueprint.route('/buscar_consulta/<int:id>', methods=['GET'])
def buscar_consulta(id):
    try:
        consulta = Consulta.query.get(id)
        if not consulta:
            return erro_resposta(f'Consulta com ID {id} não encontrada.', 404)

        return jsonify({
            'consulta': consulta.to_dict(),
            'paciente': consulta.paciente.to_dict() if consulta.paciente else None
        }), 200
    except Exception as e:
        return erro_resposta(f'Erro ao buscar consulta: {str(e)}', 500)

# Atualizar consulta (PUT)
@consulta_blueprint.route('/atualizar_consulta/<int:id>', methods=['PUT'])
def atualizar_consulta(id):
    try:
        consulta = Consulta.query.get(id)
        if not consulta:
            return erro_resposta(f'Consulta com ID {id} não encontrada.', 404)

        form_data = request.json

        # Atualizar dados da consulta
        consulta.paciente_id = form_data.get('paciente_id', consulta.paciente_id)
        consulta.data_hora = datetime.strptime(
            form_data.get('data_hora', consulta.data_hora.isoformat()), '%Y-%m-%dT%H:%M'
        )
        consulta.duracao = form_data.get('duracao', consulta.duracao)
        consulta.observacoes = form_data.get('observacoes', consulta.observacoes)

        db.session.commit()

        return jsonify({
            'message': 'Consulta atualizada com sucesso!',
            'consulta': consulta.to_dict(),
        }), 200

    except ValueError as e:
        return erro_resposta(str(e), 400)
    except SQLAlchemyError:
        db.session.rollback()
        return erro_resposta('Erro ao atualizar consulta.', 500)
    except Exception as e:
        return erro_resposta(f'Erro inesperado: {str(e)}', 500)


@consulta_blueprint.route('/deletar_consulta/<int:id>', methods=['DELETE'])
def deletar_consulta(id):
    try:
        consulta = Consulta.query.get(id)
        if not consulta:
            return erro_resposta(f'Consulta com ID {id} não encontrada.', 404)

        db.session.delete(consulta)
        db.session.commit()
        return jsonify({'message': 'Consulta deletada com sucesso!'}), 200
    except SQLAlchemyError:
        db.session.rollback()
        return erro_resposta('Erro ao deletar consulta.', 500)
    except Exception as e:
        return erro_resposta(f'Erro inesperado: {str(e)}', 500)
