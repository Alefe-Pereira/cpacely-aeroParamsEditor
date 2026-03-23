export function exportar(parametros) {
  const aba = XLSX.utils.json_to_sheet(parametros)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, aba, 'Resultados')
  XLSX.writeFile(workbook, 'slipstream-resultados.xlsx')
}