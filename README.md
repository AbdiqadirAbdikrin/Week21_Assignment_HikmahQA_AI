# Week 21: Islamic Q&A with AI

## RESTful API Development with OpenAI Integration

## Introduction

You have learned the basics of Node.js and Express.js. Now let's test your knowledge of how to integrate AI into your application by prompting the OpenAI API endpoint.

### Task 1: Project Setup

1. Fork and Clone this project repository in your terminal
2. CD into the project base directory `cd Week21_Assignment_HikmahQA_AI`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with your database URL and OpenAI API key
5. Generate Prisma client and push schema to database:
   ```bash
   npm run db:generate
   npm run db:push
   ```
6. Start the server:
   ```bash
   npm run dev
   ```
7. The server will run on `http://localhost:3000`

## MVP Tasks

### Task 2: Configure Environment Variables - `.env`

**Location:** `.env`

Create a `.env` file with:

```env
DATABASE_URL="your-supabase-database-connection-url"
OPENAI_API_KEY="your-openai-api-key"
PORT=3000
```

### Task 3: Finish `questionService.js` file

**Location:** `services/questionService.js`

**Objective:** Complete the AI Islamic Q&A functionality by implementing the `answerQuestion` function.

**What you need to do:**

1. **Open the file** `services/questionService.js`
2. **Find the function** `answerQuestion({ question })`
3. **Follow the step-by-step instructions** in the comments
4. **Implement the AI integration** to answer Islamic questions using Quran and Hadith

### Task 4: Finish `questionRoute.js` file

**Location:** `routes/questionRoute.js`

**Objective:** Complete the route handler for the Islamic Q&A endpoint.

**What you need to do:**

1. **Open the file** `routes/questionRoute.js`
2. **Follow the step-by-step instructions** in the comments
3. **Import the service function** and handle the request/response

## API Endpoint

### Ask a Question

```
POST /api/question/ask
```

**Request Body:**

```json
{
  "question": "Why do Muslims fast in Ramadan?"
}
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Question answered successfully",
  "data": {
    "answer": "Muslims fast in Ramadan because Allah commanded...",
    "evidence": {
      "quran": [
        {
          "reference": "Surah Al-Baqarah 2:183",
          "text": "O you who have believed, fasting is prescribed for you..."
        }
      ],
      "hadith": [
        {
          "reference": "Sahih Bukhari 38",
          "text": "The Prophet (peace be upon him) said..."
        }
      ]
    },
    "disclaimer": "This is NOT a fatwa. Consult qualified scholars."
  }
}
```

## Project Structure

```
Week21_Assignment_HikmahQA_AI/
├── server.js                    # Main server file
├── package.json                 # Project dependencies
├── README.md                    # Project documentation
├── lib/
│   └── prisma.js                # Prisma client configuration
├── prisma/
│   └── schema.prisma            # Database schema
├── routes/
│   └── questionRoute.js         # Q&A route (COMPLETE THIS)
└── services/
    └── questionService.js       # AI Q&A logic (COMPLETE THIS)
```

## Testing

Use Postman or any HTTP client to test the API endpoint.

Good luck with your implementation!
