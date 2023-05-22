# URL Shortener Service Client

<p>This README elaborates on Node package information, folder structuring, and client scripts</p>

## Scripts

### `npm install` / `npm ci`

Installs all Node packages and Dependecies. `ci` for clean install.

### `npm start`

Open http://localhost:5000 to view it in the browser.

### `npm test`

Run test on `test.tsx` files with Jest and React Test Renderer.

### `npm run build`

Create build folder for existing project for Netlify deployment.

## Package Information

* Built on a <b>TypeScript</b> environment.
* Testing with <b>Jest</b> and <b>React Test Renderer</b>.
* State management and preservation with <b>Redux</b>.
* API fetching and interception with <b>Axios</b>.
* UI/UX Interface built with <b>Tailwind CSS</b>.
* Interface routing with <b>React Router</b>.
* Increase date readability with <b>Moment</b>.

## Component Information

### Reusable/Common Components:
<pre>
    /component
        /common
         /*component-name*
            *component-name*.classname.ts
            *component-name*.tsx
            index.ts
</pre>

* Hyperlink
* Accordion
* Button
* Grid
* Textfield
* Modal
* Table
* Loader

### Sections:
<pre>
    /component
        /section
         /*section-name*
            *section-name*.test.ts
            *section-name*.tsx
            index.ts
</pre>

* Transactions Modal - Display transactions information in table form.
* Link Result Section - Display links information in data grid form upon `search/generate/error/clear`.
* Click Report Section - Display links information in table form.
* Create Link Section - Link creation or search form.

## Other Src Folder Information
* Util
    * String - format strings and store Regex formats.
    * Date - format dates.
    * Fetch - Create <b>Axios</b> fetch reusable function.
    * Interceptor - Configure <b>Axios</b> request/response interceptor.
    * Constant - Store static strings.
    * Redux - Store mock <b>Redux</b> store for testing and increases <b>Redux</b> action capabilities.
* Service
    * Store API endpoint fetchings as functions to be used with <b>Redux</b>.
* Store 
    * Configure <b>Redux</b> store and store <b>Redux</b> actions and reducers with services.
* Style 
    * Configure <b>Tailwind CSS</b> directives.

# - END -
