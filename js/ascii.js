class ASCII
{
  constructor()
  {
      //this is for when we convert an image, how many px = one character based on font size
      this.pixel_div =
      {
        8: { w: 4.8, h: 8 },
        9: { w: 5.4, h: 9 },
        10: { w: 6, h: 10 },
        11: { w: 6.6, h: 11 },
        12: { w: 7.2, h: 12 },
        13: { w: 7.85, h: 13 },
        14: { w: 8.45, h: 14 },
        15: { w: 9, h: 15 },
        16: { w: 9.6, h: 16 }
      }
  }

  //aalib conversion
  convert()
  {
    let _this = this;
    $('#loader').addClass('loading');
    try
    {
      let aalib_img = null;
      let img = null;

      if(page.get_val('bg_img_url') && settings.text_settings_dialog.settings.bg_img_url.image)
      {
        aalib_img = 'fromURL';
        img = settings.text_settings_dialog.settings.bg_img_url.image;
      }
      else if(page.get_val('bg_img_url') && settings.text_settings_dialog.settings.bg_img.image)
      {
        aalib_img = 'fromHTMLImage';
        img = settings.text_settings_dialog.settings.bg_img.image;
      }

      if(aalib_img === null || img === null){
        console.error('aalib_img', aalib_img, 'img', img);
        $('#loader').removeClass('loading');
        return;
      }

      let aa_settings = {
        colored: page.get_val('bg_img_url'),
        width: Math.round(img.width / page.get_val('bg_img_url')),
        height: Math.round(img.height / page.get_val('bg_img_url'))
      };

      let font = page.fonts_popped ? page.get_val('bg_img_url') : 'Menlo Regular';

      let html_settings = {
        el: document.querySelector("#ascii_html"),
        fontSize: page.get_val('bg_img_url'),
        fontFamily: "'" + font + "', monospace"
      }

      if(settings.ascii_settings_dialog.settings.avr_bg_color &&
        page.get_val('bg_img_url') &&
        !page.get_val('bg_img_url') &&
        !page.get_val('bg_img_url') &&
        !page.get_val('bg_img_url') &&
        !page.get_val('bg_img_url') &&
        !page.get_val('bg_img_url') &&
        !page.get_val('bg_img_url')
      )
      {
        html_settings.charset = '█';
      }
      else
      {
        html_settings.charset = char_str;
      }

      if(page.get_val('bg_img_url') && page.get_val('bg_img_url') === 'px')
      {
        aa_settings.width = Math.round(page.get_val('bg_img_url') / page.get_val('bg_img_url'));
        let resize_h = (page.get_val('bg_img_url') / img.width) * img.height;
        aa_settings.height = Math.round(resize_h / page.get_val('bg_img_url'));
      }

      //console.log(aa_settings, html_settings,  _this.pixel_div[page.get_val('bg_img_url')])

      aalib.read.image[aalib_img](aalib_img === 'fromURL' ? page.get_val('bg_img_url') : settings.text_settings_dialog.settings.bg_img.image)
        .map(function(a){
          if(page.get_val('bg_img_url')){
            return aalib.filter.inverse()(a);
          } else {
            return a;
          }
      	})
        .map(function(a){
          if(page.get_val('bg_img_url')){
            return aalib.filter.desaturate()(a);
          } else {
            return a;
          }
      	})
        .map(function(a){
          if(page.get_val('bg_img_url')){
            return aalib.filter.brightness(page.get_val('bg_img_url'))(a);
          } else {
            return a;
          }
      	})
        .map(function(a){
          if(page.get_val('bg_img_url')){
            return aalib.filter.contrast(page.get_val('bg_img_url'))(a);
          } else {
            return a;
          }
      	})
        .map(aalib.aa(aa_settings))
        .map(function(a){
          if(page.get_val('bg_img_url')){
            return aalib.filter.inverse()(a);
          } else {
            return a;
          }
      	})
        .map(function(a){
          if(page.get_val('bg_img_url')){
            return aalib.filter.desaturate()(a);
          } else {
            return a;
          }
      	})
        .map(function(a){
          if(page.get_val('bg_img_url')){
            return aalib.filter.brightness(page.get_val('bg_img_url'))(a);
          } else {
            return a;
          }
      	})
        .map(function(a){
          if(page.get_val('contrast_ascii_colors')){
            return aalib.filter.contrast(page.get_val('bg_img_url'))(a);
          } else {
            return a;
          }
      	})
        .map(aalib.render.html(html_settings))
        .subscribe(() => { }, (err) => {
          console.error(err);
          $('#loader').removeClass('loading');
        }, () => {
          try
          {
            if(page.get_val('bg_img_url') === true)
            {
              _this.color_ascii_create();
            }
            else
            {
              page.set_val('text_data', $("<textarea/>").html($('#ascii_html').html()).text());
              page.set_val('show_bg_img', false);
            }

            $('#loader').removeClass('loading');
          }
          catch(e)
          {
            $('#loader').removeClass('loading');
            console.error(e);
          }
      });
    }
    catch(e)
    {
      $('#loader').removeClass('loading');
      console.error(e);
    }
  }

  //converts color html from aalib into quilljs object format
  color_ascii_create()
  {
    if(debug)
    {
      $('#ascii_color_matching').empty()
      .css({
        display: 'flex',
        'background-color': page.get_val('bg_img_url')
      });
    }

    let matched = {},
        delta_arr = {},
        delta_ascii_arr = {},
        delta_block_arr = {},
        type_count = {
          ascii: 0,
          block: 0,
          fg_bg: 0,
          fg: 0
        };

    let color_arr = $('#ascii_html').html().split('</span>').map(function(a)
    {
      if(a)
      {
        let lb = false;
        if(a.match(/^\r?\n/)){
          lb = true;
        }
        let ret = a.replace('<span style="color: rgb(', '').replace(/^\r?\n/, '').split(')">');
        ret[0] = ret[0].split(', ');
        ret.push(a);

        let char_key = ret[1].charCodeAt(0);
        let rgb_key = ret[0].join('-');
        let combo_found = false;

        matched[char_key + '-' + rgb_key] = {
          char_key: char_key,
          org_char: ret[1],
          char: ret[1],
          aalib_rgb: ret[0],
          match_rgb: null
        }

        if(lb) ret[1] = '\n' + ret[1];

        if(page.get_val('bg_img_url') && page.get_val('bg_img_url'))
        {
          if(page.get_val('bg_img_url') && !page.get_val('bg_img_url') && !page.get_val('bg_img_url') && !page.get_val('bg_img_url'))
          {
            //chars.block.shade.chars
            if(!delta_block_arr[rgb_key])
            {
              delta_block_arr[rgb_key] = {
                match: false,
                match_fg: null,
                match_bg: null,
                match_char: null,
                match_char_key: null,
                match_rgb: null,
                aalib_rgb: null
              }

              chars.block.shade.chars.forEach(function(ch)
              {
                let ch_key = ch.charCodeAt(0);
                if(ascii_mix_color[ch_key])
                {
                  ascii_mix_color[ch_key].colors.forEach(function(c)
                  {
                    delta_block_arr[rgb_key][c.id + '-' + ch_key] = cdat.delta_rgb([c.rgb.r, c.rgb.g, c.rgb.b], ret[0]);

                    if(!delta_block_arr[rgb_key].match ||
                       delta_block_arr[rgb_key][c.id + '-' + ch_key] < delta_block_arr[rgb_key].match)
                    {
                      delta_block_arr[rgb_key].match = delta_block_arr[rgb_key][c.id + '-' + ch_key];
                      delta_block_arr[rgb_key].match_fg = c.c1;
                      delta_block_arr[rgb_key].match_bg = c.c2;
                      delta_block_arr[rgb_key].match_char = ch;
                      delta_block_arr[rgb_key].match_char_key = ch_key;
                      delta_block_arr[rgb_key].match_rgb = [c.rgb.r, c.rgb.g, c.rgb.b];
                      delta_block_arr[rgb_key].aalib_rgb = ret[0];
                    }
                  })
                }
              });
            }

            if(delta_block_arr[rgb_key] && delta_block_arr[rgb_key].match)
            {
              combo_found = JSON.parse(JSON.stringify(delta_block_arr[rgb_key]));
              combo_found.match_ret = lb ? '\n' + combo_found.match_char : combo_found.match_char;
              type_count.block = type_count.block + 1;

              matched[char_key + '-' + rgb_key].match_rgb = combo_found.match_rgb;
              matched[char_key + '-' + rgb_key].char = combo_found.match_char;
              matched[char_key + '-' + rgb_key].char_key = combo_found.match_char_key;
              matched[char_key + '-' + rgb_key].combo_type = 'block';
            }
          }
          else if(!delta_ascii_arr[char_key] || !delta_ascii_arr[char_key][rgb_key])
          {
            delta_ascii_arr[char_key] = delta_ascii_arr[char_key] || {};
            delta_ascii_arr[char_key][rgb_key] = {
              match: false,
              match_fg: null,
              match_bg: null
            }

            if(ascii_mix_color[char_key])
            {
              ascii_mix_color[char_key].colors.forEach(function(c)
              {
                delta_ascii_arr[char_key][rgb_key][c.id] = cdat.delta_rgb([c.rgb.r, c.rgb.g, c.rgb.b], ret[0]);

                if(!delta_ascii_arr[char_key][rgb_key].match ||
                   delta_ascii_arr[char_key][rgb_key][c.id] < delta_ascii_arr[char_key][rgb_key].match)
                {
                  delta_ascii_arr[char_key][rgb_key].match = delta_ascii_arr[char_key][rgb_key][c.id];
                  delta_ascii_arr[char_key][rgb_key].match_fg = c.c1;
                  delta_ascii_arr[char_key][rgb_key].match_bg = c.c2;
                }

                /*if(isNaN(delta_arr[rgb_key][c.match[0]]))
                {
                  console.log(a, ret[0], c.match[1], c.rgb);
                }*/
              })

              if(delta_ascii_arr[char_key][rgb_key].match_fg && delta_ascii_arr[char_key][rgb_key].match_bg)
              {
                combo_found = delta_ascii_arr[char_key][rgb_key];
                type_count.ascii = type_count.ascii + 1;
                matched[char_key + '-' + rgb_key].combo_type = 'ascii';
              }
            }
            else
            {
              combo_found = false;
            }
          }
          else
          {
            if(delta_ascii_arr[char_key][rgb_key].match_fg && delta_ascii_arr[char_key][rgb_key].match_bg)
            {
              combo_found = delta_ascii_arr[char_key][rgb_key];
              type_count.ascii = type_count.ascii + 1;
              matched[char_key + '-' + rgb_key].combo_type = 'ascii';
            }
          }
        }
        else if(page.get_val('bg_img_url') && page.get_val('bg_img_url') && delta_ascii_arr[char_key] && delta_ascii_arr[char_key][rgb_key])
        {
          if(delta_ascii_arr[char_key][rgb_key].match_fg && delta_ascii_arr[char_key][rgb_key].match_bg)
          {
            combo_found = delta_ascii_arr[char_key][rgb_key];
            type_count.ascii = type_count.ascii + 1;
            matched[char_key + '-' + rgb_key].combo_type = 'ascii';
          }
        }

        if(!combo_found && page.get_val('bg_img_url') && !delta_arr[rgb_key])
        {
          delta_arr[rgb_key] = {
            match: false,
            match_fg: null,
            match_bg: null
          };

          mix_colors.forEach(function(c)
          {
            delta_arr[rgb_key][c.id] = cdat.delta_rgb(c.rgb, ret[0]);

            if(!delta_arr[rgb_key].match ||
               delta_arr[rgb_key][c.id] < delta_arr[rgb_key].match)
            {
              delta_arr[rgb_key].match = delta_arr[rgb_key][c.id];
              delta_arr[rgb_key].match_fg = c.c1;
              delta_arr[rgb_key].match_bg = c.c2;
            }

            /*if(isNaN(delta_arr[rgb_key][c.match[0]]))
            {
              console.log(a, ret[0], c.match[1], c.rgb);
            }*/
          })

          if(delta_arr[rgb_key].match_fg && delta_arr[rgb_key].match_bg)
          {
            combo_found = delta_arr[rgb_key];
            type_count.fg_bg = type_count.fg_bg + 1;
            matched[char_key + '-' + rgb_key].combo_type = 'fg_bg';
          }
        }
        else if(!combo_found && page.get_val('bg_img_url'))
        {
          if(delta_arr[rgb_key].match_fg && delta_arr[rgb_key].match_bg)
          {
            combo_found = delta_arr[rgb_key];
            type_count.fg_bg = type_count.fg_bg + 1;
            matched[char_key + '-' + rgb_key].combo_type = 'fg_bg';
          }
        }

        if(!combo_found && !page.get_val('bg_img_url') && !delta_arr[rgb_key])
        {
          delta_arr[rgb_key] = {
            match: false,
            match_fg: null
          };
          colors.forEach(function(c)
          {
            delta_arr[rgb_key][c.match[0]] = cdat.delta_rgb(c.rgb, ret[0]);

            if(!delta_arr[rgb_key].match ||
               delta_arr[rgb_key][c.match[0]] < delta_arr[rgb_key].match)
            {
              delta_arr[rgb_key].match = delta_arr[rgb_key][c.match[0]];
              delta_arr[rgb_key].match_fg = c.match[1];
            }

            /*if(isNaN(delta_arr[rgb_key][c.match[0]]))
            {
              console.log(a, ret[0], c.match[1], c.rgb);
            }*/
          })

          if(delta_arr[rgb_key].match_fg)
          {
            combo_found = delta_arr[rgb_key];
            type_count.fg = type_count.fg + 1;
            matched[char_key + '-' + rgb_key].combo_type = 'fg';
          }
        }
        else if(!combo_found && !page.get_val('bg_img_url') && delta_arr[rgb_key])
        {
          if(delta_arr[rgb_key].match_fg)
          {
            combo_found = delta_arr[rgb_key];
            type_count.fg = type_count.fg + 1;
            matched[char_key + '-' + rgb_key].combo_type = 'fg';
          }
        }

        matched[char_key + '-' + rgb_key].match_fg = combo_found.match_fg;
        matched[char_key + '-' + rgb_key].match_bg = combo_found.match_bg;
        matched[char_key + '-' + rgb_key].match_rgb = combo_found.match_rgb;

        return {
          insert: combo_found.match_ret ? combo_found.match_ret : ret[1],
          attributes: {
            color: combo_found.match_fg,
            background: combo_found.match_bg ? combo_found.match_bg : undefined
          }
        };
      }
      else
      {
        return false;
      }
    }).filter(function(a){
      return a !== false;
    });

    if(debug)
    {
      console.log(type_count, matched[Object.keys(matched)[0]]);

      let matched_n = 0;
      let appended_n = 0;
      for(var key in matched)
      {

        let delta = 200;
        let aalib_char = $('<span>' + matched[key].org_char + '</span>')
            .css('color', 'rgb(' + matched[key].aalib_rgb.join(',') + ')');
        let delta_char = $('<span>' + matched[key].char + '</span>')
            .css('color', matched[key].match_fg);
        if(matched[key].match_bg) delta_char.css('background', matched[key].match_bg);
        let match_div = $('<div class="match"></div>').prop(matched)
            .append(aalib_char).append(delta_char)

        if(matched[key].match_rgb)
        {
          delta = cdat.delta_rgb(matched[key].match_rgb, matched[key].aalib_rgb);
          match_div.append('<span style="color:rgb(' + matched[key].match_rgb.join(',') + ')">█</span>');
        }

        matched_n++;

        if(delta > 20)
        {
          $('#ascii_color_matching').append(match_div);
          appended_n++;
        }
      }

      console.log(matched_n, appended_n)
    }

    parse.editor_to_text(color_arr, function(text_data)
    {
      page.set_val('text_data', $("<textarea/>").html(text_data).text());
      page.set_val('show_bg_img', false);
    })
  }
}
