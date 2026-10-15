# RUNEbyte — Site Institucional

## 📋 Sobre este Projeto

Site institucional da RUNEbyte: landing page principal + três micro-sites de produto (RUNElog, RUNEfiscal, Fábrica de Software). HTML estático, sem framework — cada página roda direto no navegador. O único passo de build é gerar o CSS do Tailwind, e o resultado (`assets/css/tailwind.css`) fica versionado.

- ✅ **Abre o `.html` direto** — `npm install` só é necessário para regerar o CSS
- ✅ **Tailwind CSS 3 compilado pelo CLI** — config única em `tailwind.config.js`, saída minificada em `assets/css/tailwind.css`
- ✅ **Dark/Light mode** persistido em `localStorage`
- ✅ **Ícones Lucide** via CDN, versão fixada (`lucide@0.460.0`) — ao atualizar, troque nas 4 páginas
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
├── package.json                      # Scripts npm build:css / watch:css (devDependency: tailwindcss 3)
├── tailwind.config.js                # Config única do Tailwind: paleta brand, darkMode 'class', content
├── src/
│   └── tailwind.css                  # Entrada do Tailwind (@tailwind base/components/utilities)
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
        ├── tailwind.css              # GERADO por `npm run build:css` — não editar à mão; versionado
        └── style.css                 # NÃO referenciado por nenhum HTML no momento
```

Todas as páginas carregam o mesmo `assets/css/tailwind.css` (paleta e utilitários). Fora isso, cada `.html` é independente: tem seu próprio `<style>` com os overrides de modo claro e seu próprio script de toggle de tema/menu mobile no final do `<body>`. Não existe pasta `js/` — se você editar um override de tema ou um comportamento, precisa repetir a edição nas 4 páginas.

### 🛠️ Build do CSS (Tailwind)

```bash
npm install          # uma vez
npm run build:css    # gera assets/css/tailwind.css minificado
npm run watch:css    # regenera a cada alteração enquanto você edita
```

O Tailwind só gera as classes que encontra escritas por inteiro nos `.html` (o `content` do `tailwind.config.js` varre as 4 páginas, incluindo strings dentro dos `<script>`). **Sempre que adicionar/trocar uma classe Tailwind, rode `npm run build:css` e commite o `tailwind.css` junto.** Nunca monte classes por concatenação (`hover:border-${cor}`) — escreva a classe completa (ex.: campo `corHover: 'hover:border-cyan-500'` em `detalhes-modulos.html`).

---

## 🎨 Paleta de Cores

Definida em `tailwind.config.js` → `theme.extend.colors.brand`:

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

Para mudar uma cor da marca, edite `tailwind.config.js` e rode `npm run build:css`.

---

## 🌗 Modo Claro/Escuro

Mecanismo (repetido em cada página, com pequenas variações):

1. Um `<script>` inline no `<head>` lê o `localStorage` e adiciona a classe `light` no `<html>` **antes** do resto renderizar (evita "flash" de tema errado).
2. Um botão `#theme-toggle` (desktop) e `#theme-toggle-mobile` chama uma função que faz `htmlElement.classList.toggle('dark'/'light', ...)` e salva no `localStorage`.
3. Um bloco `<style>` no `<head>` com seletores `html.light .minha-classe { ... !important }` sobrescreve as cores para o modo claro (Tailwind `dark:`/`dark:hidden` cuida do resto via `darkMode: 'class'`).

As 4 páginas usam a mesma chave de `localStorage` (**`theme`**), então a preferência de modo claro/escuro persiste ao navegar entre elas. *(Corrigido em 2026-09-24 — `runefiscal.html` usava `runebyte-theme`; ver histórico do Git.)*

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

1. **`index.html`** — Hero com ilustração + CTA, seção "Conhecer Ecossistema", preview do RUNElog, preview/carrossel do RUNEfiscal, grid de módulos da Fábrica de Software (RUNEweb, RUNEbot, RUNEauto, RUNEdocs, RUNEdash, RUNEtrack), formulário de contato (envia pra Google Sheets via `fetch` em modo `no-cors` — a resposta é opaca, então o sucesso não é confirmável; tem honeypot anti-spam no campo `site` e aviso LGPD), footer.
2. **`runelog/runelog.html`** — Apresentação do módulo RUNElog (roteirização/logística), seção "sobre o desenvolvedor" com avatar de iniciais (sem foto ainda), CTA de demonstração via WhatsApp, CTAs de WhatsApp/LinkedIn. Ainda não há screenshot/vídeo real do RUNElog.
3. **`runefiscal/runefiscal.html`** — Apresentação do módulo RUNEfiscal, com galerias reais dos 3 sub-módulos (CT-e, MDF-e, CIOT), cada um com hover (`group-hover:scale-105`, borda emerald).
4. **`fab.software/detalhes-modulos.html`** — Detalhes dos módulos avulsos da fábrica de software (automação, chatbot, docs, dashboards).

---

## ⚠️ Débito Técnico Conhecido

Coisas que funcionam, mas que valem revisão se o site crescer:

1. **CSS/JS de tema duplicado entre as 4 páginas.** Overrides de modo claro e script de tema são copiados manualmente em cada arquivo (a config do Tailwind já é única). Corrigir um bug de tema exige lembrar de replicar em 4 lugares (já aconteceu — ver histórico do Git, chave de `localStorage` do tema).
2. **`assets/css/style.css` e a fonte `Handel Gothic D` não são usados** por nenhuma página atualmente (órfãos).
3. **Modo claro:** cores de destaque (âmbar, esmeralda, etc.) são remapeadas para tons 700 via `html.light .text-*-400 { ... !important }` em cada página, para manter contraste WCAG AA. Ao usar uma cor nova de destaque, adicione o override.
4. O `assets/css/tailwind.css` é gerado e versionado à mão: esquecer de rodar `npm run build:css` depois de usar uma classe nova faz ela não ter estilo em produção.

Nenhum desses é urgente, mas documentar evita "descobrir de novo" no futuro.

---

## 🚀 Deploy / Versionamento

- Repositório: [github.com/gbsj17/runebyte](https://github.com/gbsj17/runebyte), branch `main`.
- Fluxo de trabalho: cada mudança concluída vira um commit (granular, não em lote); `push` só acontece quando pedido explicitamente.
- Sem CI/CD configurado — é HTML estático, pode ser publicado direto (GitHub Pages, Netlify, qualquer servidor estático). Como o `assets/css/tailwind.css` já vai commitado, o deploy não precisa rodar `npm`.

---

## 📄 Licença

© 2026 RUNEbyte. Desenvolvido por Genival Júnior.
