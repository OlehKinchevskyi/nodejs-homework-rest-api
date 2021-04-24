# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action="list"

# Получаем контакт по id

node index.js --action="get" --id=5

# Добавялем контакт

node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

# Удаляем контакт

node index.js --action="remove" --id=3

Шаг 1
Создай ветку hw02-express из ветки master.

Установи модули командой:

npm i
Следующие модули уже есть в проекте:

express
morgan
cors
Шаг 2
В app.js – веб сервер на express, добавлены прослойки morgan и cors. Начни настраивать раутинг для работы с коллекцией контактов.

REST API должен поддерживать следующие рауты.

@ GET /api/contacts
ничего не получает
вызывает функцию listContacts для работы с json-файлом contacts.json
возвращает массив всех контактов в json-формате со статусом 200
@ GET /api/contacts/:contactId
Не получает body
Получает параметр contactId
вызывает функцию getById для работы с json-файлом contacts.json
если такой id есть, возвращает обьект контакта в json-формате со статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
@ POST /api/contacts
Получает body в формате {name, email, phone}
Если в body нет каких-то обязательных полей, возвращает json с ключом {"message": "missing required name field"} и статусом 400
Если с body все хорошо, добавляет уникальный идентификатор в объект контакта
Вызывает функцию addContact(body) для сохранения контакта в файле contacts.json
По результату работы функции возвращает объект с добавленным id {id, name, email, phone} и статусом 201
@ DELETE /api/contacts/:contactId
Не получает body
Получает параметр contactId
вызывает функцию removeContact для работы с json-файлом contacts.json
если такой id есть, возвращает json формата {"message": "contact deleted"} и статусом 200
если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
@ PUT /api/contacts/:contactId
Получает параметр contactId
Получает body в json-формате c обновлением любых полей name, email и phone
Если body нет, возвращает json с ключом {"message": "missing fields"} и статусом 400
Если с body все хорошо, вызывает функцию updateContact(contactId, body) (напиши ее) для обновления контакта в файле contacts.json
По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
Шаг 3
Для маршрутов, что принимают данные (POST, PUT, PATCH), продумайте проверку (валидацию) принимаемых данных. Для валидации принимаемых данных можно использовать один из пакетов – валидаторов данных, а не писать проверки самостоятельно:

joi
express-validator
yup
