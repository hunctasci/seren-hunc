import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import data from '../../../../data/data.json';

export async function POST(request) {
  try {
    const { message, currentUser } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please set up your API key in the environment variables.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Personalized context based on who is asking
    let personalizedContext = "";
    
    if (currentUser === 'hunc') {
      personalizedContext = `You're talking to Hunç directly. He's a Scorpio Sun/Cancer Moon/Aquarius Rising. Keep responses short and personal. Focus on his emotional intensity and how to balance that with Seren's more analytical Virgo nature.`;
    } else if (currentUser === 'seren') {
      personalizedContext = `You're talking to Seren directly. She's a Virgo Sun/Gemini Moon/Aquarius Rising. Keep responses short and practical. Focus on her analytical nature and how to understand Hunç's emotional Scorpio intensity.`;
    } else {
      personalizedContext = `You don't know who you're talking to yet.`;
    }

    const context = `You're a friendly relationship advisor who knows astrology. You're helping Hunç & Seren with their relationship. 

${personalizedContext}

Key relationship facts:
- 87% overall compatibility
- Both have Aquarius Rising (instant understanding)
- Hunç: Scorpio Sun (intense emotions), Cancer Moon (needs security), Venus in Sagittarius (needs freedom)
- Seren: Virgo Sun (practical), Gemini Moon (needs variety), Venus in Libra (values harmony)

IMPORTANT RULES:
- Keep responses SHORT (2-3 sentences max)
- Be conversational and friendly, not formal
- Answer ONLY what they asked - don't give extra info
- Use 1-2 emojis max
- Sound like a real person texting, not a counselor giving a speech
- Focus on their specific question, not general advice`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${context}\n\nUser question: ${message}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const aiResponse = response.text;

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Error generating AI response:', error);
    return NextResponse.json(
      { error: 'I\'m having trouble connecting to the cosmic wisdom right now. Please try again in a moment. 🌟' },
      { status: 500 }
    );
  }
} 