### Hexlet tests, linter status and maintainability badge:
[![Actions Status](https://github.com/Vyachowski/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Vyachowski/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/101049658b3cad649fb9/maintainability)](https://codeclimate.com/github/Vyachowski/frontend-project-11/maintainability)

# Hexlet college JS project  – Сайт для чтения RSS лент

![Cover image for project](https://github.com/Vyachowski/frontend-project-11/blob/main/cover.png)

Проект в рамках обучения на курсе «фронтэнд-разработчик» школы «Хекслет». Закрепляет знания по получению и обработке данных на чистом JS, создании расширяемой архитектуры приложения, управлением состоянием и применением принципа конечных автоматов, а также деплою вместе с настройкой окружения.

To read **Readme in english**  please follow [this link](https://github.com/Vyachowski/frontend-project-11/blob/main/README.md)

## Описание

Сайт получает данные с введенных через форму RSS лент и обновляет их содержимое каждые пять секунд, добавляя только новые посты.

## Инструкция

### Демо проект

[RSS Reader](https://rss-reader-vyachowski.vercel.app/)

### Зависимости

* Node.js
* NPM Package Manager as a part of Node.js

### Установка

* Склонируйте репозиторий гитхаб

```sh
git clone https://github.com/Vyachowski/frontend-project-11.git
```

или

```sh 
git clone git@github.com:Vyachowski/frontend-project-11.git
```
для ssh доступа

* В корневой директории сначала выполните:
  
```sh 
npm i
```

### Запуск веб-приложения

Для запуска на локальном компьютере выполните:

```sh 
make develop
```
Для выгрузки на сервер билд можно собрать следующей командой:

```sh
make build
```
