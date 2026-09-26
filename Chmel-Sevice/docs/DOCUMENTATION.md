# Документація проекту: «Система керування сервісними заявками»

Цей документ описує архітектурні рішення, структуру коду, внутрішню логіку роботи з Mock API, стейт-менеджмент та тестування системи.

---

## 📐 Архітектура Feature-Sliced Design (FSD Lite)

Проект побудовано за методологією **FSD Lite**, де код розбито на чітко розмежовані шари (layers):

### 1. `src/app/` (Application Layer)
* **Призначення**: Точка ініціалізації додатка, глобальні провайдери та налаштування роутингу.
* **Ключові файли**:
  * [App.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/app/App.tsx) — кореневий компонент, підключення `QueryClientProvider`, `AuthProvider`, `ToastProvider` та конфігурація `BrowserRouter`.
  * [ProtectedRoute.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/app/ProtectedRoute.tsx) — компонент-захисник маршрутів. Перевіряє наявність сесії авторизації та права доступу за роллю (`user` / `operator`).
  * [styles/index.css](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/app/styles/index.css) — дизайн-система з CSS-змінними, темною колірною гамою Slate/Cyber Blue, анімаціями та стилями скелетонів.

### 2. `src/pages/` (Pages Layer)
* **Призначення**: Сторінки додатка, які складаються з віджетів та фіч.
* **Сторінки**:
  * [LoginPage.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/pages/LoginPage.tsx) — сторінка авторизації.
  * [RequestsPage.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/pages/RequestsPage.tsx) — список заявок для клієнтів або оператора.
  * [NewRequestPage.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/pages/NewRequestPage.tsx) — форма створення нової заявки.
  * [RequestDetailsPage.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/pages/RequestDetailsPage.tsx) — детальна картка заявки (оптимізовано через **Lazy Loading** `React.lazy` + `Suspense`).
  * [NotFoundPage.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/pages/NotFoundPage.tsx) — сторінка помилки 404.

### 3. `src/widgets/` (Widgets Layer)
* **Призначення**: Великі самостійні UI-блоки, що об'єднують декілька фіч та сутностей.
* **Компоненти**:
  * [Header.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/widgets/Header.tsx) — шапка з логотипом, профілем користувача, кнопкою виходу та перемикачем симулятора помилок.
  * [RequestListWidget.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/widgets/RequestListWidget.tsx) — список заявок зі скелетонами завантаження, обробкою порожнього стану (Empty State) та помилок.
  * [RequestDetailsWidget.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/widgets/RequestDetailsWidget.tsx) — детальна інформація про заявку, форма зміни статусу, додавання коментаря та таймлайн історії.

### 4. `src/features/` (Features Layer)
* **Призначення**: Користувацькі дії, які несуть бізнес-цінність.
* **Дії**:
  * [LoginForm.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/features/auth/ui/LoginForm.tsx) — вхід з валідацією Zod, встановленням автофокусу (`useRef`) та швидким входом в 1 клік.
  * [CreateRequestForm.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/features/create-request/ui/CreateRequestForm.tsx) — створення заявки через `useMutation` з програмним редіректом.
  * [StatusChangeForm.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/features/change-request-status/ui/StatusChangeForm.tsx) — зміна статусу оператором з оновленням кешу **TanStack Query**.
  * [AddCommentForm.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/features/add-comment/ui/AddCommentForm.tsx) — додавання коментарів оператора.
  * [StatusFilter.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/features/filter-requests/ui/StatusFilter.tsx) — фільтрація за статусом з синхронізацією URL Search Params (`?status=in_progress`).
  * [ErrorSimulator.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/features/simulate-error/ui/ErrorSimulator.tsx) — інструмент перемикання штучних помилок 500 / Network Error.

### 5. `src/entities/` (Entities Layer)
* **Призначення**: Бізнес-сутності додатку.
* **Сутності**:
  * `user`: [AuthContext.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/entities/user/model/AuthContext.tsx) — збереження токена, ролі та авто-завантаження профілю з `/auth/me`.
  * `request`: [RequestCard.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/entities/request/ui/RequestCard.tsx), [RequestBadgeHelpers.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/entities/request/ui/RequestBadgeHelpers.tsx) — візуальне відображення заявок, статусів, пріоритетів та категорій.
  * `comment`: [CommentItem.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/entities/comment/ui/CommentItem.tsx) — картка коментаря оператора.
  * `history`: [HistoryTimeline.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/entities/history/ui/HistoryTimeline.tsx) — таймлайн аудіту змін статусів.

### 6. `src/shared/` (Shared Layer)
* **Призначення**: Перевикористовуваний інфраструктурний код.
* **Модулі**:
  * [axiosInstance.ts](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/shared/api/axiosInstance.ts) — Axios-інстанс з Bearer-інтерсептором та автоматичним розлогуванням при 401 Unauthorized.
  * `mock`: [db.ts](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/shared/api/mock/db.ts), [handlers.ts](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/shared/api/mock/handlers.ts), [browser.ts](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/shared/api/mock/browser.ts), [server.ts](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/shared/api/mock/server.ts) — MSW 2.x Mock API.
  * [ToastContext.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/shared/context/ToastContext.tsx) — глобальна система вспливаючих Toast-повідомлень.

---

## 🔄 Сценарії роботи та Mock API

### Авторизаційні токени
При успішному запиті `POST /auth/login` повертається JWT-подібний токен:
* Клієнт: `token-user-1` (Роль: `user`)
* Оператор: `token-operator-2` (Роль: `operator`)

Усі захищені ендпоінти перевіряють наявність заголовка `Authorization: Bearer <token>`. За його відсутності повертається статус **401 Unauthorized**, після чого клієнтський додаток очищає сесію та перенаправляє користувача на `/login`.

### Опрацювання штучних помилок
В інтерфейсі додано панель симуляції помилок (в навбарі), яка додає заголовок `x-force-error`:
1. `500` — сервіс повертає помилку 500 Internal Server Error, додаток виводить сповіщення та UI-банер помилки з кнопкою повторної спроби.
2. `network` — сервіс розриває мережеве з'єднання, додаток коректно реагує та показує відповідний стан.

---

## 🧪 Інтеграційні тести

Усі тести знаходяться у директорії `src/__tests__/` та запускаються командою `npm run test`:

1. **[auth.test.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/__tests__/auth.test.tsx)** — тестує повний цикл авторизації клієнта, введення даних, відправку форми, завантаження профілю з `/auth/me` та рендеринг панелі заявок.
2. **[errors.test.tsx](file:///c:/Users/PC/Desktop/Chmel-Sevice/src/__tests__/errors.test.tsx)** — тестує реакцію додатка на 500 помилку сервера та обрив мережевого з'єднання через підключений MSW Node Server.
