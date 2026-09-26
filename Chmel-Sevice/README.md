# Система керування сервісними заявками (Chmel Service)

Сучасний SPA-додаток (Single Page Application) на **React** та **TypeScript** для роботи з клієнтськими сервісними заявками, розроблений за методологією **FSD Lite (Feature-Sliced Design Lite)**.

> 📖 **Повна архітектурна документація доступна у файлі**: [docs/DOCUMENTATION.md](file:///c:/Users/PC/Desktop/Chmel-Sevice/docs/DOCUMENTATION.md)

---

## 📌 Основний функціонал та ролі

У додатку реалізовано дворольову систему доступу з захищеними маршрутами:

### 1. 👤 Роль «Користувач (Клієнт)»
* **Логін**: `user@example.com` / **Пароль**: `user123` або `123456`
* **Перегляд заявок**: відображення лише власних сервісних заявок (`GET /requests/my`).
* **Створення заявки**: форма з клієнтською валідацією (**React Hook Form** + **Zod**) для створення нової заявки (`POST /requests`) з автоматичним програмним редіректом на картку створиної заявки (`/requests/:id`).
* **Детальна картка**: перегляд детального стану заявки, її коментарів та історії статусів.

### 2. 🛡️ Роль «Оператор сервісної служби»
* **Логін**: `operator@example.com` / **Пароль**: `operator123` або `123456`
* **Перегляд загального списку**: доступ до всіх заявок клієнтів у системі (`GET /requests`).
* **Фільтрація**: інтерактивна фільтрація заявок за статусом, яка синхронізується з параметрами URL-рядка (Search Params `?status=new`, `?status=in_progress` тощо).
* **Управління статусами**: зміна статусу заявки (`PATCH /requests/:id/status`) з миттєвою інвалідацією кешу **TanStack Query** та записом в історію статусів.
* **Коментування**: додавання коментарів оператора до заявки (`POST /requests/:id/comments`).

---

## 🛠️ Технологічний стек

* **Frontend**: React 18, TypeScript, Vite.
* **Server State & Networking**: TanStack Query (React Query v5), Axios instance з інтерсепторами авторизації та автоматичним опрацюванням помилки 401 Unauthorized.
* **Mock Service Worker (MSW)**: перехоплення HTTP-запитів у браузері (`msw/browser`) та під час тестування (`msw/node`) з додаванням штучної затримки для демонстрації loading-скелетонів.
* **Форми та валідація**: React Hook Form, Zod, `@hookform/resolvers`.
* **Маршрутизація**: React Router DOM (v6), Protected Routes, Lazy Loading (`React.lazy` + `Suspense`) для екрану детального перегляду.
* **Глобальний UI-стан**: React Context API для системи Toast-повідомлень.
* **Тестування**: Vitest + React Testing Library + MSW node server.
* **Стилізація**: Vanilla CSS з CSS-змінними, сучасним темним дизайном, сумісним з Inter font, градієнтами та мікроанімаціями.

---

## 📂 Структура проекту (FSD Lite)

```
c:/Users/PC/Desktop/Chmel-Sevice/
├── docs/
│   └── DOCUMENTATION.md           # Повна архітектурна документація проекту
├── public/
│   └── mockServiceWorker.js       # Скрипт MSW воркера для браузера
├── src/
│   ├── app/                       # Ініціалізація додатку
│   │   ├── providers/             # AuthProvider, ToastProvider, QueryClientProvider
│   │   ├── styles/                # Глобальні CSS стилі та теми
│   │   ├── App.tsx                # Головний роутер та захищені маршрути
│   │   └── ProtectedRoute.tsx     # Guard для контролю авторизації та ролей
│   ├── pages/                     # Сторінки додатку
│   │   ├── LoginPage.tsx          # Публічна сторінка входу
│   │   ├── RequestsPage.tsx       # Список заявок (клієнт/оператор)
│   │   ├── NewRequestPage.tsx     # Форма створення заявки (лише для клієнта)
│   │   ├── RequestDetailsPage.tsx # Картка заявки (завантажується ліниво / Lazy Loading)
│   │   └── NotFoundPage.tsx       # 404 сторінка
│   ├── widgets/                   # Комплексні блоки інтерфейсу
│   │   ├── Header.tsx             # Навбар з профілем, рольовими кнопками та симулятором помилок
│   │   ├── RequestListWidget.tsx  # Віджет списку заявок (з фільтрацією, скелетонами та помилками)
│   │   └── RequestDetailsWidget.tsx # Віджет детальної картки з історією та коментарями
│   ├── features/                  # Дії користувача
│   │   ├── auth/                  # Форма входу з автофокусом (useRef) та швидким входом в 1 клік
│   │   ├── create-request/        # Створення заявки з програмним редіректом
│   │   ├── change-request-status/ # Зміна статусу заявки оператором
│   │   ├── add-comment/           # Додавання коментаря оператором
│   │   ├── filter-requests/       # Фільтрація за статусом через searchParams URL
│   │   └── simulate-error/        # Інструмент у навбарі для симуляції помилок 500 / Network Error
│   ├── entities/                  # Бізнес-сутності (User, Request, Comment, History)
│   │   ├── user/                  # Модель AuthContext та збереження сесії
│   │   ├── request/               # Картка заявки та кольорові бейджі статусів/пріоритетів
│   │   ├── comment/               # Елемент списку коментарів
│   │   └── history/               # Таймлайн історії зміни статусів
│   ├── shared/                    # Перевикористовуваний код
│   │   ├── api/                   # Axios instance, mock DB, MSW handlers (browser/node)
│   │   ├── context/               # ToastContext та хук useToast
│   │   ├── ui/                    # UI-компоненти (Button, Input, Select, Card, Badge, Spinner, Skeleton, Toast)
│   │   └── types/                 # TypeScript інтерфейси та DTO
│   ├── __tests__/                 # Інтеграційні тести (Vitest + RTL + MSW node)
│   │   ├── setup.ts               # Конфігурація MSW для Vitest
│   │   ├── auth.test.tsx          # Тест 1: Успішний вхід користувача та профіль
│   │   └── errors.test.tsx        # Тест 2: Обробка серверних помилок 500 та розриву мережі
│   └── main.tsx                   # Точка входу: старт MSW перед монтуванням React
├── index.html                     # HTML-шаблон з Google Fonts Inter
├── vite.config.ts                 # Конфігурація Vite та Vitest
├── tsconfig.json                  # Конфігурація TypeScript та path aliases (@/*)
└── package.json                   # Залежності та скрипти проекту
```

---

## 🚀 Інструкція із запуску локально

### 1. Встановлення залежностей
```bash
npm install
```

### 2. Запуск у режимі розробки
```bash
npm run dev
```
Після запуску відкрийте браузер за адресою: `http://localhost:5173`.

### 3. Запуск інтеграційних тестів
```bash
npm run test
```

### 4. Збірка для production
```bash
npm run build
```
