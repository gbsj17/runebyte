# RUNEbyte — Site Institucional

## 📋 Sobre este Projeto

Site institucional da RUNEbyte: landing page principal + três micro-sites de produto (RUNElog, RUNEfiscal, Fábrica de Software). HTML estático, sem build tool, sem framework — cada página é autossuficiente e roda direto no navegador.

- ✅ **Zero build step** — abre o `.html` direto, sem `npm install`
- ✅ **Tailwind CSS via CDN** (Play CDN), configurado inline em cada página
- ✅ **Dark/Light mode** persistido em `localStorage`
- ✅ **Ícones Lucide** via CDN
- ✅ **Mobile responsivo**
- ⚠️ **Sem CSS/JS compartilhado** — ver seção "Débito Técnico Conhecido" abaixo

---

## 🗂️ Estrutura Real do Projeto

```
runebyte-site/
├── index.html                        # Página principal (hero, ecossistema, contato)
├── runelog/
│   └── runelog.html                  # Micro-site do módulo RUNElog
├── runefiscal/
│   └── runefiscal.html               # Micro-site do módulo RUNEfiscal
├── fab.software/
│   └── detalhes-modulos.html         # Fábrica de Software (RUNEbot, RUNEauto, RUNEdocs, RUNEdash...)
│
└── assets/
    ├── images/
    │   ├── icon.png                  # Logo + favicon (todas as páginas)
    │   ├── hero/
    │   │   ├── runebyte-hero-dark.png    # Ilustração do hero (modo escuro, PNG com alpha)
    │   │   └── runebyte-hero-light.png   # Ilustração do hero (modo claro, PNG com alpha)
    │   └── mockup-{cte,mdfe,ciot} {claro,escuro}.png  # Screenshots dos painéis RUNEfiscal
    ├── fonts/
    │   └── Handel Gothic D Bold.otf   # Fonte extra — NÃO usada em nenhuma página no momento
    └── css/
        └── style.css                 # NÃO referenciado por nenhum HTML no momento
```

Cada `.html` é independente: tem seu próprio `<script>tailwind.config = {...}</script>`, seu próprio `<style>` com os overrides de modo claro, e seu próprio script de toggle de tema/menu mobile no final do `<body>`. Não existe `css/global.css` nem pasta `js/` — se você editar uma cor ou um comportamento, precisa repetir a edição nas 4 páginas.

---

## 🎨 Paleta de Cores

Definida via `tailwind.config.theme.extend.colors.brand` **em cada página**, com os mesmos valores:

```js
brand: {
  dark:        '#0a1424',  // Fundo escuro
  base:        '#152e50',  // Azul corporativo
  light:       '#2a4a7f',  // Azul bordas/hover
  accent:      '#f59e0b',  // Dourado/âmbar — destaque
  accentHover: '#d97706',
}
```

Cores extras usadas pontualmente nos cards de módulo: `emerald` (RUNEbot/RUNEfiscal), `rose` (RUNEdocs), `indigo` (RUNEdash), `purple`, `cyan`.

Para mudar uma cor da marca, edite o bloco `tailwind.config` nas **4 páginas** (não existe um só lugar — ver Débito Técnico).

---

## 🌗 Modo Claro/Escuro

Mecanismo (repetido em cada página, com pequenas variações):

1. Um `<script>` inline no `<head>` lê o `localStorage` e adiciona a classe `light` no `<html>` **antes** do resto renderizar (evita "flash" de tema errado).
2. Um botão `#theme-toggle` (desktop) e `#theme-toggle-mobile` chama uma função que faz `htmlElement.classList.toggle('dark'/'light', ...)` e salva no `localStorage`.
3. Um bloco `<style>` no `<head>` com seletores `html.light .minha-classe { ... !important }` sobrescreve as cores para o modo claro (Tailwind `dark:`/`dark:hidden` cuida do resto via `darkMode: 'class'`).

⚠️ **Chave de `localStorage` inconsistente** — problema conhecido:
- `index.html`, `runelog.html`, `detalhes-modulos.html` usam a chave **`theme`**
- `runefiscal.html` usa a chave **`runebyte-theme`**

