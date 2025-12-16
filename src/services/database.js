/**
 * Database Abstraction Layer
 * 
 * This file provides stub functions for database operations.
 * Replace the implementations with your custom database solution.
 * 
 * Each function is documented with expected inputs/outputs.
 */

// ============================================
// USER OPERATIONS
// ============================================

/**
 * Create a new user record
 * @param {Object} userData - User data
 * @param {number} userData.age - User's age
 * @returns {Promise<string>} - Generated user ID
 */
export async function createUser(userData) {
    // TODO: Replace with your custom DB implementation
    // Example: await yourDB.users.insert({ age: userData.age, createdAt: new Date() });

    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    console.log('[DB Stub] Creating user:', { userId, ...userData });

    // Store in localStorage for demo purposes (remove when connecting real DB)
    const users = JSON.parse(localStorage.getItem('survey_users') || '[]');
    users.push({ userId, ...userData, createdAt: new Date().toISOString() });
    localStorage.setItem('survey_users', JSON.stringify(users));

    return userId;
}

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} - User object or null if not found
 */
export async function getUser(userId) {
    // TODO: Replace with your custom DB implementation
    console.log('[DB Stub] Getting user:', userId);

    const users = JSON.parse(localStorage.getItem('survey_users') || '[]');
    return users.find(u => u.userId === userId) || null;
}

// ============================================
// RESPONSE OPERATIONS
// ============================================

/**
 * Submit a user's response to a media item
 * @param {Object} responseData - Response data
 * @param {string} responseData.userId - User ID
 * @param {string} responseData.mediaId - Media item ID
 * @param {string} responseData.userAnswer - "AI" or "Real"
 * @param {string} responseData.reasoning - User's explanation
 * @returns {Promise<string>} - Generated response ID
 */
export async function submitResponse(responseData) {
    // TODO: Replace with your custom DB implementation
    // Example: await yourDB.responses.insert(responseData);

    const responseId = 'resp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    console.log('[DB Stub] Submitting response:', { responseId, ...responseData });

    // Store in localStorage for demo purposes
    const responses = JSON.parse(localStorage.getItem('survey_responses') || '[]');
    responses.push({ responseId, ...responseData, createdAt: new Date().toISOString() });
    localStorage.setItem('survey_responses', JSON.stringify(responses));

    // Update statistics
    await updateStatistics(responseData.mediaId, responseData.userAnswer);

    return responseId;
}

/**
 * Get all responses for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of response objects
 */
export async function getUserResponses(userId) {
    // TODO: Replace with your custom DB implementation
    console.log('[DB Stub] Getting responses for user:', userId);

    const responses = JSON.parse(localStorage.getItem('survey_responses') || '[]');
    return responses.filter(r => r.userId === userId);
}

// ============================================
// STATISTICS OPERATIONS
// ============================================

/**
 * Get statistics for a media item
 * @param {string} mediaId - Media item ID
 * @returns {Promise<Object>} - Statistics object with percentages
 */
export async function getStatistics(mediaId) {
    // TODO: Replace with your custom DB implementation
    console.log('[DB Stub] Getting statistics for media:', mediaId);

    const stats = JSON.parse(localStorage.getItem('survey_statistics') || '{}');

    if (!stats[mediaId]) {
        // Return default stats if none exist
        return {
            mediaId,
            totalResponses: 0,
            aiVotes: 0,
            realVotes: 0,
            percentageAI: 50,
            percentageReal: 50
        };
    }

    return stats[mediaId];
}

/**
 * Update statistics for a media item after a new response
 * @param {string} mediaId - Media item ID
 * @param {string} answer - "AI" or "Real"
 * @returns {Promise<void>}
 */
export async function updateStatistics(mediaId, answer) {
    // TODO: Replace with your custom DB implementation
    console.log('[DB Stub] Updating statistics for media:', mediaId, 'with answer:', answer);

    const stats = JSON.parse(localStorage.getItem('survey_statistics') || '{}');

    if (!stats[mediaId]) {
        stats[mediaId] = {
            mediaId,
            totalResponses: 0,
            aiVotes: 0,
            realVotes: 0,
            percentageAI: 50,
            percentageReal: 50
        };
    }

    stats[mediaId].totalResponses++;
    if (answer === 'AI') {
        stats[mediaId].aiVotes++;
    } else {
        stats[mediaId].realVotes++;
    }

    // Recalculate percentages
    const total = stats[mediaId].totalResponses;
    stats[mediaId].percentageAI = Math.round((stats[mediaId].aiVotes / total) * 100);
    stats[mediaId].percentageReal = Math.round((stats[mediaId].realVotes / total) * 100);

    localStorage.setItem('survey_statistics', JSON.stringify(stats));
}

/**
 * Get all statistics (for admin/analytics purposes)
 * @returns {Promise<Object>} - Object with all media statistics
 */
export async function getAllStatistics() {
    // TODO: Replace with your custom DB implementation
    console.log('[DB Stub] Getting all statistics');

    return JSON.parse(localStorage.getItem('survey_statistics') || '{}');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Clear all local data (for testing purposes)
 * Remove this function when connecting real DB
 */
export function clearAllData() {
    localStorage.removeItem('survey_users');
    localStorage.removeItem('survey_responses');
    localStorage.removeItem('survey_statistics');
    console.log('[DB Stub] All data cleared');
}

/**
 * Export all data (for debugging/migration)
 * @returns {Object} - All stored data
 */
export function exportAllData() {
    return {
        users: JSON.parse(localStorage.getItem('survey_users') || '[]'),
        responses: JSON.parse(localStorage.getItem('survey_responses') || '[]'),
        statistics: JSON.parse(localStorage.getItem('survey_statistics') || '{}')
    };
}
