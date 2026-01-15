import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SpaceCursor from "@/components/ui/SpaceCursor";
import Script from "next/script";

// Primary font - Clean, modern, slightly futuristic
const spaceGrotesk = Space_Grotesk({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Display font - For headings, space-themed
const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Mono font - For code and technical text
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  // Primary Meta Tags
  title: {
    default: "Gaurav Rathva | Software Engineer - Mobile & AI Developer",
    template: "%s | Gaurav Rathva",
  },
  description:
    "Gaurav Rathva is a Software Engineer specializing in Flutter, React Native, Android, and AI development. 3+ years experience building mobile apps and intelligent systems. Based in Vadodara, India.",
  keywords: [
    "Gaurav Rathva",
    "Software Engineer",
    "Mobile Developer",
    "Flutter Developer",
    "React Native Developer",
    "Android Developer",
    "AI Developer",
    "LangChain",
    "Python Developer",
    "Full Stack Developer",
    "Vadodara Developer",
    "India Software Engineer",
    "Cross-Platform Mobile Apps",
    "Agentic AI",
    "RAG Systems",
    "Next.js Developer",
  ],
  authors: [{ name: "Gaurav Rathva", url: "https://gauravrathva.dev" }],
  creator: "Gaurav Rathva",
  publisher: "Gaurav Rathva",

  // Open Graph Meta Tags (for social sharing)
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gauravrathva.dev",
    siteName: "Gaurav Rathva Portfolio",
    title: "Gaurav Rathva | Software Engineer - Mobile & AI Developer",
    description:
      "Software Engineer specializing in Flutter, React Native, and AI development. Building beautiful, intelligent applications.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gaurav Rathva - Software Engineer Portfolio",
      },
    ],
  },

  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Rathva | Software Engineer",
    description:
      "Mobile & AI Developer | Flutter, React Native, LangChain Expert",
    images: ["/og-image.png"],
    creator: "@gauravrathva",
  },

  // Robots and Crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your verification codes)
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  // Additional
  category: "technology",
  classification: "Portfolio",

  // Alternate languages (if applicable)
  alternates: {
    canonical: "https://gauravrathva.dev",
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest for PWA
  manifest: "/site.webmanifest",

  // Theme
  metadataBase: new URL("https://gauravrathva.dev"),
};

// JSON-LD Structured Data for SEO
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gaurav Rathva",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer specializing in mobile app development (Flutter, React Native) and AI systems (LangChain, RAG). 3+ years of experience building cross-platform applications.",
  url: "https://gauravrathva.dev",
  email: "gauravrathva8@gmail.com",
  telephone: "+919265681173",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Vadodara",
    addressRegion: "Gujarat",
    addressCountry: "India",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "MS University of Baroda",
  },
  knowsAbout: [
    "Flutter",
    "React Native",
    "Android Development",
    "React.js",
    "Next.js",
    "Python",
    "LangChain",
    "Artificial Intelligence",
    "Machine Learning",
    "Mobile App Development",
    "Cross-Platform Development",
  ],
  sameAs: ["https://www.linkedin.com/in/gauravrathva-4aa815224"],
  worksFor: {
    "@type": "Organization",
    name: "Digiflux IT Solutions",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gaurav Rathva Portfolio",
  url: "https://gauravrathva.dev",
  description:
    "Portfolio website of Gaurav Rathva, a Software Engineer specializing in mobile and AI development.",
  author: {
    "@type": "Person",
    name: "Gaurav Rathva",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Gaurav Rathva - Software Engineering Services",
  description:
    "Professional software engineering services specializing in mobile app development, AI systems, and full-stack web development.",
  provider: {
    "@type": "Person",
    name: "Gaurav Rathva",
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  serviceType: [
    "Mobile App Development",
    "AI Development",
    "Web Development",
    "Cross-Platform Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://gauravrathva.dev" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${orbitron.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SpaceCursor />
        {children}
      </body>
    </html>
  );
}
