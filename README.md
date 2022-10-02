# READ BEFORE EDITING FILES  

The code here is badly written, which means several conventions should be followed to ensure proper formatting.  

The following was last updated Sept 24, 2022.  

## BUGS/TO DO  

- Looks weird in Chrome, but fine in Firefox.  Check other browsers.

- Button background images do not function; have been replaced by solid colors.  

- Heading banner backgroundi image also does not function; currently replaced by solid color.  

- Heading banner does not extend full desired length unless set at >100% which leads to weird scrolling.

- Navbar may need stylistic work.  

- Homepage decorative image is currently filler.

## HEAD  

The following is the HTML head to every document.

    <head>
        <meta charset="utf-8">
        <title>Test Page</title>
        <link rel="stylesheet" href="css/main/main.css">
    </head>

## NAVBAR/BANNER

At the top of every page is the navbar and the site banner, which should be included immediately after the head of the document and outside the body. 

The following is the navbar and banner code (HTML; CSS pre-coded):  

    <nav>
        <ul>
            <li>
                <a href = "https://enguy3n.github.io/index.html">>HOME</a>
            </li>
            <li>
                <a href = "https://enguy3n.github.io/about.html">•ABOUT</a>
            </li>
            <li>
                <a href = "https://enguy3n.github.io/gallery.html">•GALLERY</a>
            </li>
            <li>
                <a href = "https://enguy3n.github.io/external-links.html">•EXTERNAL LINKS</a>
            </li>
        </ul>
    </nav>
    <div class = "banner">
        <p>PAGE NAME</p>
    </div>

This goes outside of the body.

## BUTTONS

Linebreaks should be included after every button to ensure proper spacing.  

    <a class = "button" href = "https://www.example.com/">
        test button lol
    </a>
    <br>
    <a class = "button" href = "https://www.example.com/">
        test button2
    </a>
    <br>
    <a class = "button" href = "https://www.example.com/">
        test button3
    </a>