from flask import Blueprint, request, jsonify
from datetime import datetime
from pacientes.registro_model import Paciente
from pacientes.index import listar_pacientes, buscar_paciente
from .consultas_model import Consulta
from __init__ import db
from sqlalchemy.exc import IntegrityError

consulta_blueprint = Blueprint('consulta', __name__)

# Helper function to check if the patient exists
def get_paciente_by_id(paciente_id):
    paciente = buscar_paciente(paciente_id)
    if not paciente:
        raise ValueError("Paciente não encontrado")
    return paciente

# Create a new consulta (POST request)
@consulta_blueprint.route('/criar_consulta', methods=['POST'])
def criar_consulta():
    try:
        form_data = request.json
        # Verificar se o paciente existe
        paciente_id = form_data.get('paciente_id')
        if not paciente_id:
            return jsonify({'error': 'ID do paciente é necessário'}), 400
        paciente = get_paciente_by_id(paciente_id)

        # Processar a data e hora
        data_hora_str = form_data.get('data_hora')
        if not data_hora_str:
            return jsonify({'error': 'Data e hora são necessárias'}), 400
        data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')

        duracao = form_data.get('duracao')


        # Criar a consulta
        consulta = Consulta(
            paciente_id=paciente_id,
            data_hora=data_hora,
            duracao=duracao,
            observacoes=form_data.get('observacoes')
        )
        
        db.session.add(consulta)
        db.session.commit()

        return jsonify({'message': 'Consulta criada com sucesso!'}), 201

    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Erro de integridade no banco de dados'}), 400
    except Exception as e:
        return jsonify({'error': 'Erro inesperado ao criar consulta', 'message': str(e)}), 500


# List all consultas (GET request)
@consulta_blueprint.route('/listar_consultas', methods=['GET'])
def listar_consultas():
    try:
        consultas = Consulta.query.all()
        return jsonify([consulta.to_dict() for consulta in consultas])

    except Exception as e:
        return jsonify({'error': 'Erro inesperado ao listar consultas', 'message': str(e)}), 500


# Get a specific consulta by ID (GET request)
@consulta_blueprint.route('/buscar_consulta/<int:id>', methods=['GET'])
def buscar_consulta(id):
    try:
        consulta = Consulta.query.get(id)
        if consulta:
            return jsonify(consulta.to_dict())
        else:
            return jsonify({"error": "Consulta não encontrada"}), 404
    except Exception as e:
        return jsonify({'error': 'Erro inesperado ao buscar consulta', 'message': str(e)}), 500


# Update a consulta (PUT request)
@consulta_blueprint.route('/atualizar_consulta/<int:id>', methods=['PUT'])
def atualizar_consulta(id):
    try:
        consulta = Consulta.query.get(id)
        if not consulta:
            return jsonify({"error": "Consulta não encontrada"}), 404
        
        form_data = request.json
        
        paciente_id = form_data.get('paciente_id')
        if not paciente_id:
            return jsonify({'error': 'ID do paciente é necessário'}), 400
        paciente = get_paciente_by_id(paciente_id)

        # Processar a data e hora
        data_hora_str = form_data.get('data_hora')
        if not data_hora_str:
            return jsonify({'error': 'Data e hora são necessárias'}), 400
        data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')

        duracao = form_data.get('duracao')
        if duracao is None or not isinstance(duracao, int):
            return jsonify({'error': 'Duração inválida'}), 400

        consulta.paciente_id = paciente_id
        consulta.data_hora = data_hora
        consulta.duracao = duracao
        consulta.observacoes = form_data.get('observacoes')

        db.session.commit()
        return jsonify({'message': 'Consulta atualizada com sucesso!'}), 200

    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Erro de integridade no banco de dados'}), 400
    except Exception as e:
        return jsonify({'error': 'Erro inesperado ao atualizar consulta', 'message': str(e)}), 500


# Delete a consulta (DELETE request)
@consulta_blueprint.route('/deletar_consulta/<int:id>', methods=['DELETE'])
def deletar_consulta(id):
    try:
        consulta = Consulta.query.get(id)
        if consulta:
            db.session.delete(consulta)
            db.session.commit()
            return jsonify({'message': 'Consulta deletada com sucesso!'}), 200
        else:
            return jsonify({"error": "Consulta não encontrada"}), 404

    except Exception as e:
        return jsonify({'error': 'Erro inesperado ao deletar consulta', 'message': str(e)}), 500
