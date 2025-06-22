const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Calculates cosine similarity between two vectors
exports.cosineSimilarity = (vecA, vecB) => {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

// Gets embedding vectors from OpenAI for a list of tags
const getEmbeddingsFromOpenAI = async (tags) => {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: tags,
  });
  return response.data.map(entry => entry.embedding);
}

// Generates an average embedding vector from dream tags
exports.processDreamTags = async (predictedTags) => {
  const lowerTags = predictedTags.map(t => t.toLowerCase());
  const newVectors = await getEmbeddingsFromOpenAI(lowerTags);

  const dim = newVectors[0].length;
  const meanEmbedding = Array(dim).fill(0);
  newVectors.forEach(vec => {
    vec.forEach((val, i) => {
      meanEmbedding[i] += val;
    });
  });
  for (let i = 0; i < dim; i++) {
    meanEmbedding[i] /= newVectors.length;
  }

  return {
    tagEmbedding: meanEmbedding
  };
}

// Extracts tags from dream scenes using GPT
exports.extractTagsOnly = async (scenes) => {
  const systemPrompt = `
    You are an assistant for analyzing dream scenes.

    Given a list of dream scenes, extract 8–15 key tags that summarize the dream's content.

    Tags may include:
    - visual elements (e.g., "rabbit", "mirror", "darkness")
    - emotions (e.g., "fear", "peace", "joy")
    - symbolic actions or themes (e.g., "escape", "growth", "loss")
    - abstract concepts (e.g., "isolation", "freedom", "acceptance")

    Only include tags that clearly appear in or are directly implied by the scenes.
    Do NOT invent or assume content not mentioned in the text.
    If there are fewer than 8 relevant tags, return only those that are justified.

    Avoid vague, generic, or overly abstract words.
    Return the result as valid JSON in this exact format:
    {
      "tags": ["tag1", "tag2", "tag3", ...]
    }
    `.trim();

    const userPrompt = `Scenes:\n` + scenes.map((s, i) => `${i + 1}. ${s}`).join('\n');

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ]
    });

    const raw = completion.choices[0].message.content;
    try {
        return JSON.parse(raw);
    } catch (error) {
        console.error("Failed to parse GPT response:", raw);
        throw new Error("Invalid JSON from GPT");
    }};
