// Job status enum values - mirror of backend JobStatus enum
export const JOB_STATUS = {
    SAVED: 'SAVED',
    APPLIED: 'APPLIED',
    INTERVIEWING: 'INTERVIEWING',
    OFFERED: 'OFFERER',
    REJECTED: 'REJECTED',
    DECLINED: 'DECLINED',
    ARCHIVED: 'ARCHIVED',
}

// Used for rendering dropdown options
export const JOB_STATUS_OPTIONS = Object.values(JOB_STATUS)