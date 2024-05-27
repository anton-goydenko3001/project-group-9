(() => {
  // Находим все элементы меню
const mobileMenus = document.querySelectorAll('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');

  // Функция для переключения состояния меню
const toggleMenu = () => {
    const isMenuOpen = openMenuBtn.getAttribute('aria-expanded') === 'true';
    
    // Обновляем атрибут для управления состоянием меню
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    
    // Переключаем класс 'is-open' для всех меню
    mobileMenus.forEach(menu => {
    menu.classList.toggle('is-open', !isMenuOpen);
    });
    
    // Переключаем блокировку прокрутки тела страницы
    const scrollLockMethod = !isMenuOpen ? 'disableBodyScroll' : 'enableBodyScroll';
    bodyScrollLock[scrollLockMethod](document.body);

    // Обработчики событий для якорных ссылок
    mobileMenus.forEach(menu => {
    const anchors = menu.querySelectorAll('a[href*="#"]');
    if (anchors.length === 0) return;
    
    if (!isMenuOpen) {
        anchors.forEach(anchor => {
        anchor.addEventListener("click", toggleMenu);
        });
    } else {
        anchors.forEach(anchor => {
        anchor.removeEventListener("click", toggleMenu);
        });
    }
    });
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
    bodyScrollLock.enableBodyScroll(document.body);
});
})();
document.addEventListener('DOMContentLoaded', () => {
  // Найти все элементы с атрибутом data-menu-close
const closeButtons = document.querySelectorAll('[data-menu-close]');

  // Добавить обработчик события клика для каждого элемента
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Код для закрытия мобильного меню
    const menu = document.querySelector('.js-menu-container');
    if (menu) {
        menu.classList.remove('is-open'); 
    }
    });
});
});