class Page
{
  constructor()
  {
    let _this = this;

    this.font_select = {
      'Menlo Regular': ['n4'],
      'Andale Mono': ['n4'],
      'Dark Courier': ['n4','i4','n5','i5'],
      'Fixedsys Excelsior': ['n4'],
      'Unispace': ['n4','i4','n5','i5']
    }
    this.doc_loaded = false;
    this.fonts_loaded = false;
    this.fonts_popping = false;
    this.fonts_popped = false;

    WebFont.load({
      google: {
    		families: [
          'Roboto Mono:400,400i,500,500i',
          'Source Code Pro:400,400i,500,500i',
          'IBM Plex Mono:400,400i,500,500i'
        ]
    	},
    	active: function() {
        _this.fonts_loaded = true;
        if(_this.doc_loaded && !_this.fonts_popping && !_this.fonts_popped) _this.pop_fonts();
    	},
      fontactive: function(familyName, fvd) {
        _this.font_select[familyName] = _this.font_select[familyName] || [];
        _this.font_select[familyName].push(fvd);
      },
      classes: false
    });
  }

  load_page()
  {
    let _this = this;
    this.doc_loaded = true;

    $( "#tabs" ).tabs({
      activate: function (event, ui)
      {
          let tab_id = ui.newPanel.attr('id');
          if(tab_id === 'html') update_html();
      }
    });

    editor = new Quill('#editor', {
      modules: {
        toolbar: [
          [{color: colors.map(function(c){
            return c.match[1]
          })},{
            background: colors.map(function(c){
            return c.match[1]
          })}],
          ['bold', 'italic', 'underline']
        ]
      },
      theme: 'snow'
    });

    if(page.fonts_loaded && !page.fonts_popped && !page.fonts_popping) this.pop_fonts();

    $('#fonts').on('click', function(){
      if(page.fonts_loaded && !page.fonts_popped && !page.fonts_popping) _this.pop_fonts();
    })

    for(let s in settings)
    {
      if(settings[s].timed_typer !== undefined)
      {
        $('#' + s).on('keyup', function(){
          let $this = $(this);
          clearTimeout(settings[s].timed_typer);
          settings[s].timed_typer = setTimeout(function(){
            _this.set_val(s, $this.val(), true, false);
          }, 500);
        }).on('keydown', function(){
          clearTimeout(settings[s].timed_typer);
        })
      }
      else
      {
        $('#' + s).on('change', function(e){
          if($('#' + s).attr('type') === 'file'){
            settings[s].on_change($(this), e);
          } else if($('#' + s).attr('type') === 'checkbox'){
            _this.set_val(s, $(this).prop('checked'), true, false, e);
          } else {
            _this.set_val(s, $(this).val(), true, false, e);
          }
        });
      }

      let value = settings[s].value;
      if(settings[s].value === undefined)
      {
        if(typeof(settings[s].default) === 'string' &&
          settings[s].default.match(/^#/) &&
          $(settings[s].default).length > 0)
        {
          value = $(settings[s].default).val();
        } else {
          value = settings[s].default;
        }
      }

      if(settings[s].info)
      {
        if($('label[for=' + s + ']').length > 0)
        {
          $('label[for=' + s + ']').addClass('info').prop('info', settings[s].info)
        }
        else
        {
          $('#' + s).addClass('info').prop('info', settings[s].info);
        }
      }

      let fire_on_change_false = ['bg_img', 'bg_img_url', 'fonts'];
      let update_f_value_false = ['bg_img', 'fonts'];

      _this.set_val(s, value,
        (fire_on_change_false.includes(s) ? false : true),
        (update_f_value_false.includes(s) ? false : true)
      );

      if(settings[s].on_load){
        settings[s].on_load($('#' + s));
      }

      if($('#' + s).hasClass('spectrum')){
        $('#' + s).spectrum({
          type: "component",
          showPalette: false,
          showInitial: true,
          clickoutFiresChange: true
        });
      }

      $('#' + s + ', label[for=' + s + ']').on('mouseover', function(){
        if($(this).hasClass('warning'))
        {
          let pos = $(this).offset();
          let warn = $(this).prop('warning');
          $('#tipsy').addClass('warn s_' + s)
          .css({top: pos.top + 30, left: pos.left})
          .text(warn).show();
        }
        else if($(this).hasClass('info'))
        {
          let pos = $(this).offset();
          let info = $(this).prop('info');
          $('#tipsy').addClass('inform s_' + s)
          .css({top: pos.top + 30, left: pos.left})
          .text(info).show();
        }
      }).on('mouseout', function(){
        $('#tipsy.s_' + s).fadeOut( "slow", function()
        {
          $(this).removeAttr('class');
        });
      })
    }

    let editor_timed_typer;
    editor.on('text-change', function()
    {
      clearTimeout(editor_timed_typer);
      editor_timed_typer = setTimeout(function(){
        update_text();
      }, 500);
    });

    this.build_toolbar();
  }

  build_toolbar()
  {
    //create fg/bg color buttons
    colors.forEach(function(color)
    {
      let $fg_color = $('<button class="color bg' + color.irc + '" txt="' + color.match[0] + '"></button>')
        .on('click', function()
        {
          insert_char('&' + $(this).attr('txt'));
        });
      let $bg_color = $('<button class="color bg' + color.irc + '" txt="' + color.match[0] + '"></button>')
        .on('click', function()
        {
          insert_char('&bg' + $(this).attr('txt'));
        });
      $('#fg_color_panel .row').append($fg_color);
      $('#bg_color_panel .row').append($bg_color);
    })

    //create style buttons
    styles.forEach(function(style)
    {
      let $style = $('<button class="' + style.irc + '" txt="' + style.irc + '">' + style.irc + '</button>')
        .on('click', function()
        {
          insert_char('&bg' + $(this).attr('txt'));
        });
      $('#styles #style').append($style);
    })

    //create character buttons
    for(let type in chars){
      for(let style in chars[type])
      {
        let $button = $('<button id="char_' + type + '_' + style + '" class="panel_open"></button>');
        let $row = $('<div class="row"></div>');

        chars[type][style].chars.forEach(function(char, i)
        {
          if(i === 0) $button.text(char);

          let $char = $('<div class="char_space"></div>');
          if(char !== ' ')
          {
            $char = $('<button class="char">' + char + '</button>')
              .on('click', function(){
                insert_char($(this).text());
              });
          }
          $row.append($char);
        })

        let $panel = $('<div id="char_' + type + '_' + style + '_panel" class="panel"></div>')
                        .css('width', ((chars[type][style].cols * 18) + 10) + 'px').append($row);

        let $panel_wrap = $('<div class="panel_wrap"></div>').append($button).append($panel);

        $('#chars').append($panel_wrap);
      }
    }
  }

  //sets the value of a settings input, fires on change, updates the value
  set_val(f, value, fire_on_change, update_f_value, e)
  {
    fire_on_change = fire_on_change === undefined || fire_on_change === true ? true : false;
    update_f_value = update_f_value === undefined || update_f_value === true ? true : false;
    let $f = $('#' + f);

    if(!settings[f]) console.log(f, value, fire_on_change, update_f_value, e);

    let same_val = settings[f].value === value;

    settings[f].value = value;

    if(update_f_value && $f.length > 0 && $f.attr('type') !== 'file')
    {
      if($f.attr('type') === 'checkbox'){
        if(value !== undefined) $f.prop('checked', value);
      } else {
        $f.val(value);
      }
    }

    if(settings[f].complex)
    {
      localStorage.setItem("c0lorize_" + f, value);
    } else {
      save_settings[f] = value;
      localStorage.setItem("c0lorize_settings", JSON.stringify(save_settings));
    }


    if(fire_on_change && settings[f].on_change)
    {
      if(settings[f].change_on_different_val && !same_val)
      {
        settings[f].on_change($f, e);
      }
      else if(!settings[f].change_on_different_val)
      {
        settings[f].on_change($f, e);
      }
    }
  }

  //if load_settings then loads a specific set of settings, and/or clears the page and reloads.
  clear_page_settings(load_settings)
  {
    let msg = 'Are you sure you want to reset the page? All your data will be deleted.';

    if (confirm(msg))
    {
      ['c0lorize_html_data', 'c0lorize_irc_data']
        .forEach(function(item){
          localStorage.removeItem(item);
        });

      for(let key in settings)
      {
        if(settings[key].complex)
        {
          if(load_settings && load_settings[key] !== undefined)
          {
            localStorage.setItem("c0lorize_" + key, load_settings[key]);
            delete load_settings[key];
          }
          else
          {
            localStorage.removeItem('c0lorize_' + key);
          }
        }
      }

      if(load_settings)
      {
        localStorage.setItem("c0lorize_settings", JSON.stringify(load_settings))
      }
      else
      {
        localStorage.removeItem("c0lorize_settings")
      }

      location.reload();
    }
  }

  //loads a specific set of settings into the page
  load_page_settings(load_settings)
  {
    let _this = this;
    if(load_settings)
    {
      try
      {
        save_settings = {};
        for(let key in settings)
        {
          if(load_settings[key] !== undefined)
          {
            if((typeof load_settings[key] === settings[key].type) ||
              (settings[key].type === 'number' && !isNaN(load_settings[key])))
            {
              settings[key].value = load_settings[key];
              if(settings[key].value !== settings[key].default)
              {
                save_settings[key] = load_settings[key];
              }
            }
            else
            {
              console.error('Tried to load "' + key + ':' + load_settings[key] + '" but datatype was not ' + settings[key].type);
            }

            localStorage.setItem("c0lorize_settings", JSON.stringify(save_settings));
          }
          else if(settings[key].complex)
          {
            let saved = localStorage.getItem("c0lorize_" + key);
            if(saved) settings[key].value = saved;
          }
        }
      } catch(e) {
        console.error('could not get stored settings');
        save_settings = {};
      }
    }
  }

  //populates fonts into settings->fonts select, creates font css in doc
  pop_fonts()
  {
    if(this.fonts_popped === true) return;

    let _this = this;
    this.fonts_popping = true;
    let style = '<style type="text/css">'
    for(let font in this.font_select)
    {
      let font_class = font.replace(/\s/g, '-') + '-font';
      if($('#fonts option[value="' + font + '"]').length === 0)
      {
        let label = font;
        let styles = [];

        if(_this.font_select[font].includes('i4')) styles.push('i');
        if(_this.font_select[font].includes('n5')) styles.push('b');
        if(_this.font_select[font].includes('i5')) styles.push('bi');

        if(styles.length) label += ' (' + styles.join(', ') + ')';

        $('#fonts').append('<option value="' + font + '">' + label + '</option>');
      }

      style +=  'html.' + font_class + ' body,\n'
              + 'html.' + font_class + ' textarea,\n'
              + 'html.' + font_class + ' button,\n'
              + 'html.' + font_class + ' input,\n'
              + 'html.' + font_class + ' select,\n'
              + 'html.' + font_class + ' .ql-snow .ql-picker,\n'
              + 'html.' + font_class + ' .ql-container,\n'
              + 'html.' + font_class + ' .ql-container p,\n'
              + 'html.' + font_class + ' .ui-widget input,\n'
              + 'html.' + font_class + ' .ui-widget select,\n'
              + 'html.' + font_class + ' .ui-widget textarea,\n'
              + 'html.' + font_class + ' .ui-widget button {\n'
              +   "font-family: '" + font + "', monospace !important;\n"
              + '}\n';
    }

    $('#font_size option').each(function()
    {
      let size_class = 'fontsize-' + $(this).val();
      style +=  'html body.' + size_class + ' textarea,\n'
              + 'html body.' + size_class + ' .ql-snow .ql-picker,\n'
              + 'html body.' + size_class + ' .ql-container,\n'
              + 'html body.' + size_class + ' .ql-container p,\n'
              + 'html body.' + size_class + ' .ui-widget textarea {\n'
              +   "font-size: " + $(this).text() + " !important;\n"
              +   "line-height: " + $(this).text() + " !important;\n"
              + '}\n'

              + 'html body.' + size_class + ' #textarea_sizer,\n'
              + 'html body.' + size_class + ' #plain_textarea_sizer {\n'
              +   "font-size: " + $(this).val() + ".5px !important;\n"
              +   "line-height: " + $(this).text() + " !important;\n"
              + '}\n';;
    })

    style += '</style>'

    $('head').append(style);

    console.log('fonts loaded');
    this.fonts_popped = true;
    this.set_val('fonts', settings.fonts.value);
    update_html();
  }

  toggle_ascii_settings()
  {
    if(settings.bg_img.value || settings.bg_img_url.value){
      $('#ascii_settings').removeAttr('disabled');
    }
    else {
      $('#ascii_settings').attr('disabled', 'disabled');
    }
  }
}
