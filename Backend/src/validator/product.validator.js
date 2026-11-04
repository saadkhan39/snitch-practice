import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    return next();
}

export const validateCreateProduct = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),
   body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
    body("priceCurrency").notEmpty().withMessage("Price currency is required"),
    validateRequest,
];