"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, Info, ChevronLeft, ChevronRight } from "lucide-react"
import courses from "@/lib/courses"

export default function FluxogramaPage() {
  const [disciplinasCursadas, setDisciplinasCursadas] = useState<string[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Pegar o curso de Engenharia de Software (por enquanto é o único)
  const curso = courses[0]
  const disciplinasData = curso.disciplines

  // Cores pastéis para cada semestre
  const coresSemestre = [
    "bg-rose-100 border-rose-300", // 1º semestre
    "bg-orange-100 border-orange-300", // 2º semestre
    "bg-amber-100 border-amber-300", // 3º semestre
    "bg-yellow-100 border-yellow-300", // 4º semestre
    "bg-lime-100 border-lime-300", // 5º semestre
    "bg-green-100 border-green-300", // 6º semestre
    "bg-emerald-100 border-emerald-300", // 7º semestre
    "bg-teal-100 border-teal-300", // 8º semestre
    "bg-cyan-100 border-cyan-300", // 9º semestre
    "bg-sky-100 border-sky-300", // 10º semestre
  ]

  // Cores para disciplinas cursadas
  const coresCursadas = [
    "bg-rose-500 border-rose-700 text-white",
    "bg-orange-500 border-orange-700 text-white",
    "bg-amber-500 border-amber-700 text-white",
    "bg-yellow-500 border-yellow-700 text-white",
    "bg-lime-500 border-lime-700 text-white",
    "bg-green-500 border-green-700 text-white",
    "bg-emerald-500 border-emerald-700 text-white",
    "bg-teal-500 border-teal-700 text-white",
    "bg-cyan-500 border-cyan-700 text-white",
    "bg-sky-500 border-sky-700 text-white",
  ]

  // Função para marcar uma disciplina como cursada
  const toggleDisciplina = (codigo: string) => {
    if (disciplinasCursadas.includes(codigo)) {
      setDisciplinasCursadas((prev) => prev.filter((c) => c !== codigo))
    } else {
      // Adiciona a disciplina e seus pré-requisitos automaticamente
      const disciplinasParaAdicionar = [codigo]
      const adicionarPreRequisitos = (cod: string) => {
        const disciplina = disciplinasData.find((d) => d.codigo === cod)
        if (disciplina && disciplina.preRequisitos) {
          disciplina.preRequisitos.forEach((preReq) => {
            if (!disciplinasParaAdicionar.includes(preReq) && !disciplinasCursadas.includes(preReq)) {
              disciplinasParaAdicionar.push(preReq)
              adicionarPreRequisitos(preReq)
            }
          })
        }
      }

      adicionarPreRequisitos(codigo)
      setDisciplinasCursadas((prev) => [...prev, ...disciplinasParaAdicionar])
    }
  }

  // Função para rolar o fluxograma horizontalmente
  const scrollHorizontal = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300 // pixels para rolar
      const currentScroll = scrollContainerRef.current.scrollLeft

      scrollContainerRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Agrupar disciplinas por semestre
  const disciplinasPorSemestre: { [key: number]: typeof disciplinasData } = {}
  disciplinasData.forEach((disciplina) => {
    if (!disciplinasPorSemestre[disciplina.semestre]) {
      disciplinasPorSemestre[disciplina.semestre] = []
    }
    disciplinasPorSemestre[disciplina.semestre].push(disciplina)
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <Link href="/curso" className="inline-flex items-center text-navy-950 hover:text-navy-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para seleção de curso
          </Link>

          <h1 className="text-2xl font-bold text-gray-800">Fluxograma - Engenharia de Software</h1>

          <Link href={`/preferencias?disciplinasCursadas=${encodeURIComponent(JSON.stringify(disciplinasCursadas))}`}>
            <Button
              className="bg-navy-950 hover:bg-navy-900 text-white rounded-lg transition-all hover:shadow-lg flex items-center gap-2 group"
              disabled={disciplinasCursadas.length === 0}
            >
              Continuar
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center">
          <Info className="h-5 w-5 text-blue-950 mr-3 flex-shrink-0" />
          <p className="text-gray-600 text-sm">
            Clique nas disciplinas para marcá-las como cursadas. Ao marcar uma disciplina, seus pré-requisitos serão
            automaticamente marcados também. Arraste para a direita para ver mais semestres.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Disciplinas do curso</h2>
              <p className="text-sm text-gray-500">Total: {disciplinasData.length} disciplinas</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-navy-950 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">Cursada</span>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded-sm mr-2"></div>
                <span className="text-sm text-gray-600">Não cursada</span>
              </div>
            </div>
          </div>

          {/* Botões de navegação horizontal */}
          <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
            <Button variant="outline" size="sm" onClick={() => scrollHorizontal("left")} className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>
            <Button variant="outline" size="sm" onClick={() => scrollHorizontal("right")} className="flex items-center">
              Próximo <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Container com scroll horizontal */}
          <div ref={scrollContainerRef} className="overflow-x-auto pb-6 pt-4 px-4" style={{ scrollbarWidth: "thin" }}>
            <div className="flex flex-nowrap gap-6" style={{ minWidth: "max-content" }}>
              {/* Renderizar cada semestre como uma coluna */}
              {Object.entries(disciplinasPorSemestre).map(([semestre, disciplinas], semestreIndex) => (
                <div key={semestre} className="flex flex-col gap-4" style={{ minWidth: "280px" }}>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{semestre}º Semestre</h3>
                    <div
                      className="h-1 w-20 mx-auto rounded-full"
                      style={{
                        backgroundColor: coresSemestre[Number(semestre) - 1].split(" ")[0].replace("bg-", "bg-"),
                      }}
                    ></div>
                  </div>

                  {/* Disciplinas do semestre */}
                  <div className="flex flex-col gap-4">
                    {disciplinas.map((disciplina) => {
                      const cursada = disciplinasCursadas.includes(disciplina.codigo)
                      const corBase = coresSemestre[Number(semestre) - 1]
                      const corCursada = coresCursadas[Number(semestre) - 1]

                      return (
                        <div
                          key={disciplina.codigo}
                          className={`p-4 rounded-lg border-2 shadow-sm transition-all cursor-pointer hover:shadow-md ${
                            cursada ? corCursada : corBase
                          }`}
                          onClick={() => toggleDisciplina(disciplina.codigo)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-sm">{disciplina.codigo}</span>
                            {cursada && <Check className="h-4 w-4" />}
                          </div>
                          <h4 className="font-medium text-sm mb-2 line-clamp-2">{disciplina.nome}</h4>
                          <div className="flex justify-between items-center text-xs">
                            <span>{disciplina.cargaHoraria}h</span>
                            {disciplina.preRequisitos.length > 0 && (
                              <span className="opacity-70">{disciplina.preRequisitos.length} pré-req.</span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{disciplinasCursadas.length}</span> de{" "}
                  <span className="font-medium">{disciplinasData.length}</span> disciplinas cursadas
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-navy-950 h-2 rounded-full"
                    style={{ width: `${(disciplinasCursadas.length / disciplinasData.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <Link
                href={`/preferencias?disciplinasCursadas=${encodeURIComponent(JSON.stringify(disciplinasCursadas))}`}
              >
                <Button
                  className="bg-navy-950 hover:bg-navy-900 text-white rounded-lg transition-all hover:shadow-lg flex items-center gap-2 group"
                  disabled={disciplinasCursadas.length === 0}
                >
                  Continuar
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
