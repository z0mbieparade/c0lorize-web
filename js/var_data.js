let colors = [
  { unicode: '\u00030',  irc: '00', term: 37, rgb: [255,255,255], match: ['0', 'white'], light: 0, dark: 15, tint_left: 0, tint_right: 0, invert: 1 },
  { unicode: '\u00031',  irc: '01', term: 30, rgb: [0,0,0], match: ['1', 'black'], light: 14, dark: 1, tint_left: 1, tint_right: 1, invert: 0 },
  { unicode: '\u00032',  irc: '02', term: 34, rgb: [0,0,128], match: ['2', 'navy', 'darkblue'], light: 12, dark: 1, tint_left: 10, tint_right: 6, invert: 8 },
  { unicode: '\u00033',  irc: '03', term: 32, rgb: [0,154,0], match: ['3', 'green', 'darkgreen', 'forest'], light: 9, dark: 1, tint_left: 8, tint_right: 10, invert: 13 },
  { unicode: '\u00034',  irc: '04', term: 91, rgb: [255,0,0], match: ['4', 'red'], light: 13, dark: 5, tint_left: 6, tint_right: 7, invert: 11 },
  { unicode: '\u00035',  irc: '05', term: 31, rgb: [165,42,42], match: ['5', 'brown', 'maroon', 'darkred'], light: 4, dark: 1, tint_left: 4, tint_right: 7, invert: 15 },
  { unicode: '\u00036',  irc: '06', term: 35, rgb: [204,0,255], match: ['6', 'purple', 'violet'], light: 13, dark: 1, tint_left: 2, tint_right: 4, invert: 9 },
  { unicode: '\u00037',  irc: '07', term: 33, rgb: [255,158,23], match: ['7', 'orange', 'olive'], light: 8, dark: 5, tint_left: 4, tint_right: 8, invert: 10 },
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
    info: {
      title: 'Outlines'
    },
    light: {
      info: {
        title: 'Light ╭┼╮'
      },
      chars:
        ['╭','┌','─','┬','╶','┐','╮',
         '╵','│','╲','╳','╱','│','│',
         '│','├','╱','┼','╲','┤','╷',
         '╰','└','╴','┴','─','┘','╯'],
      cols: 7
    },
    light_dash: {
      info: {
        title: 'Light Dash ╌'
      },
      chars:
        ['╌','╎',
         '┄','┆',
         '┈','┊'],
      cols: 2,
    },
    light_heavy: {
      info: {
        title: 'Light/Heavy ┍┿┑'
      },
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
      info: {
        title: 'Light/Double ╒╪╕'
      },
      chars:
        ['╒','═','╤','═','╕',
         '╞','╓','╥','╖','│',
         '╪','╟','╫','╢','╪',
         '│','╙','╨','╜','╡',
         '╘','═','╧','═','╛'],
      cols: 5
    },
    heavy: {
      info: {
        title: 'Heavy ┏╋┓'
      },
      chars:
        ['┏','╸','┳','┓',
         '┣','━','┫','┃',
         '╻','╋','┛','╹',
         '┗','┻','╺','┛'],
      cols: 4
    },
    heavy_dash: {
      info: {
        title: 'Heavy Dash ╍'
      },
      chars:
        ['╍','╏',
         '┅','┇',
         '┉','┋'],
      cols: 2,
    },
    double: {
      info: {
        title: 'Double ╔╬╗'
      },
      chars:
        ['╔','╦','╗',
         '╠','═','╣',
         '║','╬','║',
         '╚','╩','╝'],
      cols: 3
    }
  },
  block: {
    info: {
      title: 'Blocks'
    },
    solid_tb: {
      info: {
        title: 'Solid Top-Bottom ▄ █ ▀'
      },
      chars:
        ['▁','▂','▃','▄','▅','▆','▇','█','▀','▔'],
      cols: 10
    },
    solid_lr: {
      info: {
        title: 'Solid Left-Right ▌█▐'
      },
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
      info: {
        title: 'Quadrents ▝▞▟'
      },
      chars:
        ['▛','▜',
         '▘','▝',
         '▞','▚',
         '▖','▗',
         '▙','▟'],
      cols: 2,
    },
    shade: {
      info: {
        title: 'Shade ░▓'
      },
      chars:
        ['░','▒','▓','█'],
      cols: 4
    }
  },
  shape: {
    info: {
      title: 'Shapes'
    },
    solid_tri: {
      info: {
        title: 'Solid Triangles ▲'
      },
      chars: [
        '▲','▶','▼','◀',
        '◢','◣','◤','◥',
        '▴','▸','▾','◂',
        '►','◄'
      ],
      cols: 4
    },
    outline_tri: {
      info: {
        title: 'Outline Triangles △'
      },
      chars: [
        '△','▷','▽','◁',
        '◸','◹','◺','◿',
        '▵','▹','▿','◃',
        '▻','◅','◭','◮',
        '◬'
      ],
      cols: 4
    },
    squares: {
      info: {
        title: 'Squares ■'
      },
      chars: [
        '■','◼','▪','◾',
        '□','▢','▫','◽',
        '▣','▤','▥','▦',
        '▧','▨','▩','◫',
        '◧','◨','◩','◪',
        '◰','◱','◲','◳'
      ],
      cols: 4
    },
    rectangles: {
      info: {
        title: 'Rectangles ▬'
      },
      chars: [
        '▬','▭','▮','▯'
      ],
      cols: 4
    },
    circles: {
      info: {
        title: 'Circles ●'
      },
      chars: [
        '◐','◑','◒','◓',
        '◔','◕','◖','◗',
        '◴','◵','◶','◷',
        '◯','○','◌','◎',
        '◉','●','◍'
      ],
      cols: 4
    },
    diamonds: {
      info: {
        title: 'Diamonds ◆'
      },
      chars: [
        '◆','◇','◈','◊'
      ],
      cols: 4
    },
    other: {
      info: {
        title: 'Other ◜▰◝'
      },
      chars: [
        '▰','▱',
        '◘','◙',
        '◚','◛',
        '◜','◝',
        '◞','◟',
        '◠','◡'
      ],
      cols: 2
    }
  }
};

