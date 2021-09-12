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
            color_1: 'red',
            color_2: 'blue',
            id: redID + blueID,
            rgb: {r:n, g:n, b:n} (average color)
          } ... for all color permutations
        ]
      }
    }
  */
  //we'll leave font alone for now because if we change it the data is gonna get more insane
  build_ascii_mix_color(char_arr)
  {
    let _this = this;
    ascii_mix_color = ascii_mix_color || {};
    let font = "14px 'Menlo Regular', monospace";

    if(settings.fonts.value)
    {
      font = settings.font_size.value + "px '" + settings.fonts.value + "', monospace";
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
                color_1: c.match[1],
                color_2: d.match[1],
                id: c.match[0] + d.match[0],
                rgb: rgb
              });
            }
          })
        })
      }
    });

    //console.log(JSON.stringify(ascii_mix_color));
    //download("ascii_char_colors.json", JSON.stringify(ascii_mix_color))
  }

  generate_image(callback)
  {
    let canvas = document.createElement('canvas'),
        //canvas = document.getElementById('gen_img'),
        context = canvas.getContext && canvas.getContext('2d'),
        width = $('#plain_textarea_sizer').width(),
        height = $('#plain_textarea_sizer').height(),
        content = editor.getContents().ops,
        plain_text = editor.getText();

    if (!context) {
      console.error('browser does not support canvas');
      return false;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    let font_size = settings.font_size.value ? parseInt(settings.font_size.value) : 14;
    let font =  font_size + 'px "' + ( page.fonts_popped ? settings.fonts.value : 'Menlo Regular' ) + '", monospace';

    //$('#gen_img').css('max-width', width + 'px')

    canvas.height = height + 16;
    canvas.width = width;
    context.font = font;

    context.fillStyle = settings.background_color_no_alpha.value;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.textBaseline = 'middle';
    context.font = font;

    let text_top = font_size;
    let left_text = 8;

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
          context.fillRect(left_text, text_top - (font_size / 2), text_width, font_size);
        }
      }

      context.fillStyle = attr && attr.color ? attr.color : settings.default_text_color.value;

      if(attr && attr.underline)
      {
        context.beginPath();
        context.moveTo(left_text, text_top + (font_size / 2));
        context.lineTo(left_text + text_width, text_top + (font_size / 2));
        context.strokeStyle = context.fillStyle;
        context.stroke();
      }

      context.fillText(txt, left_text, text_top);
    }

    content.forEach(function(e, i)
    {
      let txt_arr = e.insert.split(/\r\n|\r|\n/);
      if(e.insert.match(/^(\r\n|\r|\n)+$/))
      {
        text_top = text_top + ((txt_arr.length - 1) * font_size);
        left_text = 8;
      }
      else if(e.insert.match(/\r\n|\r|\n/))
      {
        txt_arr.forEach(function(txt)
        {
          make_text(txt, e.attributes);
          text_top = text_top + 14;
          left_text = 8;
        })
      }
      else
      {
        make_text(e.insert, e.attributes);
        left_text = left_text + context.measureText(e.insert).width;
      }
    })

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
    let metrics = context.measureText(char);
    let width = metrics.width;
    let height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    canvas.height = height + 2;
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
