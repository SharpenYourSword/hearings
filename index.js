var lodash = require('lodash');
var fs = require('fs');

for (var i=1;i < 4; i++) {
	var hearing_input = JSON.parse(fs.readFileSync('sample' + i + '.json','utf8'));
	var body_template = lodash.template(fs.readFileSync('hearing._','utf8'));
	var out = body_template(hearing_input);
	out = link2bills(out);

	fs.writeFileSync('hearing' + i + '.html', body_template(hearing_input),'utf8');
}

function link2bills (h) {
	// Regex is "Bill XX-XXX" or "B XX-XXX" or
	// Look for '(Proposed Resolution|PR)'

// Look for "(Bill|B)" then do a lookahead for 
//	((\d{1,2})(\-)(\d{1,4})(,|\s|,\sand|\s&\s)?)+
	// If the lookahead is captured, then return the last grouping or set 

	var reB = /(?!(Bill|B)(\s?))((\d{1,2})(\-)(\d{1,4})(,|\s|,\sand|\s&\s)?)+/;
	var rePR = = /(?!(Bill|B)(\s?))((\d{1,2})(\-)(\d{1,4})(,|\s|,\sand|\s&\s)?)+/;
	console.log(h.find(reB));
}

var c = Citation.find(text, {
        context: {
            dc_code: {
                source: 'dc_code'
            }
        },
        excerpt: 40,
        types: ['dc_code', 'dc_law', 'dc_register', 'law', 'stat'],
        replace: {
            dc_code: codeCited,
            dc_law:dclawCited,
            law: lawCited,
            dc_register: dcrCited,
            stat: statCited
        }
    }).text;

 function dclawCited(cite) {

        var lawName = 'L' + cite.dc_law.period + "-" + cite.dc_law.number + '.pdf';
        var url = 'http://openlims.org/public/' + lawName;
        return linked(url, cite.match);
    }

function linked(url, text) {
        return "<a href='" + url + "'>" + text + "</a>";
    }