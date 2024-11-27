from flask import Blueprint, request, jsonify
from datetime import datetime
from pacientes.registro_model import Paciente, Endereco
from __init__ import db

paciente_blueprint = Blueprint('paciente', __name__)

from flask import abort

@paciente_blueprint.route('/api/paciente', methods=['POST'])
def criar_paciente():
    form_data = request.json

    try:
        # Criando o endereço
        endereco = Endereco(
            logradouro=form_data['logradouro'],
            linha_de_endereco1=form_data['linha_de_endereco1'],
            numero=form_data['numero']
        )
        db.session.add(endereco)
        db.session.commit()
        
        # Convertendo a data de nascimento
        data_nascimento = datetime.strptime(form_data['data_nascimento'], '%Y-%m-%d').date()

        # Criando o paciente
        paciente = Paciente(
            nome=form_data['nome'],
            CPF=form_data['CPF'],
            telefone=form_data['telefone'],
            email=form_data['email'],
            data_nascimento=data_nascimento,
            endereco_id=endereco.id
        )
        db.session.add(paciente)
        db.session.commit()

        return jsonify({'message': 'Paciente criado com sucesso', 'paciente_id': paciente.id}), 201
    
    except Exception as e:
        db.session.rollback()  # Rollback any changes made during this request
        return jsonify({'error': str(e)}), 400  # Return error message with 400 Bad Request


@paciente_blueprint.route('/api/pacientes', methods=['GET'])
def listar_pacientes():
    pacientes = Paciente.query.all()
    pacientes_list = [paciente.to_dict() for paciente in pacientes]
    return jsonify(pacientes_list)

@paciente_blueprint.route('/api/paciente/<int:id>', methods=['GET'])
def buscar_paciente(id):
    paciente = Paciente.buscar_paciente(id)
    if paciente:
        return jsonify(paciente.to_dict())
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404

@paciente_blueprint.route('/api/paciente/<int:id>', methods=['PUT'])
def atualizar_paciente(id):
    paciente = Paciente.buscar_paciente(id)
    if paciente:
        form_data = request.json
        paciente.nome = form_data['nome']
        paciente.data_nascimento = datetime.strptime(form_data['data_nascimento'], '%Y-%m-%d').date()
        paciente.CPF = form_data['CPF']
        paciente.telefone = form_data['telefone']
        paciente.email = form_data['email']
        
        db.session.commit()
        return jsonify({'message': 'Paciente atualizado com sucesso'})
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404

@paciente_blueprint.route('/api/delete_paciente/<int:id>', methods=['DELETE'])
def deletar_paciente(id):
    try:
        paciente = Paciente.deletar_paciente_por_id(id)
        if paciente:
            return jsonify({"message": "Paciente deletado com sucesso"})
        else:
            return jsonify({"error": "Paciente não encontrado"}), 404
    except Exception as e:
        # Log error for debugging
        print(f"Erro ao deletar paciente: {e}")
        return jsonify({"error": "Erro interno ao deletar paciente"}), 500

@paciente_blueprint.route('/api/endereco/<int:id>', methods=['GET'])
def buscar_endereco(id):
    endereco = Endereco.buscar_endereco(id)
    if endereco:
        return jsonify(endereco.to_dict())  # Assuming you have a to_dict method for Endereco
    else:
        return jsonify({"error": "Endereço não encontrado"}), 404

@paciente_blueprint.route('/api/endereco/<int:id>', methods=['PUT'])
def atualizar_endereco(id):
    endereco = Endereco.buscar_endereco(id)
    if endereco:
        form_data = request.json
        endereco.logradouro = form_data['logradouro']
        endereco.linha_de_endereco1 = form_data['linha_de_endereco1']
        endereco.numero = form_data['numero']
        
        db.session.commit()
        return jsonify({'message': 'Endereço atualizado com sucesso'})
    else:
        return jsonify({"error": "Endereço não encontrado"}), 404

@paciente_blueprint.route('/api/endereco/<int:id>', methods=['DELETE'])
def deletar_endereco(id):
    endereco = Endereco.deletar_endereco_por_id(id)
    if endereco:
        return jsonify({"message": "Endereço deletado com sucesso"})
    else:
        return jsonify({"error": "Endereço não encontrado"}), 404

@paciente_blueprint.route('/api/enderecos', methods=['GET'])
def listar_enderecos():
    enderecos = Endereco.listar_enderecos()
    return jsonify([endereco.to_dict() for endereco in enderecos])  # Return a list of addresses

@paciente_blueprint.route('/api/inativar_paciente/<int:id>', methods=['PUT'])
def inativar_paciente(id):
    try:
        # Chama o método de inativar paciente por ID
        paciente = Paciente.query.get(id)
        if not paciente:
            return jsonify({"error": "Paciente não encontrado"}), 404

        paciente.status = 'inativo'
        db.session.commit()

        return jsonify({"message": "Paciente Inativado com sucesso"}), 200
    except Exception as e:
        print(f"Erro ao Inativar paciente: {e}")
        return jsonify({"error": "Erro interno ao Inativar paciente"}), 500

