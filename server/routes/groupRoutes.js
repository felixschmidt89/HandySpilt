import express from 'express';
import {
  createGroup,
  changeGroupName,
  listAllGroups,
  deleteAllGroups,
} from '../controllers/groupController.js';
import developmentOnly from '../middleware/developmentOnly.js';
import validateGroupCode from '../middleware/validateGroupCode.js';
import { validateGroupNamePropertyPresence } from '../middleware/validateRequestBody.js';
const router = express.Router();

// Create a new group
router.post('/', validateGroupNamePropertyPresence, createGroup);
// Update group name
router.patch(
  '/',
  validateGroupCode,
  validateGroupNamePropertyPresence,
  changeGroupName,
);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all groups
router.get('/debug/all', developmentOnly, listAllGroups);
// Delete all groups
router.delete('/debug/all', developmentOnly, deleteAllGroups);

export default router;
