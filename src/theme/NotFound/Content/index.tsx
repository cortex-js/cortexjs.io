import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/NotFound/Content';

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
    <style>
      {`
      html {
        font-family: system-ui,-apple-system,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-display: swap;
        text-align: center;
        color: #555;
        fill: currentColor;
      }

      p {
        margin: 0;
      }

      h1 {
        font-size: 32px;
        line-height: 1.125;
        font-weight: 600;
        letter-spacing: 0.004em;
        margin: 0 0 1em 0;
        width: 420px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h2 {
        font-size: 112px;
        font-weight: 600;
        line-height: .7;
      }
      h3 {
        font-size: 100px;
        font-weight: 600;
        line-height: .7;
      }
      h2, h3 {
        color: hsl(210, 50%, 20%);
        margin: 0;
      }
      /* h2, h3 {
        background: linear-gradient(#eee, #333);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      } */
      .card404 {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column wrap;
      }

      .cols {
        display: flex;
        width: min-content;
        flex-flow: row;
      }

      .rows {
        display: flex;
        flex-flow: row wrap;
        width: min-content;
      }

      .rows * {
        width: 100%;
      }

      .fa-w-8 {
        width: 8px;
        vertical-align: -5px;
      }

      svg[data-icon='compass'] {
        width: 188px;
        padding: 32px;
        fill: url(#gradient) #447799;
        animation: 3s infinite alternate cubic-bezier(0.5, 0, 0.32, 0.67) wiggle
      }

      @keyframes wiggle {
        from { transform: rotate(0); }
        20% { transform: rotate(5deg); }
        45% { transform: rotate(-10deg); }
        70% { transform: rotate(15deg); }
        to { transform: rotate(0); }
      }

      a, a:visited, a:active {
        font-size: 24px;
        text-decoration: none;
        color: #0066ce;
      }

      a:hover {
        text-decoration: underline;
      }

      @media only screen and (max-width: 600px) {

        h1 {
            max-width: 320px;
            width: auto;
        }
        h2 {
            font-size: 64px;
        } 
        h3 {
            font-size: 50px;
        }
        svg[data-icon='compass'] {
            width: 94px;
        }
      }

      @media (prefers-color-scheme: dark) { 
        body {
            background-color: hsl(210, 50%, 16%);
            color: #fffff0;
        }
        h2, h3 {
            color: hsl(210, 50%, 90%);
        }
        svg[data-icon='compass'] {
            fill: url(#gradient-dark) #447799;
        }
      }

    `}
    </style>
      <svg style={{width:0,height:0,position:"absolute"}} aria-hidden="true" focusable="false">
      <linearGradient id="gradient" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(210, 60%, 40%)" />
          <stop offset="50%" stop-color="hsl(210, 50%, 30%)" />
          <stop offset="100%" stop-color="hsl(210, 50%, 20%)" />
      </linearGradient>
      <linearGradient id="gradient-dark" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(210, 60%, 60%)" />
          <stop offset="50%" stop-color="hsl(210, 50%, 40%)" />
          <stop offset="100%" stop-color="hsl(210, 50%, 35%)" />
      </linearGradient>
      </svg>
      <div className="card404">
          <div className="cols">
            <div className="rows">
                <h2>404</h2>
                <h3>error</h3>
            </div>
            <p><svg aria-hidden="true" data-prefix="fal" data-icon="compass" className="svg-inline--fa fa-compass fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M264.97 272.97c9.38-9.37 9.38-24.57 0-33.94-9.37-9.37-24.57-9.37-33.94 0-9.38 9.37-9.38 24.57 0 33.94 9.37 9.37 24.57 9.37 33.94 0zM351.44 125c-2.26 0-4.51.37-6.71 1.16l-154.9 55.85c-7.49 2.7-13.1 8.31-15.8 15.8l-55.85 154.91c-5.65 15.67 10.33 34.27 26.4 34.27 2.26 0 4.51-.37 6.71-1.16l154.9-55.85c7.49-2.7 13.1-8.31 15.8-15.8l55.85-154.9c5.64-15.67-10.33-34.28-26.4-34.28zm-58.65 175.79l-140.1 50.51 50.51-140.11 140.11-50.51-50.52 140.11zM248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216z"></path></svg>
            </p>
        </div>
        <h1>The page you’re looking for can’t be found</h1>
      </div>
    </main>
  );
}
