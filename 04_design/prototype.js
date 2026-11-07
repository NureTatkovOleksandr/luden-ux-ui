'use strict';

const games = [
  { id: 'atlas', name: 'Atlas Drift', genre: 'Пригоди', cents: 2499 },
  { id: 'moon', name: 'Moon Relay', genre: 'Стратегія', cents: 1499 },
  { id: 'signal', name: 'Signal Harbor', genre: 'Пригоди', cents: 1999 },
];
const formatPrice = cents => '$' + (cents / 100).toFixed(2);
const root = document.querySelector('#app');
const gameById = id => games.find(game => game.id === id);
const resetState = () => ({
  page: 'login', modal: '', query: '', genre: '', catalogState: '', selected: null,
  cart: new Map(), library: new Set(), authError: '', decline: false, processing: false,
});
let state = resetState();

function button(action, label, variant = '', disabled = false) {
  return '<button type="button" data-action="' + action + '" class="' + variant + '"' +
    (disabled ? ' disabled' : '') + '>' + label + '</button>';
}

function notice(message) {
  return message ? '<p class="notice" role="alert">' + message + '</p>' : '';
}

function auth() {
  const register = state.page === 'register';
  return '<section class="auth box stack"><div><span class="screen-id">' + (register ? 'S-01-R' : 'S-01') +
    '</span><h1>' + (register ? 'Реєстрація' : 'Вхід') + '</h1><p>Демодані для перегляду прототипу</p></div>' +
    '<form class="stack" data-auth><label>Email<input name="email" type="email" value="buyer@example.test" required></label>' +
    '<label>Пароль<span class="inline"><input name="password" type="password" value="demo-pass" required>' +
    button('toggle-password', 'Показати') + '</span></label>' +
    (register ? '<label>Підтвердження пароля<input name="confirm" type="password" value="demo-pass" required></label>' : '') +
    notice(state.authError) + '<button class="primary" type="submit">' + (register ? 'Створити акаунт' : 'Увійти') + '</button></form>' +
    button(register ? 'login' : 'register', register ? 'Повернутися до входу' : 'Створити обліковий запис') + '</section>';
}

function gameCard(game, library = false) {
  return '<article class="card"><div class="cover">' + game.name + '</div><div><h3>' +
    game.name + '</h3><p>' + game.genre + '</p></div><div class="split"><strong>' +
    (library ? 'У бібліотеці' : formatPrice(game.cents)) + '</strong>' +
    (library ? '' : button('details:' + game.id, 'Деталі')) + '</div></article>';
}

function library() {
  const hasGames = state.library.size > 0;
  const body = hasGames
    ? '<div class="cards">' + games.filter(game => state.library.has(game.id)).map(game => gameCard(game, true)).join('') + '</div>'
    : '<div class="box state"><h3>У бібліотеці ще немає ігор</h3><p>Придбані ігри з’являться тут після успішної оплати.</p></div>';
  return '<section class="workspace stack"><div class="heading"><div><span class="screen-id">' +
    (hasGames ? 'S-03-B' : 'S-03-A') + '</span><h1>Профіль</h1></div>' +
    button('catalog', 'Магазин', 'primary') + '</div><h2>Моя бібліотека</h2>' + body + '</section>';
}

function catalogResults() {
  const shown = games.filter(game =>
    (!state.genre || game.genre === state.genre) && game.name.toLowerCase().includes(state.query.trim().toLowerCase()));
  const id = state.catalogState === 'error' ? 'S-02-C' :
    state.catalogState === 'loading' ? 'S-02-L' : shown.length ? 'S-02-A' : 'S-02-B';
  document.querySelector('#catalog-id').textContent = id;
  const result = document.querySelector('#results');
  if (state.catalogState === 'loading') {
    result.innerHTML = '<div class="box state" role="status"><h2>Завантаження каталогу…</h2></div>';
  } else if (state.catalogState === 'error') {
    result.innerHTML = '<div class="box state"><h2>Не вдалося завантажити каталог</h2>' +
      button('catalog', 'Спробувати ще раз') + '</div>';
  } else if (!shown.length) {
    result.innerHTML = '<div class="box state"><h2>Нічого не знайдено</h2><p>Спробуйте змінити пошуковий запит.</p>' +
      button('clear-search', 'Очистити пошук') + '</div>';
  } else {
    result.innerHTML = '<div class="cards">' + shown.map(game => gameCard(game)).join('') + '</div>';
  }
}

function catalog() {
  const quantity = Array.from(state.cart.values()).reduce((sum, count) => sum + count, 0);
  return '<section class="workspace"><div class="heading"><div><span class="screen-id" id="catalog-id"></span>' +
    '<h1>Магазин ігор</h1></div><div class="inline">' + button('library', 'Профіль') +
    button('cart', 'Кошик (' + quantity + ')', 'primary') + '</div></div><div class="filters">' +
    '<label>Пошук<input id="search" placeholder="Введіть назву гри"></label>' +
    '<label>Жанр<select id="genre"><option value="">Усі жанри</option><option>Пригоди</option>' +
    '<option>Стратегія</option></select></label></div><div id="results" aria-live="polite"></div></section>';
}

function total() {
  return Array.from(state.cart.entries()).reduce((sum, [id, qty]) => sum + gameById(id).cents * qty, 0);
}

