# AcadFlow - Planejamento Acadêmico Inteligente

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
</div>

## 📋 Sobre o Projeto

AcadFlow é um sistema de planejamento acadêmico para estudantes de Engenharia de Software da UnB, que utiliza conceitos de Grafos e Ordenação Topológica para otimizar o caminho até a formatura. O sistema analisa as dependências entre disciplinas (pré-requisitos, co-requisitos e bloqueios) e gera um plano de estudos personalizado baseado nas preferências do aluno.

## 🎥 Apresentação 
Assista a apresentação do trabalho no vídeo abaixo. Caso não esteja aparecendo, clique [aqui](https://youtu.be/V3wqctl_kco?si=BVsH8ywa-90Zda5A).
<center>
  
[![Apresentação no YouTube](https://img.youtube.com/vi/V3wqctl_kco/0.jpg)](https://www.youtube.com/watch?v=V3wqctl_kco)

</center>

### 🎯 Funcionalidades

- Visualização do fluxograma completo do curso
- Seleção de disciplinas já cursadas
- Personalização de preferências (semestre atual, carga horária, dias disponíveis)
- Geração de plano de estudos otimizado
- Visualização de métricas de progresso
- Organização de disciplinas por semestre

### 🧮 Uso de Grafos e Ordenação Topológica

O AcadFlow utiliza conceitos fundamentais de Grafos 1 para modelar as relações entre disciplinas:

- **Grafo de Dependências**: Cada disciplina é representada como um vértice, e as relações de pré-requisito, co-requisito e bloqueio são representadas como arestas direcionadas.
- **Ordenação Topológica**: O algoritmo de ordenação topológica é aplicado para determinar a sequência ideal de disciplinas, garantindo que todas as dependências sejam respeitadas.
- **Detecção de Ciclos**: O sistema identifica ciclos no grafo de dependências para evitar situações de bloqueio circular.
- **Cálculo de Impacto**: O impacto de cada disciplina é calculado com base no número de disciplinas que ela bloqueia diretamente e indiretamente.

## 👥 Equipe

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://avatars.githubusercontent.com/u/69125218?v=4" width="20%" alt="Edilberto Almeida Cantuária" />
      <br />
      <strong>Edilberto Almeida Cantuária</strong>
      <br />
      <em>Engenharia de Software/FCTE</em>
      <br />
      <em>Matrícula: 222014984</em>
      <br />
      <a href="mailto:edilbertounbfga@gmail.com">edilbertounbfga@gmail.com</a>
    </td>
    <td align="center" width="50%">
      <img src="https://avatars.githubusercontent.com/u/43351064?v=4" width="20%" alt="Kauan de Torres Eiras" />
      <br />
      <strong>Kauan de Torres Eiras</strong>
      <br />
      <em>Engenharia de Software/FCTE</em>
      <br />
      <em>Matrícula: 232014727</em>
      <br />
      <a href="mailto:232014727@aluno.unb.br">232014727@aluno.unb.br</a>
    </td>
  </tr>
</table>

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/projeto-de-algoritmos-2025/GRAFOS1-AcadFlow.git
   cd GRAFOS1-AcadFlow/code
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. Execute a build do projeto:
   ```bash
   npm run build
   # ou
   yarn build
   ```

4. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse o aplicativo em seu navegador:
   ```
   http://localhost:3000
   ```

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - Next.js 15.2.4
  - React 19
  - TypeScript 5
  - TailwindCSS 3.4.17
  - Radix UI (componentes acessíveis)
  - Lucide React (ícones)

- **Desenvolvimento**:
  - ESLint (linting)
  - Prettier (formatação de código)
  - TypeScript (tipagem estática)

## 📝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  <p>Desenvolvido com ❤️ por Edilberto Almeida Cantuária e Kauan de Torres Eiras</p>
  <p>Universidade de Brasília - Faculdade do Gama</p>
</div>
