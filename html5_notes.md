# Конспект HTML5 — Повний довідник

---

## 1. Що таке HTML

**HTML (HyperText Markup Language)** — мова розмітки, яка описує структуру веб-сторінки.
HTML — **не мова програмування**, це набір тегів, які браузер читає і перетворює на візуальний контент.

### Як браузер обробляє HTML

1. Браузер отримує HTML-файл із сервера
2. Читає теги зверху донизу
3. Будує **DOM (Document Object Model)** — дерево об'єктів
4. Відображає сторінку на екрані

---

## 2. Базова структура документа

```html
<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Назва сторінки</title>
  </head>
  <body>
    <!-- Видимий вміст сторінки -->
  </body>
</html>
```

| Тег / атрибут | Призначення |
|---|---|
| `<!DOCTYPE html>` | Оголошує тип документа — HTML5. Завжди першим рядком |
| `<html lang="uk">` | Кореневий елемент. `lang` — мова сторінки (важливо для SEO та читалок) |
| `<head>` | Метадані — не відображаються на сторінці |
| `<body>` | Весь видимий вміст |

### Що іде в `<head>`

```html
<head>
  <!-- Кодування символів -->
  <meta charset="UTF-8" />

  <!-- Адаптивність для мобільних -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Опис для пошукових систем -->
  <meta name="description" content="Опис сторінки до 160 символів" />

  <!-- Назва вкладки браузера -->
  <title>Моя сторінка</title>

  <!-- Підключення CSS -->
  <link rel="stylesheet" href="style.css" />

  <!-- Іконка вкладки -->
  <link rel="icon" href="favicon.ico" type="image/x-icon" />

  <!-- Підключення шрифтів Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />

  <!-- Підключення JavaScript (defer = завантажити після HTML) -->
  <script src="script.js" defer></script>
</head>
```

---

## 3. Синтаксис тегів

```html
<!-- Парний тег (має відкривальний і закривальний) -->
<p>Текст параграфа</p>

<!-- Непарний тег (самозакривальний) -->
<img src="photo.jpg" alt="Фото" />
<br />
<hr />
<input type="text" />

<!-- Вкладені теги (нащадки) -->
<div>
  <p>Цей параграф — дочірній елемент div</p>
</div>

<!-- Коментар -->
<!-- Це не відображається на сторінці -->
```

**Атрибути** — задають властивості тегу. Завжди у відкривальному тезі:
```html
<тег атрибут="значення">...</тег>
```

---

## 4. Заголовки і текст

### Заголовки h1–h6

```html
<h1>Найголовніший заголовок (один на сторінці)</h1>
<h2>Розділ</h2>
<h3>Підрозділ</h3>
<h4>Підпідрозділ</h4>
<h5>Рідко використовується</h5>
<h6>Найменший заголовок</h6>
```

> `<h1>` — один на сторінку. Це важливо для SEO.
> Ієрархія повинна бути послідовною: після `h2` іде `h3`, не `h5`.

### Параграф і перенос

```html
<p>Це параграф. Браузер автоматично додає відступи.</p>

<!-- Перенос рядка всередині тексту -->
<p>Перший рядок<br />Другий рядок</p>

<!-- Горизонтальна лінія-розділювач -->
<hr />
```

### Форматування тексту

```html
<!-- Семантичне (несуть змістове значення) -->
<strong>Важливий текст</strong>       <!-- жирний + "важливо" для зчитувача -->
<em>Виділений текст</em>              <!-- курсив + "наголос" для зчитувача -->
<mark>Підсвічений текст</mark>        <!-- жовте виділення -->
<del>Видалений текст</del>            <!-- перекреслення -->
<ins>Доданий текст</ins>              <!-- підкреслення (позначає вставку) -->
<small>Дрібний текст</small>          <!-- авторські права, примітки -->
<abbr title="HyperText Markup Language">HTML</abbr>  <!-- скорочення з підказкою -->
<cite>Назва книги або фільму</cite>   <!-- назва твору -->
<q>Коротка цитата в тексті</q>        <!-- додає лапки автоматично -->
<time datetime="2024-01-15">15 січня 2024</time>  <!-- дата/час для машин -->
<sub>нижній індекс</sub>              <!-- H₂O -->
<sup>верхній індекс</sup>             <!-- x² -->
<code>console.log('hi')</code>        <!-- рядок коду -->
<kbd>Ctrl + C</kbd>                   <!-- клавіші клавіатури -->

<!-- Лише візуальні (без змісту) — краще уникати -->
<b>Жирний</b>
<i>Курсив</i>
<u>Підкреслений</u>
```

