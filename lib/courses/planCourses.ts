import softwareEngineering from "./software"
import type { Discipline } from "./types"

export interface CompletedCourse {
  id: string
}

export interface SemesterPlan {
  semester: number
  courses: string[]
  totalHours: number
}

export interface PlanResult {
  remainingCourses: string[]
  semesterPlans: SemesterPlan[]
  directBlocks: Map<string, number>
  indirectBlocks: Map<string, number>
  totalRemainingHours: number
  expectedGraduationTime: number
}

const COURSES_PER_SEMESTER = 6
const COURSE_COMPLETION_THRESHOLD = 0.6 // 60% do curso

export function planCourses(
  currentSemester: number,
  alreadyDone: CompletedCourse[],
  maxHoursPerSemester = 360, // valor padrão
): PlanResult {
  if (currentSemester < 1 || currentSemester > 10) {
    throw new Error("currentSemester must be between 1 and 10")
  }

  if (maxHoursPerSemester < 30 || maxHoursPerSemester > 480) {
    throw new Error("maxHoursPerSemester must be between 30 and 480")
  }

  const courses = softwareEngineering.disciplines
  const courseMap = new Map(courses.map((c) => [c.codigo, c]))
  const totalCourses = courses.length

  // Build dependency graph
  const adj = new Map<string, string[]>()
  const indegree = new Map<string, number>()
  const directBlocks = new Map<string, number>()

  courses.forEach((c) => {
    indegree.set(c.codigo, 0)
    directBlocks.set(c.codigo, c.bloqueia.length)
    adj.set(c.codigo, [])
  })

  // Build adjacency list considering both prerequisites and co-requisites
  courses.forEach((c) => {
    ;[...c.preRequisitos, ...c.coRequisitos].forEach((pre) => {
      if (adj.has(pre)) {
        adj.get(pre)!.push(c.codigo)
        indegree.set(c.codigo, indegree.get(c.codigo)! + 1)
      }
    })
  })

  // Get completed courses and calculate completion percentage
  const doneSet = new Set(alreadyDone.map((c) => c.id))
  const completedCount = doneSet.size
  const courseCompletionPercentage = completedCount / totalCourses

  // Log disciplinas selecionadas
  console.log("=== DISCIPLINAS SELECIONADAS ===")
  const disciplinasSelecionadas = courses.filter((c) => doneSet.has(c.codigo))
  disciplinasSelecionadas.forEach((d) => {
    console.log(`${d.codigo} - ${d.nome} - ${d.cargaHoraria}h - Semestre ${d.semestre}`)
  })
  console.log(
    `Total: ${disciplinasSelecionadas.length} disciplinas, ${disciplinasSelecionadas.reduce((sum, d) => sum + d.cargaHoraria, 0)} horas`,
  )

  // Get remaining courses (only those not completed)
  const remainingCourses = courses.filter((c) => !doneSet.has(c.codigo))

  // Log disciplinas restantes
  console.log("\n=== DISCIPLINAS RESTANTES ===")
  remainingCourses.forEach((d) => {
    console.log(`${d.codigo} - ${d.nome} - ${d.cargaHoraria}h - Semestre ${d.semestre}`)
  })
  console.log(
    `Total: ${remainingCourses.length} disciplinas, ${remainingCourses.reduce((sum, d) => sum + d.cargaHoraria, 0)} horas`,
  )

  // Calculate indirect blocks using memoization
  const memo: { [key: string]: number } = {}
  const visited = new Set<string>()

  function countIndirect(id: string): number {
    if (memo[id] !== undefined) return memo[id]
    if (visited.has(id)) return 0 // Prevent cycles

    visited.add(id)
    let total = 0
    adj.get(id)!.forEach((nxt) => {
      total += 1 + countIndirect(nxt)
    })
    visited.delete(id) // Remove from visited set when done
    memo[id] = total
    return total
  }

  const indirectBlocks = new Map<string, number>()
  courses.forEach((c) => indirectBlocks.set(c.codigo, countIndirect(c.codigo)))

  // Helper function to check if a course can be taken in a semester
  function canTakeCourse(course: Discipline): boolean {
    // Never include already completed courses
    if (doneSet.has(course.codigo)) return false

    // Check prerequisites
    const prerequisitesMet = course.preRequisitos.every((pre) => doneSet.has(pre))
    if (!prerequisitesMet) return false

    // Check co-requisites (can be taken together or already completed)
    const corequisitesMet = course.coRequisitos.every(
      (co) => doneSet.has(co) || unassignedCourses.some((rc) => rc.codigo === co),
    )
    if (!corequisitesMet) return false

    // Special handling for TCC1 and Estágio
    if (
      (course.codigo === "FGA0287" || course.codigo === "FGA0288") &&
      courseCompletionPercentage < COURSE_COMPLETION_THRESHOLD
    ) {
      return false
    }

    return true
  }

  // Sort remaining courses by semester and blocking impact
  remainingCourses.sort((a, b) => {
    // First by semester
    if (a.semestre !== b.semestre) {
      return a.semestre - b.semestre
    }
    // Then by indirect blocks
    const indirectDiff = indirectBlocks.get(b.codigo)! - indirectBlocks.get(a.codigo)!
    if (indirectDiff !== 0) return indirectDiff
    // Finally by direct blocks
    return directBlocks.get(b.codigo)! - directBlocks.get(a.codigo)!
  })

  // Group courses by semester
  const semesterPlans: SemesterPlan[] = []
  let totalRemainingHours = 0
  let futureSemesterCount = 1 // Start counting from 1 (next semester)

  // Create a copy of the remaining courses to track what's been assigned
  const unassignedCourses = [...remainingCourses]

  console.log("\n=== PLANO DE ESTUDOS ===")

  // Process all remaining courses
  while (unassignedCourses.length > 0) {
    const eligibleCourses = unassignedCourses.filter(canTakeCourse)

    if (eligibleCourses.length === 0) {
      // No more eligible courses, but still have unassigned courses
      // This could happen if there are circular dependencies or missing prerequisites
      console.log("Warning: Could not assign all courses. Possible circular dependency or missing prerequisites.")
      break
    }

    // Sort eligible courses by priority (indirect blocks, then direct blocks, then semester)
    eligibleCourses.sort((a, b) => {
      // First by indirect blocks (most blocking first)
      const indirectDiff = indirectBlocks.get(b.codigo)! - indirectBlocks.get(a.codigo)!
      if (indirectDiff !== 0) return indirectDiff

      // Then by direct blocks
      const directDiff = directBlocks.get(b.codigo)! - directBlocks.get(a.codigo)!
      if (directDiff !== 0) return directDiff

      // Finally by semester (lower semester first)
      return a.semestre - b.semestre
    })

    // Group courses respecting maxHoursPerSemester
    let currentHours = 0
    const selectedCourses: Discipline[] = []

    for (const course of eligibleCourses) {
      if (currentHours + course.cargaHoraria <= maxHoursPerSemester) {
        selectedCourses.push(course)
        currentHours += course.cargaHoraria

        // Mark this course as done for future iterations
        doneSet.add(course.codigo)

        // Remove this course from unassigned courses
        const index = unassignedCourses.findIndex((c) => c.codigo === course.codigo)
        if (index !== -1) {
          unassignedCourses.splice(index, 1)
        }
      }
    }

    if (selectedCourses.length > 0) {
      const currentPlan = {
        semester: currentSemester + futureSemesterCount,
        courses: selectedCourses.map((c) => c.codigo),
        totalHours: currentHours,
      }
      semesterPlans.push(currentPlan)
      totalRemainingHours += currentHours

      // Log disciplinas do semestre
      console.log(`\nSemestre ${currentPlan.semester} (${currentHours}h):`)
      selectedCourses.forEach((d) => {
        console.log(`  ${d.codigo} - ${d.nome} - ${d.cargaHoraria}h`)
      })

      futureSemesterCount++
    } else {
      // No courses could be added with the current limit, break to avoid infinite loop
      break
    }
  }

  // Calculate expected graduation time
  const expectedGraduationTime = semesterPlans.length

  console.log("\n=== RESUMO ===")
  console.log(`Tempo para formatura: ${expectedGraduationTime} semestres`)
  console.log(`Carga horária restante: ${totalRemainingHours}h`)
  console.log(`Disciplinas restantes: ${remainingCourses.length}`)

  return {
    remainingCourses: remainingCourses.map((c) => c.codigo),
    semesterPlans,
    directBlocks,
    indirectBlocks,
    totalRemainingHours,
    expectedGraduationTime,
  }
}
