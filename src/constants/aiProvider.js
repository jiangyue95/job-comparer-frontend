// AI provider enum values - mirror of backend AiProvider enum
export const AI_PROVIDER = {
    ANTHROPIC: 'ANTHROPIC',
    DEEPSEEK: 'DEEPSEEK'
}

// Display labels for AI providers
export const AI_PROVIDER_LABELS = {
    ANTHROPIC: 'Anthropic',
    DEEPSEEK: 'DeepSeek',
}

// Used for rendering dropdown options
export const AI_PROVIDER_OPTIONS = Object.values(AI_PROVIDER)

// Default selection of AI provider
export const DEFAULT_AI_PROVIDER = AI_PROVIDER.ANTHROPIC

// AI provider enum value colors
export const AI_PROVIDER_COLORS = {
    ANTHROPIC: 'bg-orange-100 text-orange-800',
    DEEPSEEK: 'bg-blue-100 text-blue-800',
}
