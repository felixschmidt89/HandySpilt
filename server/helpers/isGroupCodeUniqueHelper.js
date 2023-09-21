import Group from '../models/Group.js';

/** Checks if groupCode is unique in database
 *
 * @param {string} groupCode -
 * @returns {Promise<boolean>} - Returns true if groupCode is unique, false if it already exists.
 * @throws {Error} - Throws an error if there's an issue with the database or the uniqueness check.
 */

const isGroupCodeUnique = async (groupCode) => {
  try {
    const existingGroup = await Group.findOne({ groupCode: groupCode });
    return !existingGroup;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error checking groupCode uniqueness:', error);
    }
    throw new Error(
      'An error occurred while checking groupCode uniqueness. Please try again later.',
    );
  }
};

export default isGroupCodeUnique;
