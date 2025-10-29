const project = (() => {
	const path = require("node:path");
	try {
		const { configureProjects } = require("react-native-test-app");

		return configureProjects({
			ios: {
				sourceDir: path.join("example", "ios"),
			},
		});
	} catch (e) {
		return undefined;
	}
})();

module.exports = {
	dependencies: {
		"@exodus/react-native-menu": {
			root: __dirname,
		},
	},
	...(project ? { project } : undefined),
};
