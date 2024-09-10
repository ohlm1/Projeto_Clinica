from flask import Blueprint, request, jsonify, abort, render_template
from registro_model import Paciente, PacienteNaoEcontrado, Endereco

paciente_blueprint = Blueprint('paciente', __name__)
endereco_blueprint = Blueprint('endereco', __name__)

class PacienteError(Exception):
    def __init__(self, message):
        self.message = message
        
@paciente_blueprint.route('/', methods=['GET'])
def add_paciente_form():
    return render_template('index.html')

@paciente_blueprint.route('/paciente', methods=['POST'])
def adicionar_paciente():
    try:
        nome = request.form['nome']
        CPF = request.form['CPF']
        telefone = request.form['telefone']
        email = request.form['email']
        logradouro = request.form['logradouro']
        linha_de_endereco1 = request.form['linha_de_endereco1']
        numero = request.form['numero']

        novo_paciente = Paciente.criar_paciente(
            nome=nome,
            CPF=CPF,
            telefone=telefone,
            email=email
        )

        endereco = novo_paciente.adicionar_endereco(
            logradouro=logradouro,
            linha_de_endereco1=linha_de_endereco1,
            numero=numero
        )

        return jsonify({"paciente_id": novo_paciente.id, "endereco_id": endereco.id}), 201
    except Exception as e:
        raise PacienteError(f"Error while creating paciente: {str(e)}")

@paciente_blueprint.route('/paciente/<int:id>/endereco', methods=['PUT'])
def atualizar_endereco_paciente(id):
    endereco_data = request.json
    try:
        paciente = Paciente.query.get(id)
        if paciente:
            if paciente.endereco:
                paciente.endereco.atualizar_endereco(
                    logradouro=endereco_data['logradouro'],
                    linha_de_endereco1=endereco_data['linha_de_endereco1'],
                    numero=endereco_data['numero']
                )
                return jsonify({"message": "Endereco atualizado com sucesso", "paciente": paciente.to_dict()}), 200
            else:
                paciente.adicionar_endereco(
                    logradouro=endereco_data['logradouro'],
                    linha_de_endereco1=endereco_data['linha_de_endereco1'],
                    numero=endereco_data['numero']
                )
                return jsonify({"message": "Endereco adicionado com sucesso", "paciente": paciente.to_dict()}), 200
        else:
            raise PacienteNaoEcontrado(f"Paciente com ID {id} não encontrado.")
    except PacienteNaoEcontrado as e:
        raise PacienteError(str(e))
    except Exception as e:
        raise PacienteError(f"Error while updating endereco: {str(e)}")

@paciente_blueprint.route('/paciente/<int:id>/endereco', methods=['DELETE'])
def deletar_endereco_paciente(id):
    try:
        paciente = Paciente.query.get(id)
        if paciente:
            if paciente.endereco:
                paciente.endereco.deletar_endereco()
                return jsonify({"message": "Endereco deletado com sucesso"}), 200
            else:
                raise PacienteError("Paciente não tem endereco")
        else:
            raise PacienteNaoEcontrado(f"Paciente com ID {id} não encontrado.")
    except PacienteNaoEcontrado as e:
        raise PacienteError(str(e))
    except Exception as e:
        raise PacienteError(f"Error while deleting endereco: {str(e)}")

@paciente_blueprint.route('/pacientes', methods=['GET'])
def listar_pacientes():
    try:
        pacientes = Paciente.listar_pacientes()
        return jsonify([paciente.to_dict() for paciente in pacientes]), 200
    except Exception as e:
        raise PacienteError(f"Error while listing pacientes: {str(e)}")

# Error handling
@paciente_blueprint.errorhandler(PacienteError)
def handle_paciente_error(e):
    return jsonify(error=e.message), 400



@endereco_blueprint.route('/enderecos', methods=['GET'])
def listar_enderecos():
    try:
        enderecos = Endereco.listar_enderecos()
        return jsonify([endereco.to_dict() for endereco in enderecos]), 200
    except Exception as e:
        raise PacienteError(f"Error while listing enderecos: {str(e)}")
    
@paciente_blueprint.route('/paciente/<int:id>', methods=['DELETE'])
def deletar_paciente(id):
    try:
        paciente = Paciente.query.get(id)
        if paciente:
            if paciente.endereco:
                paciente.endereco.deletar_endereco()
            paciente.deletar_paciente()
            return jsonify({"message": "Paciente deletado com sucesso"}), 200
        else:
            raise PacienteNaoEcontrado(f"Paciente com ID {id} não encontrado.")
    except PacienteNaoEcontrado as e:
        raise PacienteError(str(e))
    except Exception as e:
        raise PacienteError(f"Error while deleting paciente: {str(e)}")
