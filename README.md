# Zombie Garden
---

Um dia normal no jardim zumbi.

---
## Instrucoes de execucao

Primeiramente, faca um _fork_ deste repositorio no GitHub e clone-o.

Em seguida, instale as dependencias:

```
$ npm install
```

Instale de forma global o `nodemon` (node monitor), um utilitario que reinicia
a aplicacao caso ela feche devido a um erro:

```
$ npm install -g nodemon
```

Para acionar o servidor, execute:

```
$ npm start
```

Isso acionara o `nodemon` e o mantera em execucao. Alem disso, o `nodemon`
reinicia o servidor sempre que detecta alteracoes no codigo fonte.

A aplicacao abre na porta 3000. Portanto, visite: http://localhost:3000/

---
## Banco de dados

A aplicacao requer um banco de dados MySQL. Use o arquivo
`script-to-create-db.sql` para criar uma instancia do banco e, entao, configure
o arquivo `db.js` para apontar para o banco criado (host, nome, user/pwd).

---
## Debugging

Se quiser fazer _debugging_, instale o `node-inspector` globalmente:

```
$ npm install -g node-inspector
```

E, na hora de iniciar a aplicacao, em vez de usar `npm start`, use:

```
$ node-debug bin/www
```
