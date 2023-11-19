RU / [EN](./README-en.md)
## Запуск проекта

```
npm install - устанавливаем зависимости
npm run start:dev или npm run start:dev:vite - запуск сервера + frontend проекта
```

## Скрипты
- `npm run start` - запуск frontend проекта на webpack dev server
- `npm run start:vite` - запуск frontend проекта на vite
- `npm run start:dev` - запуск frontend проекта на webpack dev server + backend
- `npm run start:dev:vite` - запуск frontend проекта на vite + backend
- `npm run start:dev:server` - запуск backend сервера
- `npm run build:prod` - Сборка в production режиме
- `npm run build:dev` - Сборка в development режиме
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:errors` - Проверка ts файлов линтером только ошибки
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов линтером
- `npm run lint:scss:fix` - Исправление scss файлов линтером
- `npm run test:unit` - Запуск unit тестов с jest
- `npm run test:ui` - Запуск скриншотных тестов с loki
- `npm run test:ui:ok` - Подтверждение скриншотных тестов с loki
- `npm run test:ui:update` - Обновление скриншотных тестов с loki
- `npm run test:ui:ci` - Запуск скриншотных тестов в CI
- `npm run test:ui:report` - Генерация полного отчета для скриншотных тестов
- `npm run test:ui:json` - Генерация json отчета для скриншотных тестов
- `npm run test:ui:html` - Генерация html отчета для скриншотных тестов
- `npm run storybook` - Запуск storybook
- `npm run storybook:build` -  Сборка storybook билда
- `npm run prepare` - Прекоммит хуки
- `npm run generate:slice` - Скрипт для генерации FSD слайсов

---

## Архитектура проекта
Проект написан в соответствии с методологией Feature Sliced Design

Ссылка на документацию [Feature Sliced Design](https://feature-sliced.design/ru/docs/get-started/overview)

---

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами. 
Файлы с переводами хранятся в `public/locales`

Для комфортной работы рекомендуем установить плагин для webstorm/vscode

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

---

## Тесты

В проекте используется 4 вида тестов:
1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library - `npm run test:unit`
3) Скриншотное тестирование с loki `npm run test:ui`
4) E2E тестирование с Cypress `npm run test:e2e`

Подробнее о тестах: [документация тестирование](./docs/tests.md)

---

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями

Также для строгого контроля архитектурных принципов используется собственный eslint плагин `eslint-plugin-kashin-fsd-plugin`, который содержит 3 правила
1) `path-checker` - запрещает использовать абсолютные импорты в рамках одного модуля
2) `layer-imports` - проверяет правильность использования слоев с точки зрения FSD (например, widget нельзя использовать на слоях features и entities)
3) `public-api-imports` - разрешает импорт из других модулей только из public api. Имеет автофикс

### Запуск линтеров

- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:errors` - Проверка ts файлов линтером только ошибки
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run lint:scss` - Проверка scss файлов линтером
- `npm run lint:scss:fix` - Исправление scss файлов линтером

---

## Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью `storybook-addon-mock`. 

Файл со стори-кейсами создается рядом с компонентом с расширением `*.stories.tsx`

Запустить сторибук можно командой:
- `npm run storybook`

Подробнее о [storybook](./docs/storybook.md)

---

## Конфигурация проекта
Для разработки проект содержит 2 конфига:
1. Webpack - `./config/build`
2. Vite - `vite.config.ts`

Причина того, что используется сразу два сборщика — посмотреть возможности обоих, закрепить на практике, сравнить в скорости и преимуществах. Vite быстрее Webpack в режиме разработки. Для продакшн сборки используется Webpack. 

Оба сборщика адаптированы под основные фичи

Вся конфигурация хранится в `./config`
- `./config/babel` - babel конфигурация
- `./config/build` - конфигурация webpack
- `./config/jest` - конфигурация тестовой среды
- `./config/storybook` - конфигурация сторибука

В папке `scripts` находятся различные скрипты для рефакторинга/упрощения написания кода, генерации отчетов

---

## CI Pipeline и pre-commit хуки

Конфигурация github actions находится в `/.github/workflows`. 
В CI прогоняются все виды тестов, сборка проекта и сторибука, линтинг.

Пока что для экономии github actions были отключены скриншотные тесты

В прекоммит хуках проверяем проект линтерами, конфиг лежит в `./.husky`

---

### Работа с данными

Взаимодействие с данными осуществляется с помощью `redux toolkit`.
По возможности переиспользуемые сущности необходимо нормализовать с помощью `EntityAdapter`

Запросы на сервер отправляются с помощью [RTK query](https://redux-toolkit.js.org/rtk-query/overview)

Для асинхронного подключения редьюсеров, чтобы не тянуть их в общий бандл, используется [DynamicModuleLoader](./src/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader.tsx)

Пример использования можно посмотреть на примере [ArticlesPage](src/pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.tsx)

---

## Описание сущностей

Их список генерируется [здесь](./docs/components.md)

### Entities:

- [Article](../src/entities/Article/README.md)
- [Comment](../src/entities/Comment/README.md)
- [Counter](../src/entities/Counter/README.md)
- [Country](../src/entities/Country/README.md)
- [Currency](../src/entities/Currency/README.md)
- [Notification](../src/entities/Notification/README.md)
- [Profile](../src/entities/Profile/README.md)
- [Rating](../src/entities/Rating/README.md)
- [User](../src/entities/User/README.md)

### Features:

- [AddCommentForm](../src/features/AddCommentForm/README.md)
- [ArticleRating](../src/features/ArticleRating/README.md)
- [ArticleRecommendationsList](../src/features/ArticleRecommendationsList/README.md)
- [AuthByUsername](../src/features/AuthByUsername/README.md)
- [AvatarDropdown](../src/features/AvatarDropdown/README.md)
- [EditableProfileCard](../src/features/EditableProfileCard/README.md)
- [LangSwitcher](../src/features/LangSwitcher/README.md)
- [NotificationButton](../src/features/NotificationButton/README.md)
- [ProfileRating](../src/features/ProfileRating/README.md)
- [ThemeSwitcher](../src/features/ThemeSwitcher/README.md)
- [UI](../src/features/UI/README.md)


---

## TODO
* Storybook cases
* Loki screenshot tests
* Create / Edit page logic
* Translate to english this readmy file