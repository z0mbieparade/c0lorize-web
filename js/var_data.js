let colors = [
  { unicode: '\u00030',  irc: '00', term: 37, rgb: [255,255,255], match: ['0', 'white'], light: 0, dark: 15, tint_left: 0, tint_right: 0, invert: 1 },
  { unicode: '\u00031',  irc: '01', term: 30, rgb: [0,0,0], match: ['1', 'black'], light: 14, dark: 1, tint_left: 1, tint_right: 1, invert: 0 },
  { unicode: '\u00032',  irc: '02', term: 34, rgb: [0,0,128], match: ['2', 'navy', 'darkblue'], light: 12, dark: 1, tint_left: 10, tint_right: 6, invert: 8 },
  { unicode: '\u00033',  irc: '03', term: 32, rgb: [0,154,0], match: ['3', 'green', 'darkgreen', 'forest'], light: 9, dark: 1, tint_left: 8, tint_right: 10, invert: 13 },
  { unicode: '\u00034',  irc: '04', term: 91, rgb: [255,0,0], match: ['4', 'red'], light: 13, dark: 5, tint_left: 6, tint_right: 7, invert: 11 },
  { unicode: '\u00035',  irc: '05', term: 31, rgb: [165,42,42], match: ['5', 'brown', 'maroon', 'darkred'], light: 4, dark: 1, tint_left: 4, tint_right: 7, invert: 15 },
  { unicode: '\u00036',  irc: '06', term: 35, rgb: [204,0,255], match: ['6', 'purple', 'violet'], light: 13, dark: 1, tint_left: 2, tint_right: 4, invert: 9 },
  { unicode: '\u00037',  irc: '07', term: 33, rgb: [255,158,23], match: ['7', 'olive', 'orange'], light: 8, dark: 5, tint_left: 4, tint_right: 8, invert: 10 },
  { unicode: '\u00038',  irc: '08', term: 93, rgb: [255,255,0], match: ['8', 'yellow'], light: 0, dark: 7, tint_left: 7, tint_right: 9, invert: 12 },
  { unicode: '\u00039',  irc: '09', term: 92, rgb: [41,255,41], match: ['9', 'lime', 'lightgreen'], light: 8, dark: 3, tint_left: 8, tint_right: 11, invert: 6 },
  { unicode: '\u000310', irc: '10', term: 36, rgb: [0,160,160], match: ['10', 'teal'], light: 11, dark: 1, tint_left: 3, tint_right: 12, invert: 7 },
  { unicode: '\u000311', irc: '11', term: 96, rgb: [0,255,255], match: ['11', 'cyan', 'aqua'], light: 0, dark: 11, tint_left: 9, tint_right: 12, invert: 4 },
  { unicode: '\u000312', irc: '12', term: 94, rgb: [36,83,255], match: ['12', 'blue', 'royal'], light: 11, dark: 2, tint_left: 10, tint_right: 6, invert: 8 },
  { unicode: '\u000313', irc: '13', term: 95, rgb: [255,0,255], match: ['13', 'fuchsia', 'pink', 'lightpurple'], light: 0, dark: 6, tint_left: 11, tint_right: 4, invert: 3 },
  { unicode: '\u000314', irc: '14', term: 90, rgb: [128,128,128], match: ['14', 'gray', 'grey'], light: 15, dark: 1, tint_left: 14, tint_right: 14, invert: 14 },
  { unicode: '\u000315', irc: '15', term: 37, rgb: [211,211,211], match: ['15', 'lightgray', 'lightgrey', 'silver'], light: 0, dark: 14, tint_left: 15, tint_right: 15, invert: 5 }
].reverse();

let styles = [
  { unicode: '\u0002', irc: 'b', term: 1, match: ['bold', 'b'] },
  { unicode: '\u0016', irc: 'i', term: 3, match: ['italic', 'i'] },
  { unicode: '\u001f', irc: 'u', term: 4, match: ['underline', 'u'] },
  { unicode: '\u000f', irc: 'r', term: 0, match: ['reset', 'r'] }
];

