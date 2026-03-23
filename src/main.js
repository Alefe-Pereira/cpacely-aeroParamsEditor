import { readFile } from './importer/reader.js'
import { setParametros, getParametros, editarParametroPorIndice } from './params/store.js'
import { exportar } from './exporter/writer.js'
import { renderizar, renderizarTodos } from './charts/renderer.js'
import { calcular } from './calculator/engine.js'
import { parametrosMock, dadosGraficoMock } from '../mock/sample.js'

function renderizarParametros() {
  const div = document.getElementById('params')
  div.innerHTML = ''

  const parametros = getParametros()
  if (parametros.length === 0) return

  const chaves = Object.keys(parametros[0]).filter(c => c !== '__rowNum__')

  parametros.forEach((param, indice) => {
    const bloco = document.createElement('div')

    chaves.forEach(chave => {
      const label = document.createElement('label')
      label.textContent = chave + ': '

      const input = document.createElement('input')
      input.type = 'text'
      input.value = param[chave]

      input.addEventListener('input', (e) => {
        editarParametroPorIndice(indice, chave, e.target.value)
      })

      bloco.appendChild(label)
      bloco.appendChild(input)
      bloco.appendChild(document.createElement('br'))
    })

    div.appendChild(bloco)
    div.appendChild(document.createElement('hr'))
  })
}

// Inicializa com dados mock
setParametros(parametrosMock)
renderizarParametros()
renderizar(dadosGraficoMock)

// Upload de arquivo
document.getElementById('upload').addEventListener('change', async (e) => {
  const arquivo = e.target.files[0]
  const dados = await readFile(arquivo)
  setParametros(dados)
  renderizarParametros()
  console.log('Parâmetros carregados:', getParametros())
})

// Exportar
document.getElementById('exportar').addEventListener('click', () => {
  exportar(getParametros())
})

// Renderizar gráficos com engine
document.getElementById('renderizar').addEventListener('click', () => {
  const parametros = getParametros()
  const graficos = calcular(parametros)

  if (graficos && graficos.length > 0) {
    renderizarTodos(graficos)
  } else {
    console.warn('Engine não retornou gráficos — verifique os parâmetros carregados.')
  }
})