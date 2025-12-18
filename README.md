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

## 📂 Estructura del Proyecto

El código fuente se encuentra principalmente en `src/`:

*   `src/app`: Rutas y páginas de la aplicación (Next.js App Router).
*   `src/components`: Componentes reutilizables y secciones de la landing page.
    *   `HeroSection`: Sección principal de bienvenida.
    *   `StatsSection`: Métricas clave del servicio.
    *   `CTASection`: Llamadas a la acción para conversión.
    *   ... y más secciones específicas de negocio.
*   `src/lib`: Utilidades y librerías auxiliares.
*   `src/hooks`: Hooks personalizados de React.

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
