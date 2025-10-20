export const projects = [
  {
    id: "ai-radiologist",
    title: "AI-Radiologist",
    demo: "https://ai-radiologist.vercel.app/",
    ved:"https://drive.google.com/drive/folders/1riq5aVGt87GF9kAm3LzGFodv6VH8AhD_?usp=sharing",
    image: "/ai-radiologist.png", // الصورة الرئيسية
    screenshots: [
      "/screenshots/ai-radiologist-1.png",
      "/screenshots/ai-radiologist-2.png",
      "/screenshots/ai-radiologist-3.png",
      "/screenshots/ai-radiologist-4.png",
      "/screenshots/ai-radiologist-5.png",
      "/screenshots/ai-radiologist-6.png",
      "/screenshots/ai-radiologist-7.png",
      "/screenshots/ai-radiologist-8.png",
      "/screenshots/ai-radiologist-9.png",
      "/screenshots/ai-radiologist-10.png",

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
    ved:"https://drive.google.com/drive/folders/18u6i-OpWDY6iGxmnaSj6O53BT40VfikH?usp=sharing",
    image: "/ai-radiologist.png",
    screenshots: [
      "/screenshots/ai-radiologist-admin-1.png",
      "/screenshots/ai-radiologist-admin-2.png",
      "/screenshots/ai-radiologist-admin-3.png",
      "/screenshots/ai-radiologist-admin-4.png",
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
  
// {
//     id: "tabayyun",
//     title: "Tabayyun",
//     demo: "https://tabayyun.vercel.app/",
//     image: "/TABAYYUN_Dark.png",
//     screenshots: [
//       "/screenshots/Tabayyun-1.png",
//       "/screenshots/Tabayyun-2.png",
//       "/screenshots/Tabayyun-3.png",
//       "/screenshots/Tabayyun-4.png",
//       "/screenshots/Tabayyun-5.png",
//     ],
//     description:
//     "Tabayyun Business is a leading Saudi cybersecurity company committed to combating digital fraud across B2C, B2B, and B2G sectors",
//       keyFeatures: [
//   "Company and organization browsing with verified information.",
//   "Trusted identity verification system with official badges.",
//   "Interactive and modern UI built with React and Tailwind CSS.",
//   "Filtering companies by category or business type.",
//   "Detailed company pages with complete and transparent data.",
// ],

//     challenges: [
//       "Handling API rate limits and dynamic content.",
//       "Responsive carousel design.",
//       "Efficient data loading and pagination.",
//     ],
//     technologies: [
//       "Next.js",
//       "React.js",
//       "Tailwind CSS",
//       "Axios",
//       "REST APIs",
//     ],
//     detailsUrl: "/projects/tabayyun",
//   },
  {
    id: "tarf-ecommerce",
    title: "TARF (E-Commerce Web App)",
    demo:"https://tarf-shop.vercel.app/",
    ved: "https://drive.google.com/drive/folders/1fWH-A-KpLXpG1CT7iJsfmGJNgpb83alN?usp=sharing",
    image: "/tarf.png",
    screenshots: [
      "/screenshots/tarf-1.png",
      "/screenshots/tarf-2.png",
      "/screenshots/tarf-3.png",
      "/screenshots/tarf-4.png",
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
      "/screenshots/movie-web-app-4.png",
      "/screenshots/movie-web-app-5.png",
      "/screenshots/movie-web-app-6.png",
      "/screenshots/movie-web-app-7.png",
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
   {
  id: "furnishop",
  title: "FurniShop (Furniture E-Commerce Site)",
  demo: "https://furnishop-two-delta.vercel.app/", // إن وجد رابط مباشر
  ved: "https://drive.google.com/drive/folders/1uDtjFFvcM3yg4PaNMhXj4c1ssYbLthNu?usp=sharing", // غيّره إذا كان عندك فيديو
  image: "/furnishop.png",
  screenshots: [
    "/screenshots/furniShop-1.png",
    "/screenshots/furniShop-2.png",

  ],
  description:
    "FurniShop is an online store specializing in furniture and home decor, allowing users to browse products smoothly through a well-organized, responsive slider that works seamlessly across all devices.",
  keyFeatures: [
    "Showcase furniture products in a clean and user-friendly layout.",
    "Responsive product slider for smooth navigation across devices.",
    "Well-structured product pages and visual browsing experience.",
  ],
  challenges: [
    "Creating a mobile-first responsive design.",
    "Implementing smooth and optimized slider components.",
    "Maintaining consistent UX across devices.",
  ],
  technologies: [
    "React.js",
    "React Router",
    "Tailwind CSS",
    "Framer Motion",
    "Swiper.js",
    "Axios",
  ],
  detailsUrl: "/projects/furnishop",
  },
];
