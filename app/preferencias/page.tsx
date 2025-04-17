"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react"

export default function PreferenciasPage() {
  const [semestreAtual, setSemestreAtual] = useState("5")
  const [horasMaximas, setHorasMaximas] = useState(360)
  const [diasDisponiveis, setDiasDisponiveis] = useState("5")

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link href="/fluxograma" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o fluxograma
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Suas preferências</h1>
          <p className="text-gray-600 mb-8">
            Para otimizar seu plano de estudos, precisamos de algumas informações sobre sua situação atual e
            preferências.
          </p>

          <div className="space-y-8">
            <div>
              <Label htmlFor="semestre" className="text-gray-700 flex items-center gap-2">
                Semestre atual
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Label>
              <Select value={semestreAtual} onValueChange={setSemestreAtual}>
                <SelectTrigger className="mt-2 focus:ring-teal-500">
                  <SelectValue placeholder="Selecione seu semestre atual" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1}º Semestre
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="horas" className="text-gray-700 flex items-center gap-2">
                Carga horária máxima por semestre
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Label>
              <div className="mt-2">
                <Slider
                  value={[horasMaximas]}
                  min={180}
                  max={540}
                  step={30}
                  onValueChange={(value) => setHorasMaximas(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>180h (3 disciplinas)</span>
                  <span className="font-medium text-teal-600">
                    {horasMaximas}h ({Math.round(horasMaximas / 60)} disciplinas)
                  </span>
                  <span>540h (9 disciplinas)</span>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="dias" className="text-gray-700 flex items-center gap-2">
                Dias disponíveis para aulas por semana
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Label>
              <Select value={diasDisponiveis} onValueChange={setDiasDisponiveis}>
                <SelectTrigger className="mt-2 focus:ring-teal-500">
                  <SelectValue placeholder="Selecione os dias disponíveis" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 6 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} {i + 1 === 1 ? "dia" : "dias"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="prioridade" className="text-gray-700 flex items-center gap-2">
                Prioridade
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Label>
              <Select defaultValue="tempo">
                <SelectTrigger className="mt-2 focus:ring-teal-500">
                  <SelectValue placeholder="Selecione sua prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tempo">Formar no menor tempo possível</SelectItem>
                  <SelectItem value="equilibrio">Equilíbrio entre tempo e carga</SelectItem>
                  <SelectItem value="carga">Menor carga horária por semestre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Link href="/resultado">
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-lg text-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2 group">
                  Gerar meu plano de estudos
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
