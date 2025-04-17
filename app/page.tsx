import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="AcadFlow Logo" width={40} height={40} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-navy-950 to-blue-950 bg-clip-text text-transparent">
            AcadFlow
          </h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <a href="#sobre" className="text-gray-700 hover:text-navy-950 transition-colors">
                Sobre
              </a>
            </li>
            <li>
              <a href="#como-funciona" className="text-gray-700 hover:text-navy-950 transition-colors">
                Como Funciona
              </a>
            </li>
            <li>
              <a href="#contato" className="text-gray-700 hover:text-navy-950 transition-colors">
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Forme-se mais rápido com um{" "}
            <span className="bg-gradient-to-r from-navy-950 to-blue-950 bg-clip-text text-transparent">
              planejamento inteligente
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            O AcadFlow organiza suas disciplinas por ordem de prioridade, otimizando seu percurso acadêmico e ajudando
            você a se formar no menor tempo possível.
          </p>
          <div className="pt-4">
            <Link href="/curso">
              <Button className="bg-navy-950 hover:bg-navy-900 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all hover:shadow-lg flex items-center gap-2 group">
                Iniciar
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative w-full h-[400px] flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="AcadFlow Logo"
              width={300}
              height={300}
              className="object-contain rounded-lg animate-float"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="como-funciona" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Como o AcadFlow funciona</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-light rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Visualize seu fluxo</h3>
              <p className="text-gray-600">
                Veja todas as disciplinas do seu curso organizadas em um fluxograma interativo, com pré-requisitos
                claramente indicados.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-950 rounded-full flex items-center justify-center mb-6">
                <Clock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Otimize seu tempo</h3>
              <p className="text-gray-600">
                Informe suas preferências e restrições, e o AcadFlow criará um plano personalizado para você se formar
                no menor tempo possível.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-navy-950 rounded-full flex items-center justify-center mb-6">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Acompanhe seu progresso</h3>
              <p className="text-gray-600">
                Marque as disciplinas já cursadas e veja seu progresso em tempo real, com estimativas atualizadas para
                sua formatura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Em apenas 3 passos</h2>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-0 md:left-1/2 h-full w-0.5 bg-blue-200 transform md:-translate-x-1/2"></div>

              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center mb-16">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800">Selecione seu curso</h3>
                  <p className="text-gray-600 mt-2">
                    Escolha seu curso e o AcadFlow carregará automaticamente todas as disciplinas e seus pré-requisitos.
                  </p>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-navy-950 rounded-full text-white font-bold shadow-lg">
                  1
                </div>
                <div className="flex-1 md:pl-8 hidden md:block"></div>
              </div>

              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center mb-16">
                <div className="flex-1 md:text-right md:pr-8 hidden md:block"></div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-950 rounded-full text-white font-bold shadow-lg">
                  2
                </div>
                <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800">Marque o que já cursou</h3>
                  <p className="text-gray-600 mt-2">
                    Indique as disciplinas que você já concluiu e o sistema automaticamente reconhecerá os
                    pré-requisitos satisfeitos.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800">Receba seu plano otimizado</h3>
                  <p className="text-gray-600 mt-2">
                    Com base nas suas preferências, o AcadFlow criará um plano semestral otimizado para você se formar
                    no menor tempo possível.
                  </p>
                </div>
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-light rounded-full text-white font-bold shadow-lg">
                  3
                </div>
                <div className="flex-1 md:pl-8 hidden md:block"></div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/curso">
              <Button className="bg-navy-950 hover:bg-navy-900 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all hover:shadow-lg flex items-center gap-2 mx-auto group">
                Começar agora
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="AcadFlow Logo" width={40} height={40} />
                <h2 className="text-2xl font-bold text-white">AcadFlow</h2>
              </div>
              <p className="text-gray-400 mt-2">Planejamento acadêmico inteligente</p>
            </div>

            <div className="flex gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-light transition-colors">
                      Início
                    </a>
                  </li>
                  <li>
                    <a href="#sobre" className="text-gray-400 hover:text-blue-light transition-colors">
                      Sobre
                    </a>
                  </li>
                  <li>
                    <a href="#como-funciona" className="text-gray-400 hover:text-blue-light transition-colors">
                      Como Funciona
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Contato</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="mailto:contato@acadflow.com"
                      className="text-gray-400 hover:text-blue-light transition-colors"
                    >
                      contato@acadflow.com
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-blue-light transition-colors">
                      Suporte
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AcadFlow. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
