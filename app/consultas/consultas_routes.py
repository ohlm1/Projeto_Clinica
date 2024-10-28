<<<<<<< HEAD
from flask import Blueprint, request, jsonify, render_template, redirect
from datetime import datetime
from pacientes.registro_model import Paciente
from .consultas_model import Consulta
from __init__ import db

consulta_blueprint = Blueprint('consulta', __name__,template_folder='templates')

@consulta_blueprint.route('/criar_consulta', methods=['GET'])
def add_consulta_form():
    pacientes = Paciente.listar_pacientes()  # Lista de pacientes para seleção
    return render_template('criar_consulta.html', pacientes=pacientes)

@consulta_blueprint.route('/criar_consulta', methods=['POST'])
def criar_consulta():
    form_data = request.form

    # Convertendo a data e hora da consulta para o formato correto
    data_hora_str = form_data['data_hora']
    data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')  # Ajuste o formato conforme necessário

    # Criando a consulta
    consulta = Consulta(
        paciente_id=form_data['paciente_id'],
        data_hora=data_hora,
        duracao=form_data['duracao'],
        observacoes=form_data.get('observacoes')  # Campo opcional
    )
    db.session.add(consulta)
    db.session.commit()

    return redirect('/listar_consultas')

@consulta_blueprint.route('/listar_consultas', methods=['GET'])
def listar_consultas():
    consultas = Consulta.listar_consultas()
    return render_template('consultas.html', consultas=consultas)

@consulta_blueprint.route('/buscar_consulta/<int:id>', methods=['GET'])
def buscar_consulta(id):
    consulta = Consulta.buscar_consulta(id)
    if consulta:
        return jsonify(consulta.to_dict())
    else:
        return jsonify({"error": "Consulta não encontrada"}), 404

@consulta_blueprint.route('/atualizar_consulta/<int:id>', methods=['GET'])
def atualizar_consulta_form(id):
    consulta = Consulta.buscar_consulta(id)
    if consulta:
        pacientes = Paciente.listar_pacientes()  # Lista de pacientes para seleção
        return render_template('atualizar_consulta.html', consulta=consulta, pacientes=pacientes)
    else:
        return jsonify({"error": "Consulta não encontrada"}), 404

@consulta_blueprint.route('/atualizar_consulta/<int:id>', methods=['POST'])
def atualizar_consulta(id):
    consulta = Consulta.buscar_consulta(id)
    if consulta:
        form_data = request.form

        # Convertendo a data e hora da consulta para o formato correto
        data_hora_str = form_data['data_hora']
        data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')  # Ajuste o formato conforme necessário
        
        # Atualizando os dados da consulta
        consulta.data_hora = data_hora
        consulta.duracao = form_data['duracao']
        consulta.observacoes = form_data.get('observacoes')  # Campo opcional
        
        db.session.commit()
        return redirect('/listar_consultas')
    else:
        return jsonify({"error": "Consulta não encontrada"}), 404

@consulta_blueprint.route('/deletar_consulta/<int:id>', methods=['POST'])
def deletar_consulta(id):
    consulta = Consulta.deletar_consulta_por_id(id)
    if consulta:
        return redirect('/listar_consultas')
    else:
        return jsonify({"error": "Consulta não encontrada"}), 404
=======
from flask import Blueprint, request, jsonify, render_template, redirect
from datetime import datetime
from pacientes.registro_model import Paciente
from .consultas_model import Consulta
from __init__ import db

consulta_blueprint = Blueprint('consulta', __name__,template_folder='templates')

@consulta_blueprint.route('/criar_consulta', methods=['GET'])
def add_consulta_form():
    pacientes = Paciente.listar_pacientes()  # Lista de pacientes para seleção
    return render_template('criar_consulta.html', pacientes=pacientes)

@consulta_blueprint.route('/criar_consulta', methods=['POST'])
def criar_consulta():
    form_data = request.form

    # Convertendo a data e hora da consulta para o formato correto
    data_hora_str = form_data['data_hora']
    data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')  # Ajuste o formato conforme necessário

    # Criando a consulta
    consulta = Consulta(
        paciente_id=form_data['paciente_id'],
        data_hora=data_hora,
        duracao=form_data['duracao'],
        observacoes=form_data.get('observacoes')  # Campo opcional
    )
    db.session.add(consulta)
    db.session.commit()

    return redirect('/listar_consultas')

@consulta_blueprint.route('/listar_consultas', methods=['GET'])
def listar_consultas():
    consultas = Consulta.listar_consultas()
    return render_template('consultas.html', consultas=consultas)

@consulta_blueprint.route('/buscar_consulta/<int:id>', methods=['GET'])
def buscar_consulta(id):
    consulta = Consulta.buscar_consulta(id)
    if consulta:
        return jsonify(consulta.to_dict())
    else:
        return jsonify({"error": "Consulta não encontrada"}), 404

@consulta_blueprint.route('/atualizar_consulta/<int:id>', methods=['GET'])
def atualizar_consulta_form(id):
    consulta = Consulta.buscar_consulta(id)
    if consulta:
        pacientes = Paciente.listar_pacientes()  # Lista de pacientes para seleção
        return render_template('atualizar_consulta.html', consulta=consulta, pacientes=pacientes)
    else:
        return jsonify({"error": "Consulta não encontrada"}), 404

@consulta_blueprint.route('/atualizar_consulta/<int:id>', methods=['POST'])
def atualizar_consulta(id):
    consulta = Consulta.buscar_consulta(id)
    if consulta:
        form_data = request.form

        # Convertendo a data e hora da consulta para o formato correto
        data_hora_str = form_data['data_hora']
        data_hora = datetime.strptime(data_hora_str, '%Y-%m-%dT%H:%M')  # Ajuste o formato conforme necessário
        
        # Atualizando os dados da consulta
        consulta.data_hora = data_hora
        consulta.duracao = form_data['duracao']
        consulta.observacoes = form_data.get('observacoes')  # Campo opcional
        
        db.session.commit()
        return redirect('/listar_consultas')
    else:
        return jsonify({"error": "Consulta não encontrada"}), 404

@consulta_blueprint.route('/deletar_consulta/<int:id>', methods=['POST'])
def deletar_consulta(id):
    consulta = Consulta.deletar_consulta_por_id(id)
    if consulta:
        return redirect('/listar_consultas')
    else:
        return jsonify({"error": "Consulta não encontrada"}), 404
>>>>>>> 7f58f00921a1ef6aa481319aadc1fc03ec25419e
