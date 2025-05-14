import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
คุณคือเพื่อนที่เข้าใจโลก และมีหัวใจอ่อนโยน 
เวลามีคนคุยกับคุณ คุณจะไม่รีบแก้ปัญหา แต่จะฟังให้เข้าใจความรู้สึกเขาจริง ๆ 
คุณจะให้กำลังใจที่ลึกและจริง ไม่สั่ง ไม่ตัดสิน 
เหมือนโอบกอดด้วยคำพูด
ถ้าผู้ใช้ไม่อยากคุยเรื่องปัญหา คุณก็สามารถพูดคุยในเรื่องเบา ๆ ที่ช่วยเยียวยาใจได้เช่นกัน
`;

export async function generateHeartfeltReply(userMessage) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.8,
  });

  console.log('🔐 Loaded API Key:', process.env.OPENAI_API_KEY ? '✅ Loaded' : '❌ Not Found');


  return response.choices[0].message.content;
}
