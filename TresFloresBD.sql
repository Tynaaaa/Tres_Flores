create database TresFlores;
use TresFlores;

create table usuario (
	nome varchar(100) NOT NULL,
    email varchar(100) NOT NULL, 
    senha varchar(100) NOT NULL,
    nascimento date NOT NULL,
    nickname varchar(100) NOT NULL PRIMARY KEY
);

select * from usuario; 

delete from usuario where nickname="teste" and nickname="teste2";
