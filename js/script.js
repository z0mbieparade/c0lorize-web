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
    let $iframe = $('<iframe allowtransparency="true" />').attr('srcdoc', html_doc_data);

    if(page.get_val('tab_or_panel')){
      $('#html_wrap_side_by_side #iframe_wrap').empty().append($iframe); //.css('opacity', page.get_val('text_opacity') / 100));
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
    page.set_val('text_data', text_data, page.get_val('tab_or_panel'))
  });
}

let update_char_str = function()
{
  char_str = '';
  if(page.get_val('text_opacity')) char_str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(page.get_val('text_opacity')) char_str += "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  if(page.get_val('text_opacity')) char_str += chars.block.shade.chars.join('');
  if(page.get_val('text_opacity')){
    char_str += chars.block.solid_tb.chars.join('');
    char_str += chars.block.solid_lr.chars.join('');
    char_str += chars.block.quadrent.chars.join('');
  }
  if(page.get_val('text_opacity')){
    char_str += chars.shape.solid_tri.chars.join('');
    char_str += chars.shape.outline_tri.chars.join('');
  }
  if(page.get_val('text_opacity')) char_str += chars.shape.circles.chars.join('')
  if(page.get_val('text_opacity')) char_str += page.get_val('text_opacity');
}

let insert_char = function(char)
{
  if(page.get_val('tab_or_panel'))
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

    let new_value = page.get_val('tab_or_panel').substring(0, caret_pos) + char
                  + page.get_val('tab_or_panel').substring(caret_end);

    page.set_val('text_data', new_value);
    $('#text_data').focus();

    document.getElementById('text_data').selectionStart = caret_pos + char.length;
    document.getElementById('text_data').selectionEnd = caret_pos + char.length;
  }
}

let text_width = function(txt)
{
  let $sizer = $('<span id="txt_sizer">' + txt + '</span>').css({
    'visibility': 'hidden',
    'position': 'absolute',
    'z-index': -1,
    'left': 0,
    'top': 0
  });
  $('body').append($sizer);
  let width = $sizer[0].clientWidth;
  $('#txt_sizer').remove();
  return width;
}


$(document).ready(function()
{
  page.doc_loaded = true;
  page.test_load_page();

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
      bg_img_url: './inc/demo_2.gif',
      ascii_color: false,
      use_letters: true,
      use_other_char: true,
      use_blocks: true,
      use_quadrent_side: true,
      bg_x: -1,
      bg_y: -26,
      bg_size: 667
    })
  });
  $('#reset_demo3').on('click', function(){
    page.clear_page_settings({
      line_reset: false,
      text_data: $('#demo_3').val(),
      default_text_color: '#20be08',
      background_color: 'rgba(228, 7, 58, 0.7)',
      bg_img_url: './inc/demo_3.png',
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

  $('#loader').removeClass('loading initial');
})