let flat_settings = {};
let settings = {
  plain_or_rich: {
    default: true,
    type: 'boolean',
    on_change: function()
    {
      if(this.val())
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
      if(this.val())
      {
        page.set_val('plain_or_rich', false);
        page.set_mode('plain_or_rich', 'disable');
        $('#tabs').addClass('side_by_side');
        update_html();
      }
      else
      {
        page.set_mode('plain_or_rich', 'enable');
        $('#tabs').removeClass('side_by_side');
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
      if(this.val())
      {
        $('#textarea_sizer').html(this.val().replace(/[\n\r]/mg, '<br/>'));

        page.set_style('min-width', $('#textarea_sizer').width());
        page.set_style('min-height', ($('#textarea_sizer').height() + 100));

        update_html();
      }
    }
  },

  //dialogs
  style_dialog: {
    type: 'dialog',
    title: 'Styles',
    x: 142,
    y: 72,
    w: 179
  },
  download_img_options_dialog: {
    type: 'dialog',
    title: 'Image Options',
    w: 140,
    align: 'center',
    open: function()
    {
      let $dialog = $(this.dialog);
      let _this = this;

      $dialog.find('#download_img_w_options').off('click.download')
        .on('click.download', function(){
          cdat.generate_image(function(img){
            download("c0lorize.png", img);
          },{
            custom: true
          });
      });

      if(page.get_val('img_transparent_bkg'))
      {
        $dialog.find('#gen_image_container').addClass('transparent_bkg');
      }
      else
      {
        $dialog.find('#gen_image_container').removeClass('transparent_bkg');
      }

      page.update_preview_img($dialog);
    },
    settings: {
      img_full_size_preview: {
        default: false,
        type: 'boolean',
        on_change: function($this)
        {
          if(page.get_val('img_transparent_bkg'))
          {
            let $dialog = $(settings.download_img_options_dialog.dialog);
            if(this.val())
            {
              $dialog.find('#gen_image_container').addClass('full_size_preview');
            }
            else
            {
              $dialog.find('#gen_image_container').removeClass('full_size_preview');
            }
          }
        }
      },
      img_font_size: {
        default: 14,
        type: 'number',
        on_change: function($this)
        {
          if(page.get_val('img_transparent_bkg'))
          {
            if(page.get_val('img_transparent_bkg'))
            {
              page.set_val('img_line_height', this.val())
            }

            page.update_preview_img($(settings.download_img_options_dialog.dialog));
          }
        }
      },
      img_line_height: {
        default: 14,
        type: 'number',
        on_change: function()
        {
          if(page.get_val('img_transparent_bkg') && !page.get_val('img_transparent_bkg'))
          {
            page.update_preview_img($(settings.download_img_options_dialog.dialog));
          }
        }
      },
      img_link_font_size_height: {
        default: true,
        type: 'boolean',
        on_change: function($this)
        {
          if(page.get_val('img_transparent_bkg'))
          {
            if(!this.val())
            {
              page.set_mode('img_line_height', 'enable');
            }
            else
            {
              page.set_val('img_line_height', page.get_val('img_transparent_bkg'));
              page.set_mode('img_line_height', 'disable');
            }

            page.update_preview_img($(settings.download_img_options_dialog.dialog));
          }
        }
      },
      img_padding: {
        default: 8,
        type: 'number',
        on_change: function()
        {
          if(page.get_val('img_transparent_bkg'))
          {
            page.update_preview_img($(settings.download_img_options_dialog.dialog));
          }
        }
      },
      img_transparent_bkg: {
        default: false,
        type: 'boolean',
        on_change: function()
        {
          if(page.get_val('img_transparent_bkg'))
          {
            let $dialog = $(settings.download_img_options_dialog.dialog);
            page.update_preview_img($dialog);

            if(this.val())
            {
              $dialog.find('#gen_image_container').addClass('transparent_bkg');
            }
            else
            {
              $dialog.find('#gen_image_container').removeClass('transparent_bkg');
            }
          }
        }
      },
    }
  },
  text_settings_dialog: {
    type: 'dialog',
    title: 'Settings',
    dialogClass: 'settings_dialog',
    w: 287,
    x: 40,
    y: 72,
    align: 'right',
    pop_on_page_load: true,
    init: function()
    {
      let $dialog = $(this.dialog);
      let _this = this;

      $dialog.find('#bg_img_button').on('click', function(){
        $dialog.find('#bg_img').click();
      });

      $dialog.find('#swap_colors').on('click', function(){
        let bg_color = page.get_val('background_color');
        let fg_color = page.get_val('background_color');
        page.set_val('background_color', fg_color);
        page.set_val('default_text_color', bg_color);
      })

      $dialog.find('#download_settings').on('click', function(){
        download("c0lorize_settings.json", JSON.stringify(save_settings));
      });

      $dialog.find('#upload_settings').on('click', function(){
        $dialog.find('#upload_json_settings').click();
      });

      $dialog.find('#upload_json_settings').on('change', function(e){
        try
        {
          let reader = new FileReader();
          reader.onload = function(file)
          {
            let data = file.target.result;
            if(file.target.result.match(/^data:application\/json;base64,/))
            {
              data = JSON.parse(atob(data.replace('data:application/json;base64,','')));
              page.load_page_settings(data);
              location.reload();
            }
            else
            {
              alert('Not a JSON file.')
            }
          }
          reader.readAsDataURL(e.target.files[0]);
        } catch(e) {
          console.error(e);
        }
      })
    },
    settings: {
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
          let val = this.val();
          $('html').removeAttr('class').addClass(val.replace(/\s/g, '-') + '-font');
        }
      },
      font_size: {
        default: 14,
        type: 'number',
        on_change: function($this)
        {
          $('body').removeAttr('class').addClass('fontsize-' + this.val());
          page.set_val('px_per_char_width', ascii.pixel_div[this.val()].w);
          page.set_val('px_per_char_height', ascii.pixel_div[this.val()].h);
        }
      },
      background_color: {
        default: 'rgba(0,0,0,.7)',
        type: 'string',
        on_change: function($this){
          $this.spectrum('set', this.val());
          page.set_style('background-color', this.val());

          if(this.val().match(/^rgba/))
          {
            let no_alpha = this.val().replace('rgba(', '').replace(')','').split(',');
            page.set_val('background_color_no_alpha','rgb(' + no_alpha[0] + ',' + no_alpha[1] + ',' + no_alpha[2] + ')');
          }
          else if(this.val().match(/^hsla/))
          {
            let no_alpha = this.val().replace('hsla(', '').replace(')','').split(',');
            page.set_val('background_color_no_alpha','hsl(' + no_alpha[0] + ',' + no_alpha[1] + ',' + no_alpha[2] + ')');
          }
          else
          {
            page.set_val('background_color_no_alpha', this.val());
          }
        }
      },
      background_color_no_alpha: {
        default: 'rgb(0,0,0)',
        type: 'string',
        on_change: function()
        {
          $('#text, .ui-tabs-nav .ui-state-default').css('background-color', this.val());
          page.set_style('background-color-no-alpha', this.val());
        }
      },
      default_text_color: {
        default: 'rgba(255,255,255,.7)',
        type: 'string',
        on_change:  function($this){
          $this.spectrum('set', this.val());
          page.set_style('color', this.val());
        }
      },
      text_opacity: {
        default: 100,
        type: 'number',
        on_change: function($this){
          if(this.val() !== '' && this.val() !== null){
            page.set_style('opacity', this.val() / 100);
          }
          else
          {
            page.set_style('opacity', 1);
          }
        }
      },
      show_text: {
        default: true,
        type: 'boolean',
        on_change: function($this){
          if(this.val()){
            page.set_style('opacity', page.get_val('background_color') / 100);
          } else {
            page.set_style('opacity', 0);
          }
        }
      },
      show_bg_img: {
        default: false,
        type: 'boolean',
        on_change: function($this){
          if(this.val()){
            page.set_style('background-image-hide', false);
          } else {
            page.set_style('background-image-hide', true);
          }
        }
      },
      bg_x: {
        default: 8,
        type: 'number',
        on_change: function($this){
          page.set_style('background-position-x', this.val());
        }
      },
      bg_y: {
        default: 8,
        type: 'number',
        on_change: function($this){
          page.set_style('background-position-y', this.val());
        }
      },
      bg_size: {
        default: null,
        type: 'number',
        on_change: function($this){
          if(this.val() !== '' && this.val() !== null){
            let size = this.val() + page.get_val('background_color');
            page.set_style('background-size', size);
            page.set_mode('bg_size_type', 'enable');
          }
          else
          {
            page.set_mode('bg_size_type', 'disable');
          }
        }
      },
      bg_size_type: {
        default: 'px',
        type: 'string',
        on_change: function($this){
          if(page.get_val('background_color') !== '' && page.get_val('background_color') !== null){
            let size = page.get_val('background_color') + this.val();
            page.set_style('background-size', size);
          }
        }
      },
      bg_img: {
        default: null,
        complex: true,
        type: 'image',
        on_load: function(){
          if(page.get_val('background_color') && !page.get_val('background_color') && this.val())
          {
            page.set_mode('show_bg_img', 'enable');
            page.set_style('background-image', this.val());

            this.image = new Image();
            this.image.src = this.val();
            this.image.onload = function()
            {
              if(page.get_val('background_color') === '' || page.get_val('background_color') === null)
              {
                page.set_val('show_bg_img', true);
                page.set_val('bg_size', this.width);
                page.set_val('bg_size_type', 'px', true);
              }

              page.set_mode('show_bg_img', 'enable');
              page.set_style('background-image', settings.text_settings_dialog.settings.bg_img.image.src);

              cdat.get_image_colors(settings.text_settings_dialog.settings.bg_img.image, false);
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
                  page.get_val('background_color') = reader.result;
                  localStorage.setItem('c0lorize_bg_img', reader.result);

                  page.set_val('show_bg_img', true);
                  page.set_val('bg_size', this.width);
                  page.set_val('bg_size_type', 'px', true);

                  page.set_mode('show_bg_img', 'enable');
                  page.set_style('background-image', reader.result);

                  page.toggle_ascii_settings();

                  cdat.get_image_colors(settings.text_settings_dialog.settings.bg_img.image);
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
          if(this.val())
          {
            let url = this.val();
            this.image = new Image();
            this.image.src = url;
            this.image.crossOrigin = 'Anonymous';
            this.image.onload = function()
            {
                if(page.get_val('background_color') === '' || page.get_val('background_color') === null)
                {
                  page.set_val('show_bg_img', true);
                  page.set_val('bg_size', this.width);
                  page.set_val('bg_size_type', 'px', true);
                }

                page.set_mode('show_bg_img', 'enable');
                page.set_style('background-image', url);

                page.toggle_ascii_settings();

                cdat.get_image_colors(settings.text_settings_dialog.settings.bg_img_url.image, false);
            };
            this.image.onerror = function(e){
              console.error(e)
            };
          }
        },
        on_change: function($this){
          if(this.val())
          {
            let url = this.val();
            this.image = new Image();
            this.image.src = url;
            this.image.crossOrigin = 'Anonymous';
            this.image.onload = function()
            {
                page.set_val('show_bg_img', true);
                page.set_val('bg_size', this.width);
                page.set_val('bg_size_type', 'px', true);
                page.set_mode('show_bg_img', 'enable');
                page.set_style('background-image', url);

                page.toggle_ascii_settings();

                cdat.get_image_colors(settings.text_settings_dialog.settings.bg_img_url.image);
            };
            this.image.onerror = function(e){
              console.error(e)
            };
          } else {
            if(!page.get_val('background_color')){
              page.set_style('background-image', false);
            }
          }
        }
      },
    }
  },
  ascii_settings_dialog: {
    type: 'dialog',
    title: 'ASCII Conversion',
    dialogClass: 'settings_dialog',
    w: 287,
    x: 20,
    y: 72,
    align: 'right',
    init: function()
    {
      $('#bg_to_ascii').on('click', function()
      {
        ascii.convert();
      })
    },
    settings: {
      ascii_color: {
        default: true,
        type: 'boolean',
        on_change: function($this)
        {
          if(this.val())
          {
            page.set_mode('use_bg_color', 'enable');
          }
          else
          {
            page.set_mode('use_bg_color', 'disable');
          }
        }
      },
      use_bg_color: {
        default: true,
        type: 'boolean',
        on_change: function($this)
        {
          if(this.val())
          {
            page.set_mode('avr_bg_color', 'enable');
          }
          else
          {
            page.set_mode('avr_bg_color', 'disable');
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
          if(page.get_val('background_color')) settings.ascii_settings_dialog.settings.avr_bg_color.on_change();
          update_char_str();
        }
      },
      use_other_char: {
        default: true,
        type: 'boolean',
        on_change: function($this)
        {
          if(page.get_val('background_color')) settings.ascii_settings_dialog.settings.avr_bg_color.on_change();
          update_char_str();
        }
      },
      use_blocks: {
        default: true,
        type: 'boolean',
        on_change: function($this)
        {
          if(page.get_val('background_color')) settings.ascii_settings_dialog.settings.avr_bg_color.on_change();
          update_char_str();
        }
      },
      use_quadrent_side: {
        default: false,
        type: 'boolean',
        on_change: function($this)
        {
          if(page.get_val('background_color')) settings.ascii_settings_dialog.settings.avr_bg_color.on_change();
          update_char_str();
        }
      },
      use_triangles_side: {
        default: false,
        type: 'boolean',
        on_change: function($this)
        {
          if(page.get_val('background_color')) settings.ascii_settings_dialog.settings.avr_bg_color.on_change();
          update_char_str();
        }
      },
      use_circles_side: {
        default: false,
        type: 'boolean',
        on_change: function($this)
        {
          if(page.get_val('background_color')) settings.ascii_settings_dialog.settings.avr_bg_color.on_change();
          update_char_str();
        }
      },
      use_custom: {
        default: false,
        type: 'boolean',
        on_change: function($this)
        {
          if(this.val())
          {
            page.set_mode('custom_characters', 'enable');
          }
          else
          {
            page.set_mode('custom_characters', 'disable');
          }

          if(page.get_val('background_color')) settings.ascii_settings_dialog.settings.avr_bg_color.on_change();
          update_char_str();
        }
      },
      custom_characters: {
        default: '',
        type: 'string',
        timed_typer: true,
        on_change: function($this)
        {
          if(page.get_val('background_color')) settings.ascii_settings_dialog.settings.avr_bg_color.on_change();
          update_char_str();

          if(this.val().match(/\d/))
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
          var regen_json_file = false; //if true we force the json to re-download
          if(this.val() && !settings.ascii_settings_dialog.settings.avr_bg_color.loading)
          {
            if(!ascii_mix_color || regen_json_file === true)
            {
              settings.ascii_settings_dialog.settings.avr_bg_color.loading = true;

              if(regen_json_file === false)
              {
                $.getJSON("js/ascii_char_colors.json", function(json)
                {
                  ascii_mix_color = json;
                  cdat.build_ascii_mix_color(char_str.split(''));
                  settings.ascii_settings_dialog.settings.avr_bg_color.loading = false;
                });
              }
              else
              {
                //this is not great to run in the browser, since the permutations are batshit.
                //so... if we need to run this we can, but otherwise it's stored as a json file.

                let char_arr = [];
                for( var i = 32; i <= 126; i++ )
                {
                  if(i > 47 && i < 58) continue; //skip numbers these mess up color codes
                  char_arr.push(String.fromCharCode(i));
                }
                char_arr = char_arr.concat(chars.block.shade.chars);
                char_arr = char_arr.concat(chars.block.solid_tb.chars);
                char_arr = char_arr.concat(chars.block.solid_lr.chars);
                char_arr = char_arr.concat(chars.block.quadrent.chars);

                char_arr = char_arr.concat(chars.shape.solid_tri.chars);
                char_arr = char_arr.concat(chars.shape.outline_tri.chars);
                char_arr = char_arr.concat(chars.shape.circles.chars);

                cdat.build_ascii_mix_color(char_arr, true);
                settings.ascii_settings_dialog.settings.avr_bg_color.loading = false;
              }
            }
            else
            {
              settings.ascii_settings_dialog.settings.avr_bg_color.loading = true;
              cdat.build_ascii_mix_color(char_str.split(''));
              settings.ascii_settings_dialog.settings.avr_bg_color.loading = false;
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
          if(this.val())
          {
            page.set_mode('brightness_img_int', 'enable');
          }
          else
          {
            page.set_mode('brightness_img_int', 'disable');
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
          if(this.val())
          {
            page.set_mode('brightness_ascii_int', 'enable');
          }
          else
          {
            page.set_mode('brightness_ascii_int', 'disable');
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
          if(this.val())
          {
            page.set_mode('contrast_img_int', 'enable');
          }
          else
          {
            page.set_mode('contrast_img_int', 'disable');
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
          if(this.val())
          {
            page.set_mode('contrast_ascii_int', 'enable');
          }
          else
          {
            page.set_mode('contrast_ascii_int', 'disable');
          }
        }
      },
      contrast_ascii_int: {
        default: 1,
        type: 'number'
      },
    }
  },
  filter_settings_dialog: {
    type: 'dialog',
    title: 'Filters',
    dialogClass: 'settings_dialog',
    w: 238,
    x: 0,
    y: 72,
    align: 'right',
    init: function()
    {
      filter.build_filters();
    }
  },
};

for(let type in chars)
{
  settings['char_' + type + '_dialog'] = {
    type: 'dialog',
    title: chars[type].info.title,
    dialogClass: 'char_dialog',
    w: 205,
    x: 348,
    y: 72
  };
}

for(let id in settings)
{
  settings[id].val = function(){
    return page.get_val(id, this);
  }

  if(settings[id].type === 'dialog')
  {
    settings[id] = $.extend({
      default: false,
      title: id.replace(/_dialog$/, '').split('_').map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' '),
      x: 0,
      y: 72,
      align: 'left',
      dialog: '.dialog[dialog=' + id + ']',
      dialogClass: '',
      $parent: $('body'),
      init: function(){},
      open: function(){},
      center: function()
      {
        if(this.val() && this.$dialog)
        {
          this.$dialog.dialog( "option", "position", { my: "center", at: "center", of: window } );
        }
      },
      width: function(width, center)
      {
        if(this.val())
        {
          let $dialog = this.$dialog ? this.$dialog : $(this.dialog);

          $dialog.dialog( "option", "width", width );

          if(center)
          {
            this.center();
          }
        }
      },
      on_load: function()
      {
        let _this = this;
        if(this.val())
        {
          if(_this.$dialog)
          {
            _this.$dialog.dialog("open");
          }
          else
          {
            _this.$dialog = $(_this.dialog).dialog(
            {
              title: _this.title,
              dialogClass: _this.dialogClass+' '+id,
              width: _this.w,
              position: _this.align === 'center' ? {
                my: "center",
                at: "center",
                of: window
              } : {
                my: _this.align+'+'+page.get_val(id+'_x')+' top+'+page.get_val(id+'_y'),
                at: _this.align+' top'
              },
              open: function(){
                if(!_this.opened){
                  if(_this.settings){
                    page.pop_settings(_this.settings);
                  }

                  _this.init.call(_this);
                  _this.opened = true;
                }
                _this.open.call(_this);
              },
              close: function() {
                page.set_val(id, false);
              },
              dragStop: function( event, ui )
              {
                if(_this.align !== 'center')
                {
                  if(_this.align === 'right')
                  {
                    let x = window.innerWidth - ui.position.left - $(_this.dialog)[0].clientWidth;
                    page.set_val(id+'_x', x < 0 ? 0 : x);
                  } else {
                    page.set_val(id+'_x', ui.position.left);
                  }
                  page.set_val(id+'_y', ui.position.top);
                }
              }
            });
          }
        }
      },
      on_change: function()
      {
        this.on_load();
      }
    }, settings[id]);

    flat_settings[id] = null;

    if(settings[id].align !== 'center')
    {
      settings[id].settings = settings[id].settings || {};
      settings[id].settings[id+'_x'] = $.extend({
        default: settings[id].x,
        type: 'number',
        $parent: false
      }, settings[id].settings[id+'_x']);
      settings[id].settings[id+'_y'] = $.extend({
        default: settings[id].y,
        type: 'number',
        $parent: false
      }, settings[id].settings[id+'_y']);
    }

    if(settings[id].settings)
    {
      for(var f in settings[id].settings)
      {
        flat_settings[f] = id;

        if(settings[id].settings[f].$parent === undefined)
        {
          settings[id].settings[f].$parent = $(settings[id].dialog);
        }

        settings[id].settings[f].val = function(){
          return page.get_val(f, this);
        }
      }
    }
  }
  else
  {
    settings[id].$parent = $('#tabs');
    flat_settings[id] = null;
  }
}

var_data_loaded = true;
