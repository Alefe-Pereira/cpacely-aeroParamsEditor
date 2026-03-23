export function renderizarTodos(graficos) {
  const div = document.getElementById('charts')
  div.innerHTML = ''

  graficos.forEach(grafico => {
    const container = document.createElement('div')
    container.style.marginBottom = '32px'
    div.appendChild(container)

    const trace = {
      x: grafico.eixoX.valores,
      y: grafico.eixoY.valores,
      type: 'scatter',
      mode: 'lines+markers',
      name: grafico.eixoY.label
    }

    const layout = {
      title: grafico.titulo,
      xaxis: { title: { text: grafico.eixoX.label, font: { size: 13 } } },
      yaxis: { title: { text: grafico.eixoY.label, font: { size: 13 } } },
      legend: { orientation: 'h', y: -0.25 },
      height: 350,
      margin: { t: 50, b: 80, l: 70, r: 20 }
    }

    Plotly.newPlot(container, [trace], layout)
  })
}

export function renderizar(dados) {
  const div = document.getElementById('charts')
  div.innerHTML = ''

  const container = document.createElement('div')
  div.appendChild(container)

  const trace = {
    x: dados.map(d => d.x),
    y: dados.map(d => d.y),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Simulação'
  }

  const layout = {
    title: 'Aeroparametros - Gráfico de Exemplo',
    xaxis: { title: { text: 'X', font: { size: 14 } } },
    yaxis: { title: { text: 'Y', font: { size: 14 } } },
    legend: { orientation: 'h', y: -0.2 },
    height: 400
  }

  Plotly.newPlot(container, [trace], layout)
}