let parametros = []

export function setParametros(novosParametros) {
  parametros = novosParametros
}

export function getParametros() {
  return parametros
}

export function editarParametro(nome, novoValor) {
  const param = parametros.find(p => p.nome === nome)
  if (param) {
    param.valor = novoValor
  }
}

export function editarParametroPorIndice(indice, chave, novoValor) {
  if (parametros[indice]) {
    parametros[indice][chave] = novoValor
  }
}