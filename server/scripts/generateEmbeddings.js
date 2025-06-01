require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const TAGS_PATH = path.join(__dirname, 'data', 'all_tags.json');
const OUTPUT_PATH = path.join(__dirname, 'openai_tag_embeddings.json');

async function generateEmbeddings() {
  const tags = JSON.parse(fs.readFileSync(TAGS_PATH, 'utf-8'));
  const embeddings = {};

  for (const tag of tags) {
    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: tag,
      });

      embeddings[tag] = response.data[0].embedding;
      console.log(`✅ Embedded: "${tag}"`);
    } catch (error) {
      console.error(`❌ Error embedding "${tag}":`, error.message);
    }

    // ניתן להוסיף השהיה אם יש יותר מדי קריאות – לפי צורך
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(embeddings, null, 2), 'utf-8');
  console.log(`🎉 Finished! Saved to: ${OUTPUT_PATH}`);
}

generateEmbeddings();