### Блоки тексту

```html
<!-- Заздалегідь відформатований текст (зберігає пробіли та переноси) -->
<pre>
  function hello() {
    console.log("Hi");
  }
</pre>

<!-- Блокова цитата -->
<blockquote cite="https://example.com">
  <p>Текст цитати...</p>
  <footer>— Автор</footer>
</blockquote>
```

---

## 5. Семантичні елементи

Семантичні теги **описують роль** вмісту — не лише обгортають його. Це покращує SEO, доступність і читабельність коду.

```
┌─────────────────────────────┐
│           <header>          │
│  (логотип, навігація)       │
├─────────────────────────────┤
│           <nav>             │
│  (меню сайту)               │
├──────────────┬──────────────┤
│              │   <aside>    │
│   <main>     │   (бічна     │
│              │   панель)    │
│  <article>   │              │
│  <section>   │              │
│              │              │
├──────────────┴──────────────┤
│           <footer>          │
│  (копірайт, контакти)       │
└─────────────────────────────┘
```

```html
<header>
  <!-- Шапка сторінки або секції: логотип, назва, навігація -->
</header>

<nav>
  <!-- Блок навігаційних посилань (головне меню, breadcrumbs) -->
</nav>

<main>
  <!-- Основний унікальний вміст сторінки. Один на сторінку. -->
  
  <article>
    <!-- Самодостатній контент: стаття, пост, коментар -->
  </article>

  <section>
    <!-- Тематична секція з заголовком -->
    <h2>Назва секції</h2>
  </section>
</main>

<aside>
  <!-- Вміст пов'язаний, але не головний: бічна панель, реклама, теги -->
</aside>

<footer>
  <!-- Підвал: копірайт, контакти, посилання -->
</footer>

<figure>
  <!-- Самодостатній медіа-блок (зображення, схема, код) -->
  <img src="chart.png" alt="Графік продажів" />
  <figcaption>Графік продажів за 2024 рік</figcaption>
</figure>

<details>
  <!-- Розгортуваний блок -->
  <summary>Клікни щоб розкрити</summary>
  <p>Прихований текст, який з'являється після кліку</p>
</details>

<dialog>
  <!-- Модальне вікно (нативне) -->
  <p>Ви впевнені?</p>
  <button>Так</button>
</dialog>
```

---

## 6. Списки

```html
<!-- Невпорядкований список (булети) -->
<ul>
  <li>Перший елемент</li>
  <li>Другий елемент</li>
  <li>
    Вкладений список:
    <ul>
      <li>Підпункт</li>
    </ul>
  </li>
</ul>

<!-- Впорядкований список (нумерація) -->
<ol>
  <li>Крок перший</li>
  <li>Крок другий</li>
</ol>

<!-- Атрибути <ol> -->
<ol start="5">          <!-- нумерація з 5 -->
<ol reversed>           <!-- зворотня нумерація -->
<ol type="A">           <!-- A, B, C... (також: a, I, i, 1) -->

<!-- Список означень (словник) -->
<dl>
  <dt>HTML</dt>
  <dd>Мова розмітки гіпертексту</dd>

  <dt>CSS</dt>
  <dd>Каскадні таблиці стилів</dd>
</dl>
```

---

## 7. Посилання

```html
<!-- Зовнішнє посилання -->
<a href="https://google.com">Google</a>

<!-- Відкрити в новій вкладці -->
<a href="https://google.com" target="_blank" rel="noopener noreferrer">
  Google (нова вкладка)
</a>

<!-- Внутрішня сторінка -->
<a href="about.html">Про нас</a>

<!-- Якірне посилання (перехід до елемента з id) -->
<a href="#contacts">Перейти до контактів</a>
...
<section id="contacts">...</section>

<!-- Email -->
<a href="mailto:email@example.com">Написати нам</a>

<!-- Телефон -->
<a href="tel:+380501234567">+38 050 123 45 67</a>

<!-- Завантаження файлу -->
<a href="file.pdf" download>Завантажити PDF</a>
<a href="file.pdf" download="custom-name.pdf">Завантажити з новим іменем</a>
```

