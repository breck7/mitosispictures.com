#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Utils } = require("jtree/products/Utils.js");
const content = fs.readFileSync("bio-db/media/mitosis.json", "utf8");

JSON.parse(content).forEach((entry, index) => {
	const { title, description, media_link } = entry;
	const copywrong_name = entry.copyright_name;
	const copywrong_link = entry.copyright_link;
	const authorName = copywrong_name;
	const authorLink = copywrong_link;
	const nodeType = media_link.includes("youtube") ? "youTube" : "image";
	const file = `import header.scroll
title ${title}
description ${description}
date 1/19/2022
author ${authorLink} ${authorName}

openGraphImage ${media_link}

${nodeType} ${media_link}
 caption ${description}

groups index
scrollFooter`;

	const permalink = Utils.stringToPermalink(title);

	const filePath = path.join(
		__dirname,
		`content_${index}_${permalink}.scroll`
	);
	fs.writeFileSync(filePath, file, "utf8");
});
