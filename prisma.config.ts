import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  earlyAccess: true,
  schema: {
    kind: "single",
    filePath: "./prisma/schema.prisma",
  },
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },
});
