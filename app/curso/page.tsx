"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import courses from "@/lib/courses"

export default function CursoPage() {
  const [curso, setCurso] = useState("")
  const [pesquisando, setPesquisando] = useState(false)
  const [cursoSelecionado, setCursoSelecionado] = useState("")

  const cursosSugeridos = courses.map((course) => course.name)

  const handlePesquisar = () => {
    setPesquisando(true)
    // Simular pesquisa
    setTimeout(() => {
      setPesquisando(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-navy-950 hover:text-navy-800 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-center mb-6">
            <Image src="/logoNew.png" alt="AcadFlow Logo" width={80} height={80} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Selecione seu curso</h1>
          <p className="text-gray-600 mb-8">
            Digite o nome do seu curso para visualizar o fluxograma de disciplinas e começar a planejar sua jornada
            acadêmica.
          </p>

          <div className="space-y-6">
            <div>
              <Label htmlFor="curso" className="text-gray-700">
                Nome do curso
              </Label>
              <div className="flex mt-2">
                <Input
                  id="curso"
                  placeholder="Ex: Engenharia de Software"
                  value={curso}
                  onChange={(e) => setCurso(e.target.value)}
                  className="rounded-r-none focus-visible:ring-blue-500"
                />
                <Button
                  onClick={handlePesquisar}
                  disabled={!curso || pesquisando}
                  className="rounded-l-none bg-navy-950 hover:bg-navy-900"
                >
                  {pesquisando ? "Pesquisando..." : <Search className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {curso && (
              <div className="animate-fadeIn">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Cursos sugeridos</h3>
                <div className="space-y-2">
                  {cursosSugeridos
                    .filter((c) => c.toLowerCase().includes(curso.toLowerCase()))
                    .map((cursoItem, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          cursoSelecionado === cursoItem
                            ? "border-navy-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                        }`}
                        onClick={() => {
                          setCursoSelecionado(cursoItem)
                          setCurso(cursoItem)
                        }}
                      >
                        <p className="font-medium text-gray-800">{cursoItem}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <Link href={cursoSelecionado ? "/fluxograma" : "#"}>
                <Button
                  className="w-full bg-navy-950 hover:bg-navy-900 text-white py-6 rounded-lg text-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2 group"
                  disabled={!cursoSelecionado}
                >
                  Visualizar fluxograma
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