function modal() {
  let id, title, body;
  if (state.modal === 'details') {
    id = 'M-01';
    title = state.selected.name;
    body = '<div class="cover">' + title + '</div><p>' + state.selected.genre + '</p><div class="split"><strong>' +
      formatPrice(state.selected.cents) + '</strong>' + button('add', 'До кошика', 'primary') + '</div>';
  } else if (state.modal === 'cart') {
    id = 'M-02';
    title = 'Кошик';
    body = state.cart.size ? Array.from(state.cart.entries()).map(([gameId, qty]) => {
      const game = gameById(gameId);
      return '<div class="line-item"><div><strong>' + game.name + '</strong><p>' + formatPrice(game.cents) +
        '</p></div><label>Кількість<input type="number" min="1" max="99" data-qty="' + game.id +
        '" value="' + qty + '"></label>' + button('remove:' + game.id, 'Видалити') + '</div>';
    }).join('') : '<p>Кошик порожній</p>';
    body += '<div class="cart-footer"><p class="total">Разом ' + formatPrice(total()) + '</p>' +
      button('checkout', 'До оплати', 'primary', !state.cart.size) + '</div>';
  } else {
    id = 'M-03';
    title = 'Оплата';
    body = '<div class="split"><strong>До сплати</strong><p class="total">' + formatPrice(total()) + ' USD</p></div>' +
      '<div class="box"><strong>Демонстраційна картка</strong><p>Бонуси 0 · Симуляція платежу</p></div>' +
      notice(state.decline ? 'Оплату відхилено. Спробуйте ще раз або поверніться до кошика.' : '') +
      '<div class="split">' + button('cancel', 'Скасувати', '', state.processing) +
      button('confirm', state.processing ? 'Обробка…' : 'Підтвердити', 'primary', state.processing) + '</div>';
  }
  return '<div class="overlay"><section class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">' +
    '<div class="split"><div><span class="screen-id">' + id + '</span><h2 id="dialog-title">' + title +
    '</h2></div>' + button('close', 'Закрити', '', state.processing) + '</div>' + body + '</section></div>';
}

function render(focusDialog = false) {
  const markup = state.page === 'catalog' ? catalog() : state.page === 'library' ? library() : auth();
  root.innerHTML = '<div id="surface"' + (state.modal ? ' inert' : '') + '>' + markup + '</div>' +
    (state.modal ? modal() : '');
  if (state.page === 'catalog') {
    document.querySelector('#search').value = state.query;
    document.querySelector('#genre').value = state.genre;
    catalogResults();
  }
  document.querySelector('.tools').inert = Boolean(state.modal);
  if (focusDialog) document.querySelector('.dialog button')?.focus();
}

function demoModal(kind) {
  state.page = 'catalog';
  state.catalogState = '';
  state.modal = kind;
  state.cart.clear();
  if (kind === 'checkout') {
    state.cart.set('atlas', 1);
    state.decline = true;
  }
  render(true);
}

document.addEventListener('submit', event => {
  if (!event.target.matches('[data-auth]')) return;
  event.preventDefault();
  const values = new FormData(event.target);
  const error = state.page === 'register' && values.get('password') !== values.get('confirm')
    ? 'Паролі мають збігатися.'
    : state.page === 'login' && values.get('password') !== 'demo-pass' ? 'Неправильний пароль.' : '';
  state.authError = error;
  if (!error) state.page = 'library';
  render();
});

document.addEventListener('input', event => {
  if (event.target.id !== 'search') return;
  state.query = event.target.value;
  catalogResults();
});

document.addEventListener('change', event => {
  if (event.target.id === 'genre') {
    state.genre = event.target.value;
    catalogResults();
  }
  if (event.target.matches('[data-qty]')) {
    const amount = Math.min(99, Math.max(1, Math.trunc(Number(event.target.value) || 1)));
    state.cart.set(event.target.dataset.qty, amount);
    event.target.value = amount;
    document.querySelector('.cart-footer .total').textContent = 'Разом ' + formatPrice(total());
  }
});

document.addEventListener('click', event => {
  const target = event.target.closest('[data-action]');
  if (!target || target.disabled) return;
  const [action, id] = target.dataset.action.split(':');
  switch (action) {
    case 'toggle-password': {
      const password = root.querySelector('[name=password]');
      password.type = password.type === 'password' ? 'text' : 'password';
      target.textContent = password.type === 'password' ? 'Показати' : 'Приховати';
      return;
    }
    case 'reset': state = resetState(); break;
    case 'login':
    case 'register':
    case 'library':
    case 'catalog':
      state.page = action;
      state.modal = '';
      state.catalogState = '';
      state.authError = '';
      break;
    case 'catalog-loading':
    case 'catalog-error':
      state.page = 'catalog';
      state.catalogState = action.slice('catalog-'.length);
      break;
    case 'cart-empty': demoModal('cart'); return;
    case 'payment-decline': demoModal('checkout'); return;
    case 'clear-search':
      state.query = '';
      document.querySelector('#search').value = '';
      catalogResults();
      document.querySelector('#search').focus();
      return;
    case 'details': state.selected = gameById(id); state.modal = 'details'; break;
    case 'add':
      state.cart.set(state.selected.id, (state.cart.get(state.selected.id) ?? 0) + 1);
      state.modal = '';
      break;
    case 'cart': state.modal = 'cart'; break;
    case 'remove': state.cart.delete(id); break;
    case 'checkout': state.modal = 'checkout'; state.decline = false; break;
    case 'cancel': state.modal = 'cart'; break;
    case 'close': state.modal = state.modal === 'checkout' ? 'cart' : ''; break;
    case 'confirm':
      state.processing = true;
      render();
      setTimeout(() => {
        for (const gameId of state.cart.keys()) state.library.add(gameId);
        state.cart.clear();
        state.processing = false;
        state.modal = '';
        state.page = 'library';
        render();
      }, 650);
      return;
  }
  render(Boolean(state.modal));
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !state.modal || state.processing) return;
  state.modal = state.modal === 'checkout' ? 'cart' : '';
  render(Boolean(state.modal));
});

render();
