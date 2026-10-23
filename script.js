/**
 * LUMA BIQUÍNIS — Script Interativo do Catálogo de Biquínis
 * WhatsApp Oficial: (19) 99783-2341
 */

document.addEventListener('DOMContentLoaded', () => {
  // Telefone padrão oficial da Luma Biquínis
  let sellerPhone = '5519997832341';
  let currentCategory = 'all';
  let currentSizeFilter = 'all';

  // Elementos do DOM
  const productCards = document.querySelectorAll('.product-card');
  const categoryButtons = document.querySelectorAll('.filter-pill');
  const sizeFilterButtons = document.querySelectorAll('.size-pill');
  const productCountText = document.getElementById('productCountText');
  const sellerPhoneInput = document.getElementById('sellerPhoneInput');
  const savePhoneBtn = document.getElementById('savePhoneBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const floatingWaBtn = document.getElementById('floatingWaBtn');

  // Formata apenas números para a URL do WhatsApp
  function cleanPhoneNumber(phoneStr) {
    let cleaned = phoneStr.replace(/\D/g, '');
    if (cleaned.length === 10 || cleaned.length === 11) {
      cleaned = '55' + cleaned;
    }
    return cleaned;
  }

  // Atualiza o link do WhatsApp de cada produto
  function updateProductWhatsAppLink(card) {
    const productName = card.dataset.name || 'Biquíni';
    const productPrice = card.dataset.price || '';
    const selectedSizeBadge = card.querySelector('.size-badge.available.selected') || card.querySelector('.size-badge.available');
    let selectedSize = 'Tamanho Único';
    if (selectedSizeBadge) {
      selectedSize = selectedSizeBadge.dataset.size;
    } else if (card.dataset.sizes === 'UNICO') {
      selectedSize = 'Tamanho Único';
    } else if (card.dataset.sizes) {
      selectedSize = card.dataset.sizes;
    }
    const ctaButton = card.querySelector('.btn-reserve-whatsapp');

    if (!ctaButton) return;

    const message = `Olá, Luma Biquínis! ☀️ Gostaria de reservar o seguinte modelo do catálogo:\n\n👙 *Modelo:* ${productName}\n📏 *Tamanho:* ${selectedSize}\n🏷️ *Valor:* ${productPrice}\n\nVocê poderia confirmar a disponibilidade e o prazo de entrega? Muito obrigada!`;
    const cleanPhone = cleanPhoneNumber(sellerPhone);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    ctaButton.href = waUrl;
  }

  // Atualiza todos os links do WhatsApp na página
  function updateAllWhatsAppLinks() {
    productCards.forEach((card) => {
      updateProductWhatsAppLink(card);
    });

    const cleanPhone = cleanPhoneNumber(sellerPhone);
    if (floatingWaBtn) {
      floatingWaBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Olá! ☀️ Estou no catálogo da Luma Biquínis e gostaria de ajuda para escolher meu biquíni.")}`;
    }

    const headerWaBtn = document.querySelector('.header-whatsapp-btn');
    if (headerWaBtn) {
      headerWaBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Olá! Gostaria de falar com o atendimento da Luma Biquínis.")}`;
    }
  }

  // Atualização inicial
  updateAllWhatsAppLinks();

  // 1. Clique nos botões de tamanho
  productCards.forEach((card) => {
    const sizeBadges = card.querySelectorAll('.size-badge.available');
    
    sizeBadges.forEach((badge) => {
      badge.addEventListener('click', (e) => {
        e.preventDefault();
        sizeBadges.forEach((b) => b.classList.remove('selected'));
        badge.classList.add('selected');
        updateProductWhatsAppLink(card);
      });
    });
  });

  // 2. Filtragem de produtos por Modelo e Tamanho
  function applyFilters() {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const cardCategory = card.dataset.category;
      const cardSizes = card.dataset.sizes ? card.dataset.sizes.split(',') : [];

      const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchesSize = currentSizeFilter === 'all' || cardSizes.includes(currentSizeFilter);

      if (matchesCategory && matchesSize) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (productCountText) {
      productCountText.textContent = `Exibindo ${visibleCount} de ${productCards.length} biquínis exclusivos`;
    }
  }

  // Filtros de Modelo
  categoryButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      applyFilters();
    });
  });

  // Filtros de Tamanho
  sizeFilterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeFilterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentSizeFilter = btn.dataset.size;
      applyFilters();
    });
  });

  // 3. Atualizador de Telefone do WhatsApp
  if (savePhoneBtn && sellerPhoneInput) {
    savePhoneBtn.addEventListener('click', () => {
      const rawInput = sellerPhoneInput.value.trim();
      const cleaned = cleanPhoneNumber(rawInput);

      if (cleaned.length >= 10) {
        sellerPhone = cleaned;
        updateAllWhatsAppLinks();
        
        const originalText = savePhoneBtn.textContent;
        savePhoneBtn.textContent = '✓ Aplicado!';
        savePhoneBtn.style.backgroundColor = '#1E7E34';

        setTimeout(() => {
          savePhoneBtn.textContent = originalText;
          savePhoneBtn.style.backgroundColor = '';
        }, 2000);
      } else {
        alert('Por favor, informe um número válido com DDD (exemplo: 19 99783-2341).');
      }
    });
  }

  // 4. Favoritos
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');
  wishlistButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('favorited');
    });
  });

  // 5. Menu Mobile
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
});
