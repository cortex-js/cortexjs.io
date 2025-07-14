---
title: About Us
slug: /about
date: 2021-06-24
---
<style>{`
  .signature {
    padding: 0;
    margin: 0;
    line-height: 1;
  }
  .signature li {
    list-style: none;
    padding-left: 0;
    padding-top: 8px;
  }
  .signature li:first-of-type::before {
    opacity: .5;
    content: '— '
  }

  .signature a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    border-radius: 4px;
    padding: 8px;
    margin-left: -8px;
  }

  .signature a:hover {
    background-color: var(--neutral-800); 
  }

  .signature svg {
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
    margin: 0;
    margin-right: 8px;
  }

  .hero {
    background: transparent;
    padding: 0;
    border-radius: 500px;
    float: right;
    shape-outside: url(/img/arno-memoji-computer.png);
    shape-image-threshold: .9;
    shape-margin: 40px;
  }

`}</style>

<h1 className="font-size-2xl">Hello!</h1>
<img className="hero" src="/img/arno-memoji-computer.png" alt="Portrait of Arno"/>

<div className="max-w-4xl mt-lg">

In 1984 I built WinMath for the Mac, one of the first graphing calculator 
for modern computers.

A few years later I had the privilege of bringing the Mac UI to life at Apple, 
then I helped build tools for creative professionals and
move the web platform forward at Adobe.

Now I'm returning where it all began: 
I'm building tools for scientific computing,
including [mathfield](/mathfield), a web component to edit 
beautifully typeset math equations 
and the [Compute Engine](/compute-engine/) to perform symbolic 
computing and numeric evaluations in JavaScript environments.

These tools are available under an Open Source license.

I can’t wait to see what you do with them. Enjoy!

<ul className="signature">
  <li>
    Arno Gourdol
  </li>
  <li style={{opacity:.6}}>
    <i>My Erdős number is 4</i>
  </li>
  <li>
    <a href="https://www.linkedin.com/in/arnog"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>LinkedIn</a>
  </li>
  <li>
    <a href="https://www.instagram.com/arnog"><svg className="svg-inline--fa fa-instagram fa-w-14" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>Instagram</a>
  </li>
  <li>
    <a href="mailto:arno@arno.org"><svg className="svg-inline--fa fa-envelope fa-w-16" aria-hidden="true" focusable="false" data-prefix="far" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path></svg>Mail</a>
  </li>
</ul>


</div>
