"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routers/user"));
const DependencyContainer_1 = require("./middleware/DependencyContainer");
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 5000;
const app = (0, express_1.default)();
new DependencyContainer_1.DependencyContainer();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(user_1.default);
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}, http://localhost:${PORT}`);
});
//# sourceMappingURL=main.js.map