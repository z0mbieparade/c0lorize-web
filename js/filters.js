class Filter
{
  build_filters()
  {
    let _this = this;

    $('.glitch').on('click', function()
    {
      if(!settings.text_data.backup)
      {
        settings.text_data.backup = settings.text_data.value;
        $('#reset_filters, #save_filters').show();
      }

      if(settings.text_data.backup)
      {
        _this.glitch($(this).attr('id'));
      }
    })

    $('.color_shift').on('click', function()
    {
      if(!settings.text_data.backup)
      {
        settings.text_data.backup = settings.text_data.value;
        $('#reset_filters, #save_filters').show();
      }

      if(settings.text_data.backup)
      {
        _this.color_shift($(this).attr('id'));
      }
    })

    $('#reset_filters').on('click', function()
    {
      let msg = 'This will reset your data to right before you clicked any filters. Are you sure?';
      if (confirm(msg))
      {
        page.set_val('text_data', settings.text_data.backup);
        delete settings.text_data.backup;
        $('#reset_filters, #save_filters').hide();
      }
    })

    $('#save_filters').on('click', function()
    {
      let msg = 'This will override your backup from before you clicked any filters with the current data. You will not be able to reset them. Are you sure?';
      if (confirm(msg))
      {
        delete settings.text_data.backup;
        $('#reset_filters, #save_filters').hide();
      }
    })
  }

  color_shift(shift_id)
  {
    shift_id = shift_id.replace('color_shift_', '');

    console.log(shift_id)
    let contents = editor.getContents().ops.map(function(e, i)
    {
      if(e.attributes)
      {
        if(e.attributes.background && search['&' + e.attributes.background]){
          let shift_c_id = search['&' + e.attributes.background].color[shift_id];
          let shift_c = search['&' + shift_c_id].color.match[1];
          e.attributes.background = shift_c;
        }

        if(e.attributes.color && search['&' + e.attributes.color]) {
          let shift_c_id = search['&' + e.attributes.color].color[shift_id];
          let shift_c = search['&' + shift_c_id].color.match[1];
          e.attributes.color = shift_c;
        }
      }

      return e;
    });

    editor.setContents(contents);
  }

  glitch(glitch_id)
  {
    let _this = this;
    if(!glitch_id || glitch_id === 'glitch_rand')
    {
      for(var i = 0; i < 3; i++)
      {
        let rand_id = Math.floor(Math.random() * ($('.glitch').length - 1)) + 1;
        _this.glitch($('.glitch').eq(rand_id).attr('id'));
      }
      return;
    }

    let contents = editor.getContents().ops;
    console.log('glitch', glitch_id);

    switch(glitch_id)
    {
      case 'glitch_shift': //shift color glitch
        let shift = ['tint_left', 'tint_right'];
        let rand_shift = shift[Math.floor(Math.random() * 2)];
        contents = contents.map(function(e, i)
        {
          let rand_i = (i - 10) + Math.floor(Math.random()*(i+1-(i - 10)));
          if(i === rand_i && e.attributes)
          {
            if(e.attributes.background && search['&' + e.attributes.background]){
              let shift_c_id = search['&' + e.attributes.background].color[rand_shift];
              let shift_c = search['&' + shift_c_id].color.match[1];
              e.attributes.background = shift_c;
            } else if(e.attributes.color && search['&' + e.attributes.color]) {
              let shift_c_id = search['&' + e.attributes.color].color[rand_shift];
              let shift_c = search['&' + shift_c_id].color.match[1];
              e.attributes.color = shift_c;
            }
          }
          return e;
        })
        break;
      case 'glitch_invert': //invert color glitch
        contents = contents.map(function(e, i)
        {
          let rand_i = (i - 30) + Math.floor(Math.random()*(i+1-(i - 30)));
          if(i === rand_i && e.attributes)
          {
            if(e.attributes.background && search['&' + e.attributes.background]){
              let shift_c_id = search['&' + e.attributes.background].color.invert;
              let shift_c = search['&' + shift_c_id].color.match[1];
              e.attributes.background = shift_c;
            } else if(e.attributes.color && search['&' + e.attributes.color]) {
              let shift_c_id = search['&' + e.attributes.color].color.invert;
              let shift_c = search['&' + shift_c_id].color.match[1];
              e.attributes.color = shift_c;
            }
          }
          return e;
        })
        break;
      case 'glitch_color': //rand color glitch
          let rand_color = colors[Math.floor(Math.random() * 15)]
          contents = contents.map(function(e, i)
          {
            let rand_i = (i - 20) + Math.floor(Math.random()*(i+1-(i - 20)));
            if(i === rand_i && e.attributes)
            {
              if(e.attributes.color) {
                e.attributes.color = rand_color.match[1];
              } else if(e.attributes.background){
                e.attributes.background = rand_color.match[1];
              }
            }
            return e;
          })
          break;
      case 'glitch_streak': //color streak
        let streak = false;
        let streak_count = 0;
        let streak_color = {1: 10, 0: 15, 15: 14};
        contents.forEach(function(e, i)
        {
          if(e.insert.match(/\n/)){
            streak = (Math.floor(Math.random() * 12) === 1 ? true : false);
            streak_count = streak === true ? streak_count + 1 : streak_count;
          };

          if(streak && streak_count < 5)
          {
            if(e.attributes && (Math.floor(Math.random() * 5) < 3 ? true : false))
            {
              if(e.attributes.background && search['&' + e.attributes.background]){
                let shift_c_id = parseInt(search['&' + e.attributes.background].irc);
                if(streak_color[shift_c_id] !== undefined){
                  e.attributes.background = search['&' + streak_color[shift_c_id]].color.match[1];
                }
              } else if(e.attributes.color && search['&' + e.attributes.color]) {
                let shift_c_id = parseInt(search['&' + e.attributes.color].irc);
                if(streak_color[shift_c_id] !== undefined){
                  e.attributes.color = search['&' + streak_color[shift_c_id]].color.match[1];
                }
              }
            }
          }
        })
        break;
      case 'glitch_swap': //swap glitch
        contents.forEach(function(e, i)
        {
          let rand_i = (i - 40) + Math.floor(Math.random()*(i+1-(i - 40)));
          if(i === rand_i)
          {
            for(var j = i - 10; j < i + 10; j++)
            {
              if(contents[j] && !e.insert.match(/\n/) &&
              contents[j].insert.length === e.insert.length && !contents[j].insert.match(/\n/))
              {
                let temp = contents[j];
                contents[j] = e;
                contents[i] = temp;
              }
            }
          }
        })
        break;
      case 'glitch_row_shift': //shift rows
        let row = false;
        let row_count = 0;
        let row_i = 0;
        let row_start_i = 0;
        let row_char_count = 0;
        contents.forEach(function(e, i)
        {
          if(e.insert.match(/\n/)) //row end
          {
            row_i = -1;

            row = (Math.floor(Math.random() * 12) === 1 ? true : false);
            if(row && row_count < 5)
            {
              let shift_ish = Math.round(row_char_count / 8);

              var neg_j = i - 1;
              var char_count = 0;
              for(var j = row_start_i; j < i; j++)
              {
                var temp_insert = contents[neg_j].insert;
                char_count = char_count + temp_insert.length;
                contents[neg_j].insert = contents[j].insert;
                char_count = char_count + contents[j].insert.length;
                contents[j].insert = temp_insert;

                if(char_count > shift_ish) break;
                neg_j--;
              }
            }
          }
          else
          {
            row_i++;
          }

          if(row_i === 0){
            row_start_i = i;
            row_char_count = 0;
          }

          row_char_count = row_char_count + e.insert.length;
        })
        break;
      default: //character glitch
        let rand_char = char_str[Math.floor(Math.random() * char_str.length)];
        contents = contents.map(function(e, i)
        {
          let rand_i = (i - 20) + Math.floor(Math.random()*(i+1-(i - 20)));
          if(i === rand_i && e.insert && !e.insert.match(/\n/))
          {
            let new_insert = Array(e.insert.length + 1).join(rand_char);
            e.insert = new_insert;
          }

          return e;
        })
        break;
    }

    editor.setContents(contents);
  }
}
