# ui
Нужно установить [NODEJS](https://nodejs.org/en/) версию LTS

После установки нужно перезапустить компьютер

## Getting Started
Ставим зависимости для работы REACT
```
npm i
```
Ставим пакеты с кнопкой и модальным окном ( можно удалить их из проекта и использовать свои )
```
npm i @tourmalinecore/react-tc-ui-kit @tourmalinecore/react-tc-modal  —-legacy-peer-deps
```
Поднимаем сервес ( откроется localhost)
```
npm run start
```

## Что нужно менять

В файле src/App.jsx есть sendImage и sendApruvResult.

Меняйте у них только порт хоста 
```
пример localhost:5555 
```

sendImage - отправляется картинку,получается ответ с числом ( которое определил бек )

sendApruvResult - отправляем картинку и число ( для записи файла в бек )