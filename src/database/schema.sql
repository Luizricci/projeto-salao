CREATE DATABASE charme;

\c charme;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    tipo VARCHAR(20) NOT NULL DEFAULT 'cliente'
        CHECK (tipo IN ('cliente', 'profissional', 'admin'))
);


CREATE TABLE user_info (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(255)
);


CREATE OR REPLACE FUNCTION insert_user_info()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_info (id, name, phone, address)
    VALUES (NEW.id, NEW.name, NULL, NULL); 
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION insert_user_info();


CREATE TABLE servicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco_cents DECIMAL(10, 2) NOT NULL,
    duracao_minutos INTEGER NOT NULL,
);




CREATE TABLE agendamento (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    profissional_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    servico_id INTEGER NOT NULL REFERENCES servicos(id) ON DELETE CASCADE,
    data DATE NOT NULL,
    hora TIME NOT NULL
);


CREATE OR REPLACE FUNCTION alterar_tipo_usuario(uid INT, novo_tipo VARCHAR)
RETURNS VOID AS $$
BEGIN
    IF novo_tipo NOT IN ('cliente', 'profissional', 'admin') THEN
        RAISE EXCEPTION 'Tipo inválido.';
    END IF;

    UPDATE users SET tipo = novo_tipo WHERE id = uid;
END;
$$ LANGUAGE plpgsql;

-- UPDATE users
-- SET tipo = 'admin'
-- WHERE id = 1;
