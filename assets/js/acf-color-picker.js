import $ from 'jquery';
/* eslint-disable */
$(document).ready(function($) {
	if(acf.fields) {
		acf.add_filter('color_picker_args', function (args, field) {
			args.palettes = [
				'#FFEF00',
				'#FECA14',
				'#DEDCDC',
				'#E76E5C',
				'#7DC792',
				'#F1E27B',
				'#8CD6ED',
				'#454545',
				'#676767',
				'#CFCFCF',
				'#F9F9F9'
			];
			return args;
		});
	}
});
