"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share2, Calendar, Clock, GraduationCap } from "lucide-react"

export default function ResultadoPage() {
  const [activeTab, setActiveTab] = useState("semestres")

  // Dados simulados do resultado
  const resultado = {
    tempoFormatura: 4, // semestres restantes
    cargaHoraria: 1560, // horas restantes
    disciplinasRestantes: 26,
    semestres: [
      {
        numero: 6,
        disciplinas: [
          { codigo: "FGA0060", nome: "SISTEMAS DE BANCO DE DADOS 2", cargaHoraria: 60 },
          { codigo: "FGA0124", nome: "PROJETO DE ALGORITMOS", cargaHoraria: 60 },
          { codigo: "FGA0208", nome: "ARQUITETURA E DESENHO DE SOFTWARE", cargaHoraria: 60 },
          { codigo: "FGA0211", nome: "FUNDAMENTOS DE REDES DE COMPUTADORES", cargaHoraria: 60 },
          { codigo: "FGA0314", nome: "TESTES DE SOFTWARE", cargaHoraria: 60 },
          { codigo: "FGA0315", nome: "QUALIDADE DE SOFTWARE 1", cargaHoraria: 60 },
        ],
      },
      {
        numero: 7,
        disciplinas: [
          { codigo: "FGA0109", nome: "FUNDAMENTOS DE SISTEMAS EMBARCADOS", cargaHoraria: 60 },
          { codigo: "FGA0210", nome: "PARADIGMAS DE PROGRAMAÇÃO", cargaHoraria: 60 },
          { codigo: "FGA0242", nome: "TÉCNICAS DE PROGRAMAÇÃO EM PLATAFORMAS EMERGENTES", cargaHoraria: 60 },
          { codigo: "FGA0244", nome: "PROGRAMAÇÃO PARA SISTEMAS PARALELOS E DISTRIBUÍDOS", cargaHoraria: 60 },
        ],
      },
      {
        numero: 8,
        disciplinas: [
          { codigo: "FGA0288", nome: "ESTÁGIO SUPERVISIONADO", cargaHoraria: 210 },
          { codigo: "FGA0316", nome: "ENGENHARIA DE PRODUTO DE SOFTWARE", cargaHoraria: 60 },
          { codigo: "FGA0317", nome: "GERÊNCIA DE CONFIGURAÇÃO E EVOLUÇÃO DE SOFTWARE", cargaHoraria: 60 },
        ],
      },
      {
        numero: 9,
        disciplinas: [
          { codigo: "FGA0287", nome: "TRABALHO DE CONCLUSÃO DE CURSO 1", cargaHoraria: 60 },
          { codigo: "FGA0304", nome: "PROJETO INTEGRADOR DE ENGENHARIA 2", cargaHoraria: 90 },
        ],
      },
      {
        numero: 10,
        disciplinas: [{ codigo: "FGA0290", nome: "TRABALHO DE CONCLUSÃO DE CURSO 2", cargaHoraria: 90 }],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/preferencias" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para preferências
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">Seu plano de estudos otimizado</h1>
            <p className="text-gray-600 mt-2">
              Com base nas suas preferências e disciplinas já cursadas, criamos um plano otimizado para você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Tempo para formatura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{resultado.tempoFormatura} semestres</div>
                <p className="text-teal-100 text-sm mt-1">Previsão: 2º semestre de 2026</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg text-gray-800">
                  <Clock className="h-5 w-5 mr-2 text-teal-600" />
                  Carga horária restante
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-800">{resultado.cargaHoraria} horas</div>
                <p className="text-gray-500 text-sm mt-1">
                  Média de {Math.round(resultado.cargaHoraria / resultado.tempoFormatura)} horas por semestre
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg text-gray-800">
                  <GraduationCap className="h-5 w-5 mr-2 text-teal-600" />
                  Disciplinas restantes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-800">{resultado.disciplinasRestantes}</div>
                <p className="text-gray-500 text-sm mt-1">
                  Média de {Math.round(resultado.disciplinasRestantes / resultado.tempoFormatura)} disciplinas por
                  semestre
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
                {resultado.semestres.map((semestre) => (
                  <Card key={semestre.numero} className="overflow-hidden">
                    <CardHeader className="bg-gray-50 py-4">
                      <CardTitle className="text-lg text-gray-800">
                        {semestre.numero}º Semestre
                        <span className="text-sm font-normal text-gray-500 ml-2">
                          ({semestre.disciplinas.reduce((acc, d) => acc + d.cargaHoraria, 0)} horas)
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100">
                        {semestre.disciplinas.map((disciplina) => (
                          <div key={disciplina.codigo} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-gray-800">{disciplina.nome}</div>
                                <div className="text-sm text-gray-500">{disciplina.codigo}</div>
                              </div>
                              <div className="text-sm font-medium text-teal-600">{disciplina.cargaHoraria}h</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="disciplinas">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {resultado.semestres.flatMap((semestre) =>
                        semestre.disciplinas.map((disciplina) => (
                          <div key={disciplina.codigo} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-gray-800">{disciplina.nome}</div>
                                <div className="text-sm text-gray-500">{disciplina.codigo}</div>
                              </div>
                              <div className="flex items-center">
                                <span className="text-sm font-medium text-teal-600 mr-3">
                                  {disciplina.cargaHoraria}h
                                </span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                  {semestre.numero}º Semestre
                                </span>
                              </div>
                            </div>
                          </div>
                        )),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50 flex flex-wrap gap-4 justify-center md:justify-end">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar PDF
            </Button>

            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>

            <Link href="/">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Voltar ao início</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
