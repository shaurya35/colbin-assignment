const { z } = require('zod');

const registerSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must be less than 100 characters'),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .optional()
});

const loginSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string()
    .min(1, 'Password is required')
});

const profileUpdateSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .optional(),
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  skills: z.array(z.string())
    .max(20, 'Maximum 20 skills allowed')
    .optional(),
  location: z.string()
    .max(100, 'Location must be less than 100 characters')
    .optional(),
  phone: z.string()
    .max(20, 'Phone must be less than 20 characters')
    .optional(),
  website: z.string()
    .url('Invalid website URL')
    .optional()
    .or(z.literal('')),
  linkedin: z.string()
    .url('Invalid LinkedIn URL')
    .optional()
    .or(z.literal('')),
  github: z.string()
    .url('Invalid GitHub URL')
    .optional()
    .or(z.literal('')),
  experience: z.string()
    .max(1000, 'Experience must be less than 1000 characters')
    .optional(),
  education: z.string()
    .max(1000, 'Education must be less than 1000 characters')
    .optional()
});

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  profileUpdateSchema,
  validate
};


