import { StatusCodes } from 'http-status-codes';
import Expense from '../models/Expense.js';
import User from '../models/User.js';
import sendInternalErrorHelper from '../helpers/sendInternalErrorHelper.js';
import logDevErrorHelper from '../helpers/logDevErrorHelper.js';

/** Creates a new expense
 *  Updates totalExpenseAmountPaid by expense payer and totalExpenseBenefittedAmount from by expense beneficiaries
 */
export const createExpense = async (req, res) => {
  try {
    const {
      userName,
      groupCode,
      expenseName,
      expenseAmount,
      expenseBeneficiariesNames,
    } = req.body;

    const expensePayer = await User.findOne({ userName, groupCode });

    const expenseBeneficiaries = await User.find({
      userName: { $in: expenseBeneficiariesNames },
      groupCode,
    });

    const expenseAmountPerBeneficiary =
      expenseAmount / expenseBeneficiaries.length;

    const beneficiaryIds = expenseBeneficiaries.map((user) => user._id);

    const newExpense = new Expense({
      expenseName,
      expenseAmount,
      expenseAmountPerBeneficiary,
      groupCode,
      expensePayer: expensePayer._id,
      expenseBeneficiaries: beneficiaryIds,
    });

    const expense = await newExpense.save();

    // Update total expenses paid by expense payer
    await expensePayer.updateTotalExpensesPaid();

    // Update total expenses benefitted from by expense beneficiaries concurrently
    await Promise.all(
      expenseBeneficiaries.map(async (beneficiary) => {
        await beneficiary.updateTotalExpenseBenefitted();
      }),
    );

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: { expense },
      message: 'Expense created successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error creating expense:', error);
    sendInternalErrorHelper(res);
  }
};

export const getExpenseInfo = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId)
      .populate('expensePayer', 'userName')
      .populate('expenseBeneficiaries', 'userName');

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { expense },
      message: 'Expense info retrieved successfully.',
    });
  } catch (error) {
    logDevErrorHelper('Error retrieving expense info', error);
    sendInternalErrorHelper(res);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;
    console.log(expenseId);

    const expenseToDelete = await Expense.findById(expenseId)
      .populate('expensePayer')
      .populate('expenseBeneficiaries');

    console.log(expenseToDelete);

    const { expensePayer, expenseBeneficiaries } = expenseToDelete;

    // Delete the expense using the retrieved _id
    await Expense.deleteOne({ _id: expenseToDelete._id });

    // Update total expenses paid by the expense payer
    await expensePayer.updateTotalExpensesPaid();

    // Update total expenses benefitted from by expense beneficiaries concurrently
    await Promise.all(
      expenseBeneficiaries.map(async (beneficiary) => {
        await beneficiary.updateTotalExpenseBenefitted();
      }),
    );

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    logDevErrorHelper('Error deleting expense', error);
    sendInternalErrorHelper(res);
  }
};

export const listAllExpensesByGroupCode = async (req, res) => {
  try {
    const { groupCode } = req.params;
    const expenses = await Expense.find({ groupCode });
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: expenses.length,
      data: { expenses },
      message: 'Group expenses retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing expenses', error);
    sendInternalErrorHelper(res);
  }
};

// FOR DEVELOPMENT/DEBUGGING PURPOSES ONLY

export const listAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(StatusCodes.OK).json({
      status: 'success',
      results: expenses.length,
      data: { expenses },
      message: 'All expenses retrieved successfully',
    });
  } catch (error) {
    logDevErrorHelper('Error listing all expenses', error);
    sendInternalErrorHelper(res);
  }
};

export const deleteAllExpenses = async (req, res) => {
  try {
    await Expense.deleteMany();
    await User.updateMany(
      {},
      { totalExpensesPaidAmount: 0, totalExpenseBenefittedAmount: 0 },
    );

    res.status(StatusCodes.NO_CONTENT).json({
      status: 'success',
      data: null,
      message: 'All expenses deleted successfully.',
    });
  } catch (error) {
    logDevErrorHelper('Error deleting all expenses:', error);
    sendInternalErrorHelper(res);
  }
};
