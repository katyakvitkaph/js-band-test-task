# js-band-test-task

The Calendar application allows you to view the daily schedule for a week for multiple participants. The application has the ability to create an event indicating the time, day of the week and participants, as well as delete events and filter by participants.

Check the demo via link: https://katyakvitkaph.github.io/js-band-test-task/

## Launching

To launch the project, follow next steps:

1. Clone the repository into chosen directory:

```bash
git clone https://github.com/katyakvitkaph/js-band-test-task.git
```

2. Change directory to project's directory:

```bash
cd js-band-test-task
```

3. Install all the dependencies required:

```bash
npm i
```

4. Run project:

```bash
npm start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (Webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Project Structure


```
js-band-test-task
├─ .babelrc
├─ .browserslistrc
├─ .editorconfig
├─ .gitignore
├─ .prettierrc
├─ .vscode
│  └─ settings.json
├─ css
│  ├─ main.css
│  └─ main.css.map
├─ dist
│  └─ css
│     ├─ main.min.css
│     └─ main.min.css.map
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ src
│  ├─ assets
│  │  └─ icons
│  │     └─ calendar.png
│  ├─ index.html
│  ├─ index.js
│  ├─ js
│  │  ├─ controller.js
│  │  ├─ model.js
│  │  ├─ services
│  │  │  └─ event-emitter.js
│  │  └─ view.js
│  └─ sass
│     ├─ base
│     │  └─ _normalize.scss
│     ├─ components
│     │  ├─ footer
│     │  │  └─ _footer.scss
│     │  ├─ form
│     │  │  ├─ _create-btn.scss
│     │  │  └─ _form.scss
│     │  ├─ header
│     │  │  └─ _header.scss
│     │  ├─ item
│     │  │  └─ _item.scss
│     │  ├─ main-content
│     │  │  └─ _main-content.scss
│     │  ├─ modal
│     │  │  └─ _modal.scss
│     │  └─ table
│     │     └─ _table.scss
│     ├─ main.css
│     ├─ main.css.map
│     ├─ main.scss
│     └─ _common.scss
└─ webpack
   ├─ config.js
   ├─ configs
   │  ├─ development.js
   │  ├─ production.js
   │  └─ shared.js
   └─ utils
      └─ paths.js

```