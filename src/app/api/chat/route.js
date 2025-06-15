import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';
import data from '../../../../data/data.json';

export async function POST(request) {
  try {
    const { message } = await request.json();

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

    const context = `You are a wise and loving relationship counselor specializing in astrological compatibility. You are helping Hunç (Scorpio Sun, Cancer Moon, Aquarius Rising) and Seren (Virgo Sun, Gemini Moon, Aquarius Rising) with their relationship.

Here is their complete astrological compatibility analysis:
${JSON.stringify(data, null, 2)}

Key points about their relationship:
- Overall compatibility: ${data.compatibilityScores.overall}%
- They share Aquarius Rising, creating instant understanding
- Hunç is emotionally intense (Scorpio/Cancer) while Seren is practical and analytical (Virgo/Gemini)
- Their relationship has transformative potential and strong long-term prospects
- They complement each other beautifully in most areas

Respond as a warm, wise counselor who understands their unique cosmic connection. Use emojis occasionally and reference their astrological aspects when relevant. Keep responses helpful, loving, and supportive. Address them personally and reference their specific astrological makeup when giving advice.`;

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