let chars = {
  box: {
    light: {
      chars:
        ['╭','┌','─','┬','╶','┐','╮',
         '╵','│','╲','╳','╱','│','│',
         '│','├','╱','┼','╲','┤','╷',
         '╰','└','╴','┴','─','┘','╯'],
      cols: 7
    },
    light_dash: {
      chars:
        ['╌','╎',
         '┄','┆',
         '┈','┊'],
      cols: 2,
    },
    light_heavy: {
      chars:
        ['┍','┯','┭','┰','┮','┱','┲','╾','┒',
         '╽','┎','╁','┦','┾','┫','┡','┑','┩',
         '┠','╄','╃','┟','┼','╊','┿','┥','╈',
         '╇','┝','┿','╉','┤','┞','╆','╅','┨',
         '┢','┕','┪','╂','┽','┧','╀','┚','╿',
         '┖','╼','┹','┺','┵','┸','┶','┷','┙'],
      cols: 9,
    },
    light_double: {
      chars:
        ['╒','═','╤','═','╕',
         '╞','╓','╥','╖','│',
         '╪','╟','╫','╢','╪',
         '│','╙','╨','╜','╡',
         '╘','═','╧','═','╛'],
      cols: 5
    },
    heavy: {
      chars:
        ['┏','╸','┳','┓',
         '┣','━','┫','┃',
         '╻','╋','┛','╹',
         '┗','┻','╺','┛'],
      cols: 4
    },
    heavy_dash: {
      chars:
        ['╍','╏',
         '┅','┇',
         '┉','┋'],
      cols: 2,
    },
    double: {
      chars:
        ['╔','╦','╗',
         '╠','═','╣',
         '║','╬','║',
         '╚','╩','╝'],
      cols: 3
    }
  },
  block: {
    solid_tb: {
      chars:
        ['▁','▂','▃','▄','▅','▆','▇','█','▀','▔'],
      cols: 10
    },
    solid_lr: {
      chars:
        ['▕',
         '▐',
         '█',
         '▉',
         '▊',
         '▋',
         '▌',
         '▍',
         '▎',
         '▏'],
      cols: 1,
    },
    quadrent: {
      chars:
        ['▛','▜',
         '▘','▝',
         '▞','▚',
         '▖','▗',
         '▙','▟'],
      cols: 2,
    },
    shade: {
      chars:
        ['░','▒','▓','█'],
      cols: 4
    }
  }
};

