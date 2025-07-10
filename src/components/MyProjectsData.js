export const projects = [
  {
    id: "ai-radiologist",
    title: "AI-Radiologist (Medical Imaging Platform)",
    demo: "https://mohammed-invs7.github.io/AI_Radiologist/",
    image: "/ai-radiologist.png", // الصورة الرئيسية
    screenshots: [
      "/screenshots/ai-radiologist-1.png",
      "/screenshots/ai-radiologist-2.png",
      "/screenshots/ai-radiologist-3.png",
    ],
    description:
      "A responsive medical imaging platform that allows users to upload and analyze X-ray images using AI-powered diagnostics. It includes secure authentication, dynamic routing, user/admin dashboards, and full report management.",
    keyFeatures: [
      "Responsive web interface for X-ray analysis using AI.",
      "Dynamic routing and protected dashboards (login/register/dashboard).",
      "Upload, predict, and manage reports via RESTful APIs.",
    ],
    challenges: [
      "Handling file uploads securely.",
      "Maintaining auth state across components.",
      "Mobile optimization and responsive UI.",
    ],
    technologies: [
      "React.js",
      "React Router",
      "Axios",
      "React Hook Form",
      "Yup",
      "Context API",
      "Bootstrap 5",
      "SweetAlert2",
      "Framer Motion",
      "JWT",
    ],
    detailsUrl: "/projects/ai-radiologist",
  },
  {
    id: "ai-radiologist-admin",
    title: "AI-Radiologist Admin Dashboard",
    image: "/ai-radiologist.png",
    screenshots: [
      "/screenshots/ai-radiologist-admin-1.png",
      "/screenshots/ai-radiologist-admin-2.png",
    ],
    description:
      "A standalone admin dashboard for managing users, reports, and AI diagnostic models. Features include CRUD operations, role and status management, secure admin-only routes, and responsive design.",
    keyFeatures: [
      "Standalone admin dashboard to manage users, reports, and AI models.",
      "CRUD operations with role assignment and status toggling.",
      "Protected routes for managing sensitive data.",
    ],
    challenges: [
      "User permission handling.",
      "Secure admin-only routing.",
      "Responsive layout for tables and cards.",
    ],
    technologies: [
      "React.js",
      "React Router",
      "Axios",
      "React Hook Form",
      "Yup",
      "Context API",
      "JWT",
      "SweetAlert2",
      "React Toastify",
      "Bootstrap 5",
      "Framer Motion",
    ],
    detailsUrl: "/projects/ai-radiologist-admin",
  },
  {
    id: "tarf-ecommerce",
    title: "TARF (E-Commerce Web App)",
    image: "/tarf.png",
    screenshots: [
      "/screenshots/tarf-1.png",
      "/screenshots/tarf-2.png",
    ],
    description:
      "A modern online store built with Next.js and Tailwind CSS. Supports product listings, detailed product pages, shopping cart, and checkout with Redux state management for user sessions.",
    keyFeatures: [
      "Product listing, details, shopping cart, and checkout.",
      "Redux state management for cart and user sessions.",
      "SEO-friendly routing with Next.js.",
    ],
    challenges: [
      "Cart state persistence.",
      "API data integration for products and user flow.",
      "Optimized mobile-first layout.",
    ],
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "Axios",
      "REST APIs",
      "React Toastify",
      "React Hook Form",
      "Yup",
      "Context API",
    ],
    detailsUrl: "/projects/tarf-ecommerce",
  },
  {
    id: "movie-web-app",
    title: "Movie Web App",
    demo: "https://movie-web-app-lilac.vercel.app/",
    image: "/movie.png",
    screenshots: [
      "/screenshots/movie-web-app-1.png",
      "/screenshots/movie-web-app-2.png",
      "/screenshots/movie-web-app-3.png",
    ],
    description:
      "A movie browsing app featuring category filters, genre pages, and detailed movie information. Uses TMDB API with responsive carousels and dynamic routing.",
    keyFeatures: [
      "Movie browsing with category filters and genre pages.",
      "Detailed pages using TMDB API.",
      "Sliders and carousels built with Swiper.js.",
    ],
    challenges: [
      "Handling API rate limits and dynamic content.",
      "Responsive carousel design.",
      "Efficient data loading and pagination.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Swiper.js",
      "Axios",
      "REST APIs",
    ],
    detailsUrl: "/projects/movie-web-app",
  },
];
