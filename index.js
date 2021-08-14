
const vwh = /(?<=\d)vwh/g;
//const vwh = 'vwh';
const landscapeParam = /^(?:all\sand\s)*\(orientation:\s*landscape\)$/;
const portraitParam = /^(?:all\sand\s)*\(orientation:\s*portrait\)$/;

const mergeRules = (node) => {
	const walked = { rules: [], selectors: [] };
	node.walkRules(rule => {
		let i = walked.selectors.indexOf(rule.selector);
		if (i > -1) {
			walked.rules[i].append(rule.nodes);
			rule.remove();
		} else {
			walked.rules.push(rule);
			walked.selectors.push(rule.selector);
		}
	});
}


module.exports = () => {

	// Work with options here

	return {
		postcssPlugin: 'postcss-vwh',
		Root (root, postcss) {

			//create landscape & portrait rule
			//fill them with declarations from all existing rules (if any)
			//eject existing rules (if any)

			let landscapeAtRule = postcss.atRule({name: 'media', params: '(orientation:landscape)', nodes: []});
			root.nodes.filter(n => n.type === 'atrule' && n.name === 'media' && landscapeParam.test(n.params)).forEach(rule => {
				landscapeAtRule.append(rule.nodes);
				rule.remove();
			});

			let portraitAtRule = postcss.atRule({name: 'media', params: '(orientation:portrait)', nodes: []});
			root.nodes.filter(n => n.type === 'atrule' && n.name === 'media' && portraitParam.test(n.params)).forEach(rule => {
				portraitAtRule.append(rule.nodes);
				rule.remove();
			});


			root.walkDecls(decl => {

				if (vwh.test(decl.value)) {
					const rule = decl.parent;
					portraitAtRule.append(postcss.rule({selector: rule.selector}).append({prop: decl.prop, value: decl.value.replace(vwh,'vw')}));
					landscapeAtRule.append(postcss.rule({selector: rule.selector}).append({prop: decl.prop, value: decl.value.replace(vwh,'vh')}));
					decl.remove();
					if (!rule.nodes.length) rule.remove();
				}
			});


			if (landscapeAtRule.nodes.length) {
				mergeRules(landscapeAtRule);
				root.append(landscapeAtRule);
			}
			if (portraitAtRule.nodes.length) {
				mergeRules(portraitAtRule);
				root.append(portraitAtRule);
			}

		}
	}
}

module.exports.postcss = true;
