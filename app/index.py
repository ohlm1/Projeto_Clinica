from flask import Blueprint, request, jsonify, abort, render_template,redirect,url_for
from registro_model import Paciente, PacienteNaoEcontrado, Endereco
from __init__ import db


paciente_blueprint = Blueprint('paciente', __name__)
endereco_blueprint = Blueprint('endereco', __name__)

class PacienteError(Exception):
    def __init__(self, message):
        self.message = message
        
@paciente_blueprint.route('/criar_paciente', methods=['GET'])
def add_paciente_form():
    return render_template('index.html')

@paciente_blueprint.route('/criar_paciente', methods=['POST'])
def criar_paciente():
    form_data = request.form
    endereco = Endereco(logradouro=form_data['logradouro'], linha_de_endereco1=form_data['linha_de_endereco1'], numero=form_data['numero'])
    db.session.add(endereco)
    db.session.commit()
    paciente = paciente = Paciente(nome=form_data['nome'], CPF=form_data['CPF'], telefone=form_data['telefone'], email=form_data['email'], endereco_id=endereco.id)
    db.session.add(paciente)
    db.session.commit()
    return redirect('/listar_pacientes')

@paciente_blueprint.route('/listar_pacientes', methods=['GET'])
def listar_pacientes():
    pacientes = Paciente.listar_pacientes()
    return render_template('pacientes.html', pacientes=pacientes)

@paciente_blueprint.route('/buscar_paciente/<int:id>', methods=['GET'])
def buscar_paciente(id):
    paciente = Paciente.buscar_paciente(id)
    if paciente:
        return jsonify(paciente.to_dict())
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404

@paciente_blueprint.route('/atualizar_paciente/<int:id>', methods=['PUT'])
def atualizar_paciente(id):
    paciente = Paciente.buscar_paciente(id)
    if paciente:
        data = request.get_json()
        paciente.atualizar_paciente(data.get('nome'), data.get('CPF'), data.get('telefone'), data.get('email'))
        return jsonify(paciente.to_dict())
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404

@paciente_blueprint.route('/deletar_paciente/<int:id>', methods=['DELETE'])
def deletar_paciente(id):
    paciente = Paciente.deletar_paciente_por_id(id)
    if paciente:
        return jsonify({"message": "Paciente deletado com sucesso"})
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404
    
@paciente_blueprint.route('/adicionar_endereco/<int:id>', methods=['PUT'])
def adicionar_endereco(id):
    paciente = Paciente.buscar_paciente(id)
    if paciente:
        data = request.get_json()
        logradouro = data.get('logradouro')
        linha_de_endereco1 = data.get('linha_de_endereco1')
        numero = data.get('numero')
        paciente.adicionar_endereco(logradouro, linha_de_endereco1, numero)
        return jsonify(paciente.to_dict())
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404

@paciente_blueprint.route('/buscar_endereco/<int:id>', methods=['GET'])
def buscar_endereco(id):
    endereco = Endereco.buscar_endereco(id)
    if endereco:
        return jsonify(endereco.to_dict())
    else:
        return jsonify({"error": "Endereço não encontrado"}), 404

@paciente_blueprint.route('/atualizar_endereco/<int:id>', methods=['PUT'])
def atualizar_endereco(id):
    endereco = Endereco.buscar_endereco(id)
    if endereco:
        data = request.get_json()
        logradouro = data.get('logradouro')
        linha_de_endereco1 = data.get('linha_de_endereco1')
        numero = data.get('numero')
        endereco.atualizar_endereco(logradouro, linha_de_endereco1, numero)
        return jsonify(endereco.to_dict())
    else:
        return jsonify({"error": "Endereço não encontrado"}), 404

@paciente_blueprint.route('/deletar_endereco/<int:id>', methods=['DELETE'])
def deletar_endereco(id):
    endereco = Endereco.deletar_endereco_por_id(id)
    if endereco:
        return jsonify({"message": "Endereço deletado com sucesso"})
    else:
        return jsonify({"error": "Endereço não encontrado"}), 404

@paciente_blueprint.route('/listar_enderecos', methods=['GET'])
def listar_enderecos():
    enderecos = Endereco.listar_enderecos()
    enderecos_dict = [endereco.to_dict() for endereco in enderecos]
    return jsonify(enderecos_dict)
