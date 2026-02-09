export interface Project {
    id: string;
    name: string;
    short: string;
    gradient: string;
    tech: string[];
    status: 'Live' | 'Beta' | 'In Dev' | 'Archived';
    statusColor: 'green' | 'yellow' | 'blue' | 'gray';
    lastCommit: string;
    description: string;
    latency: string;
    version: string;
    features: string[];
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    duration: string;
    techStack: string[];
    status: string;
    description: string;
}

export interface Skill {
    id: string;
    category: string;
    proficiency: number; // 1-100
    items: string[];
}

export const projects: Project[] = [
    {
        id: '1001',
        name: 'E-Commerce API V2',
        short: 'EC',
        gradient: 'from-blue-500 to-cyan-400',
        tech: ["'React'", "'Node'", "'Postgres'"],
        status: 'Live',
        statusColor: 'green',
        lastCommit: '2023-10-24 14:30:00',
        description: 'A high-performance RESTful API designed for scalability. Features include JWT authentication, Redis caching, and Stripe payment integration.',
        latency: '24ms',
        version: '2.1.0',
        features: ['Auth', 'Payments', 'Caching']
    },
    {
        id: '1002',
        name: 'AI Image Gen SaaS',
        short: 'AI',
        gradient: 'from-purple-500 to-pink-500',
        tech: ["'Python'", "'FastAPI'", "'OpenAI'"],
        status: 'Beta',
        statusColor: 'yellow',
        lastCommit: '2023-11-02 09:15:22',
        description: 'SaaS platform for generating images using DALL-E 3 and Midjourney APIs. Includes multi-tenant support and image processing pipelines.',
        latency: '142ms',
        version: '0.9.5',
        features: ['Generative AI', 'Batch Processing', 'Webhooks']
    },
    {
        id: '1003',
        name: 'Legacy Portfolio v1',
        short: 'PF',
        gradient: 'from-gray-600 to-gray-800',
        tech: ["'HTML'", "'CSS'", "'JS'"],
        status: 'Archived',
        statusColor: 'gray',
        lastCommit: '2022-05-15 11:20:45',
        description: 'My first personal portfolio website. Simple static site showcasing early web development work.',
        latency: '8ms',
        version: '1.0.0',
        features: ['Responsive Design', 'Sass', 'Gulp']
    },
    {
        id: '1004',
        name: 'Finance Manager App',
        short: 'FM',
        gradient: 'from-green-500 to-teal-400',
        tech: ["'Vue'", "'Firebase'"],
        status: 'In Dev',
        statusColor: 'blue',
        lastCommit: '2023-12-01 16:45:00',
        description: 'Real-time personal finance tracking application with dynamic charts and automated expense categorization.',
        latency: '36ms',
        version: '0.4.0-alpha',
        features: ['Real-time DB', 'Charts', 'Auth']
    },
    {
        id: '1005',
        name: 'Design System UI Kit',
        short: 'DS',
        gradient: 'from-indigo-500 to-purple-600',
        tech: ["'Tailwind'", "'Storybook'"],
        status: 'Live',
        statusColor: 'green',
        lastCommit: '2023-09-10 10:10:10',
        description: 'A comprehensive set of UI components built with Tailwind CSS and React, documented in Storybook for cross-team consistency.',
        latency: '12ms',
        version: '1.2.4',
        features: ['Components', 'Tokens', 'Theming']
    },
];

export const experience: Experience[] = [
    {
        id: '2001',
        role: 'Senior Fullstack Engineer',
        company: 'TechFlow Systems',
        duration: '2021 - Present',
        techStack: ["'Next.js'", "'Typescript'", "'AWS'"],
        status: 'Active',
        description: 'Leading a team of 5 developers to rebuild the core SaaS platform. Optimized database queries resulting in 40% reduction in latency.'
    },
    {
        id: '2002',
        role: 'Backend Developer',
        company: 'DataStream Inc',
        duration: '2019 - 2021',
        techStack: ["'Python'", "'Go'", "'PostgreSQL'"],
        status: 'Completed',
        description: 'Designed and implemented high-throughput data processing pipelines. Managed microservices architecture with Kubernetes.'
    },
];

export const skills: Skill[] = [
    {
        id: '3001',
        category: 'Frontend',
        proficiency: 95,
        items: ['React', 'Next.js', 'Tailwind CSS', 'Typescript']
    },
    {
        id: '3002',
        category: 'Backend',
        proficiency: 88,
        items: ['Node.js', 'Python', 'PostgreSQL', 'Redis']
    },
    {
        id: '3003',
        category: 'DevOps',
        proficiency: 75,
        items: ['Docker', 'AWS', 'GitHub Actions', 'Terraform']
    }
];
