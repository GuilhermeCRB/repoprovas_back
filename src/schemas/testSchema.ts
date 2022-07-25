import Joi from "joi";

import { TestInputs } from "../services/testsService";

const testSchema = Joi.object<TestInputs>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    category: Joi.string().required(),
    discipline: Joi.string().required(),
    teacher: Joi.string().required()
});

export default testSchema;