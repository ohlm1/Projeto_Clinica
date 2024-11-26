from flask import Blueprint, request, jsonify
from __init__ import db
from .fisio_model import Fisioterapeuta

fisioterapeuta_bp = Blueprint('fisioterapeuta', __name__)

# Rota de login
@fisioterapeuta_bp.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Formato de mídia não suportado. Envie JSON."}), 415

    data = request.get_json()

    nome_usuario = data.get('nome_usuario')
    senha = data.get('senha')

    if not nome_usuario or not senha:
        return jsonify({"msg": "Nome de usuário e senha são obrigatórios."}), 400

    # Busca o fisioterapeuta pelo nome de usuário
    fisioterapeuta = Fisioterapeuta.buscar_fisioterapeuta(nome_usuario)
    if not fisioterapeuta or not fisioterapeuta.verificar_senha(senha):
        return jsonify({"msg": "Nome de usuário ou senha incorretos."}), 401

    return jsonify({
        "msg": "Login bem-sucedido."
    }), 200

# Rota de cadastro de fisioterapeuta
@fisioterapeuta_bp.route('/cadastro', methods=['POST'])
def cadastro():
    if not request.is_json:
        return jsonify({"msg": "Formato de mídia não suportado. Envie JSON."}), 415

    data = request.get_json()

    nome_usuario = data.get('nome_usuario')
    senha = data.get('senha')

    # Verificar se os campos obrigatórios foram fornecidos
    if not nome_usuario or not senha:
        return jsonify({"msg": "Nome de usuário e senha são obrigatórios."}), 400

    # Verificar se o nome de usuário já está em uso
    if Fisioterapeuta.buscar_fisioterapeuta(nome_usuario):
        return jsonify({"msg": "Nome de usuário já em uso."}), 400

    # Criar novo fisioterapeuta
    novo_fisioterapeuta = Fisioterapeuta(nome_usuario=nome_usuario, senha=senha)
    db.session.add(novo_fisioterapeuta)
    db.session.commit()

    return jsonify({
        "msg": "Fisioterapeuta cadastrado com sucesso.",
        "fisioterapeuta": novo_fisioterapeuta.to_dict()
    }), 201
