// Constantes físicas
const GAMMA = 1.4
const R = 287 // J/(kg·K)

function getValor(parametros, simbolo) {
  const param = parametros.find(p => {
    const chave = Object.keys(p).find(k => k.toLowerCase() === 'simbolo')
    return chave && p[chave] === simbolo
  })
  if (!param) return null
  const chaveValor = Object.keys(param).find(k => k.toLowerCase() === 'valor')
  return Number(param[chaveValor])
}

function variar(base, pontos = 20) {
  const min = base * 0.5
  const max = base * 1.5
  const passo = (max - min) / pontos
  return Array.from({ length: pontos + 1 }, (_, i) => +(min + i * passo).toFixed(4))
}

export function calcular(parametros) {
  const M     = getValor(parametros, 'M')
  const P_inf = getValor(parametros, 'P_inf')
  const T_inf = getValor(parametros, 'T_inf')
  const rho   = getValor(parametros, 'rho_inf')
  const V     = getValor(parametros, 'V_inf')

  const graficos = []

  // 1. Pressão de estagnação vs Mach
  const machs = variar(M)
  graficos.push({
    titulo: 'Pressão de Estagnação vs Mach',
    eixoX: { label: 'Mach', valores: machs },
    eixoY: { label: 'P0 (Pa)', valores: machs.map(m => P_inf * Math.pow(1 + 0.2 * m * m, 3.5)) }
  })

  // 2. Temperatura de estagnação vs Mach
  graficos.push({
    titulo: 'Temperatura de Estagnação vs Mach',
    eixoX: { label: 'Mach', valores: machs },
    eixoY: { label: 'T0 (K)', valores: machs.map(m => T_inf * (1 + 0.2 * m * m)) }
  })

  // 3. Velocidade do som vs Temperatura
  const temps = variar(T_inf)
  graficos.push({
    titulo: 'Velocidade do Som vs Temperatura',
    eixoX: { label: 'T (K)', valores: temps },
    eixoY: { label: 'a (m/s)', valores: temps.map(t => +Math.sqrt(GAMMA * R * t).toFixed(2)) }
  })

  // 4. Pressão dinâmica vs Velocidade
  const vels = variar(V)
  graficos.push({
    titulo: 'Pressão Dinâmica vs Velocidade',
    eixoX: { label: 'V (m/s)', valores: vels },
    eixoY: { label: 'q (Pa)', valores: vels.map(v => +(0.5 * rho * v * v).toFixed(2)) }
  })

  // 5. Razão de pressão vs Mach (choque normal)
  graficos.push({
    titulo: 'Razão de Pressão (Choque Normal) vs Mach',
    eixoX: { label: 'Mach', valores: machs },
    eixoY: { label: 'P2/P1', valores: machs.map(m => +((2 * GAMMA * m * m - (GAMMA - 1)) / (GAMMA + 1)).toFixed(4)) }
  })

  return graficos
}