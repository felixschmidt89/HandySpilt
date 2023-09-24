import { StatusCodes } from 'http-status-codes';
import Expense from '../models/Expense.js';
import User from '../models/User.js';
import obtainGroupObjectIdByGroupCodeHelper from '../helpers/obtainGroupObjectIdByGroupCodeHelper.js';

export const createExpense = async (req, res) => {
  const {
    userName,
    groupObjectId,
    groupCode,
    expenseName,
    expenseAmount,
    expenseBeneficiariesNames,
  } = req.body;

  try {
    const expensePayer = await User.findOne({ userName, groupObjectId });

    if (!expensePayer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Expense payer not found.' });
    }

    const expenseBeneficiaries = await User.find({
      userName: { $in: expenseBeneficiariesNames },
      groupObjectId,
    });

    const beneficiaryIds = expenseBeneficiaries.map((user) => user._id);

    const newExpense = new Expense({
      expenseName,
      expenseAmount,
      groupCode,
      groupObjectId,
      expensePayer: expensePayer._id,
      expenseBeneficiaries: beneficiaryIds,
    });

    // Save the expense to the database
    const expense = await newExpense.save();

    return res.status(StatusCodes.CREATED).json(expense);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error updating user name:', error);
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
};

export const listAllExpensesByGroupCode = async (req, res) => {
  try {
    const groupCode = req.params.groupCode;
    const groupObjectId = await obtainGroupObjectIdByGroupCodeHelper(groupCode);
    const expenses = await Expense.find({ groupObjectId });
    res.status(StatusCodes.OK).json({ message: 'Group expenses', expenses });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error finding expenses:', error);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error. Please try again later.' });
  }
};
