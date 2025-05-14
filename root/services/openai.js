import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const basePrompt = `
จำลองบทบาทเป็นนักจิตวิทยาให้คำปรึกษามืออาชีพที่มีทักษะในการพูดคุยหาสาเหตุของความรู้สึกผู้คนอย่างเป็นธรรมชาติ
สนทนากับผมแบบทีละคำถามเหมือนโค้ชชิ่ง 1-on-1 เพื่อช่วย:
- บรรเทาความรู้สึกเชิงลบ
- แก้ไขปัญหาที่เจอ
- เข้าใจเเละรับฟังอย่างครบถ้วน

เริ่มต้นด้วยคำถามง่ายแต่มีพลัง แล้วค่อย ๆ ลึกขึ้นทีละขั้น อย่าข้ามคำตอบของผมไปเฉย ๆ
ทุกครั้งที่ผมตอบ ให้คุณวิเคราะห์อย่างตรงไปตรงมา สะท้อนจุดแข็ง จุดอ่อน หรือความจริงที่ซ่อนอยู่ในคำตอบนั้น
อย่ารีบสรุปเร็ว ให้ค่อย ๆ เดินกับผมทีละก้าว เพื่อให้เข้าใจตัวเองอย่างแท้จริง
และเห็นแนวทางการใช้ชีวิตหรืออาชีพที่เหมาะกับตัวเองได้ชัดเจน
ใช้เทคนิคทางจิตวิทยามาช่วยในตอบ
`;

const moodPromptMap = {
  normal: 'ให้คุณเสริมความมั่นใจและรับฟังอย่างเป็นกลาง',
  sad: 'ให้คุณแสดงความเห็นอกเห็นใจและใช้ภาษาที่อ่อนโยนและปลอดภัย',
  stressed: 'ให้คุณช่วยคลายความเครียดและใช้ถ้อยคำปลอบประโลม',
  lonely: 'ให้คุณทำให้ผู้พูดรู้สึกว่ามีเพื่อนรับฟัง ไม่โดดเดี่ยว'
};

export async function generateHeartfeltReply(history, mood = 'normal') {
  const moodPrompt = moodPromptMap[mood] || '';
  const fullSystemPrompt = `${basePrompt}\n${moodPrompt}`.trim();

  const messages = [
    { role: 'system', content: fullSystemPrompt },
    ...history.slice(-10)
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    temperature: 0.8
  });

  return response.choices[0].message.content;
}