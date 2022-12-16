#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { jtree } = require("jtree");
const content = fs.readFileSync("bio-db/media/mitosis.json", "utf8");

JSON.parse(content).forEach((entry,index) => {
	const { title, description, media_link } = entry;
	const copywrong_name = entry.copyright_name;
	const copywrong_link = entry.copyright_link;
	const authorName = copywrong_name;
	const authorLink = copywrong_link;
	const file = `import header.scroll
title ${title}
description ${description}
date 12/11/2022
author ${authorLink} ${authorName}

openGraphImage ${media_link}

image ${media_link}
 caption ${description}

groups index
scrollFooter`;

	const permalink = jtree.Utils.stringToPermalink(title);

	const filePath = path.join(__dirname, `content_${index}_${permalink}.scroll`);
	fs.writeFileSync(filePath, file, "utf8");
});
