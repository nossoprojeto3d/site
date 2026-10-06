/**
 * Nosso Projeto 3D — Links centralizados
 *
 * Toda URL usada no site fica aqui. Pra trocar um link, mude só nesse arquivo.
 * Pra adicionar um campo novo (ex: quando o catálogo nascer), crie uma chave
 * nova dentro do grupo certo (ou um grupo novo, tipo `catalogo: {...}`) e
 * referencie no HTML com data-link="grupo.chave".
 */
const LINKS = {
  contato: {
    whatsapp: "https://wa.me/message/HH37CDNHHMQCD1",
    instagram: "https://instagram.com/nossoprojeto3d"
  },
  hub: {
    shopee: "https://shopee.com.br/nossoprojeto3d?categoryId=100636&entryPoint=ShopByPDP&itemId=58216954178",
    stlsGratis: "https://drive.google.com/drive/folders/1KEVqYll78dvHoo0AbDUCeM57MLXllw48?usp=sharing"
  },
  calculadora: {
    site: "https://nossoprojeto3d.github.io/calc-3d/",
    github: "https://github.com/nossoprojeto3d/calc-3d"
  },
  catalogo: {
    site: "https://nossoprojeto3d.github.io/catalogo/"
  }
};

/**
 * Aplica os links a todo elemento com data-link="grupo.chave" na página.
 * Não precisa mexer aqui — só chamar applyLinks() depois que o DOM carregar.
 */
function applyLinks() {
  document.querySelectorAll("[data-link]").forEach((el) => {
    const path = el.getAttribute("data-link").split(".");
    let value = LINKS;
    for (const key of path) value = value && value[key];
    if (value) {
      el.setAttribute("href", value);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    } else console.warn("[links.js] link não encontrado para:", el.getAttribute("data-link"));
  });
}

/**
 * Dados do negócio para o Google (schema.org/LocalBusiness), montados a partir
 * dos LINKS acima pra nenhuma URL ficar repetida no HTML. Só roda nas páginas
 * com data-schema-negocio no <body>.
 */
function applySchema() {
  if (!document.body.hasAttribute("data-schema-negocio")) return;
  const site = "https://nossoprojeto3d.github.io/site/";
  const dados = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nosso Projeto 3D",
    description: "Impressão 3D personalizada: peças sob medida, miniaturas, decoração e organizadores.",
    url: site,
    logo: site + "assets/logo.png",
    image: site + "assets/og/og-image.jpg",
    telephone: "+55 62 99315-2843",
    address: { "@type": "PostalAddress", addressLocality: "Goiânia", addressRegion: "GO", addressCountry: "BR" },
    areaServed: [{ "@type": "City", name: "Goiânia" }, { "@type": "Country", name: "Brasil" }],
    founder: [{ "@type": "Person", name: "Júnior" }, { "@type": "Person", name: "Thairine" }],
    sameAs: [LINKS.contato.instagram, LINKS.hub.shopee, LINKS.catalogo.site]
  };
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.textContent = JSON.stringify(dados);
  document.head.appendChild(el);
}

document.addEventListener("DOMContentLoaded", () => {
  applyLinks();
  applySchema();
});
