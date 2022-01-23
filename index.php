<?php
require('settings_default.php');
$set = $settings;
$setup = false;
if(file_exists('settings.php')){
	include('settings.php');
	foreach($settings as $key => $val){
		$set[$key] = $val;
	}
	$setup = true;
}
if(file_exists('../all_settings.php')){
	include('../all_settings.php');
	if(isset($all_settings['c0lorize-web'])){
		foreach($all_settings['c0lorize-web'] as $key => $val){
			$set[$key] = $val;
		}
		$setup = true;
	}
}
$settings = $set;
?>
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
			var var_data_loaded = false;
			var doc_loaded = false;

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
    <div id="actions">
      <!--<button id="undo" disabled="disabled">Undo</button>
      <button id="redo" disabled="disabled">Redo</button>-->
      <span>Download:</span>
      <button id="download_text">Text</button>
      <button id="download_html">HTML</button>
      <button id="download_irc">IRC</button>
      <button id="download_img">Quick Image</button>
      <button class="open_dialog no_icon" id="download_img_options_dialog">Custom Image</button>

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
              <button id="fg_color" class="open_panel">A</button>
              <div class="panel" id="fg_color_panel"><div class="row"></div></div>
            </div>
            <div class="panel_wrap">
              <button id="bg_color" class="open_panel">A</button>
              <div class="panel" id="bg_color_panel"><div class="row"></div></div>
            </div>
            <div id="style"></div>
          </div>
					<div id="style_dialog" class="open_dialog"></div>
          <div id="chars"></div>

          <div class="filler"></div>

          <label id="tab_or_panel_switch" class="switch inside_label">
            <input type="checkbox" id="tab_or_panel">
            <span class="slider"></span>
          </label>
          <label id="plain_or_rich_switch" class="switch inside_label">
            <input type="checkbox" id="plain_or_rich">
            <span class="slider"></span>
          </label>
          <button class="open_dialog settings_icon icon" id="text_settings_dialog"></button>
          <button class="open_dialog convert_icon icon" id="ascii_settings_dialog"></button>
          <button class="open_dialog filter_icon icon" id="filter_settings_dialog"></button>
        </div>
				<div id="text_html_wrap">
	        <div id="text_wrap">
	          <textarea id="text_data"></textarea>
	          <div id="editor"></div>
	        </div>
					<div id="html_wrap_side_by_side">
						<div id="iframe_wrap"></div>
					</div>
				</div>
      </div>
      <div id="html">
        <div id="html_wrap"></div>
      </div>
    </div>

    <div id="ascii_html"></div>

		<?php include "inc/dialogs.html"; ?>

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
