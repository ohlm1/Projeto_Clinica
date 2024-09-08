CREATE TABLE USERS (
        ID INTEGER PRIMARY KEY AUTO_INCREMENT,  -- Coluna ID é a chave primária, do tipo INTEGER, e será auto-incrementada automaticamente pelo banco de dados.
        NAME VARCHAR(255),                       -- Coluna NAME armazena o nome do usuário, com um máximo de 255 caracteres
        EMAIL VARCHAR(255),
        is_active BOOLEAN DEFAULT TRUE,
        password VARCHAR(255),
        cpf_cnpj VARCHAR(255)
);
