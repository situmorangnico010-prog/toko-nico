import "server-only";

import Anthropic from "@anthropic-ai/sdk";

export class AIConfigurationError extends Error {}

export function createAIClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  const model = process.env.ANTHROPIC_MODEL?.trim();

  if (!apiKey) {
    throw new AIConfigurationError("Kunci API Claude belum diatur.");
  }

  if (!model) {
    throw new AIConfigurationError("Model Claude belum diatur.");
  }

  return {
    client: new Anthropic({ apiKey }),
    model,
  };
}
