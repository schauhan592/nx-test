export const emailRegex = new RegExp(/\S+@\S+\.\S+/);

export const emailValidator = (email: string): boolean => {
  if (!email) {
    return false;
  } else if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};
