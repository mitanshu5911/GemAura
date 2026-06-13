export const validateUserDetails = ({ name, email, password }) => {
  const errors = {};

  const trimmedName = name?.trim();

  if (!trimmedName) {
    errors.name = "Name is required";
  } else if (trimmedName.length < 3) {
    errors.name = "Name must contain at least 3 characters";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  if (!password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

