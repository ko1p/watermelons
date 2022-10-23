# Фронтенд проекта "Арбузики" - площадки для параллельного импорта

[Деплой](https://watermelons-rmr.netlify.app)  
[Деплой для разработки](https://develop--watermelons-rmr.netlify.app)

[Макет в Figma](https://www.figma.com/file/4VxqFExw7rSdNK6HXFLe64/Watermelons?node-id=443%3A134)  
Макет не является жёстким руководством, а служит для понимания общего стиля приложения. Делайте на свой вкус!  
Для того чтобы получить доступ для редактирования - напишите мне в [телеграм](t.me/klimetzc) свою почту.

Основа для архитектуры проекта - **Feature Sliced Design**  
Структура и семантика слоёв взята с оф. гайда v. 2.0  
Структура слайсов примерно такая (вхождения опциональны):

<pre>
{layer}/
    ├── {slice}/
    |   ├── ui/                     # <b>UI-логика</b>
    |   |   └── ComponentName/      # UI-компоненты (+ файлы *.stories.tsx)
    |   ├── model/                  # Бизнес-логика (обычно работа со стейт-менеджером)
    |   |   └── sliceName.ts        # Логика работы со store  
    |   └── lib/                    # Инфраструктурная логика (utils/helpers/types)
    |   |   ├── hooks/              # Кастомные хуки
    |   |   ├── types/              # Типы и интерфейсы 
    |   |   ├── constants/          # Локальные константы
    |   |   └── helpers/            # Вспомогательные функции
При наличии единственного экземпляра в папках слайса - папка обычно опускается.       
</pre>

## Основные команды:

<strong>Для успешного запуска проекта вам потребуется `node.js` не ниже `v18.5.0` и `npm` не ниже `8.12.1` !</strong>

`npm install` - установка проекта  
`npm start` - Приложение для разработки  
`npm run storybook` - Запуск сторибука  
`npm run lint` - lint  
`npm run stylelint` - stylelint

### При деплое:

При каждом комите и пуше будут запускать проверки eslint и stylelint. Они пройдут, даже если есть варнинги. НО(!) при варнингах в еслинте сломается деплой, будьте внимательнее и при мерджах/пушах в develop и main проверяйте линты тщательно.

## Технический долг:

Архитектурой проекта был выбран Feature Sliced Design v. 2.0. - мы следовали его рекомендациям согласно официальной документации. Единственное и довольно значимое отклонение, это импорт слайсов редакса из фич и любых других слоев, находящихся ниже app по иерархии - прям в конфиг редакс стора в app. Обычно так делать нельзя и app должен оставаться вне видимости остальных слоёв, но почитав их телеграм-канал и именно ответы core-команды этим было решено пренебречь.

По реализации запланированного функционала осталось:

- Коллаборативные закупки
- Мобильная версия сайта
- Оформление заказа

Из чисто технических моментов:

- Сторибук есть только для Ui-lib
- Нет тестов
- Вероятнее всего есть много мест где можно декомпозировать код. (Про учлучшения не говорю, т.к. проблема присутствует всегда и взгляды у всех разные)
