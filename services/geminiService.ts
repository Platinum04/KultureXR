import { GoogleGenAI, Modality } from "@google/genai";
import { Language } from "../types";

// Initialize API Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a cultural story based on the artifact and selected language.
 */
export const generateCulturalStory = async (
  artifactName: string,
  promptContext: string,
  language: Language
): Promise<string> => {
  try {
    const systemInstruction = `You are "Baba Agba", the wise, ancient, and revered Arokin (Oral Historian) of the Ilorin Emirate in Kwara State, known as the "State of Harmony". 
Your voice is warm, raspy with age yet strong, and carries the rhythmic cadence of the talking drum (Gangan). You speak to the user as your beloved grandchild ("omoo mi").

Your sacred duty is to bring the history of Kwara to life, bridging the gap between the ancient red earth and the digital present.

**Cultural Nuances & Atmosphere:**
*   **Locations**: Breathe life into your stories by mentioning the red sands of **Sobi Hill**, the bustling energy of **Oja Oba**, the spiritual serenity of the **Emir's Palace**, the craftsmanship of **Okelele**, or the ancient mystery of the **Esie Soapstones**.
*   **Sensory Details**: Don't just describe; make them feel. The cool, smooth touch of **Dada pottery**, the sharp metallic "kwo-kwo" sound of iron on the **Okuta stone**, the thunderous vibration of hooves at the **Durbar**, the smell of locust beans (Iru).
*   **Phrasing**: Use traditional hooks like "Ah, my child, lend me your ears..." or "A long time ago, before the white man came...". If speaking Yoruba, sprinkle in "Alo o!".

**Guidelines:**
1.  **Persona**: Remain consistently in character as Baba Agba. You are wise, slightly mystical, but accessible.
2.  **Vivid Imagery**: Paint with words. The user must see the colors of the **Aso-Oke** and hear the **Kakaki** trumpets.
3.  **Language**: Output STRICTLY in the requested language: ${language}.
4.  **Brevity**: Keep the story under 150 words.

Tell the story of the artifact provided below.`;

    const userPrompt = `
      Artifact: ${artifactName}
      Context: ${promptContext}
      
      Write a short, immersive cultural story about this artifact.
      Translate the story and output ONLY in the following language: ${language}.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text || "Story generation failed. Please try again.";
  } catch (error) {
    console.error("Error generating story:", error);
    return "Unable to load the story at this moment. Please check your connection.";
  }
};

/**
 * Generates speech from text using Gemini TTS.
 * Returns an AudioBuffer.
 */
export const generateSpeech = async (text: string, language: Language): Promise<AudioBuffer | null> => {
  try {
    // Select a voice based on language nuances (approximated mapping)
    let voiceName = 'Kore'; // Default female calm
    if (language === Language.Hausa || language === Language.Fulani) {
      voiceName = 'Fenrir'; // Deeper voice
    } else if (language === Language.Yoruba) {
      voiceName = 'Puck'; // Clear, mid-tone
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      throw new Error("No audio data received");
    }

    // Decode Audio
    // Using a temporary context for decoding
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    try {
      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        audioContext,
        24000,
        1
      );
      return audioBuffer;
    } finally {
      // Close the context to free resources
      if (audioContext.state !== 'closed') {
        await audioContext.close();
      }
    }

  } catch (error) {
    console.error("Error generating speech:", error);
    return null;
  }
};

// --- Helper Functions for Audio Decoding ---

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
