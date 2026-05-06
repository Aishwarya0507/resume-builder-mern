import Resume from '../models/Resume.js'
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
})

// @desc    Get all resumes for a user
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select('-__v')

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes,
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('user', 'firstName lastName email')

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    // Increment view count
    resume.viewCount += 1
    await resume.save()

    res.status(200).json({ success: true, data: resume })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user._id,
    })

    res.status(201).json({ success: true, data: resume })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({ success: false, message: messages.join(', ') })
    }
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    res.status(200).json({ success: true, data: resume })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id)

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    res.status(200).json({ success: true, message: 'Resume deleted successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Analyze resume (ATS scoring — AI stub)
// @route   POST /api/resumes/:id/analyze
// @access  Private
export const analyzeResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    // Check API Key
    if (!process.env.OPENAI_API_KEY) {
      return res.status(400).json({ success: false, message: 'OpenAI API key not configured' })
    }

    const prompt = `Analyze the following resume and return a JSON object evaluating its ATS score.
    Resume text:
    Title: ${resume.title}
    Summary: ${resume.personalInfo?.summary || ''}
    Experience: ${JSON.stringify(resume.experience)}
    Education: ${JSON.stringify(resume.education)}
    Skills: ${JSON.stringify(resume.skills)}
    
    The JSON object MUST have the following structure:
    {
      "overall": <number 0-100>,
      "breakdown": {
        "keywords": <number 0-100>,
        "formatting": <number 0-100>,
        "readability": <number 0-100>,
        "completeness": <number 0-100>,
        "impact": <number 0-100>
      },
      "suggestions": [
        "<string suggestion 1>",
        "<string suggestion 2>",
        "<string suggestion 3>"
      ]
    }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
      max_tokens: 500,
      temperature: 0.5,
    });

    const parsedScore = JSON.parse(completion.choices[0].message.content.trim());
    parsedScore.lastAnalyzed = new Date();

    resume.atsScore = parsedScore
    await resume.save()

    res.status(200).json({
      success: true,
      data: { resumeId: resume._id, ...parsedScore },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// @desc    Duplicate a resume
// @route   POST /api/resumes/:id/duplicate
// @access  Private
export const duplicateResume = async (req, res) => {
  try {
    const original = await Resume.findById(req.params.id)

    if (!original) {
      return res.status(404).json({ success: false, message: 'Resume not found' })
    }

    const duplicated = await Resume.create({
      ...original.toObject(),
      _id: undefined,
      title: `${original.title} (Copy)`,
      downloadCount: 0,
      viewCount: 0,
      createdAt: undefined,
      updatedAt: undefined,
    })

    res.status(201).json({ success: true, data: duplicated })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
