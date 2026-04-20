# AutoDiary 🚗

Моят първи самостоятелен Angular проект! AutoDiary е приложение за следене на автомобили — гориво, сервизи и документи на едно място.

## Какво прави приложението?

- Регистрация и вход с профил
- Добавяне на множество автомобили
- Записване на горивни зареждания с автоматично изчисляване на цена и среден разход
- Сервизна история с напомняния за следващ сервиз
- Документи (застраховки, винетки, данъци) с напомняния при изтичане
- Табло с графика на средния разход и известия за изтекли срокове
- Профилна страница с редактиране на данните

## Технологии

- **Angular 19** — основен framework
- **TypeScript** — типизиран JavaScript
- **SoftUni Practice Server** — backend REST API (порт 3030)
- **Chart.js** — графика за среден разход
- **Font Awesome** — иконки
- **RxJS** — за работа с Observable-и

## Как се стартира

### Изисквания
- Node.js
- Angular CLI (`npm install -g @angular/cli`)
- SoftUni Practice Server

### Стъпки

1. Клонирай репото:
```bash
git clone https://github.com/KapkaKaloyanova/auto-diary.git
cd auto-diary
```

2. Инсталирай зависимостите:
```bash
npm install
```

3. Стартирай SoftUni Practice Server (порт 3030)

4. Стартирай приложението:
```bash
ng serve
```

5. Отвори браузъра на `http://localhost:4200`

### Тестови данни (по желание)
```bash
node seed.js
```
Създава тестови потребители и данни:
- **admin@abv.bg** / admin
- **kapchoni@gmail.com** / 1234

## Структура на проекта

```
src/app/
├── core/
│   ├── guards/          # authGuard, guestGuard
│   ├── interceptors/    # authInterceptor, errorInterceptor
│   └── services/        # AuthService, CarService, FuelService...
├── features/
│   ├── auth/            # Login, Register
│   ├── cars/            # Каталог, Детайли, Форми
│   ├── home/            # Начална страница
│   ├── not-found/       # 404 страница
│   └── user/            # Профил
├── layout/
│   ├── header/          # Навигация с dropdown
│   └── notification/    # Toast известия
└── shared/
    ├── directives/      # BgDateDirective, ExpiryWarningDirective
    ├── helpers/         # chart-helpers.ts
    ├── interfaces/      # TypeScript интерфейси
    ├── pipes/           # DocumentTypePipe
    └── validators/      # car-validators.ts
```

## Angular концепции използвани в проекта

- **Signals и Computed** — за реактивно state management
- **Reactive Forms** — за всички форми с валидация
- **HTTP Interceptors** — за автентикация и error handling
- **Route Guards** — authGuard и guestGuard
- **Custom Pipes** — DocumentTypePipe
- **Custom Directives** — BgDateDirective, ExpiryWarningDirective
- **RxJS** — forkJoin, map, tap, catchError
- **ViewChild** — за Chart.js canvas

## Бележки

Това е учебен проект направен по време на курс по Angular в SoftUni. Backend-ът е SoftUni Practice Server и не persist-ва данни след рестарт.
