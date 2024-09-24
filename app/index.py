from flask import Blueprint, request, jsonify, abort, render_template, redirect
from datetime import datetime
from registro_model import Paciente, Endereco
from __init__ import db

paciente_blueprint = Blueprint('paciente', __name__)
endereco_blueprint = Blueprint('endereco', __name__)

@paciente_blueprint.route('/criar_paciente', methods=['GET'])
def add_paciente_form():
    return render_template('index.html')

@paciente_blueprint.route('/criar_paciente', methods=['POST'])
def criar_paciente():
    form_data = request.form

    # Criando o endereço
    endereco = Endereco(
        logradouro=form_data['logradouro'],
        linha_de_endereco1=form_data['linha_de_endereco1'],
        numero=form_data['numero']
    )
    db.session.add(endereco)
    db.session.commit()
    
    # Convertendo a data de nascimento para o formato correto
    data_nascimento_str = form_data['data_nascimento']
    data_nascimento = datetime.strptime(data_nascimento_str, '%Y-%m-%d').date()  # Ajuste o formato conforme necessário

    # Criando o paciente
    paciente = Paciente(
        nome=form_data['nome'],
        CPF=form_data['CPF'],
        telefone=form_data['telefone'],
        email=form_data['email'],
        data_nascimento=data_nascimento,  # Adicionando o argumento data_nascimento
        endereco_id=endereco.id
    )
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

@paciente_blueprint.route('/atualizar_paciente/<int:id>', methods=['GET'])
def atualizar_paciente_form(id):
    paciente = Paciente.buscar_paciente(id)
    if paciente:
        return render_template('att_paciente.html', paciente=paciente)
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404

@paciente_blueprint.route('/atualizar_paciente/<int:id>', methods=['POST'])
def atualizar_paciente(id):
    paciente = Paciente.buscar_paciente(id)
    if paciente:
        form_data = request.form
        
        # Convertendo a data de nascimento para o formato correto
        data_nascimento_str = form_data['data_nascimento']
        data_nascimento = datetime.strptime(data_nascimento_str, '%Y-%m-%d').date()  # Ajuste o formato conforme necessário
        
        # Atualizando os dados do paciente
        paciente.nome = form_data['nome']
        paciente.data_nascimento = data_nascimento  # Adicionando a data formatada
        paciente.CPF = form_data['CPF']
        paciente.telefone = form_data['telefone']
        paciente.email = form_data['email']
        
        db.session.commit()
        return redirect('/listar_pacientes')
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404

@paciente_blueprint.route('/deletar_paciente/<int:id>', methods=['DELETE'])
def deletar_paciente(id):
    paciente = Paciente.deletar_paciente_por_id(id)
    if paciente:
        return jsonify({"message": "Paciente deletado com sucesso"})
    else:
        return jsonify({"error": "Paciente não encontrado"}), 404
    
@paciente_blueprint.route('/buscar_endereco/<int:id>', methods=['GET'])
def buscar_endereco(id):
    endereco = Endereco.buscar_endereco(id)  # Alterado para singular
    if endereco:
        paciente = Paciente.query.get(endereco.paciente.id)  # Obtendo o paciente associado ao endereço
        return render_template('att_endereco.html', endereco=endereco, paciente=paciente)  # Passar o paciente
    else:
        return jsonify({"error": "Endereço não encontrado"}), 404


@paciente_blueprint.route('/atualizar_endereco/<int:id>', methods=['GET', 'POST'])
def atualizar_endereco(id):
    endereco = Endereco.buscar_endereco(id)
    if endereco:
        paciente = endereco.paciente  # Acesse o paciente através da relação
        if request.method == 'POST':
            form_data = request.form
            
            # Atualizando os dados do endereço
            endereco.logradouro = form_data['logradouro']
            endereco.linha_de_endereco1 = form_data['linha_de_endereco1']
            endereco.numero = form_data['numero']
            
            db.session.commit()
            return redirect('/listar_enderecos')  # Redirecionar para a lista de endereços
        
        return render_template('att_endereco.html', endereco=endereco, paciente=paciente)  # Passar o paciente também
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
    return render_template('enderecos.html', enderecos=enderecos)
