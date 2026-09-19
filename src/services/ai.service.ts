import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the SDK. It will automatically use the GEMINI_API_KEY environment variable if available,
// but we explicitly pass it for clarity.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class AIService {
  static async generateMatchExplanation(employeeInfo: any, roleInfo: any): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
      return "AI explanation unavailable: Missing API key.";
    }

    try {
      // Use gemini-3.8-flash for fast text generation
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

      const prompt = `
      You are an expert HR Talent Matcher AI.
      Given the following Employee profile and the Target Role, write a brief, 2-3 sentence explanation of why this employee is a good fit for this role. Highlight key overlapping skills or experiences. 
      Keep it encouraging, professional, and very concise.

      Employee Profile:
      Name: ${employeeInfo.firstName} ${employeeInfo.lastName}
      Current Title: ${employeeInfo.title}
      Department: ${employeeInfo.department}

      Target Role:
      Title: ${roleInfo.title}
      Department: ${roleInfo.department}
      Description: ${roleInfo.description}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini AI Generation Error:", error);
      return "AI was unable to generate an explanation at this time.";
    }
  }
}
