/**
 * Mapa do Brasil desenhado na hora do build (nada disso vai pro navegador):
 * contorno do país (world-atlas, licença ISC), Goiânia e as rotas até as capitais,
 * tudo já projetado em coordenadas do SVG.
 */
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import paises from "world-atlas/countries-50m.json";

export const LARGURA = 600;
export const ALTURA = 600;

type Ponto = [number, number];
const GOIANIA: Ponto = [-49.2648, -16.6869];
const DESTINOS: { nome: string; coord: Ponto }[] = [
  { nome: "Manaus", coord: [-60.0217, -3.119] },
  { nome: "Belém", coord: [-48.4902, -1.4558] },
  { nome: "Fortaleza", coord: [-38.5434, -3.7172] },
  { nome: "Recife", coord: [-34.877, -8.0476] },
  { nome: "Salvador", coord: [-38.5014, -12.9714] },
  { nome: "Rio de Janeiro", coord: [-43.1729, -22.9068] },
  { nome: "São Paulo", coord: [-46.6333, -23.5505] },
  { nome: "Curitiba", coord: [-49.2733, -25.4284] },
  { nome: "Porto Alegre", coord: [-51.2177, -30.0346] },
  { nome: "Cuiabá", coord: [-56.0974, -15.6014] },
  { nome: "Porto Velho", coord: [-63.9004, -8.7612] }
];

const topo = paises as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
const brasil = feature(topo, topo.objects.countries).features.find((f) => f.id === "076")!;

const projecao = geoMercator().fitExtent([[24, 24], [LARGURA - 24, ALTURA - 24]], brasil);
const caminho = geoPath(projecao).digits(1);
const p = (c: Ponto) => projecao(c)!.map((n) => Math.round(n * 10) / 10) as Ponto;

/** contorno do Brasil como "d" de um <path> */
export const contorno = caminho(brasil)!;

export const goiania = p(GOIANIA);
/** raio de ~200 km em volta de Goiânia, em pixels do SVG */
export const raioRegiao = Math.round(Math.hypot(...p([GOIANIA[0] + 1.9, GOIANIA[1]]).map((n, i) => n - goiania[i])));

/** arco suave de Goiânia até cada capital (curva quadrática puxada pro lado) */
export const rotas = DESTINOS.map(({ nome, coord }) => {
  const [x1, y1] = goiania;
  const [x2, y2] = p(coord);
  const dx = x2 - x1, dy = y2 - y1;
  const cx = Math.round((x1 + x2) / 2 - dy * 0.22);
  const cy = Math.round((y1 + y2) / 2 + dx * 0.22);
  return { nome, x: x2, y: y2, d: `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`, leste: x2 > x1 };
});
