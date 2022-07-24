import Joi from "joi";

import { TestInputs } from "../services/testsService";

const testSchema = Joi.object<TestInputs>({
    name: Joi.string().email().required(),
    pdfUrl: Joi.string().uri().required(),
    category: Joi.string().required(),
    teacher: Joi.string().required()
});

export default testSchema;