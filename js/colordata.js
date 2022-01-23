const colorThief = new ColorThief();

class ColorData
{
  constructor()
  {
    mix_colors = this.split_colors();
  }

  /* accepts an array of characters, loops thru and generates an object:
    {
      charCode: {
        char: X,
        colors: [
          {
            c1: 'red',
            c2: 'blue',
            id: redID + blueID,
            rgb: {r:n, g:n, b:n} (average color)
          } ... for all color permutations
        ]
      }
    }
  */
  //we'll leave font alone for now because if we change it the data is gonna get more insane
  build_ascii_mix_color(char_arr, regen)
  {
    let _this = this;
    ascii_mix_color = ascii_mix_color || {};
    let font = "14px 'Menlo Regular', monospace";

    if(page.get_val('fonts'))
    {
      font = page.get_val('fonts') + "px '" + page.get_val('fonts') + "', monospace";
    }

    char_arr.forEach(function(char)
    {
      let char_key = char.charCodeAt(0);
      if(!ascii_mix_color[char_key])
      {
        ascii_mix_color[char_key] = {
          char: char,
          colors: []
        };

        colors.forEach(function(c)
        {
          colors.forEach(function(d)
          {
            if(c.irc !== d.irc)
            {
              let rgb = _this.average_txt_bg_rgb(char, c.match[1], d.match[1], font);

              ascii_mix_color[char_key].colors.push({
                c1: c.match[1],
                c2: d.match[1],
                id: c.match[0] + d.match[0],
                rgb: rgb
              });
            }
          })
        })
      }
    });

    //set to true if we wanna add more characters to the char blend
    if(regen)
    {
      console.log(JSON.stringify(ascii_mix_color));
      download("ascii_char_colors.json", JSON.stringify(ascii_mix_color))
    }
  }

