(() => {
  // Находим все элементы меню
  const mobileMenus = document.querySelectorAll('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  // Проверяем наличие необходимых элементов
  if (!openMenuBtn || !closeMenuBtn || mobileMenus.length === 0) return;

  // Функция для переключения состояния меню
  const toggleMenu = () => {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true';

    // Обновляем атрибут для управления состоянием меню
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);

    // Переключаем класс 'is-open' для всех меню
    mobileMenus.forEach(menu => {
      menu.classList.toggle('is-open', !isMenuOpen);

      // Обработчики событий для якорных ссылок
      const anchors = menu.querySelectorAll('a[href*="#"]');
      anchors.forEach(anchor => {
        if (!isMenuOpen) {
          anchor.addEventListener("click", closeMenuOnAnchorClick);
        } else {
          anchor.removeEventListener("click", closeMenuOnAnchorClick);
        }
      });
    });

    // Переключаем блокировку прокрутки тела страницы
    const scrollLockMethod = !isMenuOpen ? 'disableBodyScroll' : 'enableBodyScroll';
    if (typeof bodyScrollLock !== 'undefined' && typeof bodyScrollLock[scrollLockMethod] === 'function') {
      bodyScrollLock[scrollLockMethod](document.body);
    }
  };

  // Функция для закрытия меню при клике на якорную ссылку
  const closeMenuOnAnchorClick = () => {
    openMenuBtn.setAttribute('aria-expanded', false);
    mobileMenus.forEach(menu => {
      menu.classList.remove('is-open');
    });
    if (typeof bodyScrollLock !== 'undefined' && typeof bodyScrollLock.enableBodyScroll === 'function') {
      bodyScrollLock.enableBodyScroll(document.body);
    }
  };

  // Добавляем обработчики событий для открытия и закрытия меню
  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Закрываем меню при изменении ширины окна до указанного брейкпоинта
  window.matchMedia('(min-width: 375px)').addEventListener('change', e => {
    if (!e.matches) return;

    mobileMenus.forEach(menu => {
      menu.classList.remove('is-open');
    });

    openMenuBtn.setAttribute('aria-expanded', false);
    if (typeof bodyScrollLock !== 'undefined' && typeof bodyScrollLock.enableBodyScroll === 'function') {
      bodyScrollLock.enableBodyScroll(document.body);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Найти все элементы с атрибутом data-menu-close
    const closeButtons = document.querySelectorAll('[data-menu-close]');

    // Добавить обработчик события клика для каждого элемента
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        mobileMenus.forEach(menu => {
          menu.classList.remove('is-open');
        });
        openMenuBtn.setAttribute('aria-expanded', false);
        if (typeof bodyScrollLock !== 'undefined' && typeof bodyScrollLock.enableBodyScroll === 'function') {
          bodyScrollLock.enableBodyScroll(document.body);
        }
      });
    });
  });
})();