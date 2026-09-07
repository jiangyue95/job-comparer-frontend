// Analysis status - mirror of the backend AnalysisStatus enum
export const ANALYSIS_STATUS = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
}

// Mirror of AnalysisStatus.isTerminal() on the backend
export function isTerminal(status) {
    return status === ANALYSIS_STATUS.COMPLETED || status === ANALYSIS_STATUS.FAILED
}

// The backend failure reason is an internal classification, not a message
// to put in front of a user.
export const FAILURE_MESSAGES = {
    PROVIDER_ERROR: 'The AI provider could not be reached. Please try again.',
    TIMEOUT: 'The analysis took too long and was stopped.',
    PARSE_ERROR: 'The AI returned an unexpected response. Please try again.',
    INPUT_UNAVAILABLE: 'The CV or job used for this analysis is no longer available.',
    INTERRUPTED: 'The analysis was interrupted by a server restart. Please try again.',
    INTERNAL_ERROR: 'Something went wrong. Please try again.',
}