> `rel="noopener noreferrer"` — обов'язково при `target="_blank"`.
> Без нього відкрита сторінка може отримати доступ до твоєї через `window.opener` (вразливість).

---

## 8. Зображення

```html
<!-- Базове зображення -->
<img src="photo.jpg" alt="Опис зображення" />

<!-- alt обов'язковий! Для доступності та якщо зображення не завантажиться -->
<!-- Декоративне зображення (читалка ігнорує): alt="" -->
<img src="divider.png" alt="" />

<!-- З розмірами (у пікселях або %) -->
<img src="photo.jpg" alt="Фото" width="800" height="600" />

<!-- Lazy loading (завантажує тільки коли видно) -->
<img src="photo.jpg" alt="Фото" loading="lazy" />

<!-- Адаптивне зображення через srcset -->
<!-- Браузер обирає найкраще за шириною екрану -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"
  alt="Адаптивне фото"
/>

<!-- <picture> — повний контроль над адаптивністю -->
<picture>
  <source media="(max-width: 600px)" srcset="photo-mobile.jpg" />
  <source media="(max-width: 1200px)" srcset="photo-tablet.jpg" />
  <img src="photo-desktop.jpg" alt="Фото" />
  <!-- <img> всередині picture — fallback обов'язковий -->
</picture>
```

---

## 9. Таблиці

```html
<table>
  <caption>Назва таблиці (для доступності)</caption>

  <thead>                          <!-- Заголовок таблиці -->
    <tr>
      <th scope="col">Ім'я</th>
      <th scope="col">Вік</th>
      <th scope="col">Місто</th>
    </tr>
  </thead>

  <tbody>                          <!-- Тіло таблиці -->
    <tr>
      <td>Іван</td>
      <td>25</td>
      <td>Київ</td>
    </tr>
    <tr>
      <td>Марія</td>
      <td>30</td>
      <td>Львів</td>
    </tr>
  </tbody>

  <tfoot>                          <!-- Підвал таблиці (підсумки) -->
    <tr>
      <td colspan="3">Всього: 2 особи</td>
    </tr>
  </tfoot>
</table>
```

### Об'єднання комірок

```html
<!-- colspan — об'єднати по горизонталі (N стовпців) -->
<td colspan="2">Займає 2 колонки</td>

<!-- rowspan — об'єднати по вертикалі (N рядків) -->
<td rowspan="3">Займає 3 рядки</td>
```

> Таблиці — для **табличних даних**, не для верстки макету!

---

## 10. Форми

Форми — найважливіша інтерактивна частина HTML.

### Структура форми

```html
<form action="/submit" method="POST">
  <!-- action — куди надсилати дані (URL) -->
  <!-- method — GET (дані в URL) або POST (дані в тілі запиту) -->

  <label for="name">Ім'я:</label>
  <input type="text" id="name" name="name" placeholder="Введіть ім'я" required />

  <button type="submit">Надіслати</button>
</form>
```

### Усі типи `<input>`

```html
<!-- Текстові -->
<input type="text" />          <!-- однорядковий текст -->
<input type="password" />      <!-- пароль (символи приховані) -->
<input type="email" />         <!-- email з валідацією формату -->
<input type="url" />           <!-- URL з валідацією -->
<input type="search" />        <!-- рядок пошуку -->
<input type="tel" />           <!-- телефон -->

<!-- Числові -->
<input type="number" min="0" max="100" step="5" />   <!-- число -->
<input type="range" min="0" max="100" value="50" />  <!-- повзунок -->

<!-- Дата і час -->
<input type="date" />                    <!-- вибір дати -->
<input type="time" />                    <!-- вибір часу -->
<input type="datetime-local" />          <!-- дата + час -->
<input type="month" />                   <!-- місяць і рік -->
<input type="week" />                    <!-- тиждень -->

<!-- Вибір -->
<input type="checkbox" />       <!-- прапорець (можна обрати декілька) -->
<input type="radio" name="group" />  <!-- радіокнопка (одна з групи) -->

<!-- Файл -->
<input type="file" accept=".jpg,.png" multiple />   <!-- завантаження файлів -->

<!-- Колір -->
<input type="color" value="#ff0000" />

<!-- Приховані дані -->
<input type="hidden" name="token" value="abc123" />

<!-- Кнопки -->
<input type="submit" value="Надіслати" />
<input type="reset" value="Скинути" />
<input type="button" value="Клікни" />
```

