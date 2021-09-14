/*
   width and height adjustment
   layers
   ascii loader - doesn't quite work
   do something about if localStorage loads old settings (fonts) that don't work anymore
   editor only needs to be as wide as plain_textarea_sizer
*/

let debug = false,
    save_settings = {},
    search = {},
    char_str = '',
    ascii_mix_color = {},
    mix_colors = [],
    editor;

let page = new Page(),
    cdat = new ColorData(),
    filter = new Filter(),
    parse = new Parser(),
    ascii = new ASCII();

window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "\o/";

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage;                            //Webkit, Safari, Chrome
});

let download = function(filename, text)
{
  let element = document.createElement('a');

  if(filename.match('\.html$'))
  {
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
  }
  else if(filename.match('\.png$'))
  {
    element.setAttribute('href', text);
  }
  else if(filename.match('\.json$'))
  {
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
  }
  else
  {
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  }
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

let update_html = function()
{
  parse.text_to_html($('#text_data').val(), function(html_doc_data, irc_data, editor_data)
  {
    let $iframe = $('<iframe allowtransparency="true" />').attr('src', 'data:text/html;charset=utf-8,' + encodeURI(html_doc_data));

    if(settings.tab_or_panel.value){
      $('#html_wrap_side_by_side').empty().append($iframe);
    } else {
      $('#html #html_wrap').empty().append($iframe);
    }

    editor.setContents(editor_data, 'silent');

    let plain_text = editor.getText();
    $('#plain_textarea_sizer').html(plain_text.replace(/[\n\r]/mg, '<br/>'));
  });
}

let update_text = function()
{
  parse.editor_to_text(editor.getContents(), function(text_data)
  {
    page.set_val('text_data', text_data, false)
  });
}

let update_char_str = function()
{
  char_str = '';
  if(settings.use_letters.value) char_str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(settings.use_other_char.value) char_str += "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  if(settings.use_blocks.value) char_str += chars.block.shade.chars.join('');
  if(settings.use_quadrent_side.value){
    char_str += chars.block.solid_tb.chars.join('');
    char_str += chars.block.solid_lr.chars.join('');
    char_str += chars.block.quadrent.chars.join('');
  }
  if(settings.use_custom.value) char_str += settings.custom_characters.value;
}

let insert_char = function(char)
{
  if(settings.plain_or_rich.value)
  {
    let selection = editor.getSelection();
    let caret_pos = selection ? selection.index : editor.getLength();
    let caret_end = selection ? (selection.index + selection.length) : caret_pos;

    editor.insertText(caret_pos, char);
  }
  else
  {
    let caret_pos = document.getElementById("text_data").selectionStart;
    let caret_end = document.getElementById("text_data").selectionEnd;

    let new_value = settings.text_data.value.substring(0, caret_pos) + char
                  + settings.text_data.value.substring(caret_end);

    page.set_val('text_data', new_value);
    $('#text_data').focus();

    document.getElementById('text_data').selectionStart = caret_pos + char.length;
    document.getElementById('text_data').selectionEnd = caret_pos + char.length;
  }
}

try
{
  page.load_page_settings(JSON.parse(localStorage.getItem("c0lorize_settings")));
} catch(e) {
  console.error(e);
}

$(document).ready(function()
{
  page.load_page();

  $('#bg_img_button').on('click', function(){
    $('#bg_img').click();
  })

  //do magic downloady stuff
  $('#download_text').on('click', function(){
    download("c0lorize_plain_text.txt", $('#text_data').val());
  })
  $('#download_irc').on('click', function(){
    parse.text_to_html($('#text_data').val(), function(html_doc_data, irc_data, editor_data){
      download("c0lorize_irc.txt", irc_data);
    });
  })
  $('#download_html').on('click', function(){
    parse.text_to_html($('#text_data').val(), function(html_doc_data, irc_data, editor_data){
      download("c0lorize.html", html_doc_data);
    });
  })
  $('#download_img').on('click', function(){
    cdat.generate_image(function(img){
      download("c0lorize.png", img);
    });
  })
  $('#download_settings').on('click', function(){
    download("c0lorize_settings.json", JSON.stringify(save_settings));
  })
  $('#upload_settings').on('click', function(){
    $('#upload_json_settings').click();
  })
  $('#upload_json_settings').on('change', function(e){
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

  $('#reset_demo1').on('click', function(){
    page.clear_page_settings({
      line_reset: true,
      text_data: $('#demo_1').val()
    })
  });
  $('#reset_demo2').on('click', function(){
    page.clear_page_settings({
      line_reset: true,
      text_data: $('#demo_2').val(),
      default_text_color: '#25100a',
      background_color: 'rgba(226,220,204,.7)',
      bg_img_url: 'https://i.imgur.com/7A6914H.gif',
      ascii_color: false,
      use_letters: true,
      use_other_char: true,
      use_blocks: true,
      use_quadrent_side: true,
      bg_x: -8,
      bg_y: -19,
      bg_size: 692
    })
  });
  $('#reset_demo3').on('click', function(){
    page.clear_page_settings({
      line_reset: false,
      text_data: $('#demo_3').val(),
      default_text_color: '#20be08',
      background_color: 'rgba(228, 7, 58, 0.7)',
      bg_img_url: 'https://i.imgur.com/HLsZ9ao.png',
      bg_size: 800,
      use_bg_color: true,
      use_letters: false,
      use_other_char: false,
      use_blocks: true,
      use_quadrent_side: false,
      invert_ascii_colors: true
    })
  });
  $('#clear_page').on('click', function(){
    page.clear_page_settings();
  });

  $('#wtf, #show_less').on('click', function()
  {
    if($('#wtf_is_this').hasClass('hide_this'))
    {
      $('#wtf_is_this').removeClass('hide_this');
    }
    else
    {
      $('#wtf_is_this').addClass('hide_this');
    }
  })

  $('#swap_colors').on('click', function(){
    let bg_color = settings.background_color.value;
    let fg_color = settings.default_text_color.value;
    page.set_val('background_color', fg_color);
    page.set_val('default_text_color', bg_color);
  })

  //panel dropdowns
  let panel_open = false;
  $(document).on('click', function(e)
  {
    if($(e.target).hasClass('panel_open') && !$(e.target).attr('disabled'))
    {
      let id = $(e.target).attr('id');
      $('.panel').each(function(){
        $(this).removeClass('open');
      });
      $('.panel#' + id + '_panel').addClass('open');
      panel_open = '.panel#' + id + '_panel';
    }
    else if (panel_open && $(e.target).closest(panel_open).length === 0)
    {
      $('.panel').each(function(){
        $(this).removeClass('open');
      });
      panel_open = false;
    }
  });

  filter.build_filters();

  $('#bg_to_ascii').on('click', function()
  {
    ascii.convert();
  })

  $('#loader').removeClass('loading initial');
})
