const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.site-header');
const menuItems = document.querySelectorAll('.nav-links a');
const currentYear = document.querySelector('#current-year');

const ebookForm = document.querySelector('#ebook-form');
const formMessage = document.querySelector('#form-message');

/*
=========================================
CONFIGURAÇÃO SARGLAB
=========================================
LOCAL:
http://127.0.0.1:8000

Quando publicarmos a API, alteramos apenas
API_BASE_URL.
*/

const API_BASE_URL = 'https://gestao-inteligente-starter.onrender.com';

const API_URL =
  `${API_BASE_URL}/api/public/leads/ebook`;

const EBOOK_URL =
  './assets/downloads/sarglab-ia-para-quem-tem-trabalho-pra-fazer.pdf';


/* =========================================
   MENU
========================================= */

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.setAttribute(
    'aria-expanded',
    'false'
  );

  menuToggle.setAttribute(
    'aria-label',
    'Abrir menu'
  );

  navLinks.classList.remove('is-open');

  document.body.classList.remove(
    'menu-open'
  );
}


function toggleMenu() {
  if (!menuToggle || !navLinks) return;

  const isOpen =
    menuToggle.getAttribute(
      'aria-expanded'
    ) === 'true';

  menuToggle.setAttribute(
    'aria-expanded',
    String(!isOpen)
  );

  menuToggle.setAttribute(
    'aria-label',
    isOpen
      ? 'Abrir menu'
      : 'Fechar menu'
  );

  navLinks.classList.toggle(
    'is-open',
    !isOpen
  );

  document.body.classList.toggle(
    'menu-open',
    !isOpen
  );
}


menuToggle?.addEventListener(
  'click',
  toggleMenu
);


menuItems.forEach((item) => {
  item.addEventListener(
    'click',
    closeMenu
  );
});


document.addEventListener(
  'keydown',
  (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  }
);


window.addEventListener(
  'resize',
  () => {
    if (window.innerWidth > 780) {
      closeMenu();
    }
  }
);


/* =========================================
   HEADER
========================================= */

function updateHeader() {
  header?.classList.toggle(
    'scrolled',
    window.scrollY > 8
  );
}


window.addEventListener(
  'scroll',
  updateHeader,
  {
    passive: true
  }
);


updateHeader();


if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}


/* =========================================
   ATRIBUIÇÃO / UTM
========================================= */

function getUrlParams() {
  return new URLSearchParams(
    window.location.search
  );
}


function getReferrerSource() {
  const params = getUrlParams();

  const utmSource =
    params.get('utm_source');

  if (utmSource) {
    return utmSource
      .trim()
      .toLowerCase();
  }

  if (!document.referrer) {
    return 'direto';
  }

  try {
    const hostname =
      new URL(
        document.referrer
      ).hostname.toLowerCase();

    if (
      hostname.includes(
        'instagram'
      )
    ) {
      return 'instagram';
    }

    if (
      hostname.includes(
        'linkedin'
      )
    ) {
      return 'linkedin';
    }

    if (
      hostname.includes(
        'facebook'
      )
    ) {
      return 'facebook';
    }

    if (
      hostname.includes(
        'google'
      )
    ) {
      return 'google';
    }

    return hostname;

  } catch {
    return 'referencia';
  }
}


function getCampaign() {
  const params = getUrlParams();

  return (
    params.get(
      'utm_campaign'
    ) ||
    'ebook_sarglab_lancamento'
  );
}


/* =========================================
   FORMULÁRIO
========================================= */

function setFormMessage(
  message,
  type = 'info'
) {
  if (!formMessage) return;

  formMessage.innerHTML = '';

  const text =
    document.createElement('span');

  text.textContent = message;

  formMessage.appendChild(text);

  formMessage.dataset.type = type;
}


function normalizePhone(value) {
  return String(value || '')
    .replace(/\D/g, '');
}


function getLeadPayload(form) {
  const formData = new FormData(form);

  const whatsapp =
    normalizePhone(
      formData.get('whatsapp') || ''
    );

  return {
    nome:
      formData
        .get('nome')
        ?.trim(),

    email:
      formData
        .get('email')
        ?.trim()
        .toLowerCase(),

    whatsapp:
      whatsapp || null,
    
    area_profissional:
    formData.get('area'),

    origem:
      getReferrerSource(),

    consentimento:
      formData.get('consentimento') === 'on'
  };
}


function validateLead(payload) {

  if (!payload.nome) {
    return 'Informe seu nome.';
  }

  if (!payload.email) {
    return 'Informe seu e-mail.';
  }

  if (
    !payload.area_profissional
  ) {
    return (
      'Selecione sua área profissional.'
    );
  }

  if (
    !payload.consentimento
  ) {
    return (
      'É necessário aceitar o consentimento para receber o guia.'
    );
  }

  return null;
}


/* =========================================
   LIBERAÇÃO DO E-BOOK
========================================= */

function showDownloadLink() {

  if (!formMessage) return;

  formMessage.innerHTML = '';

  const message =
    document.createElement('span');

  message.textContent =
    'Cadastro realizado! Seu guia está pronto. ';

  const link =
    document.createElement('a');

  link.href = EBOOK_URL;

  link.textContent =
    'Clique aqui se o download não iniciar.';

  link.setAttribute(
    'download',
    ''
  );

  link.classList.add(
    'download-link'
  );

  formMessage.appendChild(
    message
  );

  formMessage.appendChild(
    link
  );

  formMessage.dataset.type =
    'success';
}


function startEbookDownload() {

  const link =
    document.createElement('a');

  link.href = EBOOK_URL;

  link.download = '';

  document.body.appendChild(
    link
  );

  link.click();

  link.remove();
}


/* =========================================
   ENVIO PARA O CRM
========================================= */

async function submitLead(event) {

  event.preventDefault();

  if (!ebookForm) return;

  const submitButton =
    ebookForm.querySelector(
      'button[type="submit"]'
    );

  const payload =
    getLeadPayload(
      ebookForm
    );

  const validationError =
    validateLead(
      payload
    );


  if (validationError) {

    setFormMessage(
      validationError,
      'error'
    );

    return;
  }


  try {

    if (submitButton) {

      submitButton.disabled =
        true;

      submitButton.textContent =
        'Preparando seu guia...';
    }


    setFormMessage(
      'Registrando seu acesso...',
      'info'
    );


    const response =
      await fetch(
        API_URL,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body:
            JSON.stringify(
              payload
            )
        }
      );


    /*
      Lead já existente.

      Não devemos impedir alguém
      de baixar novamente o material.
    */

    if (
      response.status === 409
    ) {

      showDownloadLink();

      ebookForm.reset();

      setTimeout(
        startEbookDownload,
        400
      );

      return;
    }


    if (!response.ok) {

      let detail = null;

      try {

        const errorData =
          await response.json();

        detail =
          errorData.detail;

      } catch {
        detail = null;
      }


      throw new Error(
        detail ||
        `Erro HTTP ${response.status}`
      );
    }


    await response.json();


    showDownloadLink();

    ebookForm.reset();


    setTimeout(
      startEbookDownload,
      400
    );


  } catch (error) {

    console.error(
      'Erro ao cadastrar lead:',
      error
    );


    setFormMessage(
      'Não foi possível liberar o guia agora. Confira sua conexão e tente novamente.',
      'error'
    );


  } finally {

    if (submitButton) {

      submitButton.disabled =
        false;

      submitButton.textContent =
        'Quero receber o guia gratuito';
    }
  }
}


ebookForm?.addEventListener(
  'submit',
  submitLead
);