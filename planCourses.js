// planCourses.js

const fluxo = require("./fluxo.json")

/**
 * Planeja disciplinas a cursar com base em horas disponíveis e disciplinas já cursidas.
 * @param {number} availableHours - Horas disponíveis (mínimo 30h, máximo 480h).
 * @param {Array<{id: string}>} alreadyDone - Lista de objetos com apenas o id das disciplinas já cursidas.
 * @returns {Object} - Ordem topológica, cursos prioritários, sugestões de matrícula, bloqueios diretos e indiretos.
 */
function planCourses(availableHours, alreadyDone) {
  if (availableHours < 30 || availableHours > 480) {
    throw new Error("availableHours must be between 30 and 480")
  }

  const field = fluxo.engineering_fields.find((f) => f.name === "Engenharia de Software")
  if (!field) throw new Error("Engenharia de Software não encontrada no JSON")
  const courses = field.courses
  const courseMap = new Map(courses.map((c) => [c.id, c]))

  const adj = new Map()
  const indegree = new Map()
  const directBlocks = new Map()

  courses.forEach((c) => {
    indegree.set(c.id, 0)
    directBlocks.set(c.id, c.blocks.length)
    adj.set(c.id, [])
  })

  courses.forEach((c) => {
    c.prerequisites.forEach((pre) => {
      if (adj.has(pre)) {
        adj.get(pre).push(c.id)
        indegree.set(c.id, indegree.get(c.id) + 1)
      }
    })
  })

  const queue = []
  indegree.forEach((deg, id) => {
    if (deg === 0) queue.push(id)
  })
  const topo = []
  while (queue.length) {
    const id = queue.shift()
    topo.push(id)
    adj.get(id).forEach((neighbor) => {
      indegree.set(neighbor, indegree.get(neighbor) - 1)
      if (indegree.get(neighbor) === 0) queue.push(neighbor)
    })
  }

  const doneSet = new Set(alreadyDone.map((c) => c.id))

  const eligible = courses.filter((c) => !doneSet.has(c.id) && c.prerequisites.every((p) => doneSet.has(p)))

  const memo = {}
  function countIndirect(id) {
    if (memo[id] !== undefined) return memo[id]
    let total = 0
    adj.get(id).forEach((nxt) => {
      total += 1 + countIndirect(nxt)
    })
    memo[id] = total
    return total
  }

  const indirectBlocks = new Map()
  courses.forEach((c) => indirectBlocks.set(c.id, countIndirect(c.id)))

  eligible.sort((a, b) => {
    const indirectDiff = indirectBlocks.get(b.id) - indirectBlocks.get(a.id)
    if (indirectDiff !== 0) return indirectDiff
    return directBlocks.get(b.id) - directBlocks.get(a.id)
  })

  const prioritized = eligible.map((c) => c.id)

  const suggested = []
  let sumHours = 0
  const considered = new Set()

  for (const c of eligible) {
    if (considered.has(c.id)) continue
    const group = [c]
    const coreqIds = c.corequisites.filter((cid) => !doneSet.has(cid))
    const coreqs = coreqIds.map((cid) => courseMap.get(cid)).filter(Boolean)
    group.push(...coreqs)

    const groupHours = group.reduce((acc, cur) => acc + cur.hours, 0)

    if (sumHours + groupHours <= availableHours) {
      group.forEach((course) => {
        if (!considered.has(course.id)) {
          suggested.push(course.id)
          considered.add(course.id)
          sumHours += course.hours
        }
      })
    }
  }

  return {
    topologicalOrder: topo,
    prioritizedCourses: prioritized,
    suggestedCourses: suggested,
    directBlocks,
    indirectBlocks,
    totalPlannedHours: sumHours,
  }
}

module.exports = planCourses

if (require.main === module) {
  const planCourses = require("./planCourses")
  const availableHours = 480
  const alreadyDone = [{ id: "MAT0025" }, { id: "MAT0031" }, { id: "FGA0071" }, { id: "FGA0158" }]

  const result = planCourses(availableHours, alreadyDone)
  const fluxo = require("./fluxo.json")
  const allCourses = fluxo.engineering_fields.find((f) => f.name === "Engenharia de Software").courses
  const courseMap = new Map(allCourses.map((c) => [c.id, c]))

  console.log("Ordenação Topológica Tradicional:")
  result.topologicalOrder.forEach((id, index) => {
    const course = courseMap.get(id)
    const direct = result.directBlocks.get(id)
    const indirect = result.indirectBlocks.get(id)
    console.log(
      `${index + 1}. ${id} - ${course.name} (tranca diretamente ${direct} e indiretamente ${indirect} matérias)`,
    )
  })

  console.log("\nCursos Prioritários Elegíveis:")
  result.prioritizedCourses.forEach((id) => {
    const course = courseMap.get(id)
    const direct = result.directBlocks.get(id)
    const indirect = result.indirectBlocks.get(id)
    console.log(`- ${id} - ${course.name} (tranca diretamente ${direct} e indiretamente ${indirect} matérias)`)
  })

  console.log(`\nSugestões até ${availableHours}h:`)
  result.suggestedCourses.forEach((id) => {
    const course = courseMap.get(id)
    const direct = result.directBlocks.get(id)
    const indirect = result.indirectBlocks.get(id)
    console.log(`- ${id} - ${course.name} (tranca diretamente ${direct} e indiretamente ${indirect} matérias)`)
  })

  console.log(
    `\nVocê informou que tem ${availableHours} horas disponíveis. Essa grade foi pensada para ocupar ${result.totalPlannedHours} horas.`,
  )
}