  generate_image(callback, options)
  {
    if(options && options.custom)
    {
      options = $.extend({
        font_size: page.get_val('img_font_size'),
        line_height: page.get_val('img_font_size'),
        padding: page.get_val('img_font_size'),
        transparent_bkg: page.get_val('img_font_size'),
        $preview: false
      }, options);
    } else {
      options = $.extend({
        font_size: page.get_val('fonts') ? page.get_val('fonts') : 14,
        line_height: page.get_val('fonts') ? page.get_val('fonts') : 14,
        padding: 8,
        transparent_bkg: false,
        $preview: false
      }, options);
    }

    if(options.$preview && options.$preview.length){
      options.preview = options.$preview[0];
    }

    options.font_size = parseInt(options.font_size);
    options.line_height = parseInt(options.line_height);
    options.padding = parseInt(options.padding);

    $('#plain_textarea_sizer').addClass('custom_image_size').css({
      'font-size': options.font_size + 'px',
      'line-height': options.line_height + 'px',
      'padding': options.padding + 'px'
    });

    let canvas = options.preview ? options.preview : document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        width = $('#plain_textarea_sizer')[0].clientWidth,
        height = $('#plain_textarea_sizer')[0].clientHeight,
        content = editor.getContents().ops,
        plain_text = editor.getText();

    if (!context) {
      console.error('browser does not support canvas');
      return false;
    }

    //for whatever reason, this stupid thing is always a little shorter
    //than the actual image generated, so we're calculating it instead.
    let calc_height = (options.line_height / 2) + options.padding;
    content.forEach(function(e, i)
    {
      let txt_arr = e.insert.split(/\r\n|\r|\n/);
      //this is an empty line break
      if(e.insert.match(/^(\r\n|\r|\n)+$/))
      {
        calc_height = calc_height + ((txt_arr.length - 1) * options.line_height);
      }
      //this has multiple line breaks in it
      else if(e.insert.match(/\r\n|\r|\n/))
      {
        txt_arr.forEach(function(txt)
        {
          calc_height = calc_height + options.line_height;
        })
      }
    })
    calc_height = calc_height + options.padding;

    context.clearRect(0, 0, canvas.width, canvas.height);

    let font =  options.font_size + 'px "' + ( page.fonts_popped ? page.get_val('fonts') : 'Menlo Regular' ) + '", monospace';

    canvas.height = calc_height;
    canvas.width = width;

    if(options.preview){
      options.$preview.css({
        'max-width': width,
        'max-height': calc_height
      });
    }

    context.font = font;

    if(!options.transparent_bkg)
    {
      context.fillStyle = page.get_val('fonts');
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    context.textBaseline = 'middle';
    context.font = font;

    let text_top = (options.line_height / 2) + options.padding;
    let text_left = options.padding;

    let make_text = function(txt, attr)
    {
      var text_width = context.measureText(txt).width;
      if(attr)
      {
        let font_style = '';
        if(attr.bold) font_style += 'bold ';
        if(attr.italic) font_style += 'italic ';

        context.font = font_style + font;

        if(attr.background)
        {
          context.fillStyle = attr.background;
          context.fillRect(text_left, text_top - (options.line_height / 2), text_width, options.line_height);
        }
      }

      context.fillStyle = attr && attr.color ? attr.color : page.get_val('fonts');

      if(attr && attr.underline)
      {
        context.beginPath();
        context.moveTo(text_left, text_top + (options.font_size / 2));
        context.lineTo(text_left + text_width, text_top + (options.font_size / 2));
        context.strokeStyle = context.fillStyle;
        context.stroke();
      }

      context.fillText(txt, text_left, text_top);
    }

    content.forEach(function(e, i)
    {
      let txt_arr = e.insert.split(/\r\n|\r|\n/);

      //this is an empty line break
      if(e.insert.match(/^(\r\n|\r|\n)+$/))
      {
        text_top = text_top + ((txt_arr.length - 1) * options.line_height);
        text_left = options.padding;
      }
      //this has multiple line breaks in it
      else if(e.insert.match(/\r\n|\r|\n/))
      {
        txt_arr.forEach(function(txt)
        {
          make_text(txt, e.attributes);
          text_top = text_top + options.line_height;
          text_left = options.padding;
        })
      }
      //no line breaks
      else
      {
        make_text(e.insert, e.attributes);
        text_left = text_left + context.measureText(e.insert).width;
      }
    })

    $('#plain_textarea_sizer').removeClass('custom_image_size').removeAttr('style');
    callback(canvas.toDataURL("image/png"));
  }

  //creates a temp canvas with bg color and character/fg color and figures out the average rgb
  average_txt_bg_rgb(char, fg, bg, font)
  {
    let canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        rgb = {r:102,g:102,b:102}, // Set a base colour as a fallback for non-compliant browsers
        pix_int = 1, //how many pixes to do, 1 will do all, 2 will do every other etc.
        count = 0,
        i = -4,
        data, length;

    if (!context) {
      console.error('browser does not support canvas');
      return false;
    }

    context.font = font;
    let height_metrics = context.measureText('█');
    let metrics = context.measureText(char);
    let width = metrics.width;
    let height = height_metrics.actualBoundingBoxAscent + height_metrics.actualBoundingBoxDescent;

    canvas.height = height;
    canvas.width = width;

    context.fillStyle = bg;
  	context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = fg;
    context.textBaseline = 'middle';
    context.font = font;
    context.fillText(char, 0, (canvas.height / 2));

    try {
      data = context.getImageData(0, 0, canvas.width, canvas.height);
    } catch(e) {
      // catch errors - usually due to cross domain security issues
      console.error(e);
      return false;
    }

    while ((i += pix_int * 4) < data.data.length) {
      count++;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
    }

    rgb.r = Math.floor(rgb.r/count);
    rgb.g = Math.floor(rgb.g/count);
    rgb.b = Math.floor(rgb.b/count);

    return rgb;
  }

  //gets the main colors for the background image
  get_image_colors(img, change)
  {
    let use_colors = function()
    {
      let unique_palette = [];
      let pallet_totals = [];

      let palette = colorThief.getPalette(img, 5).sort(function(a,b)
      {
        let a_l = a[0] + a[1] + a[2];
        let b_l = b[0] + b[1] + b[2];

        pallet_totals.push(a[0] + a[1] + a[2]);

        return b_l - a_l;
      })

      let diff = pallet_totals[0] - pallet_totals[pallet_totals.length - 1];

      if(diff < 50)
      {
        palette.push([
          255 - palette[0][0],
          255 - palette[0][1],
          255 - palette[0][2]
        ]);

        palette.push([
          255 - palette[palette.length-2][0],
          255 - palette[palette.length-2][1],
          255 - palette[palette.length-2][2]
        ]);
      }

      palette.sort(function(a,b)
      {
        let a_l = a[0] + a[1] + a[2];
        let b_l = b[0] + b[1] + b[2];

        return b_l - a_l;
      }).forEach(function(c){
        let rgb = c.join(',');
        if(!unique_palette.includes(rgb))
        {
          unique_palette.push(rgb);
        }
      });

      $('.colors_from_img').each(function(i, e)
      {
        let $this = $(this);
        $this.empty();

        unique_palette.forEach(function(c, p)
        {
          let $c = $('<button class="color"></button>').css('background-color', 'rgb(' + c + ')').on('click', function()
          {
            let rgb = (i === 0 ? 'rgb(' : 'rgba(') + $(this).prop('rgb') + (i === 0 ? ')' : ',.7)');
            let id = $(this).closest('.row').find('.spectrum').attr('id');
            page.set_val(id, rgb);

          }).prop('rgb', c);
          $this.append($c);

          if(change)
          {
            if((i === 0 && p === 0) || (i === 1 && p === unique_palette.length - 1))
            {
              $c.click();
            }
          }
        })
      })
    }

    if (img.complete) {
      use_colors();
    } else {
      img.addEventListener('load', function() {
        use_colors();
      });
    }
  }

  //returns the distance between two rgb colors
  delta_rgb(rgb1, rgb2)
  {
    if(!rgb1 || !rgb2)
    {
      console.error('missing rgb', rgb1, rgb2);
      return null;
    }

    const [ r1, g1, b1 ] = rgb1,
          [ r2, g2, b2 ] = rgb2,
          rmean = (parseInt(r1) + parseInt(r2)) / 2,
          r = parseInt(r1) - parseInt(r2),
          g = parseInt(g1) - parseInt(g2),
          b = parseInt(b1) - parseInt(b2);

    return Math.sqrt((((512 + rmean) * r * r) >> 8) + 4 * g * g + (((767 - rmean) * b * b) >> 8));
  }

  //takes all of the colors and mixes them half/half
  split_colors()
  {
    let mix_colors = [];
    colors.forEach(function(c)
    {
      colors.forEach(function(d)
      {
        if(c.irc !== d.irc)
        {
          mix_colors.push({
            color_1: c.match[1],
            color_2: d.match[1],
            id: c.match[0] + d.match[0],
            rgb: [
              Math.round((c.rgb[0] + d.rgb[0]) / 2),
              Math.round((c.rgb[1] + d.rgb[1]) / 2),
              Math.round((c.rgb[2] + d.rgb[2]) / 2),
            ]
          })
        }
      })
    })

    return mix_colors;
  }
}
