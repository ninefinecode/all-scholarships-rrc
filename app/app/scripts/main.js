'use strict';
// console.log('\'Allo \'Allo!');


var input = $('#search');

// initially set count span
$('#count').text($('.scholarship').length);

$('form').submit(function(ev){
	ev.preventDefault();
	input.keyup();
});

function setCount(count) {
		$('#count').text(count);
}

input.keyup(function () {
	// console.log(ev);
	// 1. split input into tokens
	if (input.val().length >= 3) {
		var tokens = input.val().split(' ');
		tokens = tokens.filter(function(val) {
			return val !== '';
		});


		// 2. query like so to get matching scholarships
		// $('.scholarship[data-tags*="token[0]"], .scholarship[data-tags*="token[1]"]')
		var query = '', negQuery = '';
		tokens.forEach(function(token){
			if (token[0] !== '-') {
				query += '.scholarship[data-tags*="' + token + '"],';
			} else {
				negQuery = '.scholarship:not([data-tags*="' + token.substring(1) + '"]),';
			}
			// if (i + 1 != tokens.length) query += ',';
		});
		if (/,$/i.test(query)) query = query.substring(0, query.length - 1);
		if (/,$/i.test(negQuery)) negQuery = negQuery.substring(0, negQuery.length - 1);
		$('.scholarship').hide();
		var results = $(query);
		if (negQuery !== '') results = results.filter(negQuery);
		results.show();
		setCount(results.length);
	} else {
		var scholarships = $('.scholarship');
		setCount(scholarships.length);
		scholarships.show();
	}
});
