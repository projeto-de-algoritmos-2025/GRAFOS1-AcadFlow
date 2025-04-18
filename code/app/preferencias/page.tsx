"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function PreferenciasPage() {
  const [semestreAtual, setSemestreAtual] = useState("5");
  const [horasMaximas, setHorasMaximas] = useState(360);
  const [diasDisponiveis, setDiasDisponiveis] = useState("5");

  const searchParams = useSearchParams();
  const disciplinasCursadasParam =
    searchParams.get("disciplinasCursadas") || "[]";
  const [disciplinasCursadas, setDisciplinasCursadas] = useState<string[]>(
    JSON.parse(disciplinasCursadasParam)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/fluxograma"
          className="inline-flex items-center text-navy-950 hover:text-navy-800 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o fluxograma
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-center mb-6">
            <Image src="/logoNew.png" alt="AcadFlow Logo" width={80} height={80} />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Suas preferências
          </h1>
          <p className="text-gray-600 mb-8">
            Para otimizar seu plano de estudos, precisamos de algumas
            informações sobre sua situação atual e preferências.
          </p>

          <div className="space-y-8">
            <div>
              <Label htmlFor="semestre" className="text-gray-700 flex items-center gap-2">
                Semestre atual
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </Label>
              <Select value={semestreAtual} onValueChange={setSemestreAtual}>
                <SelectTrigger className="mt-2 focus:ring-blue-500">
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
              </Label>
              <div className="mt-2">
                <Slider
                  value={[horasMaximas]}
                  min={30}
                  max={480}
                  step={30}
                  onValueChange={(value) => setHorasMaximas(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>30h</span>
                  <span className="font-medium text-navy-950">
                    {horasMaximas}h ({Math.round(horasMaximas / 15)} créditos)
                  </span>
                  <span>480h</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={`/resultado?semestre=${semestreAtual}&horasMaximas=${horasMaximas}&diasDisponiveis=${diasDisponiveis}&disciplinasCursadas=${encodeURIComponent(
                  JSON.stringify(disciplinasCursadas)
                )}`}
              >
                <Button className="w-full bg-navy-950 hover:bg-navy-900 text-white py-6 rounded-lg text-lg font-medium transition-all hover:shadow-lg flex items-center justify-center gap-2 group">
                  Gerar meu plano de estudos
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
