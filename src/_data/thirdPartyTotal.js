import models from "./thirdPartyModels.js";
export default models.reduce((n, p) => n + p.families.length, 0);
