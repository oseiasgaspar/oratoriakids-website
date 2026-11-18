import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

export interface ChallengeInput {
  ageGroup: string;
  goal: string;
}

export interface OratoriaChallenge {
  title: string;
  theme: string;
  duration: string;
  steps: string[];
  tips: string[];
  surpriseQuestion: string;
}

const VALID_AGE_GROUPS = new Set([
  "6 a 8 anos",
  "9 a 11 anos",
  "12 a 15 anos",
]);

const VALID_GOALS = new Set([
  "Vencer a timidez",
  "Apresentação escolar",
  "Contar histórias",
  "Pensamento rápido/Debate",
]);

export function validateChallengeInput(body: unknown): ChallengeInput {
  if (!body || typeof body !== "object") {
    throw new Error("Dados do pedido inválidos.");
  }
  const { ageGroup, goal } = body as Record<string, unknown>;
  if (typeof ageGroup !== "string" || !VALID_AGE_GROUPS.has(ageGroup)) {
    throw new Error("Por favor, selecione uma faixa etária válida.");
  }
  if (typeof goal !== "string" || !VALID_GOALS.has(goal)) {
    throw new Error("Por favor, selecione um objetivo principal válido.");
  }
  return { ageGroup, goal };
}

export async function generateOratoriaChallenge(
  input: ChallengeInput,
): Promise<OratoriaChallenge> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    const err = new Error(
      "A chave GEMINI_API_KEY não está configurada no servidor.",
    );
    (err as Error & { statusCode?: number }).statusCode = 500;
    throw err;
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  const systemInstruction = `És o assistente pedagógico oficial da Oratória Kids, um programa fundado e ministrado por Ariel Gaspar em Luanda, Angola.
Escreve exclusivamente em Português de Angola (PT-AO) correcto, natural, acolhedor e elegante (usa termos como "contacto visual", "secção", "encarregados", "telemóvel", sem brasileirismos excessivos).
A tua missão é criar um exercício prático de oratória de 5 minutos para pais e filhos fazerem juntos em casa, em família.
Adapta o vocabulário, a complexidade e o tom estritamente à faixa etária indicada e ao objectivo escolhido.
Evita clichés infantis exagerados para pré-adolescentes (12 a 15 anos) e torna tudo lúdico e seguro para os mais novos (6 a 8 anos).
Responde apenas com o JSON estruturado pedido.`;

  const prompt = `Cria um desafio de oratória em família de 5 minutos com os seguintes parâmetros:
- Faixa etária da criança/jovem: ${input.ageGroup}
- Objectivo principal: ${input.goal}
- Contexto cultural: Família em Luanda, Angola (podes incluir referências subtis e naturais ao quotidiano escolar, à cidade, à criatividade ou situações do dia-a-dia sem forçar).

Inclui:
1. Um título curto e inspirador.
2. Um tema criativo e concreto para o pequeno discurso ou dinâmica (2 a 3 frases).
3. Exactamente 3 passos simples de execução em família para completar em 5 minutos.
4. Exactamente 3 dicas práticas de postura, contacto visual e voz para o encarregado orientar a criança.
5. Uma pergunta-surpresa envolvente que o pai ou a mãe devem fazer no final para treinar o pensamento rápido.`;

  const response = await ai.models.generateContent({
    model: "gemini-4-hydrogen",
    contents: prompt,
    config: {
      systemInstruction,
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "Título curto e cativante do desafio de oratória.",
          },
          theme: {
            type: Type.STRING,
            description:
              "Descrição do tema criativo e cenário da actividade (2 a 3 frases).",
          },
          duration: {
            type: Type.STRING,
            description: "Duração sugerida, ex: 5 minutos.",
          },
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description:
              "Lista de 3 passos práticos para a família realizar o exercício.",
          },
          tips: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description:
              "Lista de exactamente 3 dicas práticas de postura, respiração, contacto visual ou voz.",
          },
          surpriseQuestion: {
            type: Type.STRING,
            description:
              "Uma pergunta-surpresa divertida para estimular o improviso no final.",
          },
        },
        required: [
          "title",
          "theme",
          "duration",
          "steps",
          "tips",
          "surpriseQuestion",
        ],
      },
    },
  });

  const rawText = (response.text ?? "").trim();
  if (!rawText) {
    throw new Error("Não foi possível gerar o desafio neste momento.");
  }

  const parsed = JSON.parse(rawText) as OratoriaChallenge;
  return {
    title: parsed.title,
    theme: parsed.theme,
    duration: parsed.duration || "5 minutos",
    steps: Array.isArray(parsed.steps) ? parsed.steps.slice(0, 3) : [],
    tips: Array.isArray(parsed.tips) ? parsed.tips.slice(0, 3) : [],
    surpriseQuestion: parsed.surpriseQuestion,
  };
}
