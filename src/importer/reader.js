export function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function(e) {
      const bytes = e.target.result

      const workbook = XLSX.read(bytes, { type: 'array' })
      const nomeDaAba = workbook.SheetNames[0]
      const aba = workbook.Sheets[nomeDaAba]
      const dados = XLSX.utils.sheet_to_json(aba)

      resolve(dados)
    }

    reader.onerror = reject

    reader.readAsArrayBuffer(file)
  })
}