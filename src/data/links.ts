/**
 * Toda URL externa do site fica aqui. Pra trocar um link, mude só nesse arquivo.
 * Nos componentes, use <a href={LINKS.grupo.chave} data-link="grupo.chave">:
 * o data-link continua servindo pro medicao.js saber de onde veio o clique.
 */
export const LINKS = {
  contato: {
    whatsapp: "https://wa.me/message/HH37CDNHHMQCD1",
    instagram: "https://instagram.com/nossoprojeto3d",
    // sem o ?text=: o orçamento guiado monta a mensagem e completa o link
    whatsappOrcamento: "https://wa.me/5562993152843"
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
  },
  ajuste3mf: {
    site: "https://nossoprojeto3d.github.io/ajuste-3mf/"
  }
};

export const SITE_URL = "https://nossoprojeto3d.github.io/site/";
export const TELEFONE = "+55 62 99315-2843";

/** Caminho interno respeitando o base (/site) do GitHub Pages. */
export function url(caminho = "") {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${caminho.replace(/^\//, "")}`;
}
