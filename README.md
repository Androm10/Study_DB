# Study_DB
Nostradamus

Задача: разработать приложение для предсказания результатов событий.

Роли: администратор и пользователь.

Технологии: JavaScript, NodeJS, Express, Jest, MySQL, MongoDB, Git.

Возможности администратора:

1.	Войти в систему используя email/password.
2.	Просмотреть список всех пользователей в системе.
3.	Добавить/удалить события.
4.	Добавить/удалить варианты исхода события с коэффициентами на каждый исход. Если пользователь ставит на исход и угадывает, то забирает себе баллы в размере его ставки умноженной на коэффициент, если нет – то он теряет свои баллы.
5.	Выбирать выигрышный вариант исхода события.
6.	Просмотреть информацию о всех ставках на событие. 

Возможности пользователя:
1.	Создать аккаунт. На один email можно зарегистрировать только один аккаунт.
2.	Войти в систему используя email/password.
3.	Просмотреть список всех активных событий.
4.	Просмотреть список всех завершившихся событий.
5.	Пополнять свой кошелек (купить баллы за реальные деньги)
6.	Выводить деньги (менять баллы на реальные деньги).
7.	Делать ставки на исход события (только на 1 исход).
8.	Просматривать историю операций с кошельком. Сюда входят операции с пополнением, выводом и ставками (выигрыш или проигрыш).
9.	Просматривать историю своих ставок.
10.	Удалить свой аккаунт.

Реализация:											
1.	Разработать схему базы данных, учитывая пункты 2-18.
2.	Разработать API для добавления события.
3.	Разработать API для удаления события.
4.	Разработать API для просмотра всех событий.
5.	Разработать API для просмотра активных событий.
6.	Разработать API для просмотра завершенных событий.
7.	Разработать API для добавления исхода события.
8.	Разработать API для удаления исхода события.
9.	Разработать API для выбора выигрышного варианта исхода события.
10.	Разработать API для просмотра ставок на событие.
11.	Разработать API для пополнения кошелька.
12.	Разработать API для вывода денег с кошелька.
13.	Разработать API для ставки на исход события.
14.	Разработать API для просмотра истории ставок.
15.	Разработать API для просмотра истории операций с кошельком.
16.	Разработать API для просмотра списка всех пользователей и ставок на событие.
17.	Разработать API для регистрации пользователя. Добавить ограничение: все операции (кроме авторизации и регистрации) доступны только после аутентификации.
18.	Разработать API для удаления своего аккаунта.
19.	Добавить роли администратор и пользователь. Настроить механизм ограничения доступа к API на стороне сервера (механизм авторизации). Для доступа к списку событий, пополнению и выводу баллов, ставкам, просмотру операций с кошельком, просмотру истории ставок и на удаление своего аккаунта должна быть роль пользователя. 
20.	Для доступа к управлению пользователями, добавлению/удалению событий, выбору выигрышного исхода события и просмотру информации о ставках на событие должна быть роль администратора. 
21.	Покрыть юнит тестами серверную часть, отвечающую за операции с кошельком (просмотр, ставки, пополнение и вывод).  Для написания тестов использовать фреймворк Jest. 
22.	Добавить в приложение валидацию на стороне сервера.
23.	Добавить в приложение работу с файлами. Изображение события храниться в папке на сервере, но при этом должна запись о их местоположении в БД (ссылка). 
24.	Реализовать механизм транзакций для события. Удаляем событие, далее, если изображение события не удаляется, то делаем откат и посылаем соответствующее сообщение.
25.	Добавить пагинацию на стороне сервера для страниц со списками событий, пользователей и операций с кошельком.
26.	Реализовать 2 ендпоинта для аналитики без использования ORM. Задача первого - найти пользователя, которой за выбранный месяц заработал больше всего баллов.  Задача второго - найти событие, которое принесло больше всего убытков всем пользователям.

Дополнительные требования:
1.	Добавить рассылку email уведомлений при удалении и регистрации аккаунта.
2.	Реализовать автоматическое удаление пользователей, которые не делали ставок более 3 месяцев.
3.	Предусмотреть функционал редактирования профиля (First Name, Last Name) и смены пароля.
4.	Добавить возможность поиска пользователей (по имени и фамилии).
5.	Добавить логирование. Логи должны сохраняться в MongoDB. В логи должны сохраняться ошибки, а также справочная информация.
6.	Разработать гибкую/модульную систему уведомлений – в email критические ошибки.

Rockstar требования:
1.	Разработать гибкую/модульную систему уведомлений – в telegram.
2.	Добавить уровень абстракции позволяющий моментально переключиться на другую БД, например с PostgreSQL на MongoDB.
3.	Добавить в приложение работу с Docker. Каждая часть приложения (база данных, микросервис, очередь сообщений и т.д.) должна быть помещена в отдельный контейнер. Работа с docker-контейнерами ведётся с помощью docker-compose.
4.	Реализовать минимальный CI process с помощью GitHub Actions. Работу с репозиторием необходимо вести в отдельной ветке для каждой задачи. При попытке сделать git push в master ветку, автоматически запускаются тесты. При неудачном завершении - сообщение об ошибке.
5.	Разбить приложение на микросервисы. Между собой микросервисы должны общаться с помощью RabbitMQ.
6.	Добавить возможность полнотекстового поиска по описаниям локаций с использованием ElasticSearch.

