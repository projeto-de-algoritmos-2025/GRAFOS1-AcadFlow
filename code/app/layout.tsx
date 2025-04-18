import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AcadFlow",
  description: "Otimize o planejamento do seu ciclo academico com o AcadFlow",
  generator: "AcadFlow",
  icons: {
    icon: "../logo.png",
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <title>AcadFlow</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}