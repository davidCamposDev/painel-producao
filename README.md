# 🏭 Painel de Produção

Dashboard web para acompanhamento em tempo real do progresso de turnos de produção industrial, integrado com API REST desenvolvida em Java Spring Boot.

> 🔗 **[Acesse o projeto ao vivo](https://painel-producao-mocha.vercel.app)** &nbsp;|&nbsp; 🔗 **[Backend (controle-producao)](https://github.com/davidCamposDev/controle-producao)**

---

## 📸 Preview

<!-- Substitua pelo caminho do seu print -->
![Preview do Painel](./public/preview.png)

---

## 🚀 Funcionalidades

- 📊 Visualização do progresso de produção por turno em tempo real
- 📋 Apontamento de produção por operador/máquina
- 📈 Indicadores de desempenho (meta x realizado)
- 🔄 Integração com API REST Java Spring Boot
- 📱 Interface responsiva com Tailwind CSS

---

## 🛠️ Tecnologias

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Backend (repositório separado)**

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white)

**Deploy**

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🏗️ Arquitetura

```
painel-producao (Frontend - React)
        │
        │  HTTP / REST API
        ▼
controle-producao (Backend - Java Spring Boot)
        │
        ▼
     Banco de Dados
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- Backend [controle-producao](https://github.com/davidCamposDev/controle-producao) rodando na porta `8080`

### Instalação

```bash
# Clone o repositório
git clone https://github.com/davidCamposDev/painel-producao.git

# Entre na pasta
cd painel-producao

# Instale as dependências
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8080
```

### Executando

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

## 👨‍💻 Autor

**David Campos**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/davidcamposdev)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/davidCamposDev)
