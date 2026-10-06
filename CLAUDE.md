# Site Nosso Projeto 3D

Site institucional e porta de entrada de vendas, publicado no GitHub Pages: https://nossoprojeto3d.github.io/site/
Todo push na `main` dispara `.github/workflows/deploy.yml`, que roda `astro check`, gera o site e publica. Se o check falhar, nada vai pro ar.

Feito em **Astro** (só HTML e CSS gerados; JS mínimo em `<script>` dos componentes), sem React nem Tailwind. A V1 era um `index.html` único e está na etiqueta `v1-final`.

```bash
npm run dev        # http://localhost:4321/site/  (--host pra abrir no celular pela rede)
npm run build      # gera dist/
npx astro check    # tipos e erros; rode antes de commitar
npm run fotos      # prepara as fotos da pasta ~/Desktop/Fotos do site
```

## Páginas

- `src/pages/index.astro`: início. Impressora animada, botão do catálogo em destaque (o site é o link da bio do Instagram), três caminhos (empresas, eventos, você), nossos projetos, mapa de entregas e "Quem somos".
- `src/pages/empresas.astro`, `eventos.astro`, `para-voce.astro`: cada caminho tem topo, ofertas, "Como funciona", orçamento guiado e perguntas frequentes. "Quem somos" fica só na página inicial.
- `src/pages/404.astro`: o GitHub Pages serve esse arquivo em qualquer endereço inexistente de `/site/`.

## Onde mexer

- `src/data/links.ts`: **toda URL externa fica aqui**, no objeto `LINKS`. Nos componentes use `href={LINKS.grupo.chave}` com `data-link="grupo.chave"`, que é o que o `medicao.js` usa pra saber de onde veio o clique. Links internos passam por `url("caminho/")` por causa do base `/site`.
- `src/components/Orcamento.astro`: orçamento guiado. A tabela `CONFIG` define, por tipo (empresa, pessoa, evento), as opções, os campos e o texto da mensagem que abre no WhatsApp (`LINKS.contato.whatsappOrcamento`). Botões com `data-quer="Opção"` em qualquer lugar da página deixam a opção marcada.
- `src/components/`: `Topo`, `Oferta`, `Passos`, `Duvidas`, `Foto`, `Entrega` (mapa), `Projetos`, `QuemSomos`, `Telas` (diálogos do versículo e da história completa), `Nav`, `Footer`.
- `src/data/mapa.ts`: o mapa do Brasil é desenhado no build (world-atlas + d3-geo); nada disso vai pro navegador.
- `src/styles/global.css`: tokens de cor e tipografia, botões, tema claro.
- `public/`: vai pro ar como está. `assets/medicao.js` é o Google Analytics compartilhado com os outros projetos: se mudar aqui, avisar que precisa copiar pros outros. `googlee4343bf2118f52f0.html` é a verificação do Google Search Console (não apagar nem renomear). `sitemap.xml`: atualizar o `lastmod` e incluir página nova quando criar.
- `public/assets/og/og-image.html`: fonte da imagem de compartilhamento. Depois de editar, gere de novo o `og-image.jpg` em 1200×630.

## Identidade visual

A mesma do catálogo, da calculadora e do financeiro: fundo escuro, dourado `#C9A227`, títulos em Fraunces, texto em Work Sans e detalhes em JetBrains Mono. Existe um tema claro (botão sol/lua, salvo em `localStorage` como `nossoprojeto3d-tema`; o padrão é o escuro): use as variáveis de `global.css` em vez de cores soltas, senão o tema claro quebra. Os botões usam o dourado fixo da marca (`--ouro*`) nos dois temas.

## Cuidados

- A animação do logo (`Impressora.astro`, CSS em `src/styles/_printer.css`) já teve "flash" no celular e ao recomeçar. Ao mexer, confira no celular.
- O compactador do build (esbuild) apaga uma das versões de propriedades duplicadas e mantém a última escrita. Em `backdrop-filter`, escreva `-webkit-backdrop-filter` primeiro e o padrão por último, senão o Chrome fica sem desfoque.
- Textos com a classe `.ph` (sublinhado tracejado) são suposições que os donos ainda precisam confirmar: prazos, quantidades mínimas e respostas das perguntas frequentes. Quando confirmarem, troque o texto e tire o `.ph`.
- Use a escala tipográfica (`--fs-*`) em vez de tamanhos soltos.

## Imagens

- Todas as fotos são 4:5, 1080×1350, JPEG sRGB, no máximo ~250 KB, com a peça no centro e ~10% de margem (o mesmo arquivo aparece em larguras diferentes no celular e no computador).
- Ficam em `public/assets/fotos/<número>-<nome>.jpg`. O componente `Foto.astro` acha o arquivo no build; sem arquivo, mostra "Foto em breve" (o número do espaço fica em `data-espaco`). A lista dos 15 espaços está nos `fotos:` das páginas e em `QuemSomos.astro`.
- As originais chegam em `~/Desktop/Fotos do site/`, nomeadas só com o número (`06.jpg`, `07.heic`). `npm run fotos` enquadra, comprime e grava com o nome certo. Não use o `/otimizar-imagens` aqui: ele faz commit sozinho.
- Ao trocar uma foto, atualize a descrição dela (vira o texto alternativo).

## Roteiro de teste

Usado pelo `/conferir-site`, no build (`npm run build` e `npx astro preview`), no celular (375px), tablet (768px) e desktop:

1. As cinco páginas abrem sem erros no console.
2. A animação do logo no início roda sem flash, inclusive ao recomeçar.
3. Os links do menu, dos caminhos e dos projetos abrem a página certa; os externos abrem em nova aba. Não clique no WhatsApp.
4. Orçamento guiado nas três páginas: escolher opções monta a "ordem de impressão" e o `href` do botão traz a mensagem certa para `wa.me/5562993152843`.
5. "Provérbios 16:3" e "Conheça nossa história" abrem e fecham os diálogos.
6. Tema claro e escuro: troca, fica salvo ao recarregar e nada fica ilegível.
7. No celular, a barra "Pedir orçamento" aparece depois do topo e some na seção de orçamento.
8. Sem rolagem horizontal em 320px, 375px e 768px; o nome no topo cabe numa linha.
9. Um endereço inexistente (ex.: `/site/teste`) mostra a 404 com fontes e botões funcionando.
