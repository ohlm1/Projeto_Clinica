import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


class Config:
    # SECRET_KEY = 'Sevencard@042'
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:{SECRET_KEY}@localhost/clinica'
    # SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    TESTING = True


