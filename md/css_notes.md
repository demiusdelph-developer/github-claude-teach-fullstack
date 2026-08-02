# CSS3 — Повний конспект

---

## Зміст

1. [Основи CSS](#1-основи-css)
2. [Блокова модель (Box Model)](#2-блокова-модель-box-model)
3. [Позиціонування](#3-позиціонування)
4. [Flexbox](#4-flexbox)
5. [Grid](#5-grid)
6. [Медіа-запити](#6-медіа-запити)
7. [Анімації та переходи](#7-анімації-та-переходи)
8. [Змінні (Custom Properties)](#8-змінні-custom-properties)

---

## 1. Основи CSS

### Підключення стилів

```html
<!-- Зовнішній файл — правильний спосіб -->
<link rel="stylesheet" href="style.css">

<!-- Всередині тегу style — для тестів -->
<style>
  p { color: red; }
</style>

<!-- Інлайн — уникати -->
<p style="color: red;">текст</p>
```

### Синтаксис

```css
селектор {
  властивість: значення;
}
```

### Селектори

```css
/* Тег */
p { color: black; }

/* Клас — починається з крапки */
.card { background: white; }

/* ID — починається з решітки */
#header { height: 80px; }

/* Нащадок — пробіл між ними */
.card p { font-size: 14px; }

/* Прямий дочірній елемент */
.nav > li { display: inline-block; }

/* Псевдоклас — стан елемента */
a:hover { color: blue; }
button:active { opacity: 0.8; }
input:focus { border-color: blue; }
li:first-child { font-weight: bold; }
li:last-child { margin-bottom: 0; }
li:nth-child(2) { color: red; }

/* Псевдоелемент — частина елемента */
p::first-line { font-size: 18px; }
.card::before { content: "★"; }
.card::after { content: ""; display: block; }
```

### Специфічність — пріоритет стилів

Чим вища специфічність, тим правило "перемагає":

| Селектор | Вага |
|---|---|
| `!important` | найвищий (уникати) |
| `style=""` | 1000 |
| `#id` | 100 |
| `.class`, `:hover` | 10 |
| `tag`, `::before` | 1 |

```css
/* Приклад конфлікту */
p { color: black; }          /* вага: 1 */
.text { color: blue; }       /* вага: 10 — перемагає */
#main p { color: green; }    /* вага: 101 — перемагає */
```

### Кольори

```css
.box {
  /* Назви */
  color: red;
  color: transparent;

  /* HEX */
  color: #ff0000;
  color: #f00;           /* скорочено */

  /* RGB / RGBA */
  color: rgb(255, 0, 0);
  color: rgba(255, 0, 0, 0.5);  /* 0.5 — напівпрозорий */

  /* HSL — відтінок, насиченість, яскравість */
  color: hsl(0, 100%, 50%);
}
```

### Одиниці вимірювання

```css
.box {
  /* Абсолютні */
  width: 300px;     /* пікселі */

  /* Відносні від батька */
  width: 50%;

  /* Відносні від шрифту */
  font-size: 1rem;  /* від кореневого html — найкраще для тексту */
  font-size: 1em;   /* від батьківського елемента */

  /* Від екрану */
  width: 100vw;     /* 100% ширини вікна */
  height: 100vh;    /* 100% висоти вікна */
}
```

---

## 2. Блокова модель (Box Model)

Кожен елемент — прямокутник з чотирьох шарів:

```
┌─────────────────────────────┐
│         margin              │  ← відступ зовні (прозорий)
│   ┌─────────────────────┐   │
│   │       border        │   │  ← рамка
│   │   ┌─────────────┐   │   │
│   │   │   padding   │   │   │  ← відступ всередині
│   │   │  ┌───────┐  │   │   │
│   │   │  │content│  │   │   │  ← сам вміст
│   │   │  └───────┘  │   │   │
│   │   └─────────────┘   │   │
│   └─────────────────────┘   │
└─────────────────────────────┘
```

```css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;           /* всі сторони */
  padding: 10px 20px;      /* верх/низ  ліво/право */
  padding: 10px 20px 5px 15px; /* верх право низ ліво */
  border: 2px solid black;
  margin: 20px auto;       /* авто — центрує по горизонталі */
}

/* box-sizing: border-box — width включає padding і border */
/* Без цього: реальна ширина = width + padding + border */
* {
  box-sizing: border-box; /* завжди додавай на початку */
}
```

### Display

```css
/* Block — займає всю ширину, йде з нового рядка (div, p, h1) */
.el { display: block; }

/* Inline — як слово в тексті, ширина по вмісту (span, a) */
.el { display: inline; }

/* Inline-block — як inline, але можна задати width/height */
.el { display: inline-block; }

/* None — приховує елемент, займає 0 місця */
.el { display: none; }
/* Порівняй з visibility: hidden — ховає але місце зберігає */
```

---

## 3. Позиціонування

```css
/* Static — за замовчуванням, в потоці документа */
.el { position: static; }

/* Relative — зміщений відносно свого місця, місце зберігається */
.el {
  position: relative;
  top: 10px;    /* зміщений на 10px вниз */
  left: 20px;
}

/* Absolute — виривається з потоку, позиціонується відносно
   найближчого батька з position != static */
.el {
  position: absolute;
  top: 0;
  right: 0;
}

/* Fixed — відносно вікна браузера, не прокручується */
.el {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* Sticky — в потоці, але "прилипає" при прокрутці */
.el {
  position: sticky;
  top: 0;
}
```

### Z-index — порядок накладення

```css
/* Більше число — елемент поверх */
.overlay { z-index: 100; }
.modal   { z-index: 200; } /* modal поверх overlay */
```

---

## 4. Flexbox

Flexbox — одновимірне розміщення (рядок або стовпець).

### Контейнер

```css
.container {
  display: flex;

  /* Напрямок осі */
  flex-direction: row;            /* → ліво-право (за замовч.) */
  flex-direction: row-reverse;    /* ← право-ліво */
  flex-direction: column;         /* ↓ зверху-вниз */
  flex-direction: column-reverse; /* ↑ знизу-вверх */

  /* Перенос елементів */
  flex-wrap: nowrap;   /* в один рядок (за замовч.) */
  flex-wrap: wrap;     /* переносяться на наступний рядок */

  /* Скорочення */
  flex-flow: row wrap;

  /* Вирівнювання по головній осі (justify) */
  justify-content: flex-start;    /* ██░░░░░░░ */
  justify-content: flex-end;      /* ░░░░░░░██ */
  justify-content: center;        /* ░░░██░░░░ */
  justify-content: space-between; /* █░░░░░░░█ */
  justify-content: space-around;  /* ░█░░░░░█░ */
  justify-content: space-evenly;  /* ░█░░░█░░░ */

  /* Вирівнювання по поперечній осі (align) */
  align-items: stretch;     /* розтягнути (за замовч.) */
  align-items: flex-start;  /* до початку */
  align-items: flex-end;    /* до кінця */
  align-items: center;      /* по центру */
  align-items: baseline;    /* по базовій лінії тексту */

  /* Відстань між елементами */
  gap: 20px;
  gap: 10px 20px; /* рядок стовпець */
}
```

### Елемент (дочірні)

```css
.item {
  /* Розтяжність: як росте щодо вільного простору */
  flex-grow: 0;   /* не росте (за замовч.) */
  flex-grow: 1;   /* займає весь вільний простір */

  /* Стискуваність: як стискається */
  flex-shrink: 1; /* може стискатись (за замовч.) */
  flex-shrink: 0; /* не стискається */

  /* Базовий розмір перед розподілом простору */
  flex-basis: auto;   /* за розміром вмісту */
  flex-basis: 200px;

  /* Скорочення: grow shrink basis */
  flex: 1;           /* = flex: 1 1 0 */
  flex: 0 0 200px;   /* фіксована ширина 200px */

  /* Порядок відображення */
  order: 0;   /* за замовч. */
  order: -1;  /* першим */
  order: 1;   /* після всіх з order: 0 */

  /* Вирівнювання одного елемента */
  align-self: center;
}
```

### Типові патерни

```css
/* Горизонтальне і вертикальне центрування */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Навбар: лого зліва, меню справа */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Карточки в рядок з переносом */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 1 1 300px; /* мінімум 300px, може рости */
}
```

---

## 5. Grid

Grid — двовимірне розміщення (рядки і стовпці).

### Контейнер

```css
.container {
  display: grid;

  /* Визначення стовпців */
  grid-template-columns: 200px 200px 200px;  /* 3 стовпці по 200px */
  grid-template-columns: 1fr 2fr 1fr;         /* fr — частина вільного місця */
  grid-template-columns: repeat(3, 1fr);      /* 3 рівних стовпці */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* адаптивно */

  /* Визначення рядків */
  grid-template-rows: 100px auto 100px;

  /* Відстань */
  gap: 20px;
  column-gap: 20px;
  row-gap: 10px;

  /* Вирівнювання всіх елементів */
  justify-items: start | end | center | stretch;  /* по горизонталі */
  align-items:   start | end | center | stretch;  /* по вертикалі */

  /* Вирівнювання всієї сітки в контейнері */
  justify-content: start | end | center | space-between | space-around;
  align-content:   start | end | center | space-between | space-around;
}
```

### Іменовані зони

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

### Елемент (дочірні)

```css
.item {
  /* Позиція по стовпцях: від лінії / до лінії */
  grid-column: 1 / 3;    /* займає стовпці 1 і 2 */
  grid-column: 1 / -1;   /* від першої до останньої лінії */
  grid-column: span 2;   /* займає 2 стовпці */

  /* Позиція по рядках */
  grid-row: 1 / 3;
  grid-row: span 2;

  /* Вирівнювання одного елемента */
  justify-self: center;
  align-self: end;
}
```

### Типові патерни

```css
/* Адаптивна сітка карточок */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Класичний макет сторінки */
.page {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "footer";
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

/* Два стовпці з бічною панеллю */
.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
}
```

### Flexbox vs Grid — коли що використовувати

| Ситуація | Вибір |
|---|---|
| Елементи в рядок / стовпець | Flexbox |
| Вирівняти елемент по центру | Flexbox |
| Складний макет з рядками і стовпцями | Grid |
| Картки в сітці | Grid |
| Навігаційна панель | Flexbox |
| Макет сторінки (header/main/footer) | Grid |

---

## 6. Медіа-запити

Медіа-запити змінюють стилі залежно від розміру екрана.

### Синтаксис

```css
@media (умова) {
  /* стилі */
}
```

### Брейкпоїнти (breakpoints)

```css
/* Мобільні пристрої — до 767px */
@media (max-width: 767px) {
  .container { padding: 16px; }
}

/* Планшети — від 768px до 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  .container { padding: 24px; }
}

/* Десктоп — від 1024px */
@media (min-width: 1024px) {
  .container { padding: 40px; }
}
```

### Mobile First — правильний підхід

Пишемо стилі спочатку для мобільних, потім розширюємо для більших екранів:

```css
/* За замовч. — мобільний */
.cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Планшет */
@media (min-width: 768px) {
  .cards {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

/* Десктоп */
@media (min-width: 1024px) {
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Інші умови медіа-запитів

```css
/* Орієнтація */
@media (orientation: portrait) { /* вертикально */ }
@media (orientation: landscape) { /* горизонтально */ }

/* Темна тема системи */
@media (prefers-color-scheme: dark) {
  body { background: #111; color: #fff; }
}

/* Зменшення анімацій (для людей з вестибулярними порушеннями) */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

### Viewport тег — обов'язковий для мобільних

```html
<!-- В <head> кожної HTML-сторінки -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 7. Анімації та переходи

### Transition — плавна зміна властивостей

```css
.button {
  background: blue;
  /* властивість | тривалість | функція | затримка */
  transition: background 0.3s ease 0s;

  /* Декілька властивостей */
  transition: background 0.3s ease, transform 0.2s ease;

  /* Всі властивості */
  transition: all 0.3s ease;
}

.button:hover {
  background: darkblue;
  transform: scale(1.05);
}
```

### Функції часу (timing functions)

```css
transition-timing-function: linear;      /* рівномірно */
transition-timing-function: ease;        /* плавно (за замовч.) */
transition-timing-function: ease-in;     /* повільний старт */
transition-timing-function: ease-out;    /* повільний кінець */
transition-timing-function: ease-in-out; /* повільний старт і кінець */
transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); /* власна крива */
```

### Transform — трансформації

```css
.box {
  /* Переміщення */
  transform: translateX(50px);
  transform: translateY(-20px);
  transform: translate(50px, -20px);

  /* Масштаб */
  transform: scale(1.2);
  transform: scaleX(2);

  /* Поворот */
  transform: rotate(45deg);

  /* Нахил */
  transform: skewX(10deg);

  /* Кілька трансформацій одночасно */
  transform: translateX(20px) rotate(45deg) scale(1.1);
}
```

### Animation — повноцінні анімації

```css
/* 1. Визначаємо keyframes (ключові кадри) */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* 2. Застосовуємо до елемента */
.element {
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;      /* або infinite */
  animation-direction: normal;       /* normal | reverse | alternate */
  animation-fill-mode: forwards;     /* зберегти стан останнього кадру */

  /* Скорочення: name duration timing delay iteration direction fill */
  animation: fadeIn 0.5s ease 0s 1 normal forwards;
}

.loader {
  animation: pulse 1.5s ease-in-out infinite;
}
```

### Типові ефекти

```css
/* Плавна поява */
.card {
  opacity: 0;
  animation: fadeIn 0.4s ease forwards;
}

/* Кнопка з ефектом при наведенні */
.button {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Спінер завантаження */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #eee;
  border-top-color: blue;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

---

## 8. Змінні (Custom Properties)

CSS змінні — значення, які зберігаються в одному місці і використовуються скрізь.

### Оголошення та використання

```css
/* Оголошення — зазвичай у :root щоб доступні глобально */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
  --color-text: #111827;
  --color-bg: #ffffff;

  --font-size-base: 16px;
  --font-size-lg: 20px;

  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;

  --border-radius: 8px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Використання — функція var() */
.button {
  background: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
}

/* var() з запасним значенням */
.card {
  color: var(--color-text, black); /* якщо змінна не визначена — black */
}
```

### Локальні змінні

```css
/* Змінна може бути лише для одного компонента */
.card {
  --card-padding: 24px;
  --card-bg: #f9fafb;

  padding: var(--card-padding);
  background: var(--card-bg);
}

/* Дочірні елементи теж мають доступ */
.card .card-title {
  padding-bottom: calc(var(--card-padding) / 2);
}
```

### Темна тема через змінні

```css
:root {
  --bg: #ffffff;
  --text: #111827;
  --surface: #f3f4f6;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111827;
    --text: #f9fafb;
    --surface: #1f2937;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}

.card {
  background: var(--surface);
}
```

### Зміна змінних через JavaScript

```js
// Встановлення
document.documentElement.style.setProperty('--color-primary', '#ef4444');

// Читання
const value = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');
```

### calc() — обчислення

```css
.container {
  width: calc(100% - 40px);           /* з відступами */
  height: calc(100vh - 80px);         /* на всю висоту мінус хедер */
  font-size: calc(var(--font-size-base) * 1.25);
  padding: calc(var(--spacing-md) * 2);
}
```

---

## Практичні поради

### Скидання стилів браузера

```css
/* Мінімальний reset — додавай завжди на початку */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

img {
  max-width: 100%;
  display: block;
}
```

### Корисні властивості

```css
.text {
  /* Текст */
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;           /* 100–900 */
  line-height: 1.6;           /* краще без px */
  letter-spacing: 0.05em;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;        /* не переносити */
  overflow: hidden;
  text-overflow: ellipsis;    /* ... при обрізанні */
}

.box {
  /* Рамка */
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  border-radius: 50%;         /* коло */

  /* Тінь */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); /* всередину */

  /* Фон */
  background-color: #f3f4f6;
  background-image: url('image.jpg');
  background-size: cover;
  background-position: center;

  /* Прокрутка */
  overflow: hidden;
  overflow: auto;
  overflow-y: scroll;

  /* Курсор */
  cursor: pointer;
  cursor: not-allowed;
}
```

### Порядок властивостей у CSS (рекомендований)

```css
.element {
  /* 1. Позиціонування */
  position: relative;
  top: 0;
  z-index: 1;

  /* 2. Блокова модель */
  display: flex;
  width: 200px;
  height: 100px;
  margin: 16px;
  padding: 12px;

  /* 3. Візуальне */
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  /* 4. Текст */
  font-size: 14px;
  color: #333;

  /* 5. Інше */
  cursor: pointer;
  transition: all 0.2s ease;
}
```
