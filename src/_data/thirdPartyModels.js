// Self-serve (TEAMS_TIER_PRO) models from https://docs.devin.ai/desktop/models#self-serve (modelCostData), checked 2026-11-09 KST.
// Family names and variant labels are verbatim; `recommended` mirrors is_recommended in the docs data.
export default [
 {
  "id": "cognition",
  "name": "Cognition",
  "blurb": "Devin을 만든 Cognition의 자체 모델과 라우터",
  "openSource": false,
  "families": [
   {
    "name": "Adaptive",
    "variants": [],
    "recommended": true,
    "note": "작업마다 모델을 골라 주는 라우터"
   },
   {
    "name": "Fast Arena",
    "variants": [],
    "recommended": false,
    "note": null
   },
   {
    "name": "Hybrid Arena",
    "variants": [],
    "recommended": false,
    "note": null
   },
   {
    "name": "Frontier Arena",
    "variants": [],
    "recommended": false,
    "note": null
   },
   {
    "name": "SWE-1.6",
    "variants": [],
    "recommended": false,
    "note": null
   },
   {
    "name": "SWE-1.7",
    "variants": [
     "Max",
     "Medium"
    ],
    "recommended": false,
    "note": "이전 플래그십"
   },
   {
    "name": "SWE-2 Flash",
    "variants": [
     "High",
     "Max",
     "Medium"
    ],
    "recommended": true,
    "note": "Desktop·CLI 전용(Cloud 세션 불가). Free 플랜은 Medium만, High·Max는 유료 플랜"
   },
   {
    "name": "SWE-2",
    "variants": [
     "High",
     "Max",
     "Medium"
    ],
    "recommended": true,
    "note": "셀프서브 플랜은 2026년 11월 30일까지 Desktop·CLI에서 무료(Cloud 세션 제외)"
   },
   {
    "name": "SWE-check",
    "variants": [],
    "recommended": false,
    "note": "Quick Review용 경량 리뷰 모델"
   }
  ],
  "count": 14
 },
 {
  "id": "anthropic",
  "name": "Anthropic",
  "blurb": "Claude 계열",
  "openSource": false,
  "families": [
   {
    "name": "Claude Fable 5.1",
    "variants": [
     "High",
     "Low",
     "Max",
     "Medium",
     "XHigh"
    ],
    "recommended": true,
    "note": null
   },
   {
    "name": "Claude Fable 5",
    "variants": [
     "High",
     "Low",
     "Max",
     "Medium",
     "XHigh"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Claude Haiku 5.5",
    "variants": [
     "High",
     "Low",
     "Max",
     "Medium",
     "XHigh"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Claude Opus 4.6",
    "variants": [
     "기본",
     "1M",
     "Thinking",
     "Thinking 1M"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Claude Opus 4.7",
    "variants": [
     "High",
     "Low",
     "Max",
     "Medium",
     "XHigh"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Claude Opus 4.8",
    "variants": [
     "High",
     "High Fast",
     "Low",
     "Low Fast",
     "Max",
     "Max Fast",
     "Medium",
     "Medium Fast",
     "XHigh",
     "XHigh Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Claude Opus 5.5",
    "variants": [
     "High",
     "High Fast",
     "Low",
     "Low Fast",
     "Max",
     "Max Fast",
     "Medium",
     "Medium Fast",
     "XHigh",
     "XHigh Fast"
    ],
    "recommended": true,
    "note": null
   },
   {
    "name": "Claude Opus 5",
    "variants": [
     "High",
     "High Fast",
     "Low",
     "Low Fast",
     "Max",
     "Max Fast",
     "Medium",
     "Medium Fast",
     "XHigh",
     "XHigh Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Claude Sonnet 4.6",
    "variants": [
     "기본",
     "1M",
     "Thinking",
     "Thinking 1M"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Claude Sonnet 5.5",
    "variants": [
     "High",
     "Low",
     "Max",
     "Medium",
     "XHigh"
    ],
    "recommended": true,
    "note": null
   },
   {
    "name": "Claude Sonnet 5",
    "variants": [
     "High",
     "Low",
     "Max",
     "Medium",
     "XHigh"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Opus 4.7 Review",
    "variants": [],
    "recommended": false,
    "note": null
   }
  ],
  "count": 69
 },
 {
  "id": "openai",
  "name": "OpenAI",
  "blurb": "GPT 계열과 오픈 웨이트 GPT-OSS",
  "openSource": false,
  "families": [
   {
    "name": "GPT-OSS 120B",
    "variants": [
     "Medium Thinking"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-5.4 Mini",
    "variants": [
     "High Thinking",
     "Low Thinking",
     "Medium Thinking",
     "XHigh Thinking"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-5.4",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "No Thinking",
     "No Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-5.5 Review",
    "variants": [],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-5.5",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "No Thinking",
     "No Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-5.6 Luna",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Max Thinking",
     "Max Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "No Thinking",
     "No Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-5.6 Sol",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Max Thinking",
     "Max Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "No Thinking",
     "No Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-5.6 Terra",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Max Thinking",
     "Max Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "No Thinking",
     "No Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-6.1 Sol",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Max Thinking",
     "Max Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-6.1 Terra",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Max Thinking",
     "Max Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GPT-6 Astra",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Max Thinking",
     "Max Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": true,
    "note": null
   },
   {
    "name": "GPT-6 Luna",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Max Thinking",
     "Max Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "No Thinking",
     "No Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": true,
    "note": null
   },
   {
    "name": "GPT-6 Sol",
    "variants": [
     "High Thinking",
     "High Thinking Fast",
     "Low Thinking",
     "Low Thinking Fast",
     "Max Thinking",
     "Max Thinking Fast",
     "Medium Thinking",
     "Medium Thinking Fast",
     "No Thinking",
     "No Thinking Fast",
     "XHigh Thinking",
     "XHigh Thinking Fast"
    ],
    "recommended": true,
    "note": null
   }
  ],
  "count": 116
 },
 {
  "id": "google",
  "name": "Google",
  "blurb": "Gemini 계열",
  "openSource": false,
  "families": [
   {
    "name": "Gemini 3.5 Flash",
    "variants": [
     "High",
     "Low",
     "Medium",
     "Minimal"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Gemini 3.6 Flash",
    "variants": [
     "High",
     "Low",
     "Medium",
     "Minimal"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Gemini 3.7 Flash",
    "variants": [
     "High",
     "Low",
     "Medium"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Gemini 3.8 Flash",
    "variants": [
     "High",
     "Low",
     "Medium"
    ],
    "recommended": true,
    "note": null
   },
   {
    "name": "Gemini 4 Argon",
    "variants": [
     "High",
     "Low",
     "Medium"
    ],
    "recommended": true,
    "note": null
   }
  ],
  "count": 17
 },
 {
  "id": "xai",
  "name": "xAI",
  "blurb": "Grok 계열",
  "openSource": false,
  "families": [
   {
    "name": "Grok 4.6",
    "variants": [
     "High",
     "Low",
     "Medium",
     "XHigh"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Grok 4.7",
    "variants": [
     "High",
     "Low",
     "Medium",
     "XHigh"
    ],
    "recommended": false,
    "note": null
   }
  ],
  "count": 8
 },
 {
  "id": "deepseek",
  "name": "DeepSeek",
  "blurb": "DeepSeek V4 계열",
  "openSource": true,
  "families": [
   {
    "name": "DeepSeek V4.1 Flash",
    "variants": [
     "High",
     "Low",
     "Max",
     "None"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "DeepSeek V4 Flash",
    "variants": [
     "High",
     "Max"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "DeepSeek V4 Pro",
    "variants": [
     "High",
     "Max"
    ],
    "recommended": false,
    "note": null
   }
  ],
  "count": 8
 },
 {
  "id": "kimi",
  "name": "Kimi (Moonshot AI)",
  "blurb": "Kimi K 계열",
  "openSource": true,
  "families": [
   {
    "name": "Kimi K2.6",
    "variants": [],
    "recommended": false,
    "note": null
   },
   {
    "name": "Kimi K2.7",
    "variants": [],
    "recommended": false,
    "note": null
   },
   {
    "name": "Kimi K3.1 Pro",
    "variants": [
     "High",
     "Low",
     "Max",
     "Medium"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Kimi K3",
    "variants": [
     "High",
     "Low",
     "Max"
    ],
    "recommended": true,
    "note": null
   }
  ],
  "count": 9
 },
 {
  "id": "glm",
  "name": "GLM (Z.ai)",
  "blurb": "GLM-5 계열",
  "openSource": true,
  "families": [
   {
    "name": "GLM-5.2",
    "variants": [
     "High",
     "High 1M",
     "Max",
     "Max 1M",
     "No Thinking",
     "No Thinking 1M"
    ],
    "recommended": true,
    "note": null
   },
   {
    "name": "GLM-5.3 Flash",
    "variants": [
     "High",
     "Low",
     "Max"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "GLM-5.3",
    "variants": [
     "High",
     "Low",
     "Max"
    ],
    "recommended": true,
    "note": null
   }
  ],
  "count": 12
 },
 {
  "id": "nvidia",
  "name": "NVIDIA",
  "blurb": "Nemotron 계열",
  "openSource": true,
  "families": [
   {
    "name": "Nemotron 3.5 Super",
    "variants": [
     "High",
     "Medium",
     "None"
    ],
    "recommended": false,
    "note": null
   },
   {
    "name": "Nemotron 3 Ultra",
    "variants": [
     "High",
     "Medium",
     "None"
    ],
    "recommended": false,
    "note": null
   }
  ],
  "count": 6
 }
];