### Важливі атрибути `<input>`

| Атрибут | Що робить |
|---|---|
| `required` | Поле обов'язкове для заповнення |
| `placeholder` | Підказка всередині поля (зникає при введенні) |
| `value` | Значення за замовчуванням |
| `disabled` | Поле недоступне для редагування |
| `readonly` | Тільки для читання (але дані надсилаються) |
| `autofocus` | Фокус на цьому полі при завантаженні |
| `autocomplete="off"` | Вимикає автозаповнення |
| `min` / `max` | Мінімум / максимум (для числових і дат) |
| `minlength` / `maxlength` | Мінімальна / максимальна кількість символів |
| `pattern` | Регулярний вираз для валідації |
| `multiple` | Дозволяє ввести декілька значень |
| `name` | Ім'я поля при надсиланні форми (обов'язкове!) |
| `id` | Унікальний ідентифікатор для зв'язку з `<label>` |

### `<label>` — підпис поля

```html
<!-- Спосіб 1: через for + id (рекомендований) -->
<label for="email">Електронна пошта:</label>
<input type="email" id="email" name="email" />

<!-- Спосіб 2: обгортання (теж правильно) -->
<label>
  Електронна пошта:
  <input type="email" name="email" />
</label>
```

> Завжди використовуй `<label>` — без нього поле незручне і недоступне.

### `<textarea>` — багаторядковий текст

```html
<label for="message">Повідомлення:</label>
<textarea
  id="message"
  name="message"
  rows="5"
  cols="40"
  placeholder="Введіть текст..."
  maxlength="500"
></textarea>
```

### `<select>` — випадаючий список

```html
<label for="city">Місто:</label>
<select id="city" name="city">
  <option value="">-- Обери місто --</option>
  <option value="kyiv">Київ</option>
  <option value="lviv" selected>Львів</option>   <!-- selected = обрано за замовчуванням -->
  <option value="odesa">Одеса</option>
</select>

<!-- Групування опцій -->
<select name="country">
  <optgroup label="Україна">
    <option value="kyiv">Київ</option>
    <option value="lviv">Львів</option>
  </optgroup>
  <optgroup label="Польща">
    <option value="warsaw">Варшава</option>
  </optgroup>
</select>

<!-- Мультивибір -->
<select name="tags" multiple size="4">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
</select>
```

### `<button>` — кнопка

```html
<button type="submit">Надіслати форму</button>   <!-- надсилає форму -->
<button type="reset">Скинути</button>             <!-- скидає форму -->
<button type="button">Просто кнопка</button>      <!-- без дії (для JS) -->

<!-- Кнопка може містити HTML -->
<button type="button">
  <img src="icon.svg" alt="" /> Натисни мене
</button>
```

### `<fieldset>` і `<legend>` — групування

```html
<fieldset>
  <legend>Особисті дані</legend>

  <label for="fname">Ім'я:</label>
  <input type="text" id="fname" name="fname" />

  <label for="lname">Прізвище:</label>
  <input type="text" id="lname" name="lname" />
</fieldset>
```

### `<datalist>` — підказки при введенні

```html
<input type="text" list="browsers" name="browser" />
<datalist id="browsers">
  <option value="Chrome" />
  <option value="Firefox" />
  <option value="Safari" />
  <option value="Edge" />
</datalist>
```

---

## 11. Медіа

### Відео

```html
<video width="800" height="450" controls>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  Ваш браузер не підтримує відео.    <!-- fallback текст -->
</video>

<!-- Атрибути відео -->
<video
  src="video.mp4"
  controls          <!-- показати панель керування -->
  autoplay          <!-- автовідтворення (потрібен muted) -->
  muted             <!-- без звуку -->
  loop              <!-- повтор -->
  poster="cover.jpg" <!-- зображення до відтворення -->
  preload="metadata" <!-- none | metadata | auto -->
></video>
```

### Аудіо

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
  Ваш браузер не підтримує аудіо.
