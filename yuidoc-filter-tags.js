function shouldKeepItem(item, options) {
	if (options["include-only-tags"]) {
		var include = [].concat(options["include-only-tags"]);

		for (var i = 0; i < include.length; i++) {
			if (item.hasOwnProperty(include[i]))
				return true;
		}

		return false;
	}

	if (options["dont-include-tags"]) {
		var dont = [].concat(options["dont-include-tags"]);

		for (var i = 0; i < dont.length; i++) {
			if (item.hasOwnProperty(dont[i]))
				return false;
		}

		return true;
	}

	return true;
}

module.exports = function(data, options) {
	console.log("Filtering tags...");

	if (options["include-only-tags"])
		console.log("Including only items with the tags: " + [].concat(options["include-only-tags"]));

	if (options["dont-include-tags"])
		console.log("Skipping items with the tags: " + [].concat(options["dont-include-tags"]));

	var allTags = [];

	if (options["include-only-tags"])
		allTags = allTags.concat(options["include-only-tags"]);

	if (options["dont-include-tags"])
		allTags = allTags.concat(options["dont-include-tags"]);

	var acceptedWarnings = [];

	for (var t in allTags)
		acceptedWarnings.push("unknown tag: " + allTags[t]);

	var keepWarnings = [];

	for (var w in data.warnings) {
		if (acceptedWarnings.indexOf(data.warnings[w].message) < 0)
			keepWarnings.push(data.warnings[w]);
	}

	data.warnings = keepWarnings;

	var keepClasses = {};

	for (var c in data.classes) {
		if (shouldKeepItem(data.classes[c], options))
			keepClasses[c] = data.classes[c];
	}

	data.classes = keepClasses;

	var keepItems = [];

	for (var i in data.classitems) {
		if (shouldKeepItem(data.classitems[i], options))
			keepItems.push(data.classitems[i])
	}

	data.classitems = keepItems;
}