import axios from "../utils/axios";

async function getResource(endpoint) {
  const { data } = await axios.get(endpoint);
  return data;
}

async function createResource(endpoint, payload) {
  const { data } = await axios.post(endpoint, payload);
  return data;
}

async function updateResource(endpoint, payload) {
  const { data } = await axios.put(endpoint, payload);
  return data;
}

async function deleteResource(endpoint) {
  const { data } = await axios.delete(endpoint);
  return data;
}

// Serviços específicos para cada recurso
export const FilmeService = {
  getAll: () => getResource("/filmes"),
  getById: (id) => getResource(`/filmes/${id}`),
  create: (payload) => createResource("/filmes", payload),
  update: (id, payload) => updateResource(`/filmes/${id}`, payload),
  delete: (id) => deleteResource(`/filmes/${id}`),
};

export const ProcessoService = {
  getAll: () => getResource("/processos"),
  getById: (id) => getResource(`/processos/${id}`),
  create: (payload) => createResource("/processos", payload),
  update: (id, payload) => updateResource(`/processos/${id}`, payload),
  delete: (id) => deleteResource(`/processos/${id}`),
  increment: (id) => updateResource(`/processos/${id}/increment`),
};

export const RevelacaoService = {
  getAll: () => getResource("/revelacoes"),
  getById: (id) => getResource(`/revelacoes/${id}`),
  create: (payload) => createResource("/revelacoes", payload),
  update: (id, payload) => updateResource(`/revelacoes/${id}`, payload),
  delete: (id) => deleteResource(`/revelacoes/${id}`),
  finish: (id, payload) => updateResource(`/revelacoes/${id}/finish`, payload),
};

export const EtapaService = {
  getAllByProcessoId: (id) => getResource(`/etapasProcesso/${id}`),
};

export const CameraService = {
  getAll: () => getResource("/cameras"),
  getById: (id) => getResource(`/cameras/${id}`),
  create: (payload) => createResource("/cameras", payload),
  update: (id, payload) => updateResource(`/cameras/${id}`, payload),
  delete: (id) => deleteResource(`/cameras/${id}`),
};
