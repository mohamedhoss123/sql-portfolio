export interface Project {
  thumbnail: string
  name: string
  description: string
  liveUrl?: string
}

export interface Skill {
  name: string
  image: string
}

export const projects: Project[] = [
  {
    thumbnail: "/assets/images/projects/tempmail.best.png",
    name: "TempMail.Best",
    description: "Best Temporary Email.",
    liveUrl: "https://tempmail.best",
  },
  {
    thumbnail: "/assets/images/projects/dns.surf.png",
    name: "DNS.Surf",
    description: "Querying DNS Resolution Results in Different Regions Worldwide.",
    liveUrl: "https://dns.surf",
  },
  {
    thumbnail: "/assets/images/projects/html.zone.png",
    name: "HTML.ZONE",
    description: "Web Toolbox.",
    liveUrl: "https://html.zone",
  },
  {
    thumbnail: "/assets/images/projects/sink.cool.png",
    name: "Sink",
    description: "A Simple / Speedy / Secure Link Shortener with Analytics.",
    liveUrl: "https://sink.cool",
  },
  {
    thumbnail: "/assets/images/projects/broadcast-channel.png",
    name: "BroadcastChannel",
    description: "Turn your Telegram Channel into a MicroBlog.",
    liveUrl: "https://github.com/ccbikai/BroadcastChannel",
  },
  {
    thumbnail: "/assets/images/projects/long.png",
    name: "L(O*62).ONG",
    description: "Make your URL looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooonger",
    liveUrl: "https://loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo.ong",
  },
]

export const skills: Skill[] = [
  { name: "React", image: "/react.svg" },
  { name: "Node.js", image: "/node.svg" },
  { name: "TypeScript", image: "/typescript.svg" },
  { name: "Tailwind CSS", image: "/tailwindcss.svg" },
  { name: "Javascript", image: "/javascript.svg" },
  { name: "Next.js", image: "/nextjs_icon_dark.svg" },
  {name:"nestjs",image:"/nestjs.svg"},
]
