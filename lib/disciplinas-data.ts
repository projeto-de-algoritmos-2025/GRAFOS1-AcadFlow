// Dados das disciplinas do curso de Engenharia de Software
export const disciplinasData = [
  // 1º Semestre
  {
    codigo: "CIC0004",
    nome: "ALGORITMOS E PROGRAMAÇÃO DE COMPUTADORES",
    cargaHoraria: 90,
    semestre: 1,
    preRequisitos: [],
  },
  {
    codigo: "FGA0161",
    nome: "ENGENHARIA E AMBIENTE",
    cargaHoraria: 60,
    semestre: 1,
    preRequisitos: [],
  },
  {
    codigo: "FGA0163",
    nome: "INTRODUÇÃO À ENGENHARIA",
    cargaHoraria: 30,
    semestre: 1,
    preRequisitos: [],
  },
  {
    codigo: "FGA0168",
    nome: "DESENHO INDUSTRIAL ASSISTIDO POR COMPUTADOR",
    cargaHoraria: 90,
    semestre: 1,
    preRequisitos: [],
  },
  {
    codigo: "MAT0025",
    nome: "CÁLCULO 1",
    cargaHoraria: 90,
    semestre: 1,
    preRequisitos: [],
  },

  // 2º Semestre
  {
    codigo: "FGA0157",
    nome: "PROBABILIDADE E ESTATÍSTICA APLICADO A ENGENHARIA",
    cargaHoraria: 60,
    semestre: 2,
    preRequisitos: ["MAT0025"],
  },
  {
    codigo: "IFD0171",
    nome: "FISICA 1",
    cargaHoraria: 60,
    semestre: 2,
    preRequisitos: [],
  },
  {
    codigo: "IFD0173",
    nome: "FISICA 1 EXPERIMENTAL",
    cargaHoraria: 30,
    semestre: 2,
    preRequisitos: [],
  },
  {
    codigo: "MAT0026",
    nome: "CÁLCULO 2",
    cargaHoraria: 90,
    semestre: 2,
    preRequisitos: ["MAT0025"],
  },
  {
    codigo: "MAT0031",
    nome: "INTRODUCAO A ALGEBRA LINEAR",
    cargaHoraria: 60,
    semestre: 2,
    preRequisitos: [],
  },

  // 3º Semestre
  {
    codigo: "FGA0071",
    nome: "PRÁTICA DE ELETRÔNICA DIGITAL 1",
    cargaHoraria: 30,
    semestre: 3,
    preRequisitos: ["MAT0031"],
  },
  {
    codigo: "FGA0073",
    nome: "TEORIA DE ELETRÔNICA DIGITAL 1",
    cargaHoraria: 60,
    semestre: 3,
    preRequisitos: ["MAT0031"],
  },
  {
    codigo: "FGA0085",
    nome: "MATEMÁTICA DISCRETA 1",
    cargaHoraria: 60,
    semestre: 3,
    preRequisitos: [],
  },
  {
    codigo: "FGA0133",
    nome: "ENGENHARIA ECONÔMICA",
    cargaHoraria: 60,
    semestre: 3,
    preRequisitos: [],
  },
  {
    codigo: "FGA0158",
    nome: "ORIENTAÇÃO A OBJETOS",
    cargaHoraria: 60,
    semestre: 3,
    preRequisitos: ["CIC0004"],
  },
  {
    codigo: "FGA0160",
    nome: "MÉTODOS NUMÉRICOS PARA ENGENHARIA",
    cargaHoraria: 60,
    semestre: 3,
    preRequisitos: ["MAT0026"],
  },
  {
    codigo: "FGA0164",
    nome: "HUMANIDADES E CIDADANIA",
    cargaHoraria: 60,
    semestre: 3,
    preRequisitos: [],
  },

  // 4º Semestre
  {
    codigo: "FGA0108",
    nome: "MATEMÁTICA DISCRETA 2",
    cargaHoraria: 60,
    semestre: 4,
    preRequisitos: ["FGA0085"],
  },
  {
    codigo: "FGA0142",
    nome: "FUNDAMENTOS DE ARQUITETURA DE COMPUTADORES",
    cargaHoraria: 60,
    semestre: 4,
    preRequisitos: ["FGA0071", "FGA0073"],
  },
  {
    codigo: "FGA0146",
    nome: "ESTRUTURAS DE DADOS 1",
    cargaHoraria: 60,
    semestre: 4,
    preRequisitos: ["CIC0004"],
  },
  {
    codigo: "FGA0303",
    nome: "PROJETO INTEGRADOR DE ENGENHARIA 1",
    cargaHoraria: 60,
    semestre: 4,
    preRequisitos: [],
  },
  {
    codigo: "FGA0307",
    nome: "GESTÃO DA PRODUÇÃO E QUALIDADE",
    cargaHoraria: 60,
    semestre: 4,
    preRequisitos: ["FGA0133"],
  },
  {
    codigo: "FGA0312",
    nome: "MÉTODOS DE DESENVOLVIMENTO DE SOFTWARE",
    cargaHoraria: 60,
    semestre: 4,
    preRequisitos: ["FGA0158"],
  },

  // 5º Semestre
  {
    codigo: "FGA0003",
    nome: "COMPILADORES 1",
    cargaHoraria: 60,
    semestre: 5,
    preRequisitos: ["FGA0146"],
  },
  {
    codigo: "FGA0030",
    nome: "ESTRUTURAS DE DADOS 2",
    cargaHoraria: 60,
    semestre: 5,
    preRequisitos: ["FGA0146"],
  },
  {
    codigo: "FGA0137",
    nome: "SISTEMAS DE BANCO DE DADOS 1",
    cargaHoraria: 60,
    semestre: 5,
    preRequisitos: ["FGA0108"],
  },
  {
    codigo: "FGA0170",
    nome: "FUNDAMENTOS DE SISTEMAS OPERACIONAIS",
    cargaHoraria: 60,
    semestre: 5,
    preRequisitos: ["FGA0142"],
  },
  {
    codigo: "FGA0173",
    nome: "INTERAÇÃO HUMANO COMPUTADOR",
    cargaHoraria: 60,
    semestre: 5,
    preRequisitos: ["FGA0312"],
  },
  {
    codigo: "FGA0313",
    nome: "REQUISITOS DE SOFTWARE",
    cargaHoraria: 60,
    semestre: 5,
    preRequisitos: ["FGA0312"],
  },

  // 6º Semestre
  {
    codigo: "FGA0060",
    nome: "SISTEMAS DE BANCO DE DADOS 2",
    cargaHoraria: 60,
    semestre: 6,
    preRequisitos: ["FGA0137"],
  },
  {
    codigo: "FGA0124",
    nome: "PROJETO DE ALGORITMOS",
    cargaHoraria: 60,
    semestre: 6,
    preRequisitos: ["FGA0146"],
  },
  {
    codigo: "FGA0208",
    nome: "ARQUITETURA E DESENHO DE SOFTWARE",
    cargaHoraria: 60,
    semestre: 6,
    preRequisitos: ["FGA0313"],
  },
  {
    codigo: "FGA0211",
    nome: "FUNDAMENTOS DE REDES DE COMPUTADORES",
    cargaHoraria: 60,
    semestre: 6,
    preRequisitos: ["FGA0170"],
  },
  {
    codigo: "FGA0314",
    nome: "TESTES DE SOFTWARE",
    cargaHoraria: 60,
    semestre: 6,
    preRequisitos: ["FGA0313"],
  },
  {
    codigo: "FGA0315",
    nome: "QUALIDADE DE SOFTWARE 1",
    cargaHoraria: 60,
    semestre: 6,
    preRequisitos: ["FGA0307", "FGA0173"],
  },

  // 7º Semestre
  {
    codigo: "FGA0109",
    nome: "FUNDAMENTOS DE SISTEMAS EMBARCADOS",
    cargaHoraria: 60,
    semestre: 7,
    preRequisitos: ["FGA0170"],
  },
  {
    codigo: "FGA0210",
    nome: "PARADIGMAS DE PROGRAMAÇÃO",
    cargaHoraria: 60,
    semestre: 7,
    preRequisitos: ["FGA0003", "FGA0160"],
  },
  {
    codigo: "FGA0242",
    nome: "TÉCNICAS DE PROGRAMAÇÃO EM PLATAFORMAS EMERGENTES",
    cargaHoraria: 60,
    semestre: 7,
    preRequisitos: ["FGA0208", "FGA0314"],
  },
  {
    codigo: "FGA0244",
    nome: "PROGRAMAÇÃO PARA SISTEMAS PARALELOS E DISTRIBUÍDOS",
    cargaHoraria: 60,
    semestre: 7,
    preRequisitos: ["FGA0030", "FGA0211"],
  },

  // 8º Semestre
  {
    codigo: "FGA0288",
    nome: "ESTÁGIO SUPERVISIONADO",
    cargaHoraria: 210,
    semestre: 8,
    preRequisitos: [],
  },
  {
    codigo: "FGA0316",
    nome: "ENGENHARIA DE PRODUTO DE SOFTWARE",
    cargaHoraria: 60,
    semestre: 8,
    preRequisitos: ["FGA0242"],
  },
  {
    codigo: "FGA0317",
    nome: "GERÊNCIA DE CONFIGURAÇÃO E EVOLUÇÃO DE SOFTWARE",
    cargaHoraria: 60,
    semestre: 8,
    preRequisitos: ["FGA0314"],
  },

  // 9º Semestre
  {
    codigo: "FGA0287",
    nome: "TRABALHO DE CONCLUSÃO DE CURSO 1",
    cargaHoraria: 60,
    semestre: 9,
    preRequisitos: [],
  },
  {
    codigo: "FGA0304",
    nome: "PROJETO INTEGRADOR DE ENGENHARIA 2",
    cargaHoraria: 90,
    semestre: 9,
    preRequisitos: ["FGA0303"],
  },

  // 10º Semestre
  {
    codigo: "FGA0290",
    nome: "TRABALHO DE CONCLUSÃO DE CURSO 2",
    cargaHoraria: 90,
    semestre: 10,
    preRequisitos: ["FGA0287"],
  },
]