</audio>
```

### Iframe — вбудований контент

```html
<!-- YouTube відео -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Назва відео"
  frameborder="0"
  allowfullscreen
></iframe>

<!-- Google Maps -->
<iframe
  src="https://maps.google.com/maps?q=Kyiv&output=embed"
  width="600"
  height="450"
  loading="lazy"
  title="Карта Києва"
></iframe>
```

---

## 12. Глобальні атрибути

Ці атрибути можна використовувати з **будь-яким** тегом:

| Атрибут | Призначення | Приклад |
|---|---|---|
| `id` | Унікальний ідентифікатор елемента | `id="header"` |
| `class` | Клас для CSS / JS (може бути декілька) | `class="btn btn-primary"` |
| `style` | Вбудовані CSS-стилі | `style="color: red;"` |
| `title` | Підказка при наведенні | `title="Детальніше"` |
| `lang` | Мова вмісту елемента | `lang="en"` |
| `hidden` | Приховує елемент | `hidden` |
| `tabindex` | Порядок табуляції | `tabindex="1"` |
| `contenteditable` | Робить елемент редагованим | `contenteditable="true"` |
| `draggable` | Дозволяє перетягування | `draggable="true"` |
| `data-*` | Власні дані для JS | `data-user-id="42"` |

### `data-*` атрибути

```html
<!-- Зберігання даних прямо в HTML для JavaScript -->
<div class="product" data-id="123" data-price="499" data-category="electronics">
  Смартфон
</div>

<script>
  const product = document.querySelector('.product');
  console.log(product.dataset.id);        // "123"
  console.log(product.dataset.price);     // "499"
  console.log(product.dataset.category);  // "electronics"
</script>
```

---

## 13. HTML-сутності (entities)

Спеціальні символи, які не можна вставити напряму:

| Символ | Код | Коли використовувати |
|---|---|---|
| `<` | `&lt;` | Знак менше в тексті |
| `>` | `&gt;` | Знак більше в тексті |
| `&` | `&amp;` | Амперсанд у тексті |
| `"` | `&quot;` | Лапки всередині атрибутів |
| `'` | `&apos;` | Одинарні лапки |
| ` ` (нерозривний пробіл) | `&nbsp;` | Пробіл, що не переноситься |
| `©` | `&copy;` | Копірайт |
| `®` | `&reg;` | Зареєстрована марка |
| `™` | `&trade;` | Торгова марка |
| `€` | `&euro;` | Євро |
| `→` | `&rarr;` | Стрілка вправо |
| `—` | `&mdash;` | Тире (em dash) |

---

## 14. Доступність (Accessibility / a11y)

Доступність — щоб сайт могли використовувати всі, включно з людьми, що використовують читалки екрану.

### Основні принципи

```html
<!-- 1. Завжди alt у зображень -->
<img src="logo.png" alt="Логотип компанії XYZ" />
<img src="divider.png" alt="" />   <!-- декоративне — порожній alt -->

<!-- 2. label для кожного поля форми -->
<label for="phone">Телефон:</label>
<input type="tel" id="phone" name="phone" />

<!-- 3. Семантичні теги замість div/span -->
<button>Натисни мене</button>    <!-- а не <div onclick="..."> -->
<nav>...</nav>                    <!-- а не <div class="nav"> -->

<!-- 4. Заголовки в правильному порядку -->
<h1>...</h1>
  <h2>...</h2>
    <h3>...</h3>

<!-- 5. Skip-link для клавіатурних користувачів -->
<a href="#main-content" class="skip-link">Перейти до основного вмісту</a>
```

### ARIA-атрибути

ARIA (Accessible Rich Internet Applications) — додаткові атрибути для покращення доступності:

```html
<!-- role — визначає роль елемента -->
<div role="button" tabindex="0">Клікни</div>
<div role="alert">Помилка: поле обов'язкове</div>
<nav role="navigation" aria-label="Головне меню">...</nav>

<!-- aria-label — текстовий опис для читалки -->
<button aria-label="Закрити діалог">✕</button>

<!-- aria-labelledby — посилання на елемент із заголовком -->
<section aria-labelledby="section-title">
  <h2 id="section-title">Наші послуги</h2>
</section>

<!-- aria-hidden — приховати від читалки -->
<span aria-hidden="true">✓</span>

<!-- aria-expanded — стан розкриття -->
<button aria-expanded="false" aria-controls="menu">Меню</button>
<ul id="menu" hidden>...</ul>

<!-- aria-required — обов'язкове поле -->
<input aria-required="true" />

<!-- aria-live — динамічний вміст -->
<div aria-live="polite">Завантаження...</div>
```

