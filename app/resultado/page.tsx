"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Clock, GraduationCap } from "lucide-react"
import { planCourses } from "@/lib/courses/planCourses"
import { useSearchParams } from "next/navigation"
import softwareEngineering from "@/lib/courses/software"
import type { CompletedCourse } from "@/lib/courses/planCourses"

export default function ResultadoPage() {
  const [activeTab, setActiveTab] = useState("semestres")
  const searchParams = useSearchParams()

  // Pegar parâmetros da URL
  const currentSemester = Number.parseInt(searchParams.get("semestre") || "1", 10)
  const maxHours = Number.parseInt(searchParams.get("horasMaximas") || "360", 10)
  const diasDisponiveis = Number.parseInt(searchParams.get("diasDisponiveis") || "5", 10)
  const disciplinasCursadasRaw = searchParams.get("disciplinasCursadas") || "[]"

  // Converter as disciplinas cursadas para o formato correto
  let completedCourses: CompletedCourse[] = []
  try {
    const parsed = JSON.parse(disciplinasCursadasRaw)
    completedCourses = parsed.map((codigo: string) => ({ id: codigo }))
  } catch (error) {
    console.error("Erro ao processar disciplinas cursadas:", error)
    completedCourses = []
  }

  console.log("Disciplinas cursadas:", completedCourses)

  // Calcular o plano
  const resultado = planCourses(currentSemester, completedCourses, maxHours)

  // Filtrar disciplinas já cursadas do plano
  const disciplinasCursadasSet = new Set(completedCourses.map((c: CompletedCourse) => c.id))
  const semesterPlansFiltered = resultado.semesterPlans
    .map((semestre) => ({
      ...semestre,
      courses: semestre.courses.filter((codigo) => !disciplinasCursadasSet.has(codigo)),
    }))
    .filter((semestre) => semestre.courses.length > 0)

  // Calcular o semestre de formatura
  const anoAtual = new Date().getFullYear()
  const semestreAtual = new Date().getMonth() < 6 ? 1 : 2
  const anosParaFormar = Math.ceil(semesterPlansFiltered.length / 2)
  const semestreFormatura = semestreAtual === 1 ? 2 : 1
  const anoFormatura = anoAtual + anosParaFormar

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/preferencias" className="inline-flex items-center text-navy-950 hover:text-navy-800 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para preferências
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Image src="/logoNew.png" alt="AcadFlow Logo" width={50} height={50} />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Seu plano de estudos otimizado</h1>
                <p className="text-gray-600 mt-2">
                  Com base nas suas preferências e disciplinas já cursadas, criamos um plano otimizado para você.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <Card className="bg-gradient-to-br from-navy-950 to-blue-950 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Tempo para formatura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{semesterPlansFiltered.length} semestres</div>
                <p className="text-blue-100 text-sm mt-1">
                  Previsão: {semestreFormatura}º semestre de {anoFormatura}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-950 to-blue-light text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2" />
                  Carga horária restante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{resultado.totalRemainingHours}h</div>
                <p className="text-blue-100 text-sm mt-1">
                  Média de {Math.round(resultado.totalRemainingHours / semesterPlansFiltered.length)}h por semestre
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-light to-blue-500 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Disciplinas restantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {resultado.remainingCourses.filter((c) => !disciplinasCursadasSet.has(c)).length}
                </div>
                <p className="text-blue-100 text-sm mt-1">
                  Média de{" "}
                  {Math.round(
                    resultado.remainingCourses.filter((c) => !disciplinasCursadasSet.has(c)).length /
                      semesterPlansFiltered.length,
                  )}{" "}
                  por semestre
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="semestres">Visão por semestres</TabsTrigger>
                <TabsTrigger value="disciplinas">Lista de disciplinas</TabsTrigger>
              </TabsList>

              <TabsContent value="semestres" className="space-y-6">
                {semesterPlansFiltered.map((semestre) => (
                  <Card key={semestre.semester} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 py-4">
                      <CardTitle className="text-lg text-gray-800">
                        {semestre.semester}º Semestre
                        <span className="text-sm font-normal text-gray-500 ml-2">({semestre.totalHours} horas)</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100">
                        {semestre.courses.map((codigo) => {
                          const disciplina = softwareEngineering.disciplines.find((d) => d.codigo === codigo)!
                          return (
                            <div key={codigo} className="p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium text-gray-800">{disciplina.nome}</div>
                                  <div className="text-sm text-gray-500">{codigo}</div>
                                </div>
                                <div className="text-sm font-medium text-navy-950">{disciplina.cargaHoraria}h</div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="disciplinas">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {semesterPlansFiltered.flatMap((semestre) =>
                        semestre.courses.map((codigo) => {
                          const disciplina = softwareEngineering.disciplines.find((d) => d.codigo === codigo)!
                          return (
                            <div key={codigo} className="p-4 hover:bg-gray-50 transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium text-gray-800">{disciplina.nome}</div>
                                  <div className="text-sm text-gray-500">{codigo}</div>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-sm font-medium text-navy-950 mr-3">
                                    {disciplina.cargaHoraria}h
                                  </span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    {semestre.semester}º Semestre
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        }),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
