---
slug: /mathfield
title: Introduction
hide_table_of_contents: true
hide_title: true
---


<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className="svg-settings">
  <defs>
    <linearGradient id="orange-gradient">
      <stop offset="0%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="purple-gradient" gradientTransform="rotate(45)">
      <stop offset="0%" style={{ stopColor: "#a03b7d", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#bf00ff", stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="blue-gradient">
      <stop
        offset="0%"
        style={{ stopColor: "rgba(44, 44, 224, 0.679)", stopOpacity: 1 }}
      />
      <stop offset="100%" style={{ stopColor: "#30afdd", stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="yellow-gradient" gradientTransform="rotate(90)">
      <stop offset="0%" style={{ stopColor: "#ff5e00", stopOpacity: 1 }} />
      <stop offset="100%" style={{ stopColor: "#ff9900", stopOpacity: 1 }} />
    </linearGradient>
    <linearGradient id="green-gradient" gradientTransform="rotate(45)">
      <stop
        offset="0%"
        style={{ stopColor: "rgb(16, 126, 6)", stopOpacity: 1 }}
      />
      <stop offset="100%" style={{ stopColor: "#0abe46", stopOpacity: 1 }} />
    </linearGradient>
  </defs>
</svg>



<style>{`
.svg-settings {
    position: absolute !important;
    height: 1px; width: 1px;
    overflow: hidden;
    clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
    clip: rect(1px, 1px, 1px, 1px);
}



#features-section {
  display: flex; 
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
}

#features-section p {
  color: var(--body-color);
  font-weight: 400;
  line-height: 1.275;
  font-size: 1rem;
}

#features-section > div {
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--content-background);
  color: var(--text-color);
}


#use-cases-section {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;
}

div.use-case {
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  padding: 1rem;
  width: calc(50% - 2rem);
  max-width: 410px;
  height: fit-content;

  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--content-background);
  color: var(--text-color);
}

div.use-case div {
  display: flex;
  flex-flow: column;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
}


div.use-case .icon {
  font-size: 6rem;
  margin-right: 2rem;
  margin-left: 1rem;
  min-width: 120px;
  width: .875em;
}

div.use-case h3 {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

div.use-case p {
  font-size: 1rem;
  color: var(--body-color);
  font-weight: 400;
  line-height: 1.25;
}


.fill-purple path {
  fill: url(#purple-gradient);
}
.fill-orange path {
  fill: url(#orange-gradient);
}
.fill-blue path {
  fill: url(#blue-gradient);
}
.fill-yellow path {
  fill: url(#yellow-gradient);
}
.fill-green path {
  fill: url(#green-gradient);
}


.use-case  div {
  margin: 0;
}

.use-case .icon {
  display: flex;
  align-self: center;
  justify-self: center;
  margin: auto;
}

h1 {
  display: none;
}

h1.zoom {
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;
  font-size: 8rem;
  letter-spacing: -0.04em;
  line-height: .8;
  font-weight: 700;
  text-fill-color: transparent;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-image: linear-gradient(0deg, #b95a52, #2c5072);
  padding-top: 10rem;
  padding-bottom: 8rem;
  margin-left: 0;
  margin-right: 0;
  margin-left: -2rem;
  margin-right: -2rem;
  margin-top: -2rem;
  animation: zoom-in-zoom-out 1.2s ease 1;
}


h1 span.first-part {
  font-size:140px;
}

h1 span.second-part {
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 75px;
  font-weight: 200;
  letter-spacing: -6px;
  /* animation-delay: .2s; */
  /* animation: zoom-in-zoom-out 1s ease infinite; */
  /* animation: 0.2s zoom-in-zoom-out 1s ease infinite;; */

}

h1 span.third-part {
  font-size: 120px; letter-spacing: -8px;
  /* animation-delay: .4s; */
  /* animation: 0.5s zoom-in-zoom-out 1s ease; */
}


@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(0, 0);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}



h1::selection, h1 span::selection {
  -webkit-text-fill-color: #000;
  background: #abd;
  background-clip:inherit;
  -webkit-background-clip: inherit;
  -moz-background-clip: inherit;
}


div.intro-copy {
  display: flex;
  flex-flow: column;
  align-items: center;

  padding-top: 2rem;
  margin-inline: 0;
  margin-bottom: 1rem;

  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--content-background);
  color: var(--text-color);
}

div.intro-copy p {
  color: var(--text-color);
  margin: 0;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.006em;
}

div.intro-copy p.p1 {
  font-size: 6rem;
  line-height: .8;
  letter-spacing: -0.03em;
}

div.intro-copy p.p2 {
  font-size: 4.5rem;
  line-height: .8;
}

div.intro-copy p.p3 {
  font-size: 2rem;
}

div.intro-copy hr {
  width: 50%;
  margin: 1rem 0;
  border: none;
  border-top: 1px solid var(--border-color);
}

div.intro-copy div {
  display: block;
  width: 70%;
}

div.intro-copy kbd {
  font-family: var(--monospace-font);
  background: transparent;
  color: var(--primary-color);
  font-size: 1em;
  border: none;
  box-shadow: none;
}


h2 {
  font-size: 2rem;
  line-height: 1;
  letter-spacing: -0.03em;
}


p {
    margin: 0 0 1em;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.1em;
    letter-spacing: 0.006em;
    color: #999;
}

.copy strong {
  color: #000;
}

div.figure {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  background: var(--neutral-900);
  border: 1px solid var(--neutral-700);
  border-radius: 8px;
}

@media (prefers-color-scheme: dark) {
  p {
    color: #bbb
  }

  .copy strong {
    color: #fff;
  }
}

@media only screen and (max-width: 767px) {
  #main {
    padding-left:0;
    padding-right: 0;    
  }
  .page .page__inner-wrap {
    padding-left:0;
    padding-right: 0;    
    }
  picture.full-width, img.full-width {
    width: 100%;
    padding-left:0; 
    padding-right: 0;
    margin-left:0;
    margin-right:0;
  }
  h1 {
    font-size: 3rem;
  }

  h1 span.first-part {
    font-size: clamp(2rem, 8vmin, 4.5rem);
    letter-spacing: -2px;
  }

  h1 span.second-part {
    font-size: clamp(1rem, 3vmin, 3rem);
    letter-spacing: 0;
  }

  h1 span.third-part {
    font-size: 4rem;
    letter-spacing: -2px;

  }

  p.intro-copy {
    font-size: 2rem;
  }

  #features-section {
    flex-flow: column;
  }


  #use-cases-section {
    flex-flow: column;
    gap: 0;
  }

  div.use-case {
    display: flex;
    flex-flow: column;
    width: 100%;
    min-width: 100%;
    margin-bottom: 1rem;
  }

  div.use-case .icon {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

`}</style>

<div className="intro-copy">
  <p className="p1">Introducing</p>
  <p className="p2"><kbd>&lt;math-field&gt;</kbd></p>
  <hr/>
  <p className="p3">A <kbd>&lt;textarea&gt;</kbd> for math.</p>
  <hr/>

<div>
  ```live
  :::style
      math-field {
      border: 1px solid var(--neutral-400);
      background: var(--neutral-200);
      border-radius: 8px;
      padding: 8px;
      }
    @media (pointer: coarse) {
        math-field {
          border-radius: 16px;
          font-size: 1.25rem;
          border: 1px solid var(--neutral-100);
          background: var(--neutral-700);
          --primary-color: white;
          color: white;
          padding: 16px;
          box-shadow: 
            inset 4px 4px 16px rgb(0 0 0 / 10%),
            inset 2px 2px 8px rgb(0 0 0 / 60%);

        --smart-fence-color: white;
        --caret-color: var(--blue-400);
        --selection-background-color: var(--blue-300);
        --contains-highlight-background-color: var(--blue-900);
        }
        math-field:focus {
          outline: 4px solid rgb(255 255 255 / 25%);
        }
        math-field::part(virtual-keyboard-toggle), math-field::part(menu-toggle) {
          color: white;
        }
    }
  :::html
  <math-field>
    x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}
  </math-field>
  ```
</div>

</div>

  <div>
  <div className="figure" style={{marginBottom: "2em"}}>
    <img src="/img/mathfield/loop-eqn.png"/>
  </div>
  <h2>Built on a Rock Solid LaTeX Foundation</h2>
  <p>Mathfields includes a faithful JavaScript implementation of the <strong>TeX layout algorithms</strong>, the gold standard for typesetting of mathematical content.</p>
  <ReadMore path="/mathfield/reference/commands/" >
  Read more about the **800+ LaTeX commands** supported by mathfields <Icon name="chevron-right-bold" />
  </ReadMore>
</div>
<div>
  <div className="figure" style={{marginBottom: "2em"}}>
    <img src="/img/mathfield/virtualKeyboard.png"/>
  </div>
  <h2>Math Virtual Keyboards</h2>
  <p>Mathfields come with a virtual keyboard for easy LaTeX input. It is fully customizable and can be used in any web application.</p>
  <ReadMore path="/mathfield/virtual-keyboard/" >
    Read more about the **virtual keyboard**<Icon name="chevron-right-bold" />
  </ReadMore>
</div>

  <div className="use-case">
    <div style={{}}>

<svg className="icon fill-green" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z"></path></svg>

      ### E-Learning Adventures:<br/>Math that Takes You Places

      Integrate mathfields into online courses, e-learning platforms, 
      and educational websites to display interactive math equations 
      and formulas.
    
    
      Develop interactive quizzes and tests that involve math problems, 
      making the learning experience more engaging. Combine mathfields 
      with the Compute Engine to check the correctness of the student's 
      answers in real-time.
      
      <ReadMore path="/tutorials/simple-quiz/" >
      Read this step-by-step tutorial to learn how to build a **simple quiz** with mathfield<Icon name="chevron-right-bold" />
      </ReadMore>

      <ReadMore path="/mathfield/guides/fill-in-the-blank/" >
      Learn more about authoring **fill-in-the-blank** questions with mathfields<Icon name="chevron-right-bold" />
      </ReadMore>
    </div>
  </div>
  

<div className="use-case">
<div>
    <svg className="icon fill-orange" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M437.2 403.5L320 215V64h8c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h8v151L10.8 403.5C-18.5 450.6 15.3 512 70.9 512h306.2c55.7 0 89.4-61.5 60.1-108.5zM137.9 320l48.2-77.6c3.7-5.2 5.8-11.6 5.8-18.4V64h64v160c0 6.9 2.2 13.2 5.8 18.4l48.2 77.6h-172z"></path></svg>  

    ### Equation Experiments

    Unleash your inner mad scientist! With mathfields, equations aren't 
    just boring symbols; they're your laboratory assistants. Display scientific research findings, formulas, and equations on websites dedicated to scientific fields.

    <ReadMore path="/compute-engine/guides/symbolic-computing/" >
    Use mathfields with the **Compute Engine** to symbolically compute and manipulate equations<Icon name="chevron-right-bold" />
    </ReadMore>
  </div>
</div>

<div className="use-case">
<div>

<svg className="icon fill-purple" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zM128 435.2c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm0-128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8v-38.4c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v38.4zm128 128c0 6.4-6.4 12.8-12.8 12.8h-38.4c-6.4 0-12.8-6.4-12.8-12.8V268.8c0-6.4 6.4-12.8 12.8-12.8h38.4c6.4 0 12.8 6.4 12.8 12.8v166.4zm0-256c0 6.4-6.4 12.8-12.8 12.8H76.8c-6.4 0-12.8-6.4-12.8-12.8V76.8C64 70.4 70.4 64 76.8 64h294.4c6.4 0 12.8 6.4 12.8 12.8v102.4z"></path></svg>  

    ### Online Calculators

    <p>Build interactive calculators that allow users to input math equations 
    and receive real-time calculations and results</p>
    
    <ReadMore path="/compute-engine/guides/numeric-evaluation/" >
    Make your calculator **interactive** by using the **Compute Engine** to evaluate the user's input<Icon name="chevron-right-bold" />
    </ReadMore>  
  </div>
</div>

<div className="use-case">
<div>
    
  <svg className="icon fill-blue" aria-hidden="true" focusable="false" data-icon="file-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" ><path fill="currentColor" d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"></path></svg>  

    ### Dynamic Documentation:<br/>Math with a Twist

    Mathfields spices things up by turning complex equations into a visual journey. Your technical explanations just got a serious upgrade.
  </div>
</div>

<div className="use-case">
  <div>

    <svg className="icon fill-yellow" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>  <div>

    ### Write Math, Write Magic

    <p>Calling all math storytellers! With mathfields, equations become the heroes of your blog. Craft captivating content that waltzes between math and magic, delighting readers along the way.</p>
  </div>
  </div>
</div>



