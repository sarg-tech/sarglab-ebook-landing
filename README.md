# SargLab — IA para quem tem trabalho pra fazer

Landing page oficial de captação do e-book gratuito **“IA para quem tem trabalho pra fazer”**, da **SargLab**, um produto SARGTECH.

🔗 **Landing em produção:**  
https://mrgallucci.github.io/sarglab-ebook-landing/

## Sobre o projeto

A landing foi criada para apresentar o Método CLARO, captar interessados e liberar o e-book gratuito após o registro do lead.

O fluxo funciona assim:

**Landing → API FastAPI → CRM / Supabase → liberação do e-book**

Este repositório contém o frontend público da landing.  
O backend e o CRM são mantidos separadamente.

## Funcionalidades

- Landing page responsiva
- Formulário de captura de leads
- Nome, e-mail e área profissional obrigatórios
- WhatsApp opcional
- Consentimento para contato
- Identificação da origem do acesso
- Integração com API pública em FastAPI
- Registro do lead no CRM
- Persistência dos dados no Supabase / PostgreSQL
- Liberação automática do e-book após cadastro
- Novo download permitido para e-mails já cadastrados
- Política de Privacidade
- Termos de Uso
- Menu responsivo para desktop e mobile

## E-book gratuito

**IA para quem tem trabalho pra fazer**

O material possui 12 páginas e apresenta:

- Método CLARO
- 30 prompts práticos
- exemplos de aplicação no trabalho
- comparação entre prompts vagos e estruturados
- Semáforo de Segurança
- orientações para revisar respostas de IA
- caminhos para continuar praticando com a SargLab

### Método CLARO

**C — Contexto e papel**  
**L — Linha de chegada**  
**A — Amarras**  
**R — Roteiro de saída**  
**O — Olhar crítico**

## Tecnologias

### Frontend

- HTML5
- CSS3
- JavaScript

### Infraestrutura e integrações

- GitHub Pages
- FastAPI
- Render
- PostgreSQL
- Supabase

## Estrutura do projeto

```text
sarglab-ebook-landing/
├── assets/
│   ├── downloads/
│   │   └── sarglab-ia-para-quem-tem-trabalho-pra-fazer.pdf
│   ├── images/
│   │   ├── ebook/
│   │   └── sarglab/
│   └── style/
│       └── style.css
├── script/
│   └── main.js
├── index.html
├── privacidade.html
├── termos.html
└── README.md
