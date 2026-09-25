# Guia de Contribuição — RUNEbyte Site

## 🎯 Contexto do Projeto

Este é um site **estático, sem build, com CSS/JS duplicado por página** (ver `README.md > Débito Técnico Conhecido`). As regras abaixo são para manter consistência **dentro desse formato atual** — não pressupõem um CSS/JS compartilhado que ainda não existe.

---

## 📝 Padrões de Código

### HTML / Classes

✅ **Bom** — usar as classes utilitárias do Tailwind e as cores da marca já definidas:
```html
<a class="px-6 py-2.5 rounded-xl bg-brand-accent text-brand-dark font-black hover:bg-brand-accentHover transition-all">
  Iniciar Projeto
</a>
```

❌ **Ruim** — cor hardcoded que já existe como token da marca:
```html
<a style="background:#f59e0b; color:#0a1424;">Iniciar Projeto</a>
```

**Regras:**
- Use `brand-dark` / `brand-base` / `brand-light` / `brand-accent` em vez de hex direto quando a cor já existe na paleta.
- Elementos que trocam de imagem por tema seguem o padrão `dark:block hidden` / `dark:hidden block` (ver README).
- Ícones usam Lucide via `<i data-lucide="nome-do-icone">` — depois de adicionar um novo, `lucide.createIcons()` já roda no load de cada página, não precisa chamar de novo.

### CSS (light-mode overrides)

Cada página tem um bloco `<style>` no `<head>` com regras `html.light .classe { ... !important }`. Ao adicionar uma nova regra:

✅ **Bom** — regra específica, só onde precisa:
```css
html.light .btn-ecosystem-hero {
  background-color: #152e50 !important;
  color: #f59e0b !important;
}
```

❌ **Ruim** — regra genérica demais que pode vazar pra outros elementos (já causou bug real: ver commit "Fix RUNEbot/RUNEauto icons staying colored on hover in light mode"):
```css
html.light .text-emerald-400 {
  color: #34d399 !important; /* isso também trava qualquer group-hover:text-white que dependa dessa cor base */
}
```

**Regra de ouro:** antes de adicionar um override `!important` de cor em `html.light`, procure (`grep`) todos os elementos que usam essa classe — um seletor genérico demais quebra hover/estado de outros componentes que você nem estava mexendo.

### JavaScript

O JS de cada página é inline, no final do `<body>`, sem módulos/import. Mantenha esse padrão por ora (não introduza `<script type="module">` numa página só, isso quebraria a consistência com as outras 3).

✅ **Bom:**
```javascript
function aplicarTema(tema) {
  const isDark = tema === 'dark';
  htmlElement.classList.toggle('dark', isDark);
  htmlElement.classList.toggle('light', !isDark);
  localStorage.setItem('theme', tema); // sempre a chave 'theme', nunca 'runebyte-theme'
}
```

**Regras:**
- Nomes de variáveis/funções em português (é o padrão já estabelecido no código — `aplicarTema`, `alternarTema`, `temaSalvo`) — não misture inglês no meio.
- Comentário curto (`// 3.1 Carrossel automático...`) antes de blocos de lógica não óbvia; não documente o que já é óbvio pelo nome da função.
- **Sempre use a chave `localStorage` `'theme'`** para tema — nunca `'runebyte-theme'` (é o bug documentado no README; não o repita em código novo).

---

## 🛠️ Como Adicionar uma Nova Seção/Componente

1. **Copie a estrutura de um card/seção parecida** já existente na mesma página (não invente uma abordagem nova de markup).
2. **Reaproveite as classes de cor da marca** (`brand-*`) em vez de introduzir uma cor nova, a menos que seja proposital (como os cards de módulo, que usam `emerald`/`rose`/`indigo`/`purple`/`cyan` de propósito para diferenciar visualmente).
3. Se a seção tem imagem que muda com o tema, siga o padrão `dark:block hidden` / `dark:hidden block`.
4. Se precisa de animação de hover, siga o padrão `group` no container + `group-hover:*` nos filhos (é o padrão usado em toda a Fábrica de Software e nas galerias do RUNEfiscal).

---

## 🧪 Testando Mudanças

O usuário deste projeto testa manualmente no navegador — **Claude não deve abrir o Browser pane nem subir servidor local pra verificar mudanças de UI**, isso é feito pelo usuário. Faça a edição, explique o que mudou, e pare aí.

Checklist mental antes de considerar algo pronto:
- [ ] A cor/classe usada já existe na paleta da marca, ou é intencionalmente uma cor extra (emerald/rose/etc)?
- [ ] Se mexeu em modo claro/escuro, a mudança faz sentido nos dois? (raciocinar sobre o CSS, não precisa abrir navegador)
- [ ] Se adicionou um override `html.light .algo`, checou (via grep) que não vai vazar pra outro componente que usa a mesma classe?
- [ ] Se a mudança é estrutural (ex: novo padrão de tema/JS), ela deveria estar nas outras 3 páginas também, ou é intencionalmente só nessa?

---

## 📋 Checklist para Commit

- [ ] Só a mudança pedida — sem refatoração "de brinde" não solicitada
- [ ] Sem `console.log()` esquecido
- [ ] Mensagem de commit em inglês, no formato usado no histórico (`git log` pra ver o padrão), assinada com a linha de co-autoria do Claude
- [ ] Se a mudança altera estrutura/arquitetura relevante (nova pasta, novo padrão, novo débito técnico), **atualize `README.md`, `QUICKSTART.md` e/ou `ARQUIVO-ESTRUTURA.txt`** no mesmo commit ou logo em seguida

---

## 🎨 Alterando a Paleta de Cores

Não existe "um só lugar" — edite o bloco `tailwind.config.theme.extend.colors.brand` nas 4 páginas (`index.html`, `runelog/runelog.html`, `runefiscal/runefiscal.html`, `fab.software/detalhes-modulos.html`). Ver `QUICKSTART.md` pra o snippet exato.

---

## 🤝 Fluxo de Trabalho com Git

- Commit granular: uma mudança lógica concluída = um commit, feito automaticamente sem precisar pedir.
- `git push` só acontece quando pedido explicitamente.
- Nunca `--force`, nunca `--no-verify`, nunca commit de arquivo que pareça credencial/segredo.

---

## 🎓 Princípio Geral

> Este projeto prioriza simplicidade de deploy (sem build) sobre DRY perfeito. Isso é uma escolha consciente documentada no README, não um descuido — não proponha migrar pra um bundler/framework a menos que o usuário peça.

---

**Genival Júnior**
*RUNEbyte*
