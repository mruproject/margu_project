'use strict'

document.addEventListener("DOMContentLoaded", () => {
	console.log('Скрипт отработал корректно')

	// Инициализируем переменную — получаем элемент хедера
	const header = document.querySelector('header');
    
	if (header) {  // проверяем существование элемента в DOM
		console.log('Константа header существует');

		// 1 При загрузке страницы установить слушатель на событие scroll.
		// 2 При каждом скролле проверять текущую позицию скролла.
		// 3 Если пользователь проскроллил вниз больше чем на 10 пикселей:
		//   3.1 Добавить класс подложки (например, .scrolled) к хедеру.
		// 4 Если пользователь вернулся к верху страницы:
		//   4.1 Удалить этот класс.
		// 5 Проверить результат через console.log().

		const heightHeader = header.offsetHeight; 

		// Устанавливаем слушатель события scroll
		window.addEventListener('scroll', () => {
			// Получаем текущую вертикальную позицию прокрутки
			const scrollPosition = window.scrollY;

			// Проверяем значение позиции скролла
			console.log('Scroll position:', scrollPosition);

			if (scrollPosition > heightHeader) {
				header.classList.add('scrolled');
			} else {
				// Иначе удаляем класс
				header.classList.remove('scrolled');
			}
		});
	}

  // Плавный скролл по якорям в меню
  const navLinks = document.querySelectorAll('.nav__menu-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });


  // Анимация элементов при появлении в области видимости
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.services__card, .case-studies__item, .team__member, .working-process__step'
  );
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

	// Accordion для шагов рабочего процесса
  const processSteps = document.querySelectorAll('.working-process__step');
  
  processSteps.forEach(step => {
    step.addEventListener('click', function() {
      // Убираем активный класс со всех шагов
      processSteps.forEach(s => s.classList.remove('working-process__step--active'));
      
      // Добавляем активный класс на кликнутый шаг
      this.classList.add('working-process__step--active');
    });
  });



	const titles = [];

	document.querySelectorAll('.services__title-block').forEach(block => {
		const part1 = block.children[0]?.textContent.trim() || '';
		const part2 = block.children[1]?.textContent.trim() || '';
		titles.push(`${part1} ${part2}`);
	});

	if (titles.length === 0) {
		console.log("Список заголовков услуг пустой");
	} else {
		console.log("Список заголовков услуг:");
		console.log(titles);
	}


	const scrollTopBtn = document.getElementById("scroll_top_button");

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > header.offsetHeight ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });



	const headerBlock = document.querySelector('#header');

	// if (headerBlock) {
	// 	const nav = headerBlock.querySelector('.nav');

	// 	// Данные пунктов меню
	// 	const menuItems = [
	// 		{ text: 'About us', href: '#' },
	// 		{ text: 'Services', href: '#' },
	// 		{ text: 'Use Cases', href: '#' },
	// 		{ text: 'Pricing', href: '#' },
	// 		{ text: 'Blog', href: '#' },
	// 		{ text: 'Request a quote', href: '#' }
	// 	];

	// 	// Создаем список <ul>
	// 	const menuList = document.createElement('ul');
	// 	menuList.className = 'nav__menu';

	// 	// Проходим по массиву и создаём <li> с <a>
	// 	menuItems.forEach(item => {
	// 		const li = document.createElement('li');
	// 		li.className = 'nav__menu-item';

	// 		const link = document.createElement('a');
	// 		link.className = 'nav__menu-link';
	// 		link.href = item.href;
	// 		link.textContent = item.text;

	// 		li.appendChild(link);
	// 		menuList.appendChild(li);
	// 	});

	// 	// Вставляем меню в <nav>
	// 	nav.appendChild(menuList);
	// }

	const preloader = document.querySelector('.preloader');
	const content = document.querySelector('.content');
	if (preloader && content) {
			setTimeout(() => {
					preloader.style.opacity = '0';
					preloader.style.visibility = 'hidden';

					content.style.display = 'block';

					preloader.remove();
			}, 1500); 
	}

	if (headerBlock) {
		const nav = header.querySelector('.nav');

		fetch("data.json") 
			.then(response => {
				if (!response.ok) {
					throw new Error('Ошибка загрузки меню');
				}
				return response.json();
			})
			.then(menuItems => {
				const menuList = document.createElement('ul');
				menuList.className = 'nav__menu';

				menuItems.forEach(item => {
					const li = document.createElement('li');
					li.className = 'nav__menu-item';

					const a = document.createElement('a');
					a.className = 'nav__menu-link';
					a.href = item.href;
					a.textContent = item.text;

					li.appendChild(a);
					menuList.appendChild(li);
				});

				nav.appendChild(menuList);
			})
			.catch(error => {
				console.error('Ошибка при создании меню:', error);
			});
	}



	const form = document.querySelector('.contact__form');
  if (!form) return;

  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  const nameInput = form.querySelector('#name');
  const contactChoiceRadios = form.querySelectorAll('input[name="contact-choice"]');

  // Восстановление данных из localStorage
  const savedData = JSON.parse(localStorage.getItem('contactFormData') || '{}');
  for (const [key, value] of Object.entries(savedData)) {
    if (key === 'contact-choice') {
      const radio = form.querySelector(`input[name="contact-choice"][value="${value}"]`);
      if (radio) radio.checked = true;
    } else {
      const input = form.elements.namedItem(key);
      if (input) input.value = value;
    }
  }

  // Сохранение данных в localStorage при вводе
  form.addEventListener('input', () => {
    const data = {};
    const selectedRadio = form.querySelector('input[name="contact-choice"]:checked');
    if (selectedRadio) data['contact-choice'] = selectedRadio.value;

    for (const element of form.elements) {
      if (element.name && element.type !== 'radio') {
        data[element.name] = element.value;
      }
    }

    localStorage.setItem('contactFormData', JSON.stringify(data));
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function clearErrors() {
    const errorElems = form.querySelectorAll('.error-message');
    errorElems.forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  }

  function showError(input, message) {
    input.classList.add('input-error');
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.fontSize = '0.85em';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, 'Введите корректный Email');
      valid = false;
    }

    if (messageInput.value.trim().length === 0) {
      showError(messageInput, 'Введите сообщение');
      valid = false;
    }

    const selectedChoice = form.querySelector('input[name="contact-choice"]:checked').value;
    if (selectedChoice === 'get-quote' && nameInput.value.trim().length === 0) {
      showError(nameInput, 'Введите имя для запроса');
      valid = false;
    }

    if (!valid) return;

    alert('Сообщение успешно отправлено!');

    form.reset();
    localStorage.removeItem('contactFormData');
  });

	
	const swiper = new Swiper('.swiper', {
		// Кол-во видимых слайдов
		slidesPerView: 1,
		spaceBetween: 20,

		// Навигация (стрелки)
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		// Пагинация (точки)
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},

		// Автопрокрутка (по желанию)
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},

		// Адаптив
		breakpoints: {
			640: {
				slidesPerView: 2,
			},
			960: {
				slidesPerView: 3,
			},
		},
	});


});
