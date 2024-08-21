import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		// "body-max-length": [1, "always", 100],
		// "body-max-line-length": [1, "always", 100],
		// Disable specific rules
		"header-max-length": [0], // Example: Disable header length check
		"type-empty": [0], // Example: Disable type empty check
		"subject-empty": [0], // Example: Disable subject empty check
	},
};

export default Configuration;