---

## 15. SEO-метатеги

```html
<head>
  <!-- Базові -->
  <title>Назва сторінки | Назва сайту</title>
  <meta name="description" content="Опис до 160 символів. Відображається в результатах пошуку." />
  <meta name="keywords" content="html, css, javascript" />   <!-- майже не враховується Google -->
  <link rel="canonical" href="https://example.com/page" />  <!-- уникнути дублікатів -->

  <!-- Open Graph (для Facebook, Telegram, LinkedIn) -->
  <meta property="og:title" content="Назва сторінки" />
  <meta property="og:description" content="Опис для соцмереж" />
  <meta property="og:image" content="https://example.com/image.jpg" />
  <meta property="og:url" content="https://example.com/page" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Назва" />
  <meta name="twitter:description" content="Опис" />
  <meta name="twitter:image" content="https://example.com/image.jpg" />

  <!-- Robots -->
  <meta name="robots" content="index, follow" />          <!-- дозволити індексування -->
  <meta name="robots" content="noindex, nofollow" />      <!-- заборонити -->
</head>
```

---

## 16. Корисні теги що рідко згадуються

```html
<!-- Прогрес-бар -->
<progress value="70" max="100"></progress>

<!-- Лічильник/шкала (не прогрес) -->
<meter value="0.7" min="0" max="1" low="0.3" high="0.8" optimum="1">70%</meter>

<!-- Виводить результат обчислення -->
<output for="a b" name="result">42</output>

<!-- Рядок коду + блок коду -->
<code>let x = 5;</code>
<pre><code>
function sum(a, b) {
  return a + b;
}
</code></pre>

<!-- Шаблон (не відображається, використовується JS) -->
<template id="card-template">
  <div class="card">
    <h3></h3>
    <p></p>
  </div>
</template>

<!-- Веб-компонент (слот) -->
<slot name="title">Заголовок за замовчуванням</slot>
```

---

## 17. Найчастіші помилки початківців

| Помилка | Правильно |
|---|---|
| `<img src="photo.jpg">` без alt | `<img src="photo.jpg" alt="Опис">` |
| Декілька `<h1>` на сторінці | Тільки один `<h1>` |
| `<div>` замість семантичних тегів | `<header>`, `<nav>`, `<main>`, тощо |
| `<br>` для відступів між блоками | CSS `margin` / `padding` |
| `<table>` для верстки макету | CSS Flexbox або Grid |
| `<input>` без `<label>` | Завжди додавай `<label for="id">` |
| `target="_blank"` без `rel` | `rel="noopener noreferrer"` |
| Порушення ієрархії заголовків | h1 → h2 → h3 послідовно |
| Вкладення блокових у рядкові | `<p><div>...</div></p>` — неправильно |

---

## 18. Чіт-шит структури проекту

```
my-project/
├── index.html          ← головна сторінка
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── logo.png
```

---

## 19. Швидкий довідник тегів

| Категорія | Теги |
|---|---|
| Структура | `html`, `head`, `body`, `meta`, `title`, `link`, `script` |
| Заголовки | `h1`–`h6` |
| Текст | `p`, `span`, `strong`, `em`, `br`, `hr`, `pre`, `code`, `blockquote`, `q`, `abbr`, `cite`, `mark`, `small`, `del`, `ins`, `sub`, `sup`, `time`, `kbd` |
| Семантика | `header`, `nav`, `main`, `article`, `section`, `aside`, `footer`, `figure`, `figcaption`, `details`, `summary` |
| Списки | `ul`, `ol`, `li`, `dl`, `dt`, `dd` |
| Посилання | `a` |
| Зображення | `img`, `picture`, `source` |
| Таблиці | `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption` |
| Форми | `form`, `input`, `label`, `textarea`, `select`, `option`, `optgroup`, `button`, `fieldset`, `legend`, `datalist`, `output` |
| Медіа | `video`, `audio`, `source`, `track`, `iframe` |
| Контейнери | `div`, `span` |
