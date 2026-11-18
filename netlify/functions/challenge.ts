import {
  generateOratoriaChallenge,
  validateChallengeInput,
} from "../../server/challengeService.ts";

export default async function handler(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Método não permitido. Utilize POST." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      },
    );
  }

  try {
    const body = await req.json();
    const input = validateChallengeInput(body);
    const challenge = await generateOratoriaChallenge(input);

    return new Response(JSON.stringify(challenge), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  } catch (error) {
    const err = error as Error & { status?: number; statusCode?: number };
    const status = err.statusCode ?? err.status ?? 400;
    return new Response(
      JSON.stringify({
        error:
          err.message ||
          "Ocorreu um erro ao gerar o desafio. Tente novamente dentro de instantes.",
      }),
      {
        status: status >= 400 && status < 600 ? status : 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      },
    );
  }
}
