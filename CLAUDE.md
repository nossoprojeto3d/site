# Site Nosso Projeto 3D

Página institucional publicada no GitHub Pages: https://nossoprojeto3d.github.io/site/
Todo push na `main` vai direto pro ar. HTML, CSS e JS puros, sem build e sem lib.

## Arquivos

- `index.html`: a página inteira com CSS inline (~700 linhas). As seções são `#inicio` (hero com a animação do logo sendo impresso), `#acesso-rapido`, `#servicos`, `#processo`, `#historia` e `#contato`, mais o diálogo do versículo (Provérbios 16:3).
- `assets/links.js`: **toda URL externa do site fica aqui**, no objeto `LINKS`. No HTML, o link é `data-link="grupo.chave"` e o `applyLinks()` preenche o `href`. Para trocar ou criar um link, mexa só nesse arquivo e nunca escreva a URL direto no HTML.
- `assets/medicao.js`: Google Analytics 4 com aviso de cookies. É o mesmo arquivo em todos os projetos; se mudar aqui, avisar que precisa copiar pros outros.
- `assets/og/og-image.html`: fonte da imagem de compartilhamento. Depois de editar, gere de novo o `og-image.jpg` em 1200×630 com Chrome headless ou print.
- `assets/icons/`: favicons e o ícone da tela de início.

## Identidade visual

É a mesma do catálogo, da calculadora e do financeiro: fundo escuro, dourado `#C9A227`, títulos em Fraunces, texto em Work Sans e detalhes em JetBrains Mono.

## Cuidados

- A animação do logo já teve "flash" no celular e ao recomeçar. Ao mexer nela, confira no celular.
- Existe uma escala tipográfica própria, com ajustes no mobile. Use as variáveis que já existem em vez de tamanhos soltos.

## Imagens

- Ficam em `assets/`. Logo em PNG; a imagem de compartilhamento é `assets/og/og-image.jpg` (1200×630, JPEG).

## Roteiro de teste

Usado pelo `/conferir-site`, no celular e no desktop:

1. A página abre sem erros no console, incluindo nenhum aviso `[links.js] link não encontrado`.
2. A animação do logo no hero roda sem flash, inclusive ao recomeçar.
3. Todo elemento com `data-link` tem `href` preenchido (confira com `evaluate_script`) e abre em nova aba. Não clique no WhatsApp.
4. O botão "Provérbios 16:3" abre e fecha o diálogo.
5. O botão flutuante do WhatsApp aparece no celular sem cobrir conteúdo importante.
6. Sem rolagem horizontal em 375px.
