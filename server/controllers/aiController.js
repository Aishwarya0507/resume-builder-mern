import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to handle OpenAI errors
const handleAIError = (error, res) => {
  console.error('AI Service Error:', error);
  
  if (!process.env.OPENAI_API_KEY) {
    return res.status(401).json({ 
      success: false, 
      message: 'AI service not configured.' 
    });
  }

  if (error.status === 429) {
    return res.status(429).json({
      success: false,
      message: 'AI quota exceeded. Please try again later or upgrade plan.'
    });
  }

  return res.status(500).json({
    success: false,
    message: 'AI service temporarily unavailable.'
  });
};

// @desc    Generate professional summary
// @route   POST /api/ai/generate-summary
// @access  Public (for now)
export const generateSummary = async (req, res) => {
  try {
    const { title, company, skills, experienceYears } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      return res.status(401).json({ success: false, message: 'AI service not configured.' });
    }

    const prompt = `Write a professional resume summary for a ${title || 'Professional'} ${company ? `targeting a role at ${company}` : ''}. 
    Highlight the following skills: ${skills && skills.length > 0 ? skills.join(', ') : 'their core competencies'}.
    Experience level: ${experienceYears || 'mid-level'}.
    Keep it concise (3-4 sentences), highly professional, and ATS-friendly. Do not use first-person pronouns (I, my).`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 150,
      temperature: 0.7,
    });

    res.status(200).json({
      success: true,
      data: completion.choices[0].message.content.trim(),
    });
  } catch (error) {
    handleAIError(error, res);
  }
};

// @desc    Improve a specific bullet point
// @route   POST /api/ai/improve-bullet
// @access  Public (for now)
export const improveBullet = async (req, res) => {
  try {
    const { text, role } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(401).json({ success: false, message: 'AI service not configured.' });
    }

    const prompt = `Rewrite the following resume bullet point to make it more impactful, using strong action verbs and quantifying achievements where possible. 
    ${role ? `Tailor it for a ${role} position.` : ''}
    Original bullet point: "${text}"
    Output ONLY the improved bullet point, nothing else.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.7,
    });

    res.status(200).json({
      success: true,
      data: completion.choices[0].message.content.trim(),
    });
  } catch (error) {
    handleAIError(error, res);
  }
};

// @desc    Suggest skills based on job target
// @route   POST /api/ai/suggest-skills
// @access  Public (for now)
export const suggestSkills = async (req, res) => {
  try {
    const { jobTitle } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(401).json({ success: false, message: 'AI service not configured.' });
    }

    const prompt = `List the top 15 most important skills (a mix of technical and soft skills) for a "${jobTitle}".
    Format the output as a simple comma-separated list without any numbers, bullet points, or categories.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 100,
      temperature: 0.7,
    });

    const skillsStr = completion.choices[0].message.content.trim();
    const skillsArray = skillsStr.split(',').map(s => s.trim());

    res.status(200).json({
      success: true,
      data: skillsArray,
    });
  } catch (error) {
    handleAIError(error, res);
  }
};

// Fallback logic for rule-based improvement
const improveWithRules = (resumeData) => {
  const updatedData = JSON.parse(JSON.stringify(resumeData));
  
  // 1. Improve Summary
  if (!updatedData.personalInfo.summary || updatedData.personalInfo.summary.length < 50) {
    updatedData.personalInfo.summary = `Accomplished professional with a proven track record of delivering high-quality results. Seeking to leverage expertise in ${updatedData.skills.technical[0] || 'core technologies'} to contribute to organizational success.`;
  } else {
    updatedData.personalInfo.summary = updatedData.personalInfo.summary
      .replace(/\b(i|me|my)\b/gi, '')
      .replace(/\b(led|handled|was in charge of)\b/gi, 'Spearheaded')
      .replace(/\b(did|helped)\b/gi, 'Contributed to')
      .trim();
  }

  // 2. Improve Experience
  const strongVerbs = {
    'led': 'Orchestrated',
    'managed': 'Spearheaded',
    'worked on': 'Developed',
    'helped': 'Collaborated on',
    'made': 'Engineered',
    'improved': 'Optimized',
    'started': 'Initiated',
    'finished': 'Concluded'
  };

  updatedData.experience = updatedData.experience.map(exp => {
    let desc = exp.description;
    Object.keys(strongVerbs).forEach(weak => {
      const regex = new RegExp(`\\b${weak}\\b`, 'gi');
      desc = desc.replace(regex, strongVerbs[weak]);
    });
    
    // Add quantification placeholder if not present
    if (!desc.includes('%') && !desc.includes('$') && desc.length > 20) {
      desc += "\n• Improved operational efficiency by 15% through strategic optimizations.";
    }
    
    return { ...exp, description: desc };
  });

  // 3. Improve Skills
  const commonMissing = ['Agile Methodology', 'Team Leadership', 'Problem Solving', 'Strategic Planning'];
  commonMissing.forEach(skill => {
    if (!updatedData.skills.soft.includes(skill) && updatedData.skills.soft.length < 8) {
      updatedData.skills.soft.push(skill);
    }
  });

  return updatedData;
};

// @desc    Auto-fix and improve full resume
// @route   POST /api/ai/auto-fix
// @access  Public
export const autoFixResume = async (req, res) => {
  const { resumeData } = req.body;
  console.log("Auto-Fix API Called with:", resumeData?.personalInfo?.firstName);

  try {
    // Step 3: Dummy response to ensure functionality works
    const updatedData = {
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        summary: "Highly motivated developer with strong problem-solving skills and experience building scalable web applications."
      }
    };

    // Simulate slight delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({
      success: true,
      data: updatedData,
      message: 'Resume improved successfully (Testing Mode)'
    });

  } catch (error) {
    console.error("Auto-Fix API Error:", error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during auto-fix'
    });
  }
};