Resultado: escolher "modo claro" no index e depois entrar no RUNEfiscal reseta pra escuro (e vice-versa). Precisa unificar a chave nas 4 páginas para corrigir.

---

## 🧩 Padrão de Imagem Dark/Light

Sempre que uma imagem muda entre os dois temas (mockups do RUNEfiscal, ilustração do hero), o padrão é dois `<img>` no mesmo lugar, um visível por vez via Tailwind:

```html
<img src="imagem-escuro.png" class="... dark:block hidden">
<img src="imagem-claro.png"  class="... dark:hidden block">
```

Use esse padrão para qualquer imagem nova que precise variar por tema.

---

## 🎠 Carrossel do RUNEfiscal (hero do index.html)

Na hero da página principal, a prévia do RUNEfiscal (`#runefiscal-carousel`) é um carrossel customizado (JS puro, sem lib):

- **Desktop (≥1024px):** mostra 2 mockups empilhados na vertical ao mesmo tempo; a cada 4s troca um dos dois pelo que não está em tela (nunca repete).
- **Tablet/Mobile:** mostra 1 mockup por vez, revezando entre os 3.
- Indicador: os 3 pontinhos no canto (`#runefiscal-dots`) acendem em verde-esmeralda indicando qual(is) mockup(s) está(ão) em exibição.
- Responsivo via `window.matchMedia('(min-width: 1024px)')`, sem CSS Grid — posicionamento via `style.top/height/opacity` direto em JS.

Lógica em `index.html`, procure por `// 3.1 Carrossel automático dos mockups do RUNEfiscal`.

---

## 📄 As 4 Páginas

1. **`index.html`** — Hero com ilustração + CTA, seção "Conhecer Ecossistema", preview do RUNElog, preview/carrossel do RUNEfiscal, grid de módulos da Fábrica de Software (RUNEbot, RUNEauto, RUNEdocs, RUNEdash, RUNEweb, RUNEautomação), formulário de contato (envia pra Google Sheets via `fetch`), footer.
2. **`runelog/runelog.html`** — Apresentação do módulo RUNElog (roteirização/logística), seção "sobre o desenvolvedor" com foto/avatar, CTAs de WhatsApp/LinkedIn.
3. **`runefiscal/runefiscal.html`** — Apresentação do módulo RUNEfiscal, com galerias reais dos 3 sub-módulos (CT-e, MDF-e, CIOT), cada um com hover (`group-hover:scale-105`, borda emerald).
4. **`fab.software/detalhes-modulos.html`** — Detalhes dos módulos avulsos da fábrica de software (automação, chatbot, docs, dashboards).

---

## ⚠️ Débito Técnico Conhecido

Coisas que funcionam, mas que valem revisão se o site crescer:

1. **CSS/JS 100% duplicado entre as 4 páginas.** Tailwind config, overrides de modo claro e script de tema são copiados manualmente em cada arquivo. Corrigir um bug de tema exige lembrar de replicar em 4 lugares (já aconteceu — ver item 2).
2. **Chave de tema inconsistente** entre `runefiscal.html` (`runebyte-theme`) e as outras 3 páginas (`theme`) — ver seção acima.
3. **`assets/css/style.css` e a fonte `Handel Gothic D` não são usados** por nenhuma página atualmente (órfãos).
4. Sem processo de build/minificação — aceitável no tamanho atual (4 páginas), mas não escala indefinidamente.

Nenhum desses é urgente, mas documentar evita "descobrir de novo" no futuro.

---

## 🚀 Deploy / Versionamento

- Repositório: [github.com/gbsj17/runebyte](https://github.com/gbsj17/runebyte), branch `main`.
- Fluxo de trabalho: cada mudança concluída vira um commit (granular, não em lote); `push` só acontece quando pedido explicitamente.
- Sem CI/CD configurado — é HTML estático, pode ser publicado direto (GitHub Pages, Netlify, qualquer servidor estático).

---

## 📄 Licença

© 2026 RUNEbyte. Desenvolvido por Genival Júnior.
