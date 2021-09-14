class Parser
{
  constructor()
  {
    let _this = this;
    this.html_colors = {};
		this.open_tag_count = 0;
		this.fg_arr = [];
		this.bg_arr = [];
		this.style_arr = [];
		this.editor_arr = [];
		this.current_style = {fg: null, bg: null, i: null, b: null, u: null};
    this.since_last_fg = null; //we need to track the last fg color, because unicode can't do a bg color without one.

    colors.forEach(function(c, i)
    {
    	_this.fg_arr.push(c.match.join('|&'));
    	_this.bg_arr.push(c.match.join('|&bg'));

    	_this.html_colors['.fg' + c.irc] = { 'color': c.match[1] };
    	_this.html_colors['.bg' + c.irc] = { 'background-color': c.match[1] };

    	c.match.forEach(function(m)
    	{
    		search['&' + m] = {
    			m: 'fg' + m,
    			unicode: c.unicode,
    			irc: c.irc,
    			esc: '\x1b[' + c.term + 'm',
    			type: 'fg',
    			txt: '&' + c.match[0],
    			name: c.match[1],
    			color: c
    		}
    		search['&bg' + m] = {
    			m: 'bg' + m,
    			unicode: c.unicode,
    			irc: c.irc,
    			esc: '\x1b[' + (c.term + 10)  + 'm',
    			type: 'bg',
    			txt: '&bg' + c.match[0],
    			name: c.match[1]
    		}
    	})
    })

    styles.forEach(function(s, i)
    {
    	_this.style_arr.push(s.match.join('|&'));
    	s.match.forEach(function(m)
    	{
    		search['&' + m] = {
    			m: m,
    			unicode: s.unicode,
    			irc: s.irc,
    			esc: '\x1b[' + s.term + 'm',
    			type: 'style',
    			txt: '&' + s.irc,
    		 	name: s.match[0]
    		};
    	})
    })

    this.format_str = this.fg_arr.join('|&') + '|&bg' + this.bg_arr.join('|&bg') + '|&' + this.style_arr.join('|&');
    this.format_regex = new RegExp('(&' + this.format_str + ')(?=.)*', 'g')
  }

  //converts quilljs [{insert: 'text', attributes: {background: 1, color: 2}}] -> &1&bg2text
  editor_to_text(arr, callback)
  {
    let _this = this;
  	this.current_style = {fg: null, bg: null, i: null, b: null, u: null};

  	let text_data = '',
        first_reset = false,
        add_reset = false;

  	arr.forEach(function(a, i)
  	{
  		let str = '';

  		if(a.attributes)
  		{
  			if(!settings.line_reset.value)
  			{
  				if(_this.current_style.b !== null && !a.attributes.bold) add_reset = true;
  				if(_this.current_style.i !== null && !a.attributes.italic) add_reset = true;
  				if(_this.current_style.u !== null && !a.attributes.underline) add_reset = true;
  				if(_this.current_style.fg !== null && !a.attributes.color) add_reset = true;
  				if(_this.current_style.bg !== null && !a.attributes.background) add_reset = true;
  				if(add_reset && !first_reset){
  					first_reset = true;
  					add_reset = false;
  				}

  				if(add_reset)
  				{
  					_this.current_style = {fg: null, bg: null, i: null, b: null, u: null};
  					str += '&r';
  					add_reset = false;
  				}
  			}

  			if(a.attributes.bold){
  				if(settings.line_reset.value && _this.current_style.b === null) str += '&b';
  				if(add_reset || (!settings.line_reset.value && _this.current_style.b === null)) str += '&b';
  				_this.current_style.b = search['&b'];
  			}
  			if(a.attributes.italic){
  				if(settings.line_reset.value && _this.current_style.i === null) str += '&i';
  				if(add_reset || (!settings.line_reset.value && _this.current_style.i === null)) str += '&i';
  				_this.current_style.i = search['&i'];
  			}
  			if(a.attributes.underline){
  				if(settings.line_reset.value && _this.current_style.u === null) str += '&u';
  				if(add_reset || (!settings.line_reset.value && _this.current_style.u === null)) str += '&u';
  				_this.current_style.u = search['&u'];
  			}
  			if(a.attributes.color && search['&' + a.attributes.color]){
  				if(settings.line_reset.value && _this.current_style.fg === null) str += search['&' + a.attributes.color].txt;
  				if(settings.line_reset.value && _this.current_style.fg !== null && _this.current_style.fg.name !== a.attributes.color) str += search['&' + a.attributes.color].txt;
  				if(add_reset || (!settings.line_reset.value && (_this.current_style.fg === null || _this.current_style.fg.name !== a.attributes.color))) str += search['&' + a.attributes.color].txt;
  				_this.current_style.fg = search['&' + a.attributes.color];
  			}
  			if(a.attributes.background && search['&bg' + a.attributes.background]){
  				if(settings.line_reset.value && _this.current_style.bg === null) str += search['&bg' + a.attributes.background].txt;
  				if(settings.line_reset.value && _this.current_style.bg !== null && _this.current_style.bg.name !== a.attributes.background) str += search['&bg' + a.attributes.background].txt;
  				if(add_reset || (!settings.line_reset.value && (_this.current_style.bg === null || _this.current_style.bg.name !== a.attributes.background))) str += search['&bg' + a.attributes.background].txt;
  				_this.current_style.bg = search['&bg' + a.attributes.background];
  			}
  		}
  		else
  		{
  			//if this is just a line break, no need to reset either way
  			let just_a_lbreak = a.insert.match(/^[\r\n\s]+$/);
  			if(!just_a_lbreak)
  			{
  				//if there is a break between this and last, no need to reset if reset = true
  				//if there is a break between this and last, reset if reset = false
  				//if there is no break between this and last, reset
  				let current_break = a.insert.match(/^[\r?\n]/);
  				let last_break = arr[i - 1] ? arr[i - 1].insert.match(/[\r?\n]$/) : null;
  				let lbreak = (current_break || last_break);

  				if(!(settings.line_reset.value && lbreak) || !settings.line_reset.value || !lbreak)
  				{
  					if(_this.current_style.b !== null || _this.current_style.i !== null || _this.current_style.u !== null ||
  						_this.current_style.fg !== null || _this.current_style.bg !== null){
  							add_reset = true;
  					}

  					if(add_reset && !first_reset){
  						first_reset = true;
  						add_reset = false;
  					}

  					if(add_reset)
  					{
  						_this.current_style = {fg: null, bg: null, i: null, b: null, u: null};
  						str += '&r';
  						add_reset = false;
  					}
  				}
  			}
  		}

  		str += a.insert;
  		first_reset = true;
  		text_data += str;
  	});

  	callback(text_data);
  }

  //converts &1&bg2text -> html
  text_to_html(data, callback)
  {
    let _this = this;
  	this.open_tag_count = 0;
    let font = page.fonts_popped ? settings.fonts.value : 'Menlo Regular';

    var bg_color = settings.background_color_no_alpha.value;
    if(settings.tab_or_panel.value){
      bg_color = settings.background_color.value;
    }

  	let html_style = Object.assign({
  		'body': {
  			'background-color': bg_color,
  			'color': settings.default_text_color.value,
  			'margin': 0,
  			'padding': 0,
  			'height': '100%'
  		},
  		'#container': {
  			'width': 'fit-content',
  			'padding': '8px',
  			'height': '100%'
  		},
  		'#container .text_row': {
  			'display': 'block',
  			'font-family': "'" + font + "', monospace",
  			'white-space': 'pre',
  			'font-size': settings.font_size.value + 'px',
  			'line-height': (settings.font_size.value - 1) + 'px',
  			'height': settings.font_size.value + 'px',
  			'width': 'fit-content',
        'overflow': 'hidden'
  		},
  		'.b': { 'font-weight': 'bold' },
  		'.i': { 'font-style': 'italic' },
  		'.u': { 'text-decoration': 'underline' },
  		'.r': {
        'color': settings.default_text_color.value,
        'background-color': 'initial',
        'font-weight': 'normal',
        'font-style': 'initial',
        'text-decoration': 'none'
      }
  	}, this.html_colors);


  	let style_str = '';
  	this.editor_arr = [];

  	for(let key in html_style)
  	{
  		style_str += '\t\t' + key + ' {\n';

  		for(let attr in html_style[key])
  		{
  			style_str += '\t\t\t' + attr + ': ' + html_style[key][attr] + ';\n'
  		}

  		style_str += '\t\t}\n\n';
  	}

  	let txt_data = '';
  	let html_doc_data = '<!DOCTYPE html>\n<head>\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n\t';
  		html_doc_data += '<meta name="description" content="generated by c0lorize-web https://z0m.bi/apps/c0lorize-web/">\n\t';

      if(font === 'Menlo Regular')
      {
        html_doc_data += '<style>\n'
        html_doc_data += '\t\t@font-face {\n\t\t\tfont-family: \'Menlo Regular\';\n\t\t\tfont-style: normal;\n\t\t\tfont-weight: normal;\n\t\t\tsrc: local(\'Menlo Regular\'), url(\'Menlo-Regular.woff\') format(\'woff\');\n\t\t}\n\n';
      }
      else
      {
        let font_str = font.replace(' ', '+');
        let font_style = [];

        if(!page.font_select[font])
        {
          console.log(page.font_style, font);
        }
        else
        {
          font_style = page.font_select[font];
        }

        if(font_style.includes('n4') && font_style.includes('i4') && font_style.includes('n5') && font_style.includes('i5'))
        {
          font_str += ':ital,wght@0,400;0,500;1,400;1,500';
        }
        else if(font_style.includes('n4') && !font_style.includes('i4') && font_style.includes('n5') && !font_style.includes('i5'))
        {
          font_str += ':wght@400;500';
        }

        html_doc_data += '<link rel="preconnect" href="https://fonts.gstatic.com">';
        html_doc_data += '<link href="https://fonts.googleapis.com/css2?family='  + font_str + '&display=swap" rel="stylesheet">';
        html_doc_data += '<style>\n'
      }

  		html_doc_data += style_str + '\t</style>\n\t<title>' + name + '</title>\n</head>\n<body>\n\t<div id="container">\n';

  	let html_data = '';

  	this.open_tag_count = 0;
  	data.split(/\r?\n/).forEach(function(str, line)
  	{
  		let formatted = _this.txt_split(str, line);

  		txt_data += formatted.txt;

  		if(html)
  		{
  			html_data += '\t\t<div class="text_row">' + formatted.html + '</div>\n';
  		}
  	});


  	html_doc_data += html_data + '\t</div>\n</body>\n</html>';

  	callback(html_doc_data, txt_data, this.editor_arr);
  }

  //takes a split string of &1&bg2text and converts it to html and irc unicode text
  txt_split(str, line)
  {
    let _this = this,
        txt_str = '',
    		html_str = '',
    		html_edit_str = '',
    		con_str = '',
    		current_edit = {attributes:{}};

    if(settings.line_reset.value)
    {
    	this.current_style = {fg: null, bg: null, i: null, b: null, u: null};
    	this.since_last_fg = null;
    }

    if(!settings.line_reset.value && (this.current_style.fg !== null || this.current_style.bg !== null ||
    	this.current_style.i !== null || this.current_style.b !== null || this.current_style.u !== null))
    {
    	let wrap_span = '<span class="';

    	if(this.current_style.fg !== null)
    	{
    		wrap_span += 'fg' + this.current_style.fg.irc;
    		current_edit.attributes.color = this.current_style.fg.name;
    	}

    	if(this.current_style.bg !== null)
    	{
    		wrap_span += ' bg' + this.current_style.bg.irc;
    		current_edit.attributes.background = this.current_style.bg.name;
    	}

    	if(this.current_style.i !== null)
    	{
    		wrap_span += ' ' + this.current_style.i.irc;
    		current_edit.attributes[this.current_style.i.name] = true;
    	}

    	if(this.current_style.b !== null)
    	{
    		wrap_span += ' ' + this.current_style.b.irc;
    		current_edit.attributes[this.current_style.b.name] = true;
    	}

    	if(this.current_style.u !== null)
    	{
    		wrap_span += ' ' + this.current_style.u.irc;
    		current_edit.attributes[this.current_style.u.name] = true;
    	}

    	wrap_span += '">';
    	html_str += wrap_span;

    	if(!str)
    	{
    		html_str += ' </span>';
    	}
    	else
    	{
    		this.open_tag_count++;
    	}
    }

    if(!str)
    {
    	//console.log(str);
    	this.editor_arr.push({ insert: '\n' });
    	return {txt: '\n', html: html_str};
    }

    str.split(this.format_regex).forEach(function(x)
    {
    	if(x)
    	{
    		if(x.match(/^&/) && search[x])
    		{
    			if(search[x].type === 'fg')
    			{
    				_this.since_last_fg = 0;
    				_this.current_style.fg = search[x];
    				current_edit.attributes.color = _this.current_style.fg.name;

    				txt_str += search[x].unicode;
    				con_str += search[x].esc;
    				html_str += '<span class="fg' + search[x].irc + '">';
    				_this.open_tag_count++;
    			}
    			else if(search[x].type === 'bg')
    			{
    				_this.current_style.bg = search[x];
    				current_edit.attributes.background = _this.current_style.bg.name;

    				if(_this.since_last_fg !== null) _this.since_last_fg++;

    				if(_this.since_last_fg === 1)
    				{
    					txt_str += ',' + search[x].irc;
    					con_str += search[x].esc;
    				}
    				else if(_this.current_style.fg !== null)
    				{
    					txt_str += _this.current_style.fg.unicode + ',' + search[x].irc;
    					con_str += search[x].esc;
    				}
    				else
    				{
    					txt_str += '\u00031,' + search[x].irc;
    					con_str += '\x1b[30m' + search[x].esc;
    				}

    				html_str += '<span class="bg' + search[x].irc + '">';
    				_this.open_tag_count++;
    			}
    			else
    			{
    				if(search[x].name === 'bold')
    				{
    					_this.current_style.b = search[x];
    					current_edit.attributes.bold = true;
    				}
    				else if(search[x].name === 'italic')
    				{
    					_this.current_style.i = search[x];
    					current_edit.attributes.italic = true;
    				}
    				else if(search[x].name === 'underline')
    				{
    					_this.current_style.u = search[x];
    					current_edit.attributes.underline = true;
    				}

    				if(_this.since_last_fg !== null) _this.since_last_fg++;

    				if(search[x].irc === 'r')
    				{
    					_this.current_style = {fg: null, bg: null, i: null, b: null, u: null};
    					current_edit = {attributes: {}};

    					while(_this.open_tag_count > 0)
    					{
    						html_str += '</span>';
    						_this.open_tag_count--;
    					}
    				}

    				txt_str += search[x].unicode;
    				con_str += search[x].esc;
    				html_str += '<span class="' + search[x].irc + '">';
    				_this.open_tag_count++;
    			}
    		}
    		else
    		{
    			if(_this.since_last_fg !== null) _this.since_last_fg++;

    			txt_str += x;
    			con_str += x;
    			html_str += x;

    			let edit_push = JSON.parse(JSON.stringify(current_edit));
    			edit_push.insert = x;
    			_this.editor_arr.push(edit_push);
    		}
    	}
    })

    if(settings.correct_html.value)
    {
    	txt_str = txt_str.replace(/\\/g,'\\\\');
    }

    if(settings.line_reset.value && (_this.current_style.fg !== null || _this.current_style.bg !== null || _this.current_style.other !== null))
    {
    	txt_str += '\u000f';
    	con_str += '\x1b[0m';
    }

    while(_this.open_tag_count > 0)
    {
    	html_str += '</span>';
    	_this.open_tag_count--;
    }

    _this.editor_arr.push({insert: '\n'});
    txt_str += '\n';

    //console.log(con_str);
    return {txt: txt_str, html: html_str};
 }
}
