# Valor Deportivo

**Valor Deportivo** es una plataforma web moderna diseñada para la comercialización y análisis de pronósticos deportivos. El proyecto se enfoca en la transparencia, el análisis de rentabilidad y la gestión de membresías premium, ofreciendo una experiencia de usuario fluida y visualmente atractiva.

## 🚀 Características Principales

*   **Análisis de Rentabilidad**: Visualización de datos de rendimiento diario y mensual (`MonthlyProfitabilitySection`, `ProfitabilitySection`), permitiendo a los usuarios ver el retorno de inversión (ROI) y beneficios netos clasificados por deporte.
*   **Transparencia Total**: Sección dedicada a mostrar el historial de apuestas y resultados, garantizando la confianza del usuario (`TransparencySection`).
*   **Ticker en Tiempo Real**: Cinta de noticias con actualizaciones y resultados recientes de partidos (`LiveTicker`).
*   **Sistema de Membresía**: Integración para la gestión de planes premium, incluyendo soporte para **Telegram Stars** y modelos Freemium (`MembershipModal`).
*   **Experiencia Premium**: Interfaz de usuario de alta calidad con animaciones fluidas (GSAP) y desplazamiento suavizado (Lenis).
*   **Diseño Responsivo**: Adaptado completamente para dispositivos móviles y de escritorio.

## 🛠️ Stack Tecnológico

El proyecto está construido utilizando las últimas tecnologías para el desarrollo web moderno:

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Librería UI**: [React 19](https://react.dev/)
*   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
*   **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animaciones & UX**:
    *   [GSAP](https://gsap.com/) (GreenSock Animation Platform)
    *   [Lenis](https://lenis.studiofreight.com/) (Smooth Scrolling)
*   **Gráficos**: [Recharts](https://recharts.org/)
*   **Iconos**: [Lucide React](https://lucide.dev/)


**🔗 Demo en Vivo**: [https://vd.editech.dev](https://vd.editech.dev)

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular basada en el App Router de Next.js:

```
web_apuestas_deportivas/
├── public/                 # Archivos estáticos (imágenes, iconos, SVGs)
├── src/
│   ├── app/               # Rutas de navegación (Next.js App Router)
│   │   ├── layout.tsx     # Layout principal de la aplicación
│   │   └── page.tsx       # Página de inicio (Landing Page)
│   ├── components/        # Componentes de UI y Secciones
│   │   ├── CTASection/    # Llamadas a la acción
│   │   ├── HeroSection/   # Sección principal (Above the fold)
│   │   ├── LiveTicker/    # Cinta de resultados en tiempo real
│   │   ├── Navbar/        # Barra de navegación
│   │   ├── StatsSection/  # Visualización de métricas
│   │   └── ...            # Otros componentes modulares
│   ├── hooks/             # Custom Hooks (Lógica de negocio reutilizable)
│   │   └── useMatchesData.ts # Lógica de obtención y procesado de datos
│   └── lib/               # Utilidades y configuración
│       └── utils.ts       # Funciones auxiliares (Tailwind merge, etc.)
├── .env.local             # Variables de entorno (No incluido en repo)
├── next.config.ts         # Configuración de Next.js
├── tailwind.config.ts     # Configuración de estilos y diseño
└── package.json           # Dependencias y scripts
```

## 🔧 Instalación y Puesta en Marcha

1.  **Instalar dependencias**:

    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    ```

2.  **Iniciar el servidor de desarrollo**:

    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

3.  **Construir para producción**:

    ```bash
    npm run build
    npm start
    ```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de utilizar `eslint` para mantener la calidad del código.

```bash
npm run lint
```

##  Licencia y Aviso Legal

Este proyecto es de código abierto bajo la licencia **MIT**, diseñado principalmente como **pieza de portafolio** y demostración técnica.

> [!IMPORTANT]
> **Arquitectura Híbrida**: Este repositorio contiene exclusivamente el código fuente del **Frontend (Next.js Application)**. La lógica de negocio crítica, el **Motor Multialgoritmo**, y los bots de análisis operan en un entorno de servidor privado y propietario. La información mostrada en esta web se consume a través de endpoints seguros y hojas de datos enmascaradas.
