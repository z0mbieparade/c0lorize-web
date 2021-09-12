# c0lorize-web

The original problem was that to create colors in IRC, you need to insert an invisible unicode color character. Which, is a massive plain in the butt. Especially on a Mac. A while back I wrote a command line script that would take a text file with  **&lime** and convert every **&lime** to its corresponding lime green invisible unicode character (\u00039), and spit out another text file you could then upload and use as the MOTD on an IRC server. Which, was great but also still a huge pain in the butt.

So... here's a front end for my old <a href="https://github.com/z0mbieparade/c0lorize" target="_blank">c0lorize command line app</a>.

 A few useful points of interest:

The ![settings](css/images/settings.svg =20x20)  icon on the right lets you change the text editor settings. You can upload a background image to "trace" with whatever text you want. You can adjust the background color and font color and any number of other things that might make your life easier when hand-drawing ascii art.

The ![convert](css/images/convert.svg =20x20) icon next to it is if you want to run aalib over the background image you've uploaded. It's not perfect, and the colors are restricted to the 16 foreground/background colors IRC allows, so it can get pretty wacky looking. There are multiple settings you can fiddle with to try and make something not horrible looking. Keep  in mind, clicking **[Convert Image to ASCII]** will erase anything you currently have in your editor.

The ![filter](css/images/filter.svg =20x20) icon contains a bunch of filters you can use.

The toggle switch next to the ![settings](css/images/settings.svg =20x20) that swaps from colored to text, shows you the original plain text format that  the original c0lorize script used. You can download this by clicking the **[Download Text]** button at the top.

**[Download HTML]** downloads an html file of what you made, incase you want to use it on the web somewhere.

**[Download IRC]** downloads the IRC text file with unicode colors.

 There are a couple demo files you can check out up there too if you want an idea of how everything works, or some inspiration.

For more info about colors, color codes, etc you can check out the about page on the original <a href="https://github.com/z0mbieparade/c0lorize" target="_blank">c0lorize app</a>.
