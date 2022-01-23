class Page
{
  constructor()
  {
    let _this = this;

    this.font_select = {
      'Menlo Regular': ['n4']
    }
    this.page_style = {
      data: {},
      style: {},
    };
    this.doc_loaded = false;
    this.page_loaded = false;
    this.page_load_attempts = 0;
    this.fonts_loaded = false;
    this.fonts_popping = false;
    this.fonts_popped = false;
    this.pop_fonts_attempts = 0;

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
        _this.test_pop_fonts();
    	},
      fontactive: function(familyName, fvd) {
        _this.font_select[familyName] = _this.font_select[familyName] || [];
        _this.font_select[familyName].push(fvd);
      },
      classes: false
    });
  }

  test_pop_fonts()
  {
    let _this = this;
    if(this.pop_fonts_attempts < 5 && this.doc_loaded)
    {
      if(var_data_loaded === true &&
      this.fonts_popping === false &&
      this.fonts_popped === false)
      {
        this.pop_fonts();
      }
      else
      {
        let load_timeout = setTimeout(function()
        {
          _this.pop_fonts_attempts = _this.pop_fonts_attempts + 1;
          _this.test_pop_fonts();
          clearTimeout(load_timeout);
        },100)
      }
    }
    else
    {
      console.error('Cannot pop_fonts var_data_loaded', var_data_loaded, 'page.doc_loaded', _this.doc_loaded, 'page.page_loaded', _this.page_loaded);
    }
  }

  test_load_page()
  {
    let _this = this;
    if(this.page_load_attempts < 5 && this.page_loaded === false)
    {
      if(var_data_loaded === true &&
      this.doc_loaded === true)
      {
        this.load_page();
      }
      else
      {
        let load_timeout = setTimeout(function()
        {
          _this.page_load_attempts = _this.page_load_attempts + 1;
          _this.test_load_page();
          clearTimeout(load_timeout);
        },100)
      }
    }
    else
    {
      console.error('Cannot load_page var_data_loaded', var_data_loaded, 'page.doc_loaded', _this.doc_loaded, 'page.page_loaded', _this.page_loaded);
    }
  }

  load_page()
  {
    if(this.page_loaded) return;
    this.page_loaded = true;
    let _this = this;

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

    this.build_toolbar();

    //accordian collapsible
    $('.collapsible.row_header').each(function(){
      let $this = $(this);
      $this.on('click', function(){
        if($this.hasClass('collapsed')){
          $this.removeClass('collapsed').next().show();
        } else {
          $this.addClass('collapsed').next().hide();
        }
      });
    });

    //panel dropdowns, dialogs
    let open_panel = false;
    $(document).on('click', function(e)
    {
      //open panel
      if($(e.target).hasClass('open_panel') && !$(e.target).attr('disabled'))
      {
        let id = $(e.target).attr('id');
        $('.panel').each(function(){
          $(this).removeClass('open');
        });
        $('.panel#' + id + '_panel').addClass('open');
        open_panel = '.panel#' + id + '_panel';
      }
      //close panel on click of anything not in the panel
      else if (open_panel && $(e.target).closest(open_panel).length === 0)
      {
        $('.panel').each(function(){
          $(this).removeClass('open');
        });
        open_panel = false;
      }
    });

    let editor_timed_typer;
    editor.on('text-change', function()
    {
      clearTimeout(editor_timed_typer);
      editor_timed_typer = setTimeout(function(){
        update_text();
      }, 500);
    });

    try
    {
      this.load_page_settings(JSON.parse(localStorage.getItem("c0lorize_settings")));
    } catch(e) {
      console.error(e);
    }

    this.pop_settings(settings, $('#tabs'));
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

      let $popout_fg_color = $('<button class="color b fg' + color.irc + '" txt="' + color.match[0] + '">' + color.match[0] + '</button>')
        .on('click', function()
        {
          insert_char('&' + $(this).attr('txt'));
        });

      let txt_fg = '01';
      if(['01','02','14'].includes(color.irc)){
        txt_fg = '00';
      }

      let $popout_bg_color = $('<button class="color fg' + txt_fg + ' bg' + color.irc + '" txt="' + color.match[0] + '">' + color.match[0] + '</button>')
        .on('click', function()
        {
          insert_char('&bg' + $(this).attr('txt'));
        });
      $('#fg_color_panel_p .row').append($popout_fg_color);
      $('#bg_color_panel_p .row').append($popout_bg_color);
    })

    //create style buttons
    styles.forEach(function(style)
    {
      let $style = $('<button class="' + style.irc + '" txt="' + style.irc + '">' + style.irc + '</button>')
        .on('click', function()
        {
          insert_char('&' + $(this).attr('txt'));
        });
      let $popout_style = $('<button class="' + style.irc + '" txt="' + style.irc + '">' + style.irc + '</button>')
        .on('click', function()
        {
          insert_char('&' + $(this).attr('txt'));
        });
      $('#styles #style').append($style);
      $('#style_panel #style_p').append($popout_style);
    })

    //create character buttons
    for(let type in chars)
    {
      let $char_type_dialog = $('<div class="dialog"></div>')
        .attr({'dialog': 'char_' + type + '_dialog'});

      for(let style in chars[type])
      {
        if(style === 'info') continue;

        let $button = $('<button id="char_' + type + '_' + style + '" class="open_panel"></button>');
        let $row = $('<div class="row"></div>');
        let $popout_row = $('<div class="row"></div>');

        chars[type][style].chars.forEach(function(char, i)
        {
          if(i === 0) $button.text(char);

          let $char = $('<div class="char_space"></div>');
          let $popout_char = $('<div class="char_space"></div>');
          if(char !== ' ')
          {
            $char = $('<button class="char">' + char + '</button>')
              .on('click', function(){
                insert_char($(this).text());
              });
            $popout_char = $('<button class="char">' + char + '</button>')
              .on('click', function(){
                insert_char($(this).text());
              });
          }
          $row.append($char);
          $popout_row.append($popout_char);
        })

        let $panel = $('<div id="char_' + type + '_' + style + '_panel" class="panel"></div>')
                        .css('width', ((chars[type][style].cols * 18) + 10) + 'px').append($row);
        let $popout_panel = $('<div id="char_' + type + '_' + style + '_panel" class="popout_panel"></div>')
                          .append($popout_row).hide();

        let $panel_wrap = $('<div class="panel_wrap"></div>').append($button).append($panel);

        $('#chars').append($panel_wrap);
        $char_type_dialog.append('<h3 class="row_header collapsible collapsed">' + chars[type][style].info.title + '</h3>');
        $char_type_dialog.append($popout_panel);
      }

      $('#chars').append('<div id="char_' + type + '_dialog" class="open_dialog"></div>');
      $('.dialog[dialog=style_dialog]').after($char_type_dialog);
    }
  }

  pop_settings(sett)
  {
    let _this = this;

    if(sett.poppped === true)
    {
      console.warn('already popped these settings', Object.keys(sett));
      return;
    }

    for(let s in sett)
    {
      let $target = sett[s].$parent;
      let $this = null;

      let value = sett[s].value;
      if(sett[s].value === undefined)
      {
        if(typeof(sett[s].default) === 'string' &&
          sett[s].default.match(/^#/) &&
          $(sett[s].default).length > 0 &&
          $target !== false)
        {
          value = $target.find(sett[s].default).val();
        } else {
          value = sett[s].default;
        }
      }

      if($target && $target.length)
      {
        $this = $target.find('#' + s);

        if($this.length === 0)
        {
          console.error('pop_settings cannot find #' + s + ' in $target');
        }
        else
        {
          if(sett[s].timed_typer !== undefined)
          {
            $this.on('keyup', function(){
              let $this = $(this);
              clearTimeout(sett[s].timed_typer);
              sett[s].timed_typer = setTimeout(function(){
                _this.set_val(s, $this.val(), true, false);
              }, 500);
            }).on('keydown', function(){
              clearTimeout(sett[s].timed_typer);
            })
          }
          else if(sett[s].type === 'dialog')
          {
            $target.find('.open_dialog#' + s)
            .off('click.dialog_open')
            .on('click.dialog_open', function(){
              let $this = $(this);
              if(!sett[s].disabled){
                page.set_val(s, true);
              }
            })
          }
          else
          {
            $this.on('change', function(e){
              if($this.attr('type') === 'file'){
                sett[s].on_change($(this), e);
              } else if($this.attr('type') === 'checkbox'){
                _this.set_val(s, $(this).prop('checked'), true, false, e);
              } else {
                _this.set_val(s, $(this).val(), true, false, e);
              }
            });
          }

          if(sett[s].info)
          {
            if($target.find('label[for=' + s + ']').length > 0)
            {
              $target.find('label[for=' + s + ']').addClass('info').prop('info', sett[s].info)
            }
            else
            {
              $this.addClass('info').prop('info', sett[s].info);
            }
          }

          if($this.hasClass('spectrum')){
            $this.spectrum({
              type: "component",
              showPalette: false,
              showInitial: true,
              clickoutFiresChange: true
            });
          }

          $target.find('#' + s + ', label[for=' + s + ']').on('mouseover', function(){
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
      }

      let fire_on_change_false = ['bg_img', 'bg_img_url', 'fonts'];
      let update_f_value_false = ['bg_img', 'fonts'];

      _this.set_val(s, value,
        (fire_on_change_false.includes(s) ? false : true),
        (update_f_value_false.includes(s) ? false : true)
      );

      if(sett[s].on_load){
        sett[s].on_load($this);
      }

      if(sett[s].pop_on_page_load && sett[s].settings && !sett[s].settings.popped)
      {
        _this.set_val(s, true);
      }
    }

    sett.popped = true;
  }

  get_f(f)
  {
    let setting_level = flat_settings[f];
    let parent_settings = settings;
    if(setting_level !== null)
    {

      if(!settings[setting_level]){
        console.error(f, 'settings.' + setting_level + ' not found');
        return;
      }

      parent_settings = settings[setting_level].settings;
    }

    if(!parent_settings[f]){
      console.error(f, 'no entry in parent_settings');
      return;
    }

    //setting without field
    if(parent_settings[f].$parent === false)
    {
      //do nothing
    }
    else
    {
      if(!parent_settings[f].$parent){
        console.error(f, 'no $parent set');
        console.error(f, parent_settings[f]);
        return;
      }

      if(parent_settings[f].$parent.find('#' + f).length === 0){
        console.warn(f, 'no $f found in $parent', '#' + f, parent_settings[f].$parent)
        return;
      }
    }

    return parent_settings[f];
  }

  get_val(f, settings_f)
  {
    settings_f = settings_f ? settings_f : this.get_f(f);
    if(!settings_f) return;

    let value = settings_f.value;
    if(settings_f.value === undefined)
    {
      if(typeof(settings_f.default) === 'string' &&
        settings_f.default.match(/^#/) &&
        settings_f.$parent.find(settings_f.default).length > 0)
      {
        value = settings_f.$parent.find(settings_f.default).val();
      } else {
        value = settings_f.default;
      }
    }
  }

  //sets the value of a settings input, fires on change, updates the value
  set_val(f, value, fire_on_change, update_f_value, e)
  {
    let settings_f = this.get_f(f);
    if(!settings_f) return;

    fire_on_change = fire_on_change === undefined || fire_on_change === true ? true : false;
    update_f_value = update_f_value === undefined || update_f_value === true ? true : false;

    let $parent = settings_f.$parent;

    let $f = null;
    if($parent !== false){ //non-input field
      $f = settings_f.$parent.find('#' + f);
    }

    let same_val = settings_f.value === value;

    settings_f.value = value;

    if(update_f_value && $f !== null && $f.length > 0 && $f.attr('type') !== 'file')
    {
      if($f.attr('type') === 'checkbox'){
        if(value !== undefined) $f.prop('checked', value);
      } else {
        $f.val(value);
      }
    }

    if(settings_f.complex)
    {
      localStorage.setItem("c0lorize_" + f, value);
    } else {
      if(settings_f.default !== value){
        save_settings[f] = value;
      } else {
        delete save_settings[f];
      }
      localStorage.setItem("c0lorize_settings", JSON.stringify(save_settings));
    }


    if(fire_on_change && settings_f.on_change)
    {
      if(settings_f.change_on_different_val && !same_val)
      {
        settings_f.on_change($f, e);
      }
      else if(!settings_f.change_on_different_val)
      {
        settings_f.on_change($f, e);
      }
    }
  }

  //set mode disable/enable etc for settings input
  set_mode(f, attr)
  {
    let settings_f = this.get_f(f);
    if(!settings_f) return;

    let $parent = settings_f.$parent;
    let $f = settings_f.$parent.find('#' + f);

    if(attr === 'disable')
    {
      $f.attr('disabled', 'disabled');
      settings_f.disabled = true;
    }
    else if(attr === 'enable')
    {
      $f.removeAttr('disabled');
      delete settings_f.disabled;
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
    console.log(load_settings)
    let _this = this;
    if(load_settings)
    {
      //try
    //  {
        save_settings = {};
        for(let key in flat_settings)
        {
          let settings_f = _this.get_f(key);
          if(!settings_f){
            console.warn('load_page_settings could not get_f for', key)
          }

          if(load_settings[key] !== undefined)
          {
            if(settings_f.type === 'dialog' && typeof load_settings[key] === 'boolean')
            {
              _this.set_val(key, load_settings[key], false, false);
              if(load_settings[key] === true)
              {
                save_settings[key] = load_settings[key];
              }
            }
            else if((typeof load_settings[key] === settings_f.type) ||
              (settings_f.type === 'number' && !isNaN(load_settings[key])))
            {
              _this.set_val(key, load_settings[key], false, false);
              if(settings_f.value !== settings_f.default)
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
          else if(settings_f.complex)
          {
            let saved = localStorage.getItem("c0lorize_" + key);
            if(saved) _this.set_val(key, saved, false, false);
          }
          else
          {
            let default_val = _this.get_val(key);
            _this.set_val(key, default_val, false, false);
          }
        }
      //} catch(e) {
      //  console.error('could not get stored settings');
      //  save_settings = {};
      //}
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
              + 'html body.' + size_class + ' #plain_textarea_sizer:not(.custom_image_size) {\n'
              +   "font-size: " + $(this).val() + ".5px !important;\n"
              +   "line-height: " + $(this).text() + " !important;\n"
              + '}\n';;
    })

    style += '</style>'

    $('head').append(style);

    console.log('fonts loaded');
    this.fonts_popped = true;
    //this.set_val('fonts', _this.get_val('fonts'));
    //update_html();
  }

  toggle_ascii_settings()
  {
    if(this.get_val('bg_img') || this.get_val('bg_img_url'))
    {
      this.set_mode('ascii_settings_dialog', 'enable');
    }
    else {
      this.set_mode('ascii_settings_dialog', 'disable');
    }
  }

  update_preview_img($dialog)
  {
    cdat.generate_image(function()
    {
      let canvas_w = $dialog.find('#gen_img')[0].width;
      let canvas_h = $dialog.find('#gen_img')[0].height;
      let txt = canvas_w + 'px x ' + canvas_h + 'px';
      let dialog_w = 140;
      if(canvas_w + dialog_w > 800){
        dialog_w = 800;
      } else {
        let txt_w = text_width(txt);
        if(txt_w > canvas_w){
          dialog_w = txt_w + dialog_w;
        } else {
          dialog_w = canvas_w + dialog_w;
        }
      }

      $dialog.find('#gen_image_container #img_size').text(txt);
      settings.download_img_options_dialog.width(dialog_w, true);

    },{
      custom: true,
      $preview: $dialog.find('#gen_img')
    });
  }

  set_style(key, value, ids)
  {
    let _this = this;
    if(value === false)
    {
      delete this.page_style.data[key];
    } else {
      this.page_style.data[key] = value;
    }

    let style_by_id = {
      editor: {}, //rich text editor
      text_data: {}, //plain text textarea
      'iframe_wrap>iframe': {}, //iframe on split screen
      text_wrap: { //plain text textarea wrapper
        'background-repeat': 'no-repeat'
      },
      iframe_wrap: { //iframe wrapper
        'background-repeat': 'no-repeat'
      },
      iframe_html: {} //actual iframe
    }

    let id_by_style =  {
      'background-image': ['text_wrap', 'iframe_wrap'],
      'background-position-x': ['text_wrap', 'iframe_wrap'],
      'background-position-y': ['text_wrap', 'iframe_wrap'],
      'background-size': ['text_wrap', 'iframe_wrap'],
      'background-color': ['text_wrap', 'iframe_wrap', 'text_data', 'editor', 'iframe_html'],
      'min-width': ['text_wrap', 'iframe_wrap', 'text_data'],
      'min-height': ['text_wrap', 'iframe_wrap', 'text_data'],
      'color': ['text_data','editor','iframe_html'],
      'opacity': ['text_data','editor','iframe_wrap>iframe']
    }

    let style = {};
    for(let s_key in this.page_style.data)
    {
      let s_val = this.page_style.data[s_key];
      switch(s_key)
      {
        case 'background-position-y':
        case 'background-position-x':
        case 'min-width':
        case 'min-height':
          style[s_key] = s_val + 'px';
          break;
        case 'background-image':
          if(this.page_style.data['background-image-hide']){
            style['background-image'] = 'none';
          } else {
            style['background-image'] = 'url(' + s_val + ')';
          }
          break;
        default:
          style[s_key] = s_val;
          break;
      }

      if(id_by_style[s_key] !== undefined){
        for(let i = 0; i < id_by_style[s_key].length; i++)
        {
          let id = id_by_style[s_key][i];
          style_by_id[id][s_key] = style[s_key];
        }
      }
    }

    for(let id in style_by_id){
      if(_this.get_val('tab_or_panel') && id === 'iframe_html'){
        update_html();
      } else {
        $('#' + id).removeAttr('style').css(style_by_id[id]);
      }
    }

    this.page_style.style = style;
    this.page_style.style_by_id = style_by_id;
  }
}
