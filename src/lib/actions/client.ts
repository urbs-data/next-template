import { SafeActionResult } from 'next-safe-action';
import { z } from 'zod';

export const isActionSuccessful = <T extends z.ZodType>(
  action?: SafeActionResult<string, T, any, any, any>
): action is {
  data: T;
  serverError: undefined;
  validationError: undefined;
} => {
  if (!action) {
    return false;
  }

  if (action.serverError) {
    return false;
  }

  if (action.validationErrors) {
    return false;
  }

  return true;
};

export const resolveActionResult = async <T extends z.ZodType>(
  action: Promise<SafeActionResult<string, T, any, any, any> | undefined>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    action
      .then((result) => {
        if (isActionSuccessful(result)) {
          resolve(result.data);
        } else {
          reject(result?.serverError ?? 'Something went wrong');
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