let settings = {
  line_reset: {
    default: false,
    type: 'boolean',
    info: 'If on, the colors will reset after each line, off they continue down to the next line.',
    on_change: function($this){
      update_html();
    }
  },
  correct_html: {
    default: true,
    type: 'boolean',
    info: 'If on, this attempts to correct some issues with \\ in text -> html conversion.',
  },
  fonts: {
    default: 'Menlo Regular',
    type: 'string',
    on_change: function($this)
    {
      $('html').removeAttr('class').addClass(this.value.replace(/\s/g, '-') + '-font');
    }
  },
  font_size: {
    default: 14,
    type: 'number',
    on_change: function($this)
    {
      $('body').removeAttr('class').addClass('fontsize-' + this.value);
      page.set_val('px_per_char_width', ascii.pixel_div[this.value].w);
      page.set_val('px_per_char_height', ascii.pixel_div[this.value].h);
    }
  },
  background_color: {
    default: 'rgba(0,0,0,.7)',
    type: 'string',
    on_change: function($this){
      $this.spectrum('set', this.value);
      $('#text_data, #editor').css('background-color', this.value);

      if(this.value.match(/^rgba/))
      {
        let no_alpha = this.value.replace('rgba(', '').replace(')','').split(',');
        page.set_val('background_color_no_alpha','rgb(' + no_alpha[0] + ',' + no_alpha[1] + ',' + no_alpha[2] + ')');
      }
      else if(this.value.match(/^hsla/))
      {
        let no_alpha = this.value.replace('hsla(', '').replace(')','').split(',');
        page.set_val('background_color_no_alpha','hsl(' + no_alpha[0] + ',' + no_alpha[1] + ',' + no_alpha[2] + ')');
      }
      else
      {
        page.set_val('background_color_no_alpha', this.value);
      }
    }
  },
  background_color_no_alpha: {
    default: 'rgb(0,0,0)',
    type: 'string',
    on_change: function()
    {
      $('#text, .ui-tabs-nav .ui-state-default').css('background-color', this.value);
    }
  },
  default_text_color: {
    default: 'rgba(255,255,255,.7)',
    type: 'string',
    on_change:  function($this){
      $this.spectrum('set', this.value);
      $('#text_data').css('color', this.value);
      $('#editor').css('color', this.value);
    }
  },
  text_opacity: {
    default: 100,
    type: 'number',
    on_change: function($this){
      if(this.value !== '' && this.value !== null){
        $('#text_data, #editor').css('opacity', this.value / 100);
      }
      else
      {
        $('#text_data, #editor').css('opacity', 1);
      }
    }
  },
  show_text: {
    default: true,
    type: 'boolean',
    on_change: function($this){
      if(this.value){
        $('#text_data, #editor').css('opacity', settings.text_opacity.value / 100);
      } else {
        $('#text_data, #editor').css('opacity', 0);
      }
    }
  },
  show_bg_img: {
    default: false,
    type: 'boolean',
    on_change: function($this){
      if(this.value){
        $('#text_html_wrap').addClass('show_bg');
      } else {
        $('#text_html_wrap').removeClass('show_bg');
      }
    }
  },
  bg_x: {
    default: 8,
    type: 'number',
    on_change: function($this){
      $('#text_wrap').css('background-position-x', this.value + 'px');
      $('#html_wrap_side_by_side').css('background-position-x', this.value + 'px');
    }
  },
  bg_y: {
    default: 8,
    type: 'number',
    on_change: function($this){
      $('#text_wrap').css('background-position-y', this.value + 'px');
      $('#html_wrap_side_by_side').css('background-position-y', this.value + 'px');
    }
  },
  bg_size: {
    default: null,
    type: 'number',
    on_change: function($this){
      if(this.value !== '' && this.value !== null){
        let size = this.value + settings.bg_size_type.value;
        $('#text_wrap').css('background-size', size);
        $('#html_wrap_side_by_side').css('background-size', size);
        $('#bg_size_type').removeAttr('disabled');
      }
      else
      {
        $('#bg_size_type').attr('disabled', 'disabled');
      }
    }
  },
  bg_size_type: {
    default: 'px',
    type: 'string',
    on_change: function($this){
      if(settings.bg_size.value !== '' && settings.bg_size.value !== null){
        let size = settings.bg_size.value + this.value;
        $('#text_wrap').css('background-size', size);
        $('#html_wrap_side_by_side').css('background-size', size);
      }
    }
  },
  bg_img: {
    default: null,
    complex: true,
    type: 'image',
    on_load: function(){
      if(settings.show_bg_img.value && !settings.bg_img_url.value && this.value){
        $('#show_bg_img').removeAttr('disabled');
        $('#text_wrap').css('background-image', 'url(' + this.value + ')');
        $('#html_wrap_side_by_side').css('background-image', 'url(' + this.value + ')');

        this.image = new Image();
        this.image.src = this.value;
        this.image.onload = function()
        {
          if(settings.bg_size.value === '' || settings.bg_size.value === null)
          {
            page.set_val('show_bg_img', true);
            page.set_val('bg_size', this.width);
            page.set_val('bg_size_type', 'px', true);
          }

          $('#show_bg_img').removeAttr('disabled');
          $('#text_wrap').css('background-image', 'url(' + settings.bg_img.image.src + ')');
          $('#html_wrap_side_by_side').css('background-image', 'url(' + settings.bg_img.image.src + ')');

          cdat.get_image_colors(settings.bg_img.image, false);
        }
      }

      page.toggle_ascii_settings();
    },
    on_change: function($this, e){
      let _this = this;
      try
      {
        let reader = new FileReader();
        reader.onload = function(file)
        {
          _this.image = new Image();
          _this.image.src = file.target.result;
          _this.image.onload = function() {
              settings.bg_img.value = reader.result;
              localStorage.setItem('c0lorize_bg_img', reader.result);

              page.set_val('show_bg_img', true);
              page.set_val('bg_size', this.width);
              page.set_val('bg_size_type', 'px', true);

              $('#show_bg_img').removeAttr('disabled');
              $('#text_wrap').css('background-image', 'url(' + reader.result + ')');
              $('#html_wrap_side_by_side').css('background-image', 'url(' + reader.result + ')');

              page.toggle_ascii_settings();

              cdat.get_image_colors(settings.bg_img.image);
          };
          _this.image.onerror = function(e){
            console.error(e)
          };
        }
        reader.readAsDataURL(e.target.files[0]);
      } catch(e) {
        console.error(e);
      }
    }
  },
  bg_img_url: {
    default: '',
    type: 'string',
    timed_typer: true,
    info: 'URL of your background image. This overrides an uploaded image.',
    change_on_different_val: false,
    on_load: function($this){
      if(this.value){
        let url = this.value;
        this.image = new Image();
        this.image.src = url;
        this.image.crossOrigin = 'Anonymous';
        this.image.onload = function()
        {
            if(settings.bg_size.value === '' || settings.bg_size.value === null)
            {
              page.set_val('show_bg_img', true);
              page.set_val('bg_size', this.width);
              page.set_val('bg_size_type', 'px', true);
            }

            $('#show_bg_img').removeAttr('disabled');
            $('#text_wrap').css('background-image', 'url(' + url + ')');
            $('#html_wrap_side_by_side').css('background-image', 'url(' + url + ')');

            page.toggle_ascii_settings();

            cdat.get_image_colors(settings.bg_img_url.image, false);
        };
        this.image.onerror = function(e){
          console.error(e)
        };
      }
    },
    on_change: function($this){
      if(this.value){
        let url = this.value;
        this.image = new Image();
        this.image.src = url;
        this.image.crossOrigin = 'Anonymous';
        this.image.onload = function()
        {
            page.set_val('show_bg_img', true);
            page.set_val('bg_size', this.width);
            page.set_val('bg_size_type', 'px', true);

            $('#show_bg_img').removeAttr('disabled');
            $('#text_wrap').css('background-image', 'url(' + url + ')');
            $('#html_wrap_side_by_side').css('background-image', 'url(' + url + ')');

            page.toggle_ascii_settings();

            cdat.get_image_colors(settings.bg_img_url.image);
        };
        this.image.onerror = function(e){
          console.error(e)
        };
      }
    }
  },
  plain_or_rich: {
    default: true,
    type: 'boolean',
    on_change: function()
    {
      if(this.value)
      {
        $('#text').removeClass('plain_editor');
        $('#text').addClass('rich_editor');
      }
      else
      {
        $('#text').addClass('plain_editor');
        $('#text').removeClass('rich_editor');
      }
    }
  },
  tab_or_panel: {
    default: true,
    type: 'boolean',
    on_change: function()
    {
      if(this.value)
      {
        $('#tabs').addClass('side_by_side');
      }
      else
      {
        $('#tabs').removeClass('side_by_side');
      }
    }
  },
  char_popout: {
    default: false,
    type: 'boolean',
    on_change: function()
    {
      if(this.value)
      {
        $( "#char_panel" ).dialog({
          title: 'Characters',
          dialogClass: "char_dialog",
          width: 205,
          close: function() {
            page.set_val('char_popout', false);
          }
        });
      }
    }
  },
  style_popout: {
    default: false,
    type: 'boolean',
    on_change: function()
    {
      if(this.value)
      {
        $( "#style_panel" ).dialog({
          title: 'Styles',
          dialogClass: "style_dialog",
          width: 146,
          close: function() {
            page.set_val('style_popout', false);
          }
        });
      }
    }
  },
  text_data: {
    default: '',
    type: 'string',
    complex: true,
    timed_typer: true,
    on_change: function($this)
    {
      if(this.value)
      {
        $('#textarea_sizer').html(this.value.replace(/[\n\r]/mg, '<br/>'));

        $this.css({
          'min-height': ($('#textarea_sizer').height() + 100),
          'min-width': $('#textarea_sizer').width()
        });

        $('#text_wrap').css({
          'min-height': ($('#textarea_sizer').height() + 100),
          'min-width': $('#textarea_sizer').width()
        });

        $('#html_wrap_side_by_side').css({
          'min-height': ($('#textarea_sizer').height() + 100),
          'min-width': $('#textarea_sizer').width()
        });

        update_html();
      }
    }
  },
  ascii_color: {
    default: true,
    type: 'boolean',
    on_change: function($this)
    {
      if(this.value)
      {
        $('#use_bg_color').removeAttr('disabled');
      }
      else
      {
        $('#use_bg_color').attr('disabled', 'disabled');
      }
    }
  },
  use_bg_color: {
    default: true,
    type: 'boolean',
    on_change: function($this)
    {
      if(this.value)
      {
        $('#avr_bg_color').removeAttr('disabled');
      }
      else
      {
        $('#avr_bg_color').attr('disabled', 'disabled');
      }
    }
  },
  px_per_char_width: {
    default: 8.45,
    type: 'number',
    info: 'The number of image pixels (width) rendered as one character. Increasing this number will shrink the width of your ASCII render.'
  },
  px_per_char_height: {
    default: 14,
    type: 'number',
    info: 'The number of image pixels (height) rendered as one character. Increasing this number will shrink the height of your ASCII render.'
  },
  use_letters: {
    default: true,
    type: 'boolean',
    on_change: function($this)
    {
      if(settings.avr_bg_color.value) settings.avr_bg_color.on_change();
      update_char_str();
    }
  },
  use_other_char: {
    default: true,
    type: 'boolean',
    on_change: function($this)
    {
      if(settings.avr_bg_color.value) settings.avr_bg_color.on_change();
      update_char_str();
    }
  },
  use_blocks: {
    default: true,
    type: 'boolean',
    on_change: function($this)
    {
      if(settings.avr_bg_color.value) settings.avr_bg_color.on_change();
      update_char_str();
    }
  },
  use_quadrent_side: {
    default: false,
    type: 'boolean',
    on_change: function($this)
    {
      if(settings.avr_bg_color.value) settings.avr_bg_color.on_change();
      update_char_str();
    }
  },
  use_custom: {
    default: false,
    type: 'boolean',
    on_change: function($this)
    {
      if(this.value)
      {
        $('#custom_characters').removeAttr('disabled');
      }
      else
      {
        $('#custom_characters').attr('disabled', 'disabled');
      }

      if(settings.avr_bg_color.value) settings.avr_bg_color.on_change();
      update_char_str();
    }
  },
  custom_characters: {
    default: '',
    type: 'string',
    timed_typer: true,
    on_change: function($this)
    {
      if(settings.avr_bg_color.value) settings.avr_bg_color.on_change();
      update_char_str();

      if(this.value.match(/\d/))
      {
        $this.addClass('warning');
        $this.prop('warning', 'Using numbers can cause your image to glitch in some crazy ways.')
      }
      else
      {
        $this.removeClass('warning');
      }
    }
  },
  avr_bg_color: {
    default: true,
    type: 'boolean',
    loading: false,
    on_change: function($this)
    {
      if(this.value && !settings.avr_bg_color.loading)
      {
        if(!ascii_mix_color)
        {
          settings.avr_bg_color.loading = true;
          $.getJSON("js/ascii_char_colors.json", function(json)
          {
            ascii_mix_color = json;
            cdat.build_ascii_mix_color(char_str.split(''));
            settings.avr_bg_color.loading = false;
          });

          //this is not great to run in the browser, since the permutations are batshit.
          //so... if we need to run this we can, but otherwise it's stored as a json file.

          /*let char_arr = [];
          for( var i = 32; i <= 126; i++ )
          {
            if(i > 47 && i < 58) continue; //skip numbers these mess up color codes
            char_arr.push(String.fromCharCode(i));
          }
          char_arr = char_arr.concat(chars.block.shade.chars);
          char_arr = char_arr.concat(chars.block.solid_tb.chars);
          char_arr = char_arr.concat(chars.block.solid_lr.chars);
          char_arr = char_arr.concat(chars.block.quadrent.chars);

          cdat.build_ascii_mix_color(char_arr);
          settings.avr_bg_color.loading = false;*/
        }
        else
        {
          settings.avr_bg_color.loading = true;
          cdat.build_ascii_mix_color(char_str.split(''));
          settings.avr_bg_color.loading = false;
        }
      }
    }
  },
  invert_img_colors: {
    default: false,
    type: 'boolean'
  },
  invert_ascii_colors: {
    default: false,
    type: 'boolean'
  },
  desaturate_img_colors: {
    default: false,
    type: 'boolean'
  },
  desaturate_ascii_colors: {
    default: false,
    type: 'boolean'
  },
  brightness_img_colors: {
    default: false,
    type: 'boolean',
    on_change: function($this)
    {
      if(this.value)
      {
        $('#brightness_img_int').removeAttr('disabled');
      }
      else
      {
        $('#brightness_img_int').attr('disabled', 'disabled');
      }
    }
  },
  brightness_img_int: {
    default: 0,
    type: 'number'
  },
  brightness_ascii_colors: {
    default: false,
    type: 'boolean',
    on_change: function($this)
    {
      if(this.value)
      {
        $('#brightness_ascii_int').removeAttr('disabled');
      }
      else
      {
        $('#brightness_ascii_int').attr('disabled', 'disabled');
      }
    }
  },
  brightness_ascii_int: {
    default: 0,
    type: 'number'
  },
  contrast_img_colors: {
    default: false,
    type: 'boolean',
    on_change: function($this)
    {
      if(this.value)
      {
        $('#contrast_img_int').removeAttr('disabled');
      }
      else
      {
        $('#contrast_img_int').attr('disabled', 'disabled');
      }
    }
  },
  contrast_img_int: {
    default: 1,
    type: 'number'
  },
  contrast_ascii_colors: {
    default: false,
    type: 'boolean',
    on_change: function($this)
    {
      if(this.value)
      {
        $('#contrast_ascii_int').removeAttr('disabled');
      }
      else
      {
        $('#contrast_ascii_int').attr('disabled', 'disabled');
      }
    }
  },
  contrast_ascii_int: {
    default: 1,
    type: 'number'
  }
};
