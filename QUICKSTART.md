# 🚀 Quick Start — RUNEbyte Site

Sem build, sem `npm install`. Abra e edite.

---

## 1️⃣ Rodar localmente

Basta abrir `index.html` no navegador — funciona por `file://` direto.

Se precisar simular um servidor real (ex: pra testar caminhos relativos de imagem corretamente), use:

```bash
python -m http.server 8000
# Acesse http://localhost:8000
```

---

## 2️⃣ Onde mexer em cada coisa

| Quero mudar...              | Onde                                                              |
|------------------------------|--------------------------------------------------------------------|
| Cor da marca                 | Bloco `tailwind.config` no `<head>` — **repita nas 4 páginas**     |
| Texto/conteúdo do hero        | `index.html`, seção `<!-- Ilustração Tech -->` e acima             |
| Cards de módulo (RUNEbot etc) | `index.html`, seção com `id="servicos"` (grid de cards)             |
| Módulo RUNElog                | `runelog/runelog.html`                                              |
| Módulo RUNEfiscal             | `runefiscal/runefiscal.html`                                        |
| Detalhes da Fábrica de Software | `fab.software/detalhes-modulos.html`                              |
| Imagens/mockups               | `assets/images/`                                                     |
| Favicon                       | `assets/images/icon.png` (linkado via `<link rel="icon">` em cada página) |

⚠️ **Não existe um CSS/JS central.** Se a mudança é visual (cor, espaçamento) ou de comportamento de tema, normalmente precisa repetir a edição nas 4 páginas — ver `README.md > Débito Técnico Conhecido`.

---

## 3️⃣ Trocar as cores da marca

Em cada um dos 4 arquivos `.html`, procure o bloco:

```js
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a1424',
          base: '#152e50',
          light: '#2a4a7f',
          accent: '#f59e0b',
          accentHover: '#d97706',
        }
      }
    }
  }
}
```

Mude os valores hex — repita nas 4 páginas pra manter consistência.

---

## 4️⃣ Adicionar uma imagem que troca com o tema (dark/light)

Padrão usado em todo o site (mockups do RUNEfiscal, ilustração do hero):

```html
<img src="caminho/imagem-escuro.png" alt="..." class="... dark:block hidden">
<img src="caminho/imagem-claro.png"  alt="..." class="... dark:hidden block">
```

O `dark:` só funciona porque cada página tem `darkMode: 'class'` no `tailwind.config` e o script de tema adiciona/remove a classe `dark` no `<html>`.

---

## 5️⃣ Adicionar uma página nova

1. Copie a estrutura de `<head>` de uma página existente (Tailwind CDN + Lucide CDN + fonte Inter + `tailwind.config` com as cores da marca + script inline de pré-carregamento de tema).
2. Copie o script de tema/menu mobile do final do `<body>` de uma página parecida.
3. Ajuste os caminhos relativos de `assets/` (a página nova provavelmente fica numa subpasta, então os caminhos levam `../assets/...`).
4. Adicione o favicon: `<link rel="icon" type="image/png" href="../assets/images/icon.png">`.

Não existe boilerplate/gerador automático — é copiar de uma página existente e adaptar.

---

## 6️⃣ Testar modo claro/escuro rapidamente

No console do navegador:

```javascript
document.documentElement.classList.toggle('light');
```

Lembre que `runefiscal.html` usa uma chave de `localStorage` diferente das outras páginas (`runebyte-theme` vs `theme`) — o tema escolhido numa página pode não persistir ao navegar pra ela.

---

## 🐛 Troubleshooting

**Ícones não aparecem** → `lucide.createIcons()` precisa rodar depois do HTML carregar; confira se não há erro de console travando o script.

**Imagem não troca de tema** → confira se o `<html>` realmente ganha a classe `dark`/`light` (inspecione no DevTools) e se a imagem tem as duas variantes com `dark:block hidden` / `dark:hidden block`.

**Carrossel do RUNEfiscal (hero do index.html) não gira** → confira se os 3 `.rf-slide` existem dentro de `#runefiscal-carousel` e se não há erro de JS impedindo o `setInterval`.

**Tema não persiste entre páginas** → problema conhecido, ver `README.md`.

---

## 📚 Recursos

- **README.md** — visão geral, estrutura, débito técnico
- **CONTRIBUTING.md** — padrões de código e checklist de mudança
- **ARQUIVO-ESTRUTURA.txt** — árvore de arquivos e estatísticas

**Genival Júnior**
