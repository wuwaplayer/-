
  /* ---------- 1. 滚动时给导航栏加毛玻璃 ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 移动端菜单开关 ---------- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  // 点任意链接后自动收起菜单
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 3. 生成飘落花瓣 ---------- */
  const layer = document.getElementById('petals');
  const glyphs = ['❀', '✿', '❁', '✦'];
  const count = window.innerWidth < 640 ? 9 : 16;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = (10 + Math.random() * 16) + 'px';
    p.style.color = 'rgba(230, 211, 163,' + (0.18 + Math.random() * 0.45).toFixed(2) + ')';
    p.style.animationDuration = (13 + Math.random() * 16) + 's';
    p.style.animationDelay = (-Math.random() * 26) + 's';   // 负延迟 → 一打开就分布在整个屏幕
    p.style.setProperty('--drift', (Math.random() * 160 - 80).toFixed(0) + 'px');
    layer.appendChild(p);
  }

  /* ---------- 4. 滚动时高亮当前导航项 ---------- */
  const sections = [...document.querySelectorAll('section[id], main[id]')];
  const linkMap = new Map(
    [...navLinks.querySelectorAll('a')].map(a => [a.getAttribute('href').slice(1), a])
  );

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      linkMap.forEach(a => a.classList.remove('active'));
      linkMap.get(entry.target.id)?.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(s => io.observe(s));

  /* ---------- 5. 图鉴图片：鼠标悬停/点击更新左侧预览 ---------- */
  const galleryCards = document.querySelectorAll('.gallery-card');
  const previewImage = document.getElementById('galleryPreviewImage');
  const previewTitle = document.getElementById('galleryPreviewTitle');

  const syncPreview = (card) => {
    galleryCards.forEach(item => item.classList.remove('selected'));
    card.classList.add('selected');

    const img = card.querySelector('img');
    const title = card.dataset.title || card.querySelector('span')?.textContent || '未命名';

    previewImage.src = img.src;
    previewImage.alt = title;
    previewTitle.textContent = title;
  };

  galleryCards.forEach(card => {
    const label = card.querySelector('span');
    const title = card.dataset.title || label?.textContent || '未命名';
    if (label) label.textContent = title;

    card.addEventListener('mouseenter', () => syncPreview(card));
    card.addEventListener('click', () => syncPreview(card));
  });
