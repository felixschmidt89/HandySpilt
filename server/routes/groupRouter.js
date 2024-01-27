import express from 'express';
import {
  createGroup,
  changeGroupName,
  listAllGroups,
  deleteAllGroups,
  listGroupNamesByStoredGroupCodes,
  listExpensesAndPaymentsByGroup,
  getGroupInfo,
  validateGroupExistence,
  getGroupCurrency,
  changeGroupCurrency,
  changeGroupDataPurgeSetting,
} from '../controllers/groupController.js';
import developmentOnlyMiddleware from '../middleware/developmentOnlyMiddleware.js';
import {
  limiter,
  handleRateLimitExceedance,
} from '../middleware/handleRateLimitExceedanceMiddleware.js';
import validateGroupCodeMiddleware from '../middleware/validateGroupCodeMiddleware.js';
import { validateGroupNamePropertyPresenceMiddleware } from '../middleware/validateRequestBodyMiddleware.js';

const router = express.Router();

// Create a new group
router.post('/', createGroup);

// Change group name
router.patch('/:groupId', validateGroupCodeMiddleware, changeGroupName);

// List group names of locally stored groupCodes
router.get('/StoredGroupNames', listGroupNamesByStoredGroupCodes);

// Get group info by groupCode
router.get('/:groupCode', getGroupInfo);

// Get group currency by groupCode
router.get('/currency/:groupCode', getGroupCurrency);

// Change group currency by groupCode
router.patch('/currency/:groupCode', changeGroupCurrency);

// Change group inactiveDataPurge setting by groupCode
router.patch('/inactiveDataPurge/:groupCode', changeGroupDataPurgeSetting);

// Check if groupCode exists in database
router.get('/:groupCode/continuous-validate-existence', validateGroupExistence);

// Check if groupCode exists in database (limited)
router.get(
  '/:groupCode/limited-validate-existence',
  limiter,
  handleRateLimitExceedance,
  validateGroupExistence,
);

// List all expenses and payments of a group
router.get('/:groupCode/expenses-and-payments', listExpensesAndPaymentsByGroup);

// ROUTES FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY
// List all groups
router.get('/debug/all', developmentOnlyMiddleware, listAllGroups);
// Delete all groups
router.delete('/debug/all', developmentOnlyMiddleware, deleteAllGroups);

export default router;
