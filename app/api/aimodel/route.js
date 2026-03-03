// app/api/trip/route.js  (or pages/api/trip.js — adapt as needed)

export async function POST(req) {
  try {
    const body = await req.json();
    const tripData = body.tripData || {};

    // ── Step-by-step collection ──────────────────────────────────────────────
    if (!tripData.from) {
      return Response.json({
        reply: "✈️ Which city are you traveling from?",
        ui: "text",
        field: "from",
        done: false,
      });
    }

    if (!tripData.to) {
      return Response.json({
        reply: `Great! Traveling from **${tripData.from}**. 🌍 Where would you like to go?`,
        ui: "text",
        field: "to",
        done: false,
      });
    }

    if (!tripData.group) {
      return Response.json({
        reply: "Who are you traveling with?",
        ui: "groupSize",
        field: "group",
        done: false,
      });
    }

    if (!tripData.budget) {
      return Response.json({
        reply: "What's your budget range?",
        ui: "budget",
        field: "budget",
        done: false,
      });
    }

    if (!tripData.days) {
      return Response.json({
        reply: "How many days are you planning? 🗓️",
        ui: "days",
        field: "days",
        done: false,
      });
    }

    // ── All data collected → generate trip ──────────────────────────────────
    const FINAL_PROMPT = `You are a travel planner. Generate a detailed trip plan and respond ONLY with valid JSON — no markdown, no backticks, no explanation.

Output schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string",
        "hotel_image_url": "string",
        "geo_coordinates": { "latitude": 0, "longitude": 0 },
        "rating": 0,
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": { "latitude": 0, "longitude": 0 },
            "place_address": "string",
            "ticket_pricing": "string",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}`;
console.log("KEY EXISTS:", !!process.env.OPENROUTER_API_KEY);
    const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Navix AI",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: FINAL_PROMPT },
          {
            role: "user",
            content: `Create a ${tripData.days}-day trip plan from ${tripData.from} to ${tripData.to} for ${tripData.group} with a ${tripData.budget} budget.`,
          },
        ],
        response_format: { type: "json_object" }, // forces JSON output
      }),
    });

    const data = await aiResponse.json();

    if (!data.choices) {
      console.error("OpenRouter Error:", data);
      return Response.json({ error: "AI request failed" }, { status: 500 });
    }

    let tripPlan;
    try {
      const raw = data.choices[0].message.content;
      tripPlan = JSON.parse(raw);
    } catch (e) {
      console.error("JSON parse error:", e);
      return Response.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return Response.json({
      done: true,
      ui: "tripResult",
      tripPlan,
    });

  } catch (error) {
    console.error("FULL ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}