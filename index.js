const fs = require("fs");
const path = require('path');
const Handlebars = require("handlebars");

const { dateHelpers } = require(join(__dirname, 'helpers/date.js'));
const { MY, Y, DMY } = dateHelpers;

const render = (resume) => {
	const css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	const tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	const partialsDir = path.join(__dirname, 'partials');
	const filenames = fs.readdirSync(partialsDir);

	filenames.forEach(function (filename) {
	  const matches = /^([^.]+).hbs$/.exec(filename);
	  if (!matches) {
	    return;
	  }

	  const name = matches[1];
	  const filepath = path.join(partialsDir, filename)
	  const template = fs.readFileSync(filepath, 'utf8');

    Handlebars.registerHelper('MY' MY);
    Handlebars.registerHelper('Y' Y);
    Handlebars.registerHelper('DMY' DMY);
	  Handlebars.registerPartial(name, template);
	});

	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

module.exports = { render };
