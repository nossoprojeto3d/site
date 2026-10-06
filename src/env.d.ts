// Função global criada pelo public/assets/medicao.js (só existe se a pessoa aceitar os cookies)
interface Window {
  np3dTrack?: (evento: string, params?: Record<string, string | number | boolean>) => void;
}
