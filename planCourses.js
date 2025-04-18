const fluxo = require("./fluxo.json")

function validarHorasDisponiveis(horasDisponiveis) {
  if (horasDisponiveis < 30 || horasDisponiveis > 480) {
    throw new Error("horasDisponiveis deve estar entre 30 e 480")
  }
}

function obterCursosEngenharia() {
  const area = fluxo.engineering_fields.find((f) => f.name === "Engenharia de Software")
  if (!area) throw new Error("Engenharia de Software não encontrada no JSON")
  return area.courses
}

function inicializarGrafo(cursos) {
  const adjacencias = new Map()
  const grauEntrada = new Map()
  const bloqueiosDiretos = new Map()

  cursos.forEach((curso) => {
    grauEntrada.set(curso.id, 0)
    bloqueiosDiretos.set(curso.id, curso.blocks.length)
    adjacencias.set(curso.id, [])
  })

  cursos.forEach((curso) => {
    curso.prerequisites.forEach((preRequisito) => {
      if (adjacencias.has(preRequisito)) {
        adjacencias.get(preRequisito).push(curso.id)
        grauEntrada.set(curso.id, grauEntrada.get(curso.id) + 1)
      }
    })
  })

  return { adjacencias, grauEntrada, bloqueiosDiretos }
}

function ordenarTopologicamente(adjacencias, grauEntrada) {
  const fila = []
  const ordemTopologica = []

  grauEntrada.forEach((grau, id) => {
    if (grau === 0) fila.push(id)
  })

  while (fila.length) {
    const id = fila.shift()
    ordemTopologica.push(id)
    adjacencias.get(id).forEach((vizinho) => {
      grauEntrada.set(vizinho, grauEntrada.get(vizinho) - 1)
      if (grauEntrada.get(vizinho) === 0) fila.push(vizinho)
    })
  }

  return ordemTopologica
}

function contarBloqueiosIndiretos(id, adjacencias, memo) {
  if (memo[id] !== undefined) return memo[id]
  let total = 0
  adjacencias.get(id).forEach((vizinho) => {
    total += 1 + contarBloqueiosIndiretos(vizinho, adjacencias, memo)
  })
  memo[id] = total
  return total
}

function planejarCursosElegiveis(cursos, cursosConcluidos, adjacencias, bloqueiosDiretos) {
  const memo = {}
  const bloqueiosIndiretos = new Map()

  cursos.forEach((curso) => {
    bloqueiosIndiretos.set(curso.id, contarBloqueiosIndiretos(curso.id, adjacencias, memo))
  })

  const elegiveis = cursos.filter(
    (curso) =>
      !cursosConcluidos.has(curso.id) &&
      curso.prerequisites.every((pre) => cursosConcluidos.has(pre))
  )

  elegiveis.sort((a, b) => {
    const diferencaIndireta = bloqueiosIndiretos.get(b.id) - bloqueiosIndiretos.get(a.id)
    if (diferencaIndireta !== 0) return diferencaIndireta
    return bloqueiosDiretos.get(b.id) - bloqueiosDiretos.get(a.id)
  })

  return { elegiveis, bloqueiosIndiretos }
}

function sugerirCursos(elegiveis, cursosConcluidos, mapaCursos, horasDisponiveis) {
  const sugeridos = []
  let horasTotais = 0
  const considerados = new Set()

  for (const curso of elegiveis) {
    if (considerados.has(curso.id)) continue
    const grupo = [curso]
    const idsCorequisitos = curso.corequisites.filter((id) => !cursosConcluidos.has(id))
    const corequisitos = idsCorequisitos.map((id) => mapaCursos.get(id)).filter(Boolean)
    grupo.push(...corequisitos)

    const horasGrupo = grupo.reduce((acc, cur) => acc + cur.hours, 0)

    if (horasTotais + horasGrupo <= horasDisponiveis) {
      grupo.forEach((c) => {
        if (!considerados.has(c.id)) {
          sugeridos.push(c.id)
          considerados.add(c.id)
          horasTotais += c.hours
        }
      })
    }
  }

  return { sugeridos, horasTotais }
}

function planejarDisciplinas(horasDisponiveis, jaConcluidas) {
  validarHorasDisponiveis(horasDisponiveis)

  const cursos = obterCursosEngenharia()
  const mapaCursos = new Map(cursos.map((curso) => [curso.id, curso]))
  const { adjacencias, grauEntrada, bloqueiosDiretos } = inicializarGrafo(cursos)

  const ordemTopologica = ordenarTopologicamente(adjacencias, grauEntrada)
  const cursosConcluidos = new Set(jaConcluidas.map((curso) => curso.id))

  const { elegiveis, bloqueiosIndiretos } = planejarCursosElegiveis(
    cursos,
    cursosConcluidos,
    adjacencias,
    bloqueiosDiretos
  )

  const { sugeridos, horasTotais } = sugerirCursos(elegiveis, cursosConcluidos, mapaCursos, horasDisponiveis)

  return {
    ordemTopologica,
    cursosPrioritarios: elegiveis.map((curso) => curso.id),
    cursosSugeridos: sugeridos,
    bloqueiosDiretos,
    bloqueiosIndiretos,
    horasPlanejadas: horasTotais,
  }
}

module.exports = planejarDisciplinas

if (require.main === module) {
  const horasDisponiveis = 480
  const jaConcluidas = [{ id: "MAT0025" }, { id: "MAT0031" }, { id: "FGA0071" }, { id: "FGA0158" }]

  const resultado = planejarDisciplinas(horasDisponiveis, jaConcluidas)
  const cursos = obterCursosEngenharia()
  const mapaCursos = new Map(cursos.map((curso) => [curso.id, curso]))

  console.log("Ordenação Topológica Tradicional:")
  resultado.ordemTopologica.forEach((id, index) => {
    const curso = mapaCursos.get(id)
    const direto = resultado.bloqueiosDiretos.get(id)
    const indireto = resultado.bloqueiosIndiretos.get(id)
    console.log(
      `${index + 1}. ${id} - ${curso.name} (tranca diretamente ${direto} e indiretamente ${indireto} matérias)`
    )
  })

  console.log("\nCursos Prioritários Elegíveis:")
  resultado.cursosPrioritarios.forEach((id) => {
    const curso = mapaCursos.get(id)
    const direto = resultado.bloqueiosDiretos.get(id)
    const indireto = resultado.bloqueiosIndiretos.get(id)
    console.log(`- ${id} - ${curso.name} (tranca diretamente ${direto} e indiretamente ${indireto} matérias)`)
  })

  console.log(`\nSugestões até ${horasDisponiveis}h:`)
  resultado.cursosSugeridos.forEach((id) => {
    const curso = mapaCursos.get(id)
    const direto = resultado.bloqueiosDiretos.get(id)
    const indireto = resultado.bloqueiosIndiretos.get(id)
    console.log(`- ${id} - ${curso.name} (tranca diretamente ${direto} e indiretamente ${indireto} matérias)`)
  })

  console.log(
    `\nVocê informou que tem ${horasDisponiveis} horas disponíveis. Essa grade foi pensada para ocupar ${resultado.horasPlanejadas} horas.`
  )
}