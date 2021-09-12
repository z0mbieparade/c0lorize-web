<?php
include('settings_default.php');
$default_settings = $settings;
$setup = false;
if(file_exists('settings.php')){
	include('settings.php');
	$settings = array_merge($default_settings, $settings);
	$setup = true;
}?>
<!DOCTYPE html>
<html lang="en">
  <title><?php echo $settings['title']; ?></title>
  <meta property="og:title" content="<?php echo $settings['title']; ?>">
  <meta property="og:description" content="ASCII art creation and editing app.">
  <meta property="og:image" content="<?php echo $settings['c0lorize_site_path']; ?>/css/images/card_img.png">
  <meta property="og:url" content="<?php echo $settings['c0lorize_site_path']; ?>">
  <meta property="og:type" content="website">

  <meta name="twitter:title" content="<?php echo $settings['title']; ?>">
  <meta name="twitter:description" content="ASCII art creation and editing app.">
  <meta name="twitter:image" content="<?php echo $settings['c0lorize_site_path']; ?>css/images/card_img.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:creator" content="@rotterz">

  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="css/lib/jquery-ui.min.css">
  <link rel="stylesheet" href="css/lib/spectrum.min.css">
  <link rel="stylesheet" href="css/lib/quill.snow.css">

  <link rel="stylesheet" href="css/style.css">
  <body>

    <?php
    if(isset($_GET['clear']))
    { ?>
    <script>
      let msg = 'Are you sure you want to reset the page? All your data will be deleted.';
      if (confirm(msg))
      {
        ['c0lorize_html_data', 'c0lorize_irc_data', 'c0lorize_bg_img', 'c0lorize_text_data', 'c0lorize_settings']
          .forEach(function(item){
            localStorage.removeItem(item);
          });
      }

      location.href = "<?php echo $settings['c0lorize_site_path']; ?>";
    </script>
    <?php }
    else
    { ?>

    <script>
    <?php if(!$setup){ ?>
      console.log('You have not created your settings.php file, please copy settings_default.php to settings.php and update it with correct settings.');
    <?php }?>

      setTimeout(function(){
        let load_int = 0;
        let load_arr = ['▛','▘','▚','▗','▟','▙','▖','▞','▝','▜'];
        window.setInterval(() => {
            document.getElementById('load_char').innerHTML = load_arr[load_int];
            load_int = load_int < load_arr.length - 1 ? load_int + 1 : 0;
        }, 250);
      },0)
    </script>
    <div id="loader" class="loading initial">
      <span id="force">If your browser is stuck, you can go to <?php echo $settings['c0lorize_site_path']."?clear=true"; ?>
        to force your localStorage to clear out. Sometimes this can happen if you attempt to convert too large of an image. THIS WILL DELETE YOUR DATA!</span>
      <span id="load_char"></span>
    </div>
    <div id="tipsy"></div>
    <div id="textarea_sizer"></div>
    <div id="plain_textarea_sizer"></div>
    <canvas id="gen_img"></canvas>
    <div id="actions">
      <!--<button id="undo" disabled="disabled">Undo</button>
      <button id="redo" disabled="disabled">Redo</button>-->
      <span>Download:</span>
      <button id="download_text">Text</button>
      <button id="download_html">HTML</button>
      <button id="download_irc">IRC</button>
      <button id="download_img">Image</button>

      <span>Demo:</span>
      <button id="reset_demo1">1</button>
      <button id="reset_demo2">2</button>
      <button id="reset_demo3">3</button>

      <button id="clear_page">Clear</button>

      <span id="about"><b>c0lorize</b> for web by <a href="https://z0m.bi/">z0m.bi</a>. | <a id="wtf">WTF is this thing?</a></span>
    </div>
    <?php include "inc/wtf_is_this.html"; ?>
    <div id="ascii_color_matching">

    </div>
    <div id="tabs">
      <ul>
        <li><a href="#text">Edit</a></li>
        <li><a href="#html">HTML</a></li>
      </ul>
      <div id="text">
        <div class="settings">
          <div id="styles">
            <div class="panel_wrap">
              <button id="fg_color" class="panel_open">A</button>
              <div class="panel" id="fg_color_panel"><div class="row"></div></div>
            </div>
            <div class="panel_wrap">
              <button id="bg_color" class="panel_open">A</button>
              <div class="panel" id="bg_color_panel"><div class="row"></div></div>
            </div>
            <div id="style"></div>
          </div>
          <div id="chars"></div>

          <div class="panel" id="text_settings_panel">
            <div class="row">
              <span class="row_header">Textarea Options</span>

              <label for="line_reset" class="inline">Line Reset:</label>
              <label class="switch">
                <input type="checkbox" id="line_reset">
                <span class="slider"></span>
              </label>
              <div class="filler" style="width: 40px;"></div>

              <label for="correct_html" class="inline">Correct HTML:</label>
              <label class="switch">
                <input type="checkbox" id="correct_html">
                <span class="slider"></span>
              </label>
            </div>
            <div class="row">
              <label class="inline" for="font">Font:</label>
              <select id="fonts" style="width: calc(100% - 103px); margin-right: 3px;">
                <option value="Menlo Regular">Menlo Regular</option>
              </select>
              <select id="font_size" style="width: 62px;">
                <option value="8">8px</option>
                <option value="9">9px</option>
                <option value="10">10px</option>
                <option value="11">11px</option>
                <option value="12">12px</option>
                <option value="13">13px</option>
                <option value="14">14px</option>
                <option value="15">15px</option>
                <option value="16">16px</option>
              </select>
            </div>
            <div class="row">
              <label>Default Text Color: <div class="colors_from_img"></div></label>
              <input type="text" id="default_text_color" class="spectrum">

              <button class="swap_icon icon" id="swap_colors"></button>
            </div>
            <div class="row">
              <label>Background Color: <div class="colors_from_img"></div></label>
              <input type="text" id="background_color" class="spectrum">
              <input type="text" id="background_color_no_alpha" style="display:none;">
            </div>
            <div class="row">
              <label for="text_opacity" class="inline">All Text Opacity:</label>
              <input type="number" id="text_opacity" style="width: 50px;" min="0" max="100">

              <label class="show_hide" id="show_hide_text">
                <input type="checkbox" id="show_text">
                <span class="eye"></span>
              </label>
            </div>
            <div class="row">
              <span class="row_header">Bacground Image Options</span>
              <label class="show_hide" id="show_hide_bg_img">
                <input type="checkbox" id="show_bg_img" disabled="disabled">
                <span class="eye"></span>
              </label>

              <input type="file" id="bg_img" accept="image/*">
              <button id="bg_img_button">Upload Background Image</button>

              <input id="bg_img_url" placeholder="Background Image URL">
            </div>
            <div class="row" id="bg_image_options">
              <label for="bg_x">X:</label>
              <label for="bg_y">Y:</label>
              <label for="bg_size">Size:</label>

              <input type="number" id="bg_x">
              <span>px</span>
              <input type="number" id="bg_y">
              <span>px</span>
              <input type="number" id="bg_size" min="0">
              <select id="bg_size_type">
                <option value="%">%</option>
                <option value="px">px</option>
              </select>
            </div>

            <div class="row">
              <button id="download_settings">Download Settings</button>
              <input type="file" accept='json/*' id="upload_json_settings">
              <button id="upload_settings">Upload Settings</button>
            </div>
          </div>

          <div class="panel" id="ascii_settings_panel">
            <div class="row" id="ascii_options">
              <span class="row_header">Ascii Conversion Options</span>

              <label for="ascii_color" class="inline">In color:</label>
              <label class="switch">
                <input type="checkbox" id="ascii_color">
                <span class="slider"></span>
              </label>

              <label for="use_bg_color" class="inline">Bkg color behind characters:</label>
              <label class="switch">
                <input type="checkbox" id="use_bg_color">
                <span class="slider"></span>
              </label>

              <label for="avr_bg_color" class="inline">Average character and bkg color:</label>
              <label class="switch">
                <input type="checkbox" id="avr_bg_color">
                <span class="slider"></span>
              </label>
            </div>

            <div class="row">
              <label for="px_per_char_width" class="inline">Pixels per character width:</label>
              <input type="number" id="px_per_char_width" min="3" style="width:45px;">

              <label for="px_per_char_height" class="inline">Pixels per character height:</label>
              <input type="number" id="px_per_char_height" min="6" style="width:45px;">
            </div>

            <div class="row" id="ascii_options">
              <span class="row_header">Characters to Use</span>

              <label for="use_letters" class="inline">A-Z, a-z</label>
              <label class="switch">
                <input type="checkbox" id="use_letters">
                <span class="slider"></span>
              </label>

              <label for="use_other_char" class="inline">!"#$%&'(*+,-./:;<=>?@[^_`{|~</label>
              <label class="switch">
                <input type="checkbox" id="use_other_char">
                <span class="slider"></span>
              </label>

              <label for="use_blocks" class="inline">░ ▒ ▓ █</label>
              <label class="switch">
                <input type="checkbox" id="use_blocks">
                <span class="slider"></span>
              </label>
              <div class="filler" style="min-width: 145px;"></div>

              <label for="use_quadrent_side" class="inline">▛▝ ▞ ▁ ▄ ▀ ▐</label>
              <label class="switch">
                <input type="checkbox" id="use_quadrent_side">
                <span class="slider"></span>
              </label>
              <div class="filler" style="min-width: 128px;"></div>

              <label for="use_custom" class="inline">custom</label>
              <label class="switch">
                <input type="checkbox" id="use_custom">
                <span class="slider"></span>
              </label>
              <input id="custom_characters" style="width:calc(100% - 124px);">
            </div>
            <div class="row" id="ascii_pre_options">
              <span class="row_header">Image Filter Options (pre-render)</span>

              <label for="invert_img_colors" class="inline">Invert colors:</label>
              <label class="switch">
                <input type="checkbox" id="invert_img_colors">
                <span class="slider"></span>
              </label>
              <div class="filler" style="min-width: 40px;"></div>

              <label for="desaturate_img_colors" class="inline">Desaturate colors:</label>
              <label class="switch">
                <input type="checkbox" id="desaturate_img_colors">
                <span class="slider"></span>
              </label>
              <div class="filler" style="min-width: 50px;"></div>

              <label for="brightness_img_colors" class="inline">Brightness:</label>
              <label class="switch">
                <input type="checkbox" id="brightness_img_colors">
                <span class="slider"></span>
              </label>
              <input id="brightness_img_int" type="number" style="width: 50px;"/>
              <div class="filler" style="min-width: 50px;"></div>

              <label for="contrast_img_colors" class="inline">Contrast:</label>
              <label class="switch">
                <input type="checkbox" id="contrast_img_colors">
                <span class="slider"></span>
              </label>
              <input id="contrast_img_int" type="number" style="width: 50px;"/>
            </div>
            <div class="row" id="ascii_post_options">
              <span class="row_header">Ascii Filter Options (post-render)</span>

              <label for="invert_ascii_colors" class="inline">Invert colors:</label>
              <label class="switch">
                <input type="checkbox" id="invert_ascii_colors">
                <span class="slider"></span>
              </label>
              <div class="filler" style="min-width: 40px;"></div>

              <label for="desaturate_ascii_colors" class="inline">Desaturate colors:</label>
              <label class="switch">
                <input type="checkbox" id="desaturate_ascii_colors">
                <span class="slider"></span>
              </label>
              <div class="filler" style="min-width: 50px;"></div>

              <label for="brightness_ascii_colors" class="inline">Brightness:</label>
              <label class="switch">
                <input type="checkbox" id="brightness_ascii_colors">
                <span class="slider"></span>
              </label>
              <input id="brightness_ascii_int" type="number" style="width: 50px;"/>
              <div class="filler" style="min-width: 50px;"></div>

              <label for="contrast_ascii_colors" class="inline">Contrast:</label>
              <label class="switch">
                <input type="checkbox" id="contrast_ascii_colors">
                <span class="slider"></span>
              </label>
              <input id="contrast_ascii_int" type="number" style="width: 50px;"/>
            </div>
            <div class="row" id="covert_ascii">
              <button id="bg_to_ascii">Convert Image to ASCII</button>
            </div>
          </div>
          <div class="panel" id="filter_settings_panel">
            <div class="row">
              <span class="row_header">Glitch (Random Parts) Filters</span>
                <button class="glitch" id="glitch_rand">Random</button>
                <button class="glitch" id="glitch_shift">Color Shift</button>
                <button class="glitch" id="glitch_invert">Color Invert</button>
                <button class="glitch" id="glitch_color">Color Change</button>
                <button class="glitch" id="glitch_streak">Color Streak</button>
                <button class="glitch" id="glitch_swap">Swap Text</button>
                <button class="glitch" id="glitch_row_shift">Shift Row</button>
                <button class="glitch" id="glitch_replace">Replace Character</button>
            </div>
            <div class="row">
              <span class="row_header">Color Shift (Whole Image) Filters</span>
                <button class="color_shift" id="color_shift_light">Lighten</button>
                <button class="color_shift" id="color_shift_dark">Darken</button>
                <button class="color_shift" id="color_shift_tint_left">Hue Tint Left</button>
                <button class="color_shift" id="color_shift_tint_right">Hue Tint Right</button>
                <button class="color_shift" id="color_shift_invert">Invert</button>
            </div>
            <div class="row">
              <button id="save_filters">Save Filters</button>
              <button id="reset_filters">Reset Filters</button>
            </div>
          </div>
          <div class="filler"></div>
          <label class="switch inside_label">
            <input type="checkbox" id="plain_or_rich">
            <span class="slider"></span>
          </label>
          <button class="panel_open settings_icon icon" id="text_settings"></button>
          <button class="panel_open convert_icon icon" id="ascii_settings"></button>
          <button class="panel_open filter_icon icon" id="filter_settings"></button>
        </div>
        <div id="text_wrap">
          <textarea id="text_data"></textarea>
          <div id="editor"></div>
        </div>
      </div>
      <div id="html">
        <div id="html_wrap"></div>
      </div>
    </div>

    <div id="ascii_html"></div>

    <?php include "inc/demo_1.html"; ?>
    <?php include "inc/demo_2.html"; ?>
    <?php include "inc/demo_3.html"; ?>

    <script src="js/lib/jquery.js"></script>
    <script src="js/lib/jquery-ui.min.js"></script>
    <script src="js/lib/spectrum.min.js"></script>
    <script src="js/lib/color-thief.min.js"></script>
    <script src="js/lib/quill.js"></script>
    <script src="js/lib/aalib.js"></script>
    <script src="js/lib/webfont.js"></script>

    <script src="js/var_data.js"></script>
    <script src="js/page.js"></script>
    <script src="js/colordata.js"></script>
    <script src="js/parser.js"></script>
    <script src="js/filters.js"></script>
    <script src="js/ascii.js"></script>
    <script src="js/script.js"></script>

    <?php  }

    if(isset($settings['include_footer']) && $settings['include_footer'] !== ''){
      include($settings['include_footer']);
    } ?>
  </body>
</html